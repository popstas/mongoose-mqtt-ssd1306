// mongoose-mqtt-ssd1306
load('api_arduino_ssd1306.js');
load('api_config.js');
load('api_esp8266.js');
load('api_i2c.js');
load('api_mqtt.js');

let d = Adafruit_SSD1306.create_i2c(4, Adafruit_SSD1306.RES_128_64);
d.begin(Adafruit_SSD1306.SWITCHCAPVCC, 0x3c, true /* reset */);

let showStr = function(d, str) {
  d.clearDisplay();
  d.setTextSize(Cfg.get('app.text_size'));
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
