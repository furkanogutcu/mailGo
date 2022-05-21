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

        <div class="row">
            <div class="col-4">
                <div class="campaign-details-box">
                    <div class="details-logo text-center">
                        <svg class="mr-3" version="1.0" xmlns="http://www.w3.org/2000/svg" width="200"
                            viewBox="0 0 344 344" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0,344) scale(0.1,-0.1)" fill="#ff6a00" stroke="none">
                                <path d="M278 2891 c-72 -23 -113 -49 -164 -103 -55 -57 -80 -102 -99 -173-13 -51 -15 -175 -15 -895 0 -908 -1 -899 56 -996 37 -63 125 -139 192 -166
                            l57 -23 1415 0 1415 0 57 23 c67 27 155 103 192 166 57 97 56 88 56 996 0 908
                            1 899 -56 996 -37 63 -125 139 -192 166 l-57 23 -1400 2 c-1329 2 -1403 1
                            -1457 -16z m730 -844 l712 -385 723 390 c897 484 876 473 851 451 -11 -10
                            -237 -187 -502 -392 l-481 -375 322 -328 c372 -379 517 -534 467 -497 -152
                            111 -969 689 -974 689 -4 0 -95 -56 -202 -125 -107 -69 -198 -125 -204 -125
                            -5 0 -94 55 -197 121 -104 67 -193 124 -200 126 -9 3 -756 -519 -1003 -701
                            -31 -23 175 194 487 512 l322 329 -481 374 c-265 206 -491 382 -502 392 -26
                            23 -10 14 862 -456z" />
                            </g>
                        </svg>
                        <h1 style="font-weight:400;">
                            mailGo</h1>
                    </div>
                </div>
            </div>
            <div class="col text-center">
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
                    <div class="mt-3 campaign-details-button">
                        <hr width="100%">
                        <button @click="goCampaign(campaign)" class="go-campaign">Kampanyaya git</button>
                    </div>
                </div>
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
        if (this.$store.getters.getCampaigns.length === 0) {
            await this.$store.dispatch('fetchCampaigns');
        }
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
    methods: {
        async goCampaign(campaign) {
            // Kampanya tıklama sayısını arttır
            await this.$store.dispatch('increaseCampaignClick', campaign._id);
            // Kampanya hedef linkinde http veya https var mı kontrol et ve yönlendir
            if (campaign.targetLink.includes('http://') || campaign.targetLink.includes('https://')) {
                window.location.href = campaign.targetLink;
            } else {
                window.location.href = 'http://' + campaign.targetLink;
            }
        },
    }
};
</script>

<style scoped>
.campaign-details-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}

.campaign-details-box .details-logo {
    border: #ff6a00 solid 1px;
    border-radius: 10px;
    margin: 10px;
    padding: 30px;
}

.campaign-details-button button.go-campaign {
    padding: 1em;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    border: none;
    background: #ffdbc1;
    color: #ff6a00;
}

.campaign-details-button button.go-campaign:hover {
    background-color: #ff6a00;
    color: #ffdbc1;
}
</style>
