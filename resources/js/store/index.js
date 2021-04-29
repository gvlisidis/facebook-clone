import { createStore } from 'vuex';
import User from './modules/user';
import Title from './modules/title';

const store = createStore({
    modules: {
        User,
        Title,
    }
});

export default store;
