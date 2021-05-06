<template>
    <div v-if="status.user === 'success' && user" class="flex flex-col items-center">
        <div class="relative mb-8">
            <div class="w-100 h-64 overflow-hidden z-10">
                <img src="https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_1280.jpg" alt=""
                     class="object-cover w-full">
            </div>

            <div class="absolute flex items-center bottom-0 left-0 -mb-8 z-20 ml-12">
                <div class="w-32">
                    <img src="/images/profile.jpg" alt="user profile image"
                         class="object-cover w-32 h-32 border-4 border-gray-200 rounded-full shadow-lg">
                </div>
                <p class="text-2xl text-gray-100 ml-4">{{ user.data.attributes.name }}</p>
            </div>
            <div class="absolute flex items-center bottom-0 right-0 mb-4 mr-12 z-20">
                <button v-if="friendButtonText && friendButtonText !== 'Accept'" class="py-1 px-3 rounded bg-gray-400"
                        @click="$store.dispatch('sendFriendRequest', $route.params.userId)">
                    {{ friendButtonText }}
                </button>
                <button v-if="friendButtonText && friendButtonText === 'Accept'" class="mr-2 py-1 px-3 rounded bg-blue-500"
                        @click="$store.dispatch('acceptFriendRequest', $route.params.userId)">
                    Accept
                </button>
                <button v-if="friendButtonText && friendButtonText === 'Accept'" class="py-1 px-3 rounded bg-gray-400"
                        @click="$store.dispatch('ignoreFriendRequest', $route.params.userId)">
                    Ignore
                </button>
            </div>
        </div>
        <div v-if="status.posts === 'loading'">Loading posts...</div>
        <div v-else-if="status.posts === 'success' && posts.length < 1">No posts found. Get started...</div>
        <Post v-else v-for="post in posts.data" :post="post" :key="post.post_id"/>
    </div>
</template>

<script>
import Post from "../../Post";
import {mapGetters} from 'vuex';

export default {
    name: "Show",
    components: {Post},

    mounted() {
        this.$store.dispatch('fetchUser', this.$route.params.userId);
        this.$store.dispatch('fetchUserPosts', this.$route.params.userId);
    },
    computed: {
        ...mapGetters({
            user: 'user',
            posts: 'posts',
            status: 'status',
            friendButtonText: 'friendButtonText',
        })
    }
}
</script>

<style scoped>

</style>
