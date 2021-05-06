const state = {
    user: null,
    authUserStatus: true,
};

const getters = {
    authUser(state) {
        return state.user;
    },
    authUserStatus(state) {
        return state.authUserStatus;
    }
};

const actions = {
    fetchAuthUser(context, _) {
        axios.get('/api/auth-user')
            .then(response => {
                context.commit('setAuthUser', response.data);
            })
            .catch(error => {
                console.log('Unable to fetch auth user.')
            })
            .finally(() => {
                context.commit('setStatus', false)
            });
    }
};

const mutations = {
    setAuthUser(state, user) {
        state.user = user;
    },
    setStatus(state, status) {
        state.authUserStatus = status;
    }
};

export default {
    state, getters, actions, mutations
}
