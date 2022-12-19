mod components {
    pub mod memory;
    pub mod processor;
    pub mod screen;
}
pub mod opcodes;

use crate::components::*;
use components::processor::Compatibility;
use fluvio_wasm_timer::Delay;
use log::*;
use std::time::Duration;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::spawn_local;

extern crate console_error_panic_hook;

struct Emulator {
    processor: processor::Processor,
    screen: screen::Screen,
}
impl Emulator {
    const INSTRUCTIONS_PER_SECOND: usize = 700;

    pub fn init(compatibility: Compatibility) -> Emulator {
        Emulator {
            processor: processor::Processor::init_compat(compatibility),
            screen: screen::Screen::init(),
        }
    }
    pub async fn start(&mut self) {
        loop {
            self.processor.cycle();
            self.screen.update(&self.processor.gfx);

            Delay::new(Duration::from_secs_f32(
                1.0 / Self::INSTRUCTIONS_PER_SECOND as f32,
            ))
            .await
            .expect("Error waiting for delay!");
        }
    }
}

#[wasm_bindgen]
pub fn start(compatibility: &str) {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    console_log::init_with_level(Level::Debug).expect("Failed initializing logger!");

    let compatibility_enum = match compatibility {
        "original" => Compatibility::Original,
        "new" => Compatibility::New,
        _ => panic!("Invalid compatibility setting!"),
    };

    let mut emulator = Emulator::init(compatibility_enum);
    emulator.processor.memory.load_fonts();
    emulator
        .processor
        .memory
        .load_rom(include_bytes!("roms/test_opcode.ch8").to_vec());

    debug!("{:#X?}", emulator.processor);
    debug!("{:?}", emulator.screen);

    spawn_local(async move { emulator.start().await });
}
