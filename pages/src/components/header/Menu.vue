<template>
    <div class="post-list">
        <h4>게시글 목록</h4>
        <nav>
            <ul class="categories">
                <li v-for="(category, index) in menuList" :key="category.title">
                    <div @click="toggle(index)">{{ category.title }}</div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <ul class="posts" :class="{ active: activeCategories[index] }">
                            <li v-for="post in category.posts" :key="post.id">
                                <a :href="`/posts/${post.id}`">{{ post.title }}</a>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue';

export default {
    name: 'menuList',
    setup() {
        const menuList = ref([]);
        const activeCategories = ref([]);

        onMounted(() => {
            let url = '/api/post/categories';
            axios.get(url)
                .then(response => {
                    menuList.value = response.data;
                })
                .catch(err => {
                    console.log(err);
                })
        });

        const toggle = (index) => {
            // 현재 인덱스의 상태를 반전시킴
            activeCategories.value[index] = !activeCategories.value[index];
        }

        return {
            menuList,
            toggle,
            activeCategories
        }
    }
}
</script>

<style>
    .posts {
        max-height: 0; /* 초기에는 높이 0으로 설정 */
        overflow: hidden; /* 넘치는 내용 숨김 */
        transition: max-height 0.3s ease-out; /* 부드러운 애니메이션 효과 */
    }

    .posts.active {
        max-height: 1000px; /* 필요한 최대 높이 설정, 높이를 충분히 크게 설정하여 내부 내용 모두 보이도록 함 */
    }

    .posts > li, .categories > li {
        list-style-type: none; /* li 태그의 마커 제거 */
        padding: 0; /* 기본 패딩 제거 */
        margin: 0; /* 기본 마진 제거 */
    }

    .posts > li > a {
        text-decoration: none;
        margin-left: 3vh;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
    }

    .posts > li > a:hover{
        color: skyblue;
    }

    .categories > li > div {
        color: white;
        font-size: 15px;
        margin-top: 6px;
        cursor: pointer;
    }

    .categories > li > div:hover {
        color: skyblue;
    }

    .post-list {
        margin-top: 30%;
        text-align: right;
    }

    .post-list > h4 {
        text-align: center;
        margin-bottom: 10%;
        color: white;
        border-bottom: 1px solid white;
    }
</style>
