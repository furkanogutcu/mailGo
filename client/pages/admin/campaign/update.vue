<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Kampanya düzenle'"
                    :subtitle="campaign.name == '' ? '' : campaign.name + ' kampanyasını düzenle'">
                </PageTitle>
            </div>
        </div>

        <div class="campaign-update-box">
            <div class="form-group">
                <label for="campaignName">Kampanya Adı</label>
                <input type="text" class="form-control" id="campaignName" v-model="updatedCampaign.name">
            </div>
            <div class="form-group">
                <label for="campaignLink">Kampanya Linki</label>
                <input type="text" class="form-control" id="campaignLink" v-model="updatedCampaign.targetLink">
            </div>
            <!--Kampanya kategorisi-->
            <div class="form-group">
                <label for="campaignCategory">Kampanya Kategorisi</label>
                <select class="form-control" id="campaignCategory" v-model="updatedCampaign.category">
                    <option v-for="category in categories" :value="category._id" :key="category._id"
                        :selected="category._id == campaign.category._id">{{ category.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="campaignDescription">Kampanya Açıklaması</label>
                <textarea class="form-control" id="campaignDescription" v-model="updatedCampaign.description"
                    rows="3"></textarea>
            </div>
            <button @click="updateCampaign(updatedCampaign)" class="btn btn-primary"
                :disabled="buttonDisabled">Güncelle</button>
        </div>
    </div>
</template>

<script>
import { updateValidation } from '../../../validations/campaign.js';
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
            updatedCampaign: {
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
    // FIXME
    async created() {
        if (this.$store.getters.getCampaigns.length === 0) {
            await this.$store.dispatch('fetchCampaigns');
        }
        if (this.$store.getters.getCategories.length === 0) {
            await this.$store.dispatch('fetchCategories');
        }
        this.campaign = this.$store.getters.getCampaigns.find(campaign => campaign._id === this.$route.query.id);
        if (this.campaign) {
            this.updatedCampaign = {
                _id: this.campaign._id,
                name: this.campaign.name,
                description: this.campaign.description,
                targetLink: this.campaign.targetLink,
                category: this.campaign.category._id
            };
        } else {
            this.$router.push('/admin/campaign-management');
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
        async updateCampaign(campaign) {
            if (campaign.name === this.campaign.name &&
                campaign.description === this.campaign.description &&
                campaign.targetLink === this.campaign.targetLink &&
                campaign.category === this.campaign.category._id) {
                return this.$toast.error('Herhangi bir şey güncellemediniz');
            }
            const validationResult = validate(campaign, updateValidation);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.buttonDisabled = true;
                const response = await this.$axios.post('campaign/update', campaign);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.$toast.success('Kampanya başarıyla güncellendi!');
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
.campaign-update-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
