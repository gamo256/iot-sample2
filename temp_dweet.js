var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();
//thing nameの設定
var thingName = "<thing-name>";
var five = require("johnny-five");
var board = new five.Board();
board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
  });
  temperature.on("data", function() {
    console.log(this.celsius + "°C");
    dweetio.dweet_for(
      thingName,
      {'temperature' : this.celsius},
      function(err, dweet){
        console.log(dweet);
      }
    );
  });
});
