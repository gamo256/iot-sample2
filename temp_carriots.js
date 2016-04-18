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
    "data"    : { "temperature":0 }
  },
  json: true,
  headers: {
    "carriots.apikey": key
  }
};
var five = require("johnny-five");
five.Board().on("ready", function() {
    var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
  });
  temperature.on("data", function() {
    options.body.data.temperature = this.celsius;
    console.log(this.celsius + "°C");
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
