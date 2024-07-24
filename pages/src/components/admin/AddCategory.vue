<template>
    <div>
        <form @submit.prevent="addCategory">
            <div class="input-group mb-3">
                <h3>카테고리 추가</h3>
                <input v-model="title" type="category" class="form-control" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="submit">확인</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'AddCategory',
    setup() {
        const router = useRouter();
        const title = ref('')

        const addCategory = async () => {
            try {
                const response = await axios.post('/api/admin/add/category', {title: title.value });

                if (response.status === 200) {
                    alert('카테고리 등록이 완료되었습니다.');
                    router.push('/admin');
                }
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    alert('카테고리 업로드 도중 문제가 발생했습니다.');
                }
            }
        };

        return {
            title,
            addCategory
        }
    }
}

</script>