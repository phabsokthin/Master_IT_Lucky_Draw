import { createRouter, createWebHistory } from 'vue-router';
import HomeWinner from '@/view/HomeWinner.vue';
// import HomePage from '@/view/HomeView.vue'; // Example component
import AboutPage from '@/view/AboutView.vue'; // Example component
import { projectAuth } from '@/config/config';
import HomeView from '@/admin/HomeView.vue';
import DashboardView from '@/admin/DashboardView.vue';
import RewardView from '@/admin/RewardView.vue';
import LoginView from '@/admin/LoginView.vue';
import SignUpView from '@/admin/SignUpView.vue';
import StudentRewardList from '@/admin/StudentRewardListView.vue';
import CourseView from '@/admin/CourseView.vue';
import Student from '@/admin/StudentView.vue'
import ReportView from '@/admin/ReportView.vue';
import ViewStudentDetails from '@/admin/ViewStudentDetails.vue';


// const checkIfUserAlreadyLogin = (to, from, next) => {
//   const user = projectAuth.currentUser;
//   if (user) {
//     next({ name: 'admin' }); // Redirect logged-in users to /admin
//   } else {
//     next(); // Continue to the page
//   }
// };

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
    component: HomeWinner,
   // beforeEnter: checkIfUserAlreadyLogin, // Redirect logged-in users from the home page to /admin
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
      {
        path: 'course',
        name: 'course',
        component: CourseView,
      },
      {
        path: 'studentlist',
        name: 'studentlist',
        component: StudentRewardList,
      },
      {
        path: '/student',
        name: 'student',
        component: Student
      },
      {
        path: '/viewStudentDetails/:id',
        name: 'viewStudentDetails',
        component: ViewStudentDetails
      },
      {
        path: 'report',
        name: 'report',
        component: ReportView,
      },

    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'bg-gray-100 h-10 hover:text-black',

});

export default router;
