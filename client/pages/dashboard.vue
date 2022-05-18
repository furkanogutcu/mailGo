<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        user() {
            if (!this.$store.getters.user) {
                this.$store.dispatch('setUser');
            }
            return this.$store.getters.user;
        },
        activePage() {
            return this.$store.getters.activePage;
        },
    },
    mounted() {
        // FIXME - Ekranı ortalamak için
        document.body.style.display = 'block';
        document.body.style['justify-content'] = 'default';
        document.body.style['align-items'] = 'default';
        document.body.style.height = '100vh';
        document.body.style['overflow-x'] = 'hidden';
        document.body.style['overflow-y'] = 'hidden';
    },
};
</script>

<style scoped>
</style>
