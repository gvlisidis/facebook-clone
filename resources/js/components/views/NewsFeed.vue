<template>
    <div class="flex flex-col items-center py-4">
        <NewPost/>

        <p v-if="loading">Loading posts...</p>
        <Post v-else v-for="post in posts.data" :post="post" :key="post.post_id"/>
    </div>
</template>

<script>
import NewPost from "../NewPost";
import Post from "../Post";

export default {
    name: "NewsFeed",

    components: {
        NewPost,
        Post
    },

    data() {
        return {
            posts: [],
            loading: true,
        };
    },

    mounted() {
        axios.get('/api/posts')
            .then(response => {
                this.posts = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.log('Unable to fetch posts.');
                this.loading = false;
            });
    }
}
</script>

<style scoped>

</style>
