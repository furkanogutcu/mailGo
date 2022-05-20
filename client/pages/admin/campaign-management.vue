<!-- eslint-disable vue/max-attributes-per-line -->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kampanya Yönetim'" :subtitle="'Sistemdeki kampanyaları yönetin'">
                </PageTitle>
            </div>
            <div class="col-2  d-flex justify-content-end align-items-end">
                <button class="mb-4 add-button" @click="$router.push('/admin/campaign/add')">
                    <b-icon icon="plus-circle-fill" aria-hidden="true">
                    </b-icon>
                    Yeni kampanya ekle
                </button>
            </div>
        </div>

        <div class="campaign-management-box">
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kampanya Adı</th>
                        <th scope="col">Kampanya Açıklaması</th>
                        <th scope="col">Kategorisi</th>
                        <th scope="col">Toplam Gönderim</th>
                        <th scope="col">Toplam Tıklama</th>
                        <th scope="col">Toplam Email Tıklama</th>
                        <th scope="col">Oluşturulma Tarihi</th>
                        <th scope="col">Son Güncelleme Tarihi</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="campaign-table">
                    <tr v-for="(campaign, index) in campaigns" :key="campaign._id">
                        <th class="text-break" scope="row">{{ index + 1 }}</th>
                        <td class="text-break">{{ campaign.name }}</td>
                        <td class="text-break">{{ campaign.description || '-' }}</td>
                        <td class="text-break">{{ campaign.category.name || '-' }}</td>
                        <td class="text-break">{{ campaign.totalSent }}</td>
                        <td class="text-break">{{ campaign.totalClicks }}</td>
                        <td class="text-break">{{ campaign.emailClicks }}</td>
                        <td class="text-break">{{ new Date(campaign.createdAt).toLocaleString() }}</td>
                        <td class="text-break">{{ new Date(campaign.updatedAt).toLocaleString() }}</td>
                        <td>
                            <button class="btn btn-sm btn-warning btn-block">
                                Mail Listesini Al
                            </button>
                            <button class="btn btn-sm btn-primary btn-block"
                                @click="$router.push({ path: '/admin/campaign/update', query: { id: campaign._id } })">
                                Düzenle
                            </button>
                            <button class="btn btn-sm btn-danger btn-block" @click="deleteCampaign(campaign)">
                                Sil
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
    async fetch() {
        await this.$store.dispatch('fetchSubscriber');
        await this.$store.dispatch('fetchCampaigns');
    },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
        campaigns() {
            return this.$store.getters.getCampaigns;
        },
    },
    created() {
        this.$store.dispatch('changePage', 5);
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
        async deleteCampaign(campaign) {
            const confirmResult = confirm(campaign.name + ' kampanyasını gerçekten silmek istiyor musunuz?');
            if (confirmResult) {
                const result = await this.$axios.post('campaign/delete', {
                    _id: campaign._id,
                });
                if (result.data.success) {
                    await this.$store.dispatch('fetchCampaigns');
                    this.$toast.success('Kampanya başarıyla silindi!');
                } else {
                    this.$toast.error('Kampanya silinirken bir hata oluştu!');
                }
            }
        },
    },
};
</script>

<style scoped>
.campaign-management-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}

button.add-button {
    padding: 1em;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    border: none;
    background: #41c20e;
    color: #ffffff;
}

button.add-button:hover {
    background-color: #34990d;
    color: #ffffff;
}

.campaign-table td {
    vertical-align: middle;
}

.campaign-table th {
    vertical-align: middle;
}
</style>
