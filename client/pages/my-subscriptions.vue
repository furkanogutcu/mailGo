<template>
    <div>
        <PageTitle :title="'Aboneliklerim'" :subtitle="'Kategori aboneliklerinizi yönetin'">
        </PageTitle>
        <CategoriesComp></CategoriesComp>
    </div>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
import CategoriesComp from '~/components/my-subscriptions/categoriesComp.vue';
export default {
    components: { PageTitle, CategoriesComp },
    data() {
        return {};
    },
    async fetch() {
        if (this.$store.getters.getSubscriber._id === '') {
            await this.$store.dispatch('fetchSubscriber');
        }
        if (this.$store.getters.getCategories.length === 0) {
            await this.$store.dispatch('fetchCategories');
        }
    },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
        activePage() {
            return this.$store.getters.activePage;
        },
    },
    created() {
        this.$store.dispatch('changePage', 4);
    },
    mounted() {
        // FIXME - Ekran ortalamasını düzeltmek için
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
