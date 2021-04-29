const state = {
    title: 'Welcome',
};

const getters = {
    pageTitle(state) {
        return state.title;
    }
};

const actions = {
    setPageTitle(context, title) {
        context.commit('setTitle', title);
    }
};

const mutations = {
    setTitle(state, title) {
        state.title = title + ' | Facebook';

        document.title = state.title;
    }
};

export default {
    state, getters, actions, mutations
}
