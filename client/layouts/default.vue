<template>
    <div>
        <div class="row" v-if="!whiteList.includes($route.path)">
            <div class="col-2 global-menu">
                <MenuComp></MenuComp>
            </div>
            <div class="col-10 global-content">
                <Nuxt />
            </div>
        </div>
        <Nuxt v-if="whiteList.includes($route.path)" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            whiteList: ['/login', '/register', '/'],
        };
    },
};
</script>

<style>
.global-menu {
    background: #f8f9fc;
    height: 100vh;
}

.global-content {
    background: #efeff1;
    padding: 3rem;
}
</style>
