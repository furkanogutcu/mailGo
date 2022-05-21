// https://gist.github.com/WesThorburn/7bcc930e9b48e002be67de4a00cc9420
// https://stackoverflow.com/questions/66940954/why-does-nuxt-give-me-this-error-with-vue-chartjs

import Vue from 'vue';
import { Line } from 'vue-chartjs';

Vue.component('line-chart', {
    extends: Line,
    props: ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options);
    }
});
