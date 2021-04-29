import { createRouter, createWebHistory } from 'vue-router';
import NewsFeed from "./components/views/NewsFeed";
import UserShow from "./components/views/Users/Show";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: NewsFeed
        },
        {
            path: '/users/:userId',
            name: 'user.show',
            component: UserShow,
        }
    ]
});

export default router;
