import { createStore } from 'vuex';
import User from './modules/user';

const store = createStore({
    modules: {
        User
    }
});

export default store;
