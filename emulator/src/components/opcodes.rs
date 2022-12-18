use super::processor::Processor;
use super::screen::Screen;
use array_init::array_init;
use log::*;

pub trait OpCode {
    fn execute(processor: &mut Processor, data: &[u16]);
}

impl OpCode for OpCode00E0 {
    fn execute(processor: &mut Processor, _: &[u16]) {
        processor.gfx = array_init(|_| false);
    }
}
impl OpCode for OpCode1NNN {
    fn execute(processor: &mut Processor, data: &[u16]) {
        processor.pc = data[0];
    }
}
impl OpCode for OpCode6XNN {
    fn execute(processor: &mut Processor, data: &[u16]) {
        let x = data[0] as usize;
        let nn = data[1] as u8;
        processor.v[x] = nn;
    }
}
#[allow(clippy::expect_fun_call)]
impl OpCode for OpCode7XNN {
    fn execute(processor: &mut Processor, data: &[u16]) {
        let x = data[0] as usize;
        let nn = data[1] as u8;
        processor.v[x] = processor.v[x]
            .checked_add(nn)
            .expect(&format!("Overflow on V{}!", x));
    }
}
impl OpCode for OpCodeANNN {
    fn execute(processor: &mut Processor, data: &[u16]) {
        processor.i = data[0];
    }
}
impl OpCode for OpCodeDXYN {
    fn execute(processor: &mut Processor, data: &[u16]) {
        let x = data[0] as usize;
        let y = data[1] as usize;
        let n = data[2];

        let sprite_x = processor.v[x] as usize;
        let sprite_y = processor.v[y] as usize;
        let height = n as usize;
        let width = 8;

        for row in 0..height {
            let sprite = processor.memory[processor.i as usize + row];
            debug!("Row {}: {:#010b}", row, sprite);

            for col in 0..width {
                let sprite_bit = (sprite >> (width - 1 - col)) & 0x1;
                let gfx_i = (sprite_y + row) * Screen::WIDTH + (sprite_x + col);

                let prev_gfx = processor.gfx[gfx_i];
                processor.gfx[gfx_i] ^= sprite_bit == 1;

                if prev_gfx && !processor.gfx[gfx_i] {
                    processor.v[0xF] = 1;
                    debug!("Pixel flipped from set to unset!");
                } else {
                    processor.v[0xF] = 0;
                }
            }
        }
    }
}

pub struct OpCode00E0 {}
pub struct OpCode1NNN {}
pub struct OpCode6XNN {}
pub struct OpCode7XNN {}
pub struct OpCodeANNN {}
pub struct OpCodeDXYN {}

#[allow(non_snake_case)]
mod tests {
    use super::*;
    use array_init::array_init;
    use wasm_bindgen_test::wasm_bindgen_test;

    #[wasm_bindgen_test]
    fn test_00E0() {
        // Arrange
        let mut processor = Processor::init();
        processor.gfx = array_init(|_| true);

        // Act
        OpCode00E0::execute(&mut processor, &[]);

        // Assert
        assert_eq!(processor.gfx, array_init(|_| false));
    }

    #[wasm_bindgen_test]
    fn test_1NNN() {
        // Arrange
        let mut processor = Processor::init();
        let jump_to = 0x123;

        // Act
        OpCode1NNN::execute(&mut processor, &[jump_to]);

        // Assert
        assert_eq!(processor.pc, jump_to);
    }

    #[wasm_bindgen_test]
    fn test_6XNN() {
        // Arrange
        let mut processor = Processor::init();
        let x = 0x1;
        let nn = 0x23;

        // Act
        OpCode6XNN::execute(&mut processor, &[x, nn]);

        // Assert
        assert_eq!(processor.v[x as usize] as u16, nn);
    }

    #[wasm_bindgen_test]
    fn test_7XNN() {
        // Arrange
        let mut processor = Processor::init();
        let x = 0x1;
        let nn = 0x23;
        processor.v[x as usize] = 0x1;

        // Act
        OpCode7XNN::execute(&mut processor, &[x, nn]);

        // Assert
        assert_eq!(processor.v[x as usize] as u16, x + nn);
    }

    #[wasm_bindgen_test]
    fn test_ANNN() {
        // Arrange
        let mut processor = Processor::init();
        let nnn = 0x123;

        // Act
        OpCodeANNN::execute(&mut processor, &[nnn]);

        // Assert
        assert_eq!(processor.i, nnn);
    }

    #[wasm_bindgen_test]
    fn test_DXYNN() {}
}
