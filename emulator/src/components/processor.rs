use super::memory::Memory;
use super::opcodes::*;
use super::screen::Screen;
use array_init::array_init;
use log::*;

#[derive(Debug)]
pub struct Processor {
    /** Program counter - points to the current instruction in the memory */
    pub pc: u16,

    /** Index register - point at locations in memory */
    pub i: u16,

    /** A stack for 16-bit addresses, which is used to call subroutines/functions and return from them */
    pub stack: Vec<u16>,

    /** Delay timer - 8-bit value which is decremented at a rate of 60 Hz (60 times per second) until it reaches 0 */
    pub delay_timer: u8,

    /** Sound timer - 8-bit value which functions like the delay timer, but which also gives off a beeping sound as long as it’s not 0 */
    pub sound_timer: u8,

    /** 16 8-bit registers, named V0 to VF. */
    /** VF is also used as a flag register; many instructions will set it to either 1 or 0 based on some rule, for example using it as a carry flag */
    pub v: [u8; 16],

    pub memory: Memory,
    pub gfx: [bool; Screen::WIDTH * Screen::HEIGHT],
}
impl Processor {
    pub fn init() -> Processor {
        Processor {
            pc: Memory::ROM_BEGIN_INDEX as u16,
            i: 0,
            stack: Vec::new(),
            delay_timer: 0,
            sound_timer: 0,
            v: array_init(|_| 0),
            memory: Memory::init(),
            gfx: array_init(|_| false),
        }
    }

    pub fn cycle(&mut self) {
        debug!("==========================");

        // Fetch data
        let instruction = self.fetch();
        self.pc += 2;
        debug!("Instruction: {:#06X}", instruction);

        // Decode instruction
        let (first, rest) = self.decode(instruction);

        // Execute instruction
        self.execute(first, rest).unwrap_or_else(|err| {
            warn!("{}", err);
        });
    }

    fn fetch(&self) -> u16 {
        let first_half = self.memory.data[self.pc as usize] as u16;
        let second_half = self.memory.data[self.pc as usize + 1] as u16;

        (first_half) << 0x8 | second_half
    }
    fn decode(&self, instruction: u16) -> (u16, u16) {
        let first = (instruction & 0xF000) >> 0xC;
        let rest = instruction & 0x0FFF;

        (first, rest)
    }
    fn execute(&mut self, first: u16, rest: u16) -> Result<(), Box<dyn std::error::Error>> {
        let mut not_found = false;

        match first {
            0x0 => match rest {
                0x0E0 => {
                    OpCode00E0::execute(self, &[]);

                    debug!("Clear screen");
                }
                _ => {
                    not_found = true;
                }
            },
            0x1 => {
                OpCode1NNN::execute(self, &[rest]);

                debug!("Jump to {:#06X} -> {:#06X}", rest, self.pc);
            }
            0x6 => {
                let x = (rest & 0xF00) >> 0x8;
                let nn = rest & 0x0FF;
                OpCode6XNN::execute(self, &[x, nn]);

                debug!("Set V{} to {:#06X} -> {:#06X}", x, nn, self.v[x as usize]);
            }
            0x7 => {
                let x = (rest & 0xF00) >> 0x8;
                let nn = rest & 0x0FF;
                OpCode7XNN::execute(self, &[x, nn]);

                debug!("Add {:#06X} to V{} -> {:#06X}", nn, x, self.v[x as usize]);
            }
            0xA => {
                OpCodeANNN::execute(self, &[rest]);

                debug!("Set I to {:#06X} -> {:#06X}", rest, self.i);
            }
            0xD => {
                let x = (rest & 0xF00) >> 0x8;
                let y = (rest & 0x0F0) >> 0x4;
                let n = rest & 0x00F;
                OpCodeDXYN::execute(self, &[x, y, n]);

                debug!(
                    "Draw sprite at {}:{} with height {}",
                    self.v[x as usize], self.v[y as usize], n
                );
            }
            _ => {
                not_found = true;
            }
        }

        if not_found {
            Err(format!("Opcode {:#06X} not recognized!", first << 0xC | rest).into())
        } else {
            Ok(())
        }
    }
}

#[cfg(test)]
mod tests {

    use super::Processor;
    use array_init::array_init;
    use wasm_bindgen_test::wasm_bindgen_test;

    #[wasm_bindgen_test]
    fn test_fetch() {
        // Arrange
        let mut memory: [u8; 4096] = array_init(|_| 0);
        memory[0] = 0xAB;
        memory[1] = 0xCD;
        let pc: u16 = 0x0;

        let mut processor = Processor::init();
        processor.memory.data = memory;
        processor.pc = pc;

        // Act
        let result = Processor::fetch(&processor);

        // Assert
        let expected = 0xABCD;
        assert_eq!(result, expected, "{:#06X} =/= {:#06X}", result, expected);
    }

    #[wasm_bindgen_test]
    fn test_decode() {
        // Arrange
        let instruction: u16 = 0xABCD;
        let processor = Processor::init();

        // Act
        let result = processor.decode(instruction);

        // Assert
        let expected: (u16, u16) = (0xA, 0xBCD);
        assert_eq!(result, expected, "{:#06X?} =/= {:#06X?}", result, expected);
    }

    #[wasm_bindgen_test]
    fn test_execute_normal() {
        // Arrange
        let first = 0x0;
        let rest = 0x0E0;
        let mut processor = Processor::init();

        // Act
        let result = processor.execute(first, rest);

        // Assert
        assert!(result.is_ok());
    }
    #[wasm_bindgen_test]
    fn test_execute_not_implemented() {
        // Arrange
        let first = 0xF;
        let rest = 0xFFF;
        let mut processor = Processor::init();

        // Act
        let result = processor.execute(first, rest);

        // Assert
        assert!(result.is_err());
    }
}
