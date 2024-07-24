<template>
    <form @submit.prevent="submitPassword">
        <div class="input-group mb-3">
            <!-- v-model을 사용하여 입력 필드와 data 속성을 연결 -->
            <input v-model="password" type="password" class="form-control" placeholder="비밀번호를 입력하세요." aria-label="비밀번호 입력" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="submit">확인</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'PasswordInput',
    setup() {
        const router = useRouter();
        const password = ref('');

        const submitPassword = async () => {
            try {
                const response = await axios.post('/api/password/confirm', { password: password.value });

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    router.push('/admin');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('비밀번호가 일치하지 않습니다.');
                } else {
                    alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        return {
            password,
            submitPassword
        };
    }
};
</script>
