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
  let obj = JSON.parse(str);
  let textSize = Cfg.get('app.text_size');
  // let res = new RegExp('(\d):(.*)$');
  if (res) {
    textSize = res[1];
    str = res[2];
  } */
  d.clearDisplay();
  d.setTextSize(textSize);
  d.setTextColor(Adafruit_SSD1306.WHITE);
  d.setCursor(0, 0);
  d.write(str);
  d.display();
};

showStr(d, '');

let topic = Cfg.get('app.mqtt_topic');
print(topic);
MQTT.sub(topic, function(conn, topic, msg) {
  print(topic + ': ' + msg);
  showStr(d, msg);
});
