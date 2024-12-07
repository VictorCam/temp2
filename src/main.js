import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from 'vue-i18n'
import { usePreferredLanguages } from '@vueuse/core'
import { routes } from 'vue-router/auto-routes'; // Generated routes
import { registerSW } from 'virtual:pwa-register'


import 'virtual:uno.css';
import "normalize.css";
import "reset-css";
import "./main.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// router.beforeEach((to, from, next) => {
//   return next()
// });

import EN from '../locales/en.json'
import ES from '../locales/es.json'

const i18n = createI18n({
  locale: usePreferredLanguages().value[0],
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: EN,
    es: ES,
  },
})

const updateSW = registerSW({
  onNeedRefresh() { },
  onOfflineReady() { }
})

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");

export { routes };