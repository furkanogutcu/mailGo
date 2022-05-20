<template>
    <div>
        <PageTitle :title="'Kampanyalar'" :subtitle="'Abone olduğunuz kategorilerdeki tüm kampanyaları inceleyin'">
        </PageTitle>
        <CampaignComp class="mt-5"></CampaignComp>
    </div>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
import CampaignComp from '~/components/campaigns/campaignsComp.vue';
export default {
    components: { PageTitle, CampaignComp },
    data() {
        return {};
    },
    async fetch() {
        await this.$store.dispatch('fetchSubscriber');
        await this.$store.dispatch('fetchCampaigns');
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
        this.$store.dispatch('changePage', 3);
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
