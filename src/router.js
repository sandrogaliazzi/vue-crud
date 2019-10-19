import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            meta: { requiresAuth: true },
            component: () =>
                import ('./views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ('./views/About.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('./views/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('./views/Login.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.auth) {
            next({
                path: '/login'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;