import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import adminRouter from './routes/adminRouter';
import clientRouter from './routes/router.js';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { projectAuth } from './config/config';
import { MotionPlugin } from '@vueuse/motion'

const path = window.location.pathname.split('/')[1]; // Get the first part of the path

let routes;
if (path === 'admin') {
    routes = adminRouter;
} else {
    routes = clientRouter;
}

setPersistence(projectAuth, browserLocalPersistence).then(() => {
    createApp(App).use(routes).use(MotionPlugin).use(ElementPlus).mount('#app');
})
.catch(err => {
    console.log(err)
})
