<template>
    <div id="main">
        <AddCategory/>
    </div>
</template>

<script>
import AddCategory from '@/components/admin/AddCategory.vue';

export default {
    name: 'AdminPage',
    components: {
        AddCategory
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