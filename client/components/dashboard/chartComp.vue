<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="chart">
        <client-only>
            <line-chart v-if="isLoaded" :data="chartData" :options="chartOptions" :height="'500vh'"></line-chart>
        </client-only>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoaded: false,
            chartData: null,
            chartOptions: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                maintainAspectRatio: false,
            }
        };
    },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
    },
    async mounted() {
        this.isLoaded = false;
        try {
            if (this.$store.getters.getSubscriber._id === '') {
                await this.$store.dispatch('fetchSubscriber');
            };
            const subscriber = this.$store.getters.getSubscriber;
            this.chartData = {
                datasets: [
                    {
                        label: 'Alınan E-postalar',
                        data: [0, subscriber.analysis.totalNumberOfEmailSent],
                        backgroundColor: 'rgba(0, 183, 254, 0.2)',
                        borderColor: 'rgba(0, 183, 254, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kampanya Tıklamaları',
                        data: [0, subscriber.analysis.totalCampaignClicks],
                        backgroundColor: 'rgba(157, 0, 255, 0.2)',
                        borderColor: 'rgba(120, 0, 255, 1)',
                        borderWidth: 1,
                    },
                ]
            };

            this.isLoaded = true;
        } catch {
        }
    }
};
</script>

<style scoped>
.chart {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
