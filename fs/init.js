// mongoose-mqtt-ssd1306
load('api_arduino_ssd1306.js');
load('api_config.js');
load('api_esp8266.js');
load('api_i2c.js');
load('api_mqtt.js');

print('### mongoose-ssd1306');

let d = Adafruit_SSD1306.create_i2c(4, Adafruit_SSD1306.RES_128_64);
d.begin(Adafruit_SSD1306.SWITCHCAPVCC, 0x3c, true /* reset */);

let showStr = function(d, str) {
  let textSize = Cfg.get('app.text_size');
  d.clearDisplay();
  d.setTextSize(textSize);
  d.setTextColor(Adafruit_SSD1306.WHITE);
  d.setCursor(0, 0);
  d.write(str);
  d.display();
};

// example: {msg: 'line1\nline2', textSize: 2}
let showStrDetailOld = function(d, jsonRaw) {
  let obj = JSON.parse(jsonRaw);
  let str = obj.msg;

  let textSize = Cfg.get('app.text_size');
  if (obj.msgSize) textSize = obj.msgSize;
  d.clearDisplay();
  d.setTextSize(textSize);
  d.setTextColor(Adafruit_SSD1306.WHITE);
  d.setCursor(0, 0);
  d.write(str);
  d.display();
};

// example: "[{"pos":[0,0],"text":"tgl:  8:38\nel:  16:52\npf:      1\n","size":2},{"pos":[0,48],"text":"usd: 75.20 fxgd:  927\nbrk: 18.65 iis: 33.44","size":1}]"
let showStrDetail = function(d, jsonRaw) {
  let objs = JSON.parse(jsonRaw);

  d.clearDisplay();
  d.setTextColor(Adafruit_SSD1306.WHITE);

  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];
    d.setTextSize(obj.size);
    d.setCursor(obj.pos[0], obj.pos[1]);
    d.write(obj.text);
  }

  d.display();
};

showStr(d, '');

let topic = Cfg.get('app.mqtt_topic');
print(topic);

MQTT.sub(topic, function(conn, topic, msg) {
  print(topic + ': ' + msg);
  showStr(d, msg);
});

MQTT.sub(topic + '/json', function(conn, topic, msg) {
  print(topic + '/json: ' + msg);
  showStrDetail(d, msg);
});
