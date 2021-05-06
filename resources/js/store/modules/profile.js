const state = {
    user: null,
    userStatus: null,
    posts: null,
    postsStatus: null,
};

const getters = {
    user(state) {
        return state.user;
    },
    posts(state) {
        return state.posts;
    },
    userStatus(state) {
        return state.userStatus;
    },
    postsStatus(state) {
        return state.postsStatus;
    },
    status(state){
        return {
            user: state.userStatus,
            posts: state.postsStatus,
        };
    },
    friendButtonText(state, getters, rootState) {
        if(rootState.User.user.data.user_id === state.user.data.user_id){
            return '';
        }
        if (getters.friendship === null) {
            return 'Add Friend';
        } else if (getters.friendship.data.attributes.confirmed_at === null
            && getters.friendship.data.attributes.friend_id !== rootState.User.user.data.user_id) {
            return 'Pending Friend Request';
        } else if (getters.friendship.data.attributes.confirmed_at !== null) {
            return '';
        }

        return 'Accept';
    },
    friendship(state) {
        return state.user.data.attributes.friendship;
    }
};

const actions = {
    fetchUser(context, userId) {
        context.commit('setUserStatus', 'loading');
        axios.get('/api/users/' + userId)
            .then(response => {
                context.commit('setUser', response.data);
                context.commit('setUserStatus', 'success');
            })
            .catch(error => {
                console.log('Unable to fetch the user from the server.')
                context.commit('setUserStatus', 'error');
            });
    },
    fetchUserPosts(context, userId) {
        context.commit('setPostsStatus', 'loading');

        axios.get('/api/users/' + userId + '/posts')
            .then(response => {
                context.commit('setPosts', response.data);
                context.commit('setPostsStatus', 'success');
            })
            .catch(error => {
                context.commit('setPostsStatus', 'error');
            });
    },
    sendFriendRequest(context, friendId) {
        if (context.getters.friendButtonText !== 'Add Friend'){
            return;
        }
        axios.post('/api/friend-request', {'friend_id': friendId})
            .then(response => {
                context.commit('setUserFriendship', response.data);
            })
            .catch(error => {
                //
            })
    },

    acceptFriendRequest(context, userId) {
        axios.post('/api/friend-request-response', {'user_id': userId, 'status': 1})
            .then(response => {
                context.commit('setUserFriendship', response.data);
            })
            .catch(error => {
                //
            })
    },

    ignoreFriendRequest(context, userId) {
        axios.delete('/api/friend-request-response/delete', {data: {'user_id': userId}})
            .then(response => {
                context.commit('setUserFriendship', null);
            })
            .catch(error => {
                //
            })
    },
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setPosts(state, posts) {
        state.posts = posts;
    },
    setUserStatus(state, userStatus) {
        state.userStatus = userStatus;
    },
    setPostsStatus(state, postsStatus) {
        state.postsStatus = postsStatus;
    },
    setUserFriendship(state, friendship) {
        state.user.data.attributes.friendship = friendship;
    }
};

export default {
    state, getters, actions, mutations
}
