<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="chart">
        <h1>GRAFİK ALANI</h1>
    </div>
</template>

<script>
export default {
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
    },
};
</script>

<style scoped>
.chart {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
