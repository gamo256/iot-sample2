var five = require("johnny-five");
var board = new five.Board({port: "COM3"});
var theThingsAPI = require('thethingsio-api');
board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
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
    temperature.on("data", function() {
      console.log(this.celsius);
      object.values[0].value = this.celsius;
      client.thingWrite(object, function (error, data) {
        console.log(error ? error : data);
      });
    });
  });
});
