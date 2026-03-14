import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Schemes from '../pages/Schemes.vue';
import SchemeDetail from '../pages/SchemeDetail.vue';
import Docs from '../pages/Docs.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/schemes', name: 'schemes', component: Schemes },
    { path: '/scheme/:code', name: 'scheme-detail', component: SchemeDetail },
    { path: '/docs', name: 'docs', component: Docs },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
