import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/admin/HomeView.vue';
import RewardView from '@/admin/RewardView.vue';
import DashboardView from '@/admin/DashboardView.vue';
import LoginView from '@/admin/LoginView.vue';
import SignUpView from '@/admin/SignUpView.vue';
import { projectAuth } from '@/config/config';
import StudentRewardList from '@/admin/StudentRewardListView.vue';
import CourseView from '@/admin/CourseView.vue';

const requiresAuth = (to, from, next) => {
    const user = projectAuth.currentUser;
    if (user) {
        next();
    }
    else {
        next({ name: 'login' })
    }
}

//if we loggin exist it show admin
const checkIfUserAlreadyLogin = (to, from, next) => {
    projectAuth.onAuthStateChanged((user) => {
        if (user) {
            next("/admin");
        } else {
            next();
        }
    });
};
const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView,
        beforeEnter: checkIfUserAlreadyLogin
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
        beforeEnter: requiresAuth,
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
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'bg-gray-100 h-10 hover:text-black',
});



export default router;
