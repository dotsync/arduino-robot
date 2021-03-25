const { Board, Led } = require('johnny-five');
const board = new Board();

board.on("ready", () => {
  // Create a standard `led` component
  // on a valid pwm pin
  const led = new Led(13);

  // Instead of passing a time and rate, you can
  // pass any valid Animation() segment opts object
  // https://github.com/rwaldron/johnny-five/wiki/Animation#segment-properties
  led.pulse({
    easing: "linear",
    duration: 3000,
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    keyFrames: [0, 10, 0, 50, 0, 255],
    onstop() {
      console.log("Animation stopped");
    }
  });

  // Stop and turn off the led pulse loop after
  // 12 seconds (shown in ms)
  board.wait(12000, () => {

    // stop() terminates the interval
    // off() shuts the led off
    led.stop().off();
  });
});
