<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Abone Yönetim'" :subtitle="'Sistemdeki aboneleri yönetin'">
                </PageTitle>
            </div>
            <div class="col-2  d-flex justify-content-end align-items-end">
                <button class="mb-4 add-button" @click="$router.push('/admin/subscriber/add')">
                    <b-icon icon="plus-circle-fill" aria-hidden="true">
                    </b-icon>
                    Yeni abone ekle
                </button>
            </div>
        </div>

        <div class="subscriber-management-box">
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ad</th>
                        <th scope="col">Soyad</th>
                        <th scope="col">Email</th>
                        <th scope="col">Kampanya tıklama</th>
                        <th scope="col">Gönderilen Email</th>
                        <th scope="col">Kayıt tarihi</th>
                        <th scope="col">Son güncelleme tarihi</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="subscriber-table">
                    <tr v-for="(subscriber, index) in subscribers" :key="subscriber._id">
                        <th class="text-break" scope="row">{{ index + 1 }}</th>
                        <td class="text-break">{{ subscriber.firstName.toUpperCase() }}</td>
                        <td class="text-break">{{ subscriber.lastName.toUpperCase() }}</td>
                        <td class="text-break">{{ subscriber.email }}</td>
                        <td class="text-break">{{ subscriber.analysis.totalCampaignClicks }}</td>
                        <td class="text-break">{{ subscriber.analysis.totalNumberOfEmailSent }}</td>
                        <td class="text-break">{{ new Date(subscriber.createdAt).toLocaleString() }}</td>
                        <td class="text-break">{{ new Date(subscriber.updatedAt).toLocaleString() }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary  btn-block"
                                @click="$router.push({ path: '/admin/subscriber/update', query: { id: subscriber._id } })">
                                Düzenle
                            </button>
                            <button class="btn btn-sm btn-danger  btn-block" @click="deleteSubscriber(subscriber)">
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
        await this.$store.dispatch('fetchAllSubscribers');
    },
    computed: {
        subscribers() {
            return this.$store.getters.getAllSubscribers;
        },
    },
    created() {
        this.$store.dispatch('changePage', 7);
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
        async deleteSubscriber(subscriber) {
            const confirmResult = confirm(subscriber.fullName + ' abonesini gerçekten silmek istiyor musunuz?');
            if (confirmResult) {
                const result = await this.$axios.post('subscriber/delete', {
                    _id: subscriber._id,
                });
                if (result.data.success) {
                    await this.$store.dispatch('fetchAllSubscribers');
                    this.$toast.success('Abone başarıyla silindi!');
                } else {
                    this.$toast.error('Abone silinirken bir hata oluştu!');
                }
            }
        },
    },
};
</script>

<style scoped>
.subscriber-management-box {
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

.subscriber-table td {
    vertical-align: middle;
}

.subscriber-table th {
    vertical-align: middle;
}
</style>
