var raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
  io: new raspi()
});
var theThingsAPI = require('thethingsio-api')
board.on("ready", function() {
  var virtual = new five.Board.Virtual(
    new five.Expander("PCF8591")
  );
  var a = new five.Sensor({
    pin:"A0",
    board:virtual,
    freq: 10000
  });
  //create Client
  var client = theThingsAPI.createClient();
  var object = {
    "values": [
      {
          "key": 'temperature',
          "value": 0
      }
    ]
  }
  client.on('ready', function () {
    a.on("data", function() {
      console.log(this.value);
      object.values[0].value = this.value;
      client.thingWrite(object, function (error, data) {
        console.log(error ? error : data);
      });
    });
  });
});
