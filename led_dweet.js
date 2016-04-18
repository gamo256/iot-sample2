var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();
var thingName = "<thing-name>"; //thing nameの設定
var five = require("johnny-five");
var board = new five.Board();
board.on("ready", function() {
  var led = new five.Led(5);
  // データ受信(購読
  dweetio.listen_for(thingName, function(dweet){
    console.log(dweet.content)
    if(dweet.content.action === 'on') {
      led.on()
    } else {
      led.off();
    }
  });
});
