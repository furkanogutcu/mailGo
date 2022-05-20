<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kategori ekle'" :subtitle="'Yeni bir kategori ekleyin'">
                </PageTitle>
            </div>
        </div>

        <div class="category-add-box">
            <div class="form-group">
                <label for="categoryName">Kategori Adı</label>
                <input type="text" class="form-control" id="categoryName" v-model="category.name"
                    placeholder="Kategori adını giriniz">
            </div>
            <div class="form-group">
                <label for="categoryDescription">Kategori Açıklaması</label>
                <textarea class="form-control" id="categoryDescription" v-model="category.description" rows="3"
                    placeholder="Kategori açıklamasını giriniz"></textarea>
            </div>
            <button @click="addCategory(category)" class="btn btn-primary" :disabled="buttonDisabled">Kaydet</button>
        </div>
    </div>
</template>

<script>
import { addValidation } from '../../../validations/category.js';
import { validate } from '../../../utilities/validator.js';
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
    data() {
        return {
            category: {
                name: '',
                description: ''
            },
            buttonDisabled: false
        };
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
        async addCategory(category) {
            const validationResult = validate(category, addValidation);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.buttonDisabled = true;
                const response = await this.$axios.post('category/add', category);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.$toast.success('Kategori başarıyla eklendi!');
                this.$router.push('/admin/category-management');
                this.buttonDisabled = false;
            } catch (err) {
                const errorMessage = err?.response?.data?.error?.message || err.message;
                this.$toast.error(errorMessage);
                this.buttonDisabled = false;
            }
        }
    },
};
</script>

<style scoped>
.category-add-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
