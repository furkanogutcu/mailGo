<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kampanya ekle'" :subtitle="'Yeni bir kampanya ekleyin'">
                </PageTitle>
            </div>
        </div>

        <div class="campaign-add-box">
            <div class="form-group">
                <label for="campaignName">Kampanya Adı</label>
                <input type="text" class="form-control" id="campaignName" v-model="campaign.name"
                    placeholder="Kampanya adını giriniz">
            </div>
            <div class="form-group">
                <label for="campaignLink">Kampanya Linki</label>
                <input type="text" class="form-control" id="campaignLink" v-model="campaign.targetLink"
                    placeholder="Kampanya linkini giriniz">
            </div>
            <!--Kampanya kategorisi-->
            <div class="form-group">
                <label for="campaignCategory">Kampanya Kategorisi</label>
                <select class="form-control" id="campaignCategory" v-model="campaign.category">
                    <option v-for="category in categories" :value="category._id" :key="category._id">{{ category.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="campaignDescription">Kampanya Açıklaması</label>
                <textarea class="form-control" id="campaignDescription" v-model="campaign.description" rows="3"
                    placeholder="Kampanya açıklamasını giriniz"></textarea>
            </div>
            <button @click="addCampaign(campaign)" class="btn btn-primary" :disabled="buttonDisabled">Kaydet</button>
        </div>
    </div>
</template>

<script>
import { addValidation } from '../../../validations/campaign.js';
import { validate } from '../../../utilities/validator.js';
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
    data() {
        return {
            campaign: {
                name: '',
                description: '',
                targetLink: '',
                category: '',
            },
            buttonDisabled: false
        };
    },
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        },
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
        async addCampaign(campaign) {
            console.log(campaign);
            const validationResult = validate(campaign, addValidation);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.buttonDisabled = true;
                const response = await this.$axios.post('campaign/add', campaign);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.campaign.name = '';
                this.campaign.description = '';
                this.$toast.success('Kampanya başarıyla eklendi!');
                this.$router.push('/admin/campaign-management');
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
.campaign-add-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
