var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();
var channelId = <Channel ID>;
var writekey = '<your Write API Key>';
var readkey = '<your Read API Key>';
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
  client.attachChannel(
    channelId,
    {writeKey : writekey, readKey : readkey}
  );
  a.on("data", function() {
    console.log(this.value);
    var fields = {field1 : this.value};
    client.updateChannel(channelId, fields,	function(err, resp) {
      if (!err && resp > 0) {
        console.log('update successfully. Entry number was: ' + resp);
      }
    });
  });
});
