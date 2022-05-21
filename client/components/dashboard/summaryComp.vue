<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="summary">
        <div class="row">
            <div class="col">
                <SummaryUnit :icon="'list-check'" :icon_color="'ff6a00'" :background_color="'fff7f0'"
                    :title="'Abonesi olduğum kategoriler'" :data="subscriber.subscribedCategories.length">
                </SummaryUnit>
            </div>
            <div class="col">
                <SummaryUnit :icon="'envelope-fill'" :icon_color="'00b7fe'" :background_color="'f1fbff'"
                    :title="'Toplam alınan e-posta'" :data="subscriber.analysis.totalNumberOfEmailSent">
                </SummaryUnit>
            </div>
            <div class="col">
                <SummaryUnit :icon="'hand-index-fill'" :icon_color="'551fff'" :background_color="'f3f0ff'"
                    :title="'Toplam kampanya tıklama'" :data="subscriber.analysis.totalCampaignClicks"></SummaryUnit>
            </div>
        </div>
    </div>
</template>

<script>
import SummaryUnit from './summary/summaryUnit.vue';
export default {
    components: { SummaryUnit },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
    },
};
</script>

<style scoped>
.summary {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
