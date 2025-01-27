import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/admin/HomeView.vue';
import RewardView from '@/admin/RewardView.vue';
import DashboardView from '@/admin/DashboardView.vue';
import LoginView from '@/admin/LoginView.vue';
import SignUpView from '@/admin/SignUpView.vue';

// Simulating authentication status
// Replace this with your actual authentication logic
const isAuthenticated = () => {
  return localStorage.getItem('authToken'); // Example: check for a token in localStorage
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: HomeView,
    meta: { requiresAuth: true }, // Mark this route as protected
    children: [
      {
        path: 'dashboard', // Fixed relative path
        name: 'dashboard',
        component: DashboardView,
      },
      {
        path: 'reward',
        name: 'reward',
        component: RewardView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'bg-gray-100 h-10 hover:text-black',
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' }); // Redirect to login if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Proceed if no authentication is required
  }
});

export default router;
