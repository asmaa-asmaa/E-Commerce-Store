import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";

import mitt from "mitt";
const Emitter = mitt();

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .provide("Emitter", Emitter)
  .use(createPinia())
  .use(router)
  .mount("#app");
