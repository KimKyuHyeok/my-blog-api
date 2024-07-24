<template>
    <div id="main">
        <div id="password">
            <h1>관리자 페이지</h1>
            <PasswordInput/>
        </div>
    </div>
</template>

<script>
import PasswordInput from '@/components/PasswordInput';

export default {
    name: 'PasswordConfirm',
    components: {
        PasswordInput
    }
}
</script>

<style>

#main {
    flex-direction: column;
}

#password > h1 {
    margin-bottom: 30%;
}
</style>