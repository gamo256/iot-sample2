var request = require('request');
var key = '<your Full Privileges Apikey>';
var deviceId = '<your Id developer>';
var url = 'http://api.carriots.com/streams/';
var options = {
  uri: url,
  body: {
    "protocol": "v1",
    "checksum": "",
    "device"  : deviceId,
    "at"      : "now",
    "data"    : { "brightness":0 }
  },
  json: true,
  headers: {
    "carriots.apikey": key
  }
};
var raspi = require('raspi-io');
var five = require("johnny-five");
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
    freq: 10000
  });
  a.on("data", function() {
    options.body.data.brightness = this.value;
    console.log(this.value);
    // データをPOSTメソッドで送信
    request.post(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log('error: '+ response.statusCode);
      }
    });
  });
});
