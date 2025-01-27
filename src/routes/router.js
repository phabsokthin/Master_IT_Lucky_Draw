import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/view/HomeView.vue'; // Example component
import AboutPage from '@/view/AboutView.vue'; // Example component

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
];

const router = createRouter({

  history: createWebHistory(),
  routes,
});

export default router;
