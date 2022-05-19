<template>
    <div>
        <PageTitle :title="'Profil'" :subtitle="'Profilinizi yönetin'">
        </PageTitle>
    </div>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    data() {
        return {};
    },
    async fetch() {
        await this.$store.dispatch('fetchSubscriber');
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
        this.$store.dispatch('changePage', 2);
    },
    mounted() {
        // FIXME - Ekran ortalamasını düzeltmek için
        document.body.style.display = 'block';
        document.body.style['justify-content'] = 'default';
        document.body.style['align-items'] = 'default';
        document.body.style.height = '100vh';
    }
};
</script>

<style scoped>
</style>
