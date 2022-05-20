<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kategori düzenle'"
                    :subtitle="category.name == '' ? '' : category.name + ' kategorisini düzenle'">
                </PageTitle>
            </div>
        </div>

        <div class="category-update-box">
            <div class="form-group">
                <label for="categoryName">Kategori Adı</label>
                <input type="text" class="form-control" id="categoryName" v-model="updatedCategory.name">
            </div>
            <div class="form-group">
                <label for="categoryDescription">Kategori Açıklaması</label>
                <textarea class="form-control" id="categoryDescription" v-model="updatedCategory.description"
                    rows="3"></textarea>
            </div>
            <button @click="updateCategory(updatedCategory)" class="btn btn-primary"
                :disabled="buttonDisabled">Güncelle</button>
        </div>
    </div>
</template>

<script>
import { updateValidation } from '../../../validations/category.js';
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
            updatedCategory: {
                name: '',
                description: ''
            },
            buttonDisabled: false
        };
    },
    // FIXME
    async created() {
        if (this.$store.getters.getCategories.length === 0) {
            await this.$store.dispatch('getCategories');
        }
        this.category = this.$store.getters.getCategories.find(category => category._id === this.$route.query.id);
        if (this.category) {
            this.updatedCategory = {
                _id: this.category._id,
                name: this.category.name,
                description: this.category.description
            };
        } else {
            this.$router.push('/admin/category-management');
            this.$toast.error('Kategori bulunamadı');
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
        async updateCategory(category) {
            if (category.name === this.category.name && category.description === this.category.description) {
                return this.$toast.error('Herhangi bir şey güncellemediniz');
            }
            const validationResult = validate(category, updateValidation);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.buttonDisabled = true;
                const response = await this.$axios.post('category/update', category);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.$toast.success('Kategori başarıyla güncellendi!');
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
.category-update-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
