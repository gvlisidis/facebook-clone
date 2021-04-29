<template>
    <div class="flex flex-col items-center">
        <div class="relative mb-8">
            <div class="w-100 h-64 overflow-hidden z-10">
                <img src="https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_1280.jpg" alt=""
                     class="object-cover w-full">
            </div>

            <div v-if="!userLoading" class="absolute flex items-center bottom-0 left-0 -mb-8 z-20 ml-12">
                <div class="w-32">
                    <img src="/images/profile.jpg" alt="user profile image" class="object-cover w-32 h-32 border-4 border-gray-200 rounded-full shadow-lg">
                </div>
                <p class="text-2xl text-gray-100 ml-4">{{user.data.attributes.name}}</p>
            </div>
        </div>
        <p v-if="postLoading">Loading posts...</p>
        <Post v-else v-for="post in posts.data" :post="post" :key="post.post_id"/>
        <p v-if="!postLoading && posts.data.length < 1">No posts found. Get started...</p>
    </div>
</template>

<script>
import Post from "../../Post";

export default {
    name: "Show",
    components: {Post},
    data() {
        return {
            user: null,
            posts: null,
            userLoading: true,
            postLoading: true,
        }
    },

    mounted() {
        axios.get('/api/users/' + this.$route.params.userId)
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                console.log('Unable to fetch the user from the server.')
            })
            .finally(() => {
                this.userLoading = false;
            });

        axios.get('/api/users/' + this.$route.params.userId + '/posts')
            .then(response => {
                this.posts = response.data;
            })
            .catch(error => {
                console.log('Unable to fetch posts.');
            })
            .finally(() => {
                this.postLoading = false;
            });
    }
}
</script>

<style scoped>

</style>
