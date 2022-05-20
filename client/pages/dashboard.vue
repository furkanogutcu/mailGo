<template>
    <div>
        <div class="row">
            <div class="col-8">
                <PageTitle :title="'Panel'" :subtitle="'Aboneliğiniz hakkındaki tüm detayları görüntüleyin'">
                </PageTitle>
            </div>
            <div class="col-4">
                <h4>Tarih seçici</h4>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-8">
                <SummaryComp></SummaryComp>
                <ChartComp class="mt-5"></ChartComp>
            </div>
            <div class="col-4">
                <SubscribedCategoriesComp></SubscribedCategoriesComp>
            </div>
        </div>
    </div>
</template>

<script>
import SummaryComp from '../components/dashboard/summaryComp.vue';
import PageTitle from '~/components/pageTitle.vue';
import SubscribedCategoriesComp from '~/components/dashboard/subscribedCategoriesComp.vue';
import ChartComp from '~/components/dashboard/chartComp.vue';
export default {
    components: { PageTitle, SummaryComp, SubscribedCategoriesComp, ChartComp },
    data() {
        return {};
    },
    async fetch() {
        if (this.$store.getters.getSubscriber._id === '') {
            await this.$store.dispatch('fetchSubscriber');
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
        this.$store.dispatch('changePage', 1);
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
