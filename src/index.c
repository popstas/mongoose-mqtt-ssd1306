/* #include "mgos.h"
#include "mgos_config.h"
#include "mgos_pcf857x.h"

static void button_cb(int pin, void *user_data) {
  struct mgos_pcf857x *d = (struct mgos_pcf857x *)user_data;
  LOG(LL_INFO, ("GPIO[%d] callback, value=%d", pin, mgos_pcf857x_gpio_read(d, pin)));
  mgos_pcf857x_gpio_toggle(d, pin+4);
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_pcf857x *d;
  int i;

  if (!(d = mgos_pcf8574_create(mgos_i2c_get_global(), mgos_sys_config_get_pcf857x_i2caddr(),
                                mgos_sys_config_get_pcf857x_int_gpio()))) {
    LOG(LL_ERROR, ("Could not create PCF857X"));
    return MGOS_APP_INIT_ERROR;
  }

  for(i=0; i<4; i++) mgos_pcf857x_gpio_setup_input(d, i, MGOS_GPIO_PULL_UP);
  for(i=4; i<8; i++) mgos_pcf857x_gpio_set_mode(d, i, MGOS_GPIO_MODE_OUTPUT);

  mgos_pcf857x_gpio_set_button_handler(d, 0, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_NEG, 10, button_cb, d);
  mgos_pcf857x_gpio_set_button_handler(d, 1, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_POS, 10, button_cb, d);
  mgos_pcf857x_gpio_set_button_handler(d, 2, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_ANY, 10, button_cb, d);
  mgos_pcf857x_gpio_set_button_handler(d, 3, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_ANY, 10, button_cb, d);

  return MGOS_APP_INIT_SUCCESS;
} */