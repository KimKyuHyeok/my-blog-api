<template>
    <div class="post">
        <h1>{{ PostInfo.title }}</h1>
        <p v-html="PostInfo.content"></p>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router';

export default {
    name: 'PostInfo',
    setup () {
        const route = useRoute();
        const postId = route.params.id;

        const PostInfo = reactive ({
            title: '',
            content: ''
        })

        onMounted(() => {
            let url = `/api/post/${postId}`;
            axios.get(url)
                .then(response => {
                    PostInfo.title = response.data.title;
                    PostInfo.content = response.data.content;
                })
                .catch(err => {
                    console.log("ERROR : ", err);
                })
        });
        

        return {
            PostInfo
        }
    }
}

</script>

<style>
.post > h1 {
    margin-bottom: 8%;
    text-align: center;
}

.post > p {
    text-align: start;
}

.image {
    text-align: center;
}
</style>