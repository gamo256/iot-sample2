var request = require('request');
var key = '<PRIMARY API KEY>';
var deviceId = '<DEVICE ID>';
var streamId = '<STREAM ID>';
var url = 'http://api-m2x.att.com/v2/devices/' + deviceId + '/streams/' + streamId +'/value';
var options = {
  uri: url,
  form: {},
  json: true,
  headers: {'X-M2X-KEY': key}
};
var five = require("johnny-five");
five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
  });
  temperature.on("data", function() {
    options.form.value = this.celsius;
    console.log(this.celsius + "°C");
    // データをPUTメソッドで送信
    request.put(options, function(error, response, body){
      if (!error && response.statusCode == 202) {
        console.log(body.status);
      } else {
        console.log('error: '+ response.statusCode);
      }
    });
  });
});

