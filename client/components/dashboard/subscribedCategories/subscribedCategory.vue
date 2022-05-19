<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<!-- <h3>{{ data.category.name }}</h3>
<h3>{{ data.category.createdAt }}</h3>
<h3>{{ data.subscriptionDate }}</h3> -->

<template>
    <div class="subscribed-category">
        <div class="row category d-block text-center">
            <h4 class="d-block" style="color: #551fff">{{ data.category.name }}</h4>
            <span class="d-block" style="color:#a287fa"><b>Abonelik tarihi:</b> {{ showDate(data.subscriptionDate)
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
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}

.subscribed-category .category {
    background-color: #ded3ff;
    padding: 20px;
    border-radius: 10px;
}
</style>
