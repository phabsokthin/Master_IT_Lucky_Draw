import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

import adminRouter from './routes/adminRouter';
import clientRouter from './routes/router.js';

const path = window.location.pathname.split('/')[1]; // Get the first part of the path

let routes;
if (path === 'admin') {
    routes = adminRouter;
} else {
    routes = clientRouter;
}

createApp(App).use(routes).mount('#app');
