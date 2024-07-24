<template>
    <div class="post">
        <h1>{{ PostInfo.title }}</h1>
        <p v-html="PostInfo.content"></p>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive } from 'vue'

export default {
    name: 'PostInfo',
    setup () {
        const PostInfo = reactive ({
            title: '',
            content: ''
        })

        onMounted(() => {
            let url = 'http://localhost/posts/api/posts';
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

p {
    margin-bottom: 30px;
}

pre {
    margin: 30px 0;
}
</style>