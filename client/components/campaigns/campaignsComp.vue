<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div>
        <div class="card-columns" style="column-count: 5;">
            <div v-for="campaign in campaigns" :key="campaign._id" class="card text-center"
                style="border-radius: 20px;">
                <div class="card-body">
                    <h5 class="card-title">{{ campaign.name }}</h5>
                    <hr style="width: 100%">
                    <p class="card-text">{{ campaign.description }}</p>
                    <p class="card-text campaign-button">
                        <button class="detail">Detayları göster</button>
                    </p>
                </div>
                <div class="card-footer text-muted">
                    <p class="card-text"><small><strong>Kategorisi: </strong>{{ campaign.category.name }}</small></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
        campaigns() {
            return this.$store.getters.getSubscribedCampaigns;
        },
    },
};
</script>

<style scoped>
.campaign-button button {
    padding: 0.5em;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    border: none;
}

.campaign-button button.detail {
    background: #ffdcc4;
    color: #ff6a00;
}

.campaign-button button.detail:hover {
    background-color: #ff6a00;
    color: #ffdbc1;
}
</style>
