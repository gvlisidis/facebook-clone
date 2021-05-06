import { createStore } from 'vuex';
import User from './modules/user';
import Title from './modules/title';
import Profile from './modules/profile';

const store = createStore({
    modules: {
        User,
        Title,
        Profile,
    }
});

export default store;
