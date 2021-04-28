import { createRouter, createWebHistory } from 'vue-router';
import Start from "./components/views/Start";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Start
        }
    ]
});

export default router;
