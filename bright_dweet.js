var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();
//thing nameÇÃê›íË
var thingName = "<thing-name>";
var raspi = require('raspi-io');
var five = require("johnny-five")
var board = new five.Board({
  io: new raspi()
});
board.on("ready", function() {
  var virtual = new five.Board.Virtual(
    new five.Expander("PCF8591")
  );
  var a = new five.Sensor({
    pin:"A0",
    board:virtual,
    freq:10000
  });
  a.on("data", function() {
    console.log(this.value);
    dweetio.dweet_for(
      thingName,
      {'data' : this.value},
      function(err, dweet){
        console.log(dweet);
      }
    );
  });
});
