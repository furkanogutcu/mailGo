<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kategori Yönetim'" :subtitle="'Sistemdeki kategorileri yönetin'">
                </PageTitle>
            </div>
            <div class="col-2  d-flex justify-content-end align-items-end">
                <button class="mb-4 add-button" @click="$router.push('/admin/category/add')">
                    <b-icon icon="plus-circle-fill" aria-hidden="true">
                    </b-icon>
                    Yeni kategori ekle
                </button>
            </div>
        </div>

        <div class="category-management-box">
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kategori Adı</th>
                        <th scope="col">Kategori Açıklaması</th>
                        <th scope="col">Oluşturulma Tarihi</th>
                        <th scope="col">Son Güncelleme Tarihi</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="category-table">
                    <tr v-for="(category, index) in categories" :key="category._id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ category.name }}</td>
                        <td>{{ category.description || '-' }}</td>
                        <td>{{ new Date(category.createdAt).toLocaleString() }}</td>
                        <td>{{ new Date(category.updatedAt).toLocaleString() }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary  btn-block"
                                @click="$router.push({ path: '/admin/category/update', query: { id: category._id } })">
                                Düzenle
                            </button>
                            <button class="btn btn-sm btn-danger  btn-block" @click="deleteCategory(category)">
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
        await this.$store.dispatch('fetchCategories');
    },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
        activePage() {
            return this.$store.getters.activePage;
        },
        categories() {
            return this.$store.getters.getCategories;
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
    methods: {
        async deleteCategory(category) {
            const confirmResult = confirm(category.name + ' kategorisini gerçekten silmek istiyor musunuz?');
            if (confirmResult) {
                const result = await this.$axios.post('category/delete', {
                    _id: category._id,
                });
                if (result.data.success) {
                    await this.$store.dispatch('fetchCategories');
                    this.$toast.success('Kategori başarıyla silindi!');
                } else {
                    this.$toast.error('Kategori silinirken bir hata oluştu!');
                }
            }
        },
    },
};
</script>

<style scoped>
.category-management-box {
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

.category-table td {
    vertical-align: middle;
}

.category-table th {
    vertical-align: middle;
}
</style>
