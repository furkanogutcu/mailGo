<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kampanya Detayları'"
                    :subtitle="campaign.name == '' ? '' : campaign.name + ' kampanya detayları'">
                </PageTitle>
            </div>
        </div>

        <div class="campaign-details-box">
            <div>
                <h5>Kampanya adı:</h5>
                <hr width="100%">
                <p>{{ campaign.name }}</p>
            </div>
            <div class="mt-5">
                <h5>Kampanya açıklaması:</h5>
                <hr width="100%">
                <p>{{ campaign.description }}</p>
            </div>
            <div class="mt-5">
                <h5>Kampanya kategorisi:</h5>
                <hr width="100%">
                <p>{{ campaign.category.name }}</p>
            </div>
            <div class="mt-3">
                <hr width="100%">
                <a :href="(campaign.targetLink.includes('https') || campaign.targetLink.includes('http')) ? campaign.targetLink : 'https://' + campaign.targetLink"
                    class="btn btn-primary">Kampanyaya git</a>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    data() {
        return {
            campaign: {
                name: '',
                description: '',
                targetLink: '',
                category: '',
            },
        };
    },
    // FIXME
    async created() {
        await this.$store.dispatch('fetchCampaigns');
        this.campaign = this.$store.getters.getCampaigns.find(campaign => campaign._id === this.$route.query.id);
        if (!this.campaign) {
            this.$router.push('/dashboard');
            this.$toast.error('Kampanya bulunamadı');
        }
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
.campaign-details-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
