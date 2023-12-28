const { Howl } = require("howler");
var sound = new Howl({
  src: ["./sound.ogg"],
});

sound.play();
