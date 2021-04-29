import { createRouter, createWebHistory } from 'vue-router';
import NewsFeed from "./components/views/NewsFeed";
import UserShow from "./components/views/Users/Show";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: NewsFeed,
            meta: {title: 'News Feed'}
        },
        {
            path: '/users/:userId',
            name: 'user.show',
            component: UserShow,
            meta: {title: 'Profile'}
        }
    ]
});

export default router;
