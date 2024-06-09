import '@/assets/styles/main.css';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// @ts-ignore
import VueTheMask from 'vue-the-mask';

import App from './App.vue';
import router from './router';

import '@/router/middlewares/auth';

const app = createApp(App);

app.use(createPinia());
app.use(router);
// @ts-ignore
app.use(VueTheMask);

app.mount('#app');
