<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="summary-unit">
        <div class="row">
            <div class="col-3">
                <div class="icon-box d-flex justify-content-center align-items-center"
                    :style="{ 'background-color': '#' + background_color }">
                    <b-icon :icon="icon" font-scale="1.5" aria-hidden="true" :style="{ 'color': '#' + icon_color }">
                    </b-icon>
                </div>
            </div>
            <div class="col-9">
                <p style="font-weight:bold; font-size: 14px;">{{ title }}</p>
                <h5 style="margin-top:-8px">{{ data }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['icon', 'icon_color', 'background_color', 'title', 'data'],
};
</script>

<style scoped>
.summary-unit {
    width: 270px;
}

.summary-unit .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 18px;
}
</style>
