<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div>
        <div class="d-flex justify-content-end mb-2">
            <h4 class="mr-3">Yalnızca aboneliklerimi göster</h4>
            <label class="switch">

                <input type="checkbox" v-model="getOnlySubscribed">
                <span class="slider round"></span>
            </label>
        </div>
        <div class=" card-columns" style="column-count: 5;">
            <div v-for="category in categories" :key="category._id" class="card text-center"
                style="border-radius: 20px;">
                <div class="card-body">
                    <h5 class="card-title">{{ category.name }}</h5>
                    <hr style="width: 100%">
                    <p class="card-text">{{ category.description }}</p>
                    <p class="card-text category-button">
                        <button @click="unSubscribe(category)" class="unSubscribe"
                            v-if="subscriber.subscribedCategories.some(c => c.category._id == category._id)">
                            Abonelikten Çık</button>
                        <button @click="subscribe(category)" class="subscribe" v-else>Abone ol</button>
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            getOnlySubscribed: false,
        };
    },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
        categories() {
            return this.getOnlySubscribed ? this.subscriber.subscribedCategories.map(c => c.category) : this.$store.getters.getCategories;
        },
    },
    methods: {
        subscribe(category) {
            this.$store.dispatch('subscribeCategory', [category._id]);
        },
        unSubscribe(category) {
            this.$store.dispatch('unSubscribeCategory', [category._id]);
        },
    },
};
</script>

<style scoped>
.category-button button {
    padding: 1em;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    border: none;
}

.category-button button.subscribe {
    background: #ded3ff;
    color: #551fff;
}

.category-button button.unSubscribe {
    background: #ffd3d3;
    color: #fd2254;
}

.category-button button.subscribe:hover {
    background-color: #551fff;
    color: #ded3ff;
}

.category-button button.unSubscribe:hover {
    background-color: #fd2254;
    color: #ffd3d3;
}

/* Toogle Switch Start */
/* https://www.w3schools.com/howto/howto_css_switch.asp */

/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

/* Toogle Switch End */
</style>
