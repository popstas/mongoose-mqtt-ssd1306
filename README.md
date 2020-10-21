# Display MQTT message on SSD1306

Using for pomodoro timer with Node-Red.

![MQTT to SSD1306](assets/demo.gif).

Video (Russian) - https://youtu.be/du_pAQib9QU

- `status/tablo` - send text (max 5 symbols)
- `status/tablo/json` - send json

``` json
{"msg":"line 1\nline 2","msgSize":2}
```

#### msgSize
- `1` - 8 lines
- `2` - 4 lines
- `3` - 3 lines
- `4` - 2 lines
- `5` - 1 line

## Quick start

```
git clone https://github.com/popstas/mongoose-mqtt-ssd1306
cd mongoose-mqtt-ssd1306
mos build
mos flash
mos wifi ssid pass
mos config-set device.id=mongoose-pomodoro
mos config-set mqtt.enable=true mqtt.server=myserver mqtt.user=myuser mqtt.pas=mypass
mos config-set app.mqtt_topic=status/pomodoro/mmss app.text_size=4
```

## Wiring
SSD1306 display:
- `SCL` to `D1`
- `SDA` to `D2`
