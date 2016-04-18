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
var raspi = require('raspi-io');
var five = require('johnny-five');
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
    options.form.value = this.value;
    console.log(this.value);
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
