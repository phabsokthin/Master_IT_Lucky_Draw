import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/view/HomeView.vue'; // Example component
import AboutPage from '@/view/AboutView.vue'; // Example component
import { projectAuth } from '@/config/config';
import HomeView from '@/admin/HomeView.vue';
import DashboardView from '@/admin/DashboardView.vue';
import RewardView from '@/admin/RewardView.vue';
import LoginView from '@/admin/LoginView.vue';
import SignUpView from '@/admin/SignUpView.vue';

// Guard to check if user is already logged in, and redirect to /admin if logged in
const checkIfUserAlreadyLogin = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (user) {
    next({ name: 'admin' }); // Redirect logged-in users to /admin
  } else {
    next(); // Continue to the page
  }
};

// Guard to check if the user is authenticated before accessing admin routes
const requiresAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (user) {
    next(); // User is authenticated, allow navigation
  } else {
    next({ name: 'Home' }); // Redirect to Home if not authenticated
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: checkIfUserAlreadyLogin, // Redirect logged-in users from the home page to /admin
  },
  { path: '/about', name: 'About', component: AboutPage },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
},
  {
    path: '/login',
    name: 'login',
    component: LoginView
},
  //admin protect route
  {
    path: '/admin',
    name: 'admin',
    component: HomeView,
    beforeEnter: requiresAuth, // Protect admin routes with authentication
    children: [
      {
        path: 'dashboard',
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/', // Catch-all route, redirect to home page for invalid paths
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
