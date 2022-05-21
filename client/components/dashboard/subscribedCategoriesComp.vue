<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="subscribed-categories">
        <div class="row text-center d-flex justify-content-center">
            <h3 style="white-space: pre-line; color: #551fff">Abonesi olduğum
                kategoriler
            </h3>
        </div>
        <hr width=" 100%" color="d0d2da" />
        <div style="overflow-y: auto; height: 60vh;">
            <SubscribedCategory v-for="data in subscriber.subscribedCategories" :data="data" :key="data._id">
            </SubscribedCategory>
        </div>
    </div>
</template>

<script>
import SubscribedCategory from './subscribedCategories/subscribedCategory.vue';
export default {
    components: { SubscribedCategory },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
    }
};
</script>

<style scoped>
.subscribed-categories {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
