<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
    </div>
</template>

<script>
export default {
    props: ['title', 'subtitle'],
};
</script>

<style scoped>
</style>
