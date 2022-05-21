<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<template>
    <div class="subscribed-category">
        <div class="row category d-block text-center">
            <h5 class="d-block" style="color: #551fff">{{ data.category.name }}</h5>
            <span class="d-block" style="color:#a287fa; font-size: 12px;"><b>Abonelik tarihi:</b> {{
                    showDate(data.subscriptionDate)
            }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data', 'color'],
    methods: {
        showDate(date) {
            const dateObj = new Date(date);
            return dateObj.toLocaleDateString();
        },
    }
};
</script>

<style scoped>
.subscribed-category {
    padding-left: 60px;
    padding-right: 60px;
    padding-bottom: 20px;
}

.subscribed-category .category {
    background-color: #ddf4ff;
    padding: 20px;
    border-radius: 20px;
}
</style>
