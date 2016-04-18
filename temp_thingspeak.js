var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();
var channelId = <Channel ID>;
var writekey = '<your Write API Key>';
var readkey = '<your Read API Key>';
var five = require("johnny-five");
var board = new five.Board();
board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
  });
  client.attachChannel(
    channelId,
    {writeKey : writekey, readKey : readkey}
  );
    temperature.on("data", function() {
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
    var fields = {field1 : this.celsius, field2 : this.fahrenheit};
    client.updateChannel(channelId, fields,	function(err, resp) {
      if (!err && resp > 0) {
        console.log('update successfully. Entry number was: ' + resp);
      }
    });
  });
});
