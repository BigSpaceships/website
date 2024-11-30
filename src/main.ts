import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import TanksView from './views/TanksView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/tanks', component: TanksView },
];

const base = import.meta.env.BASE_URL;

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');


