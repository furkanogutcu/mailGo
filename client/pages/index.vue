<template>
    <div>
        <div class="box">
            <LogoNameComp :color="'ffffff'" :size="1"></LogoNameComp>
            <hr width="100%" color="white" />
            <button class="mb-3" @click="$router.push('login')">Giriş Yap</button>
            <button @click="$router.push('register')">Kayıt Ol</button>
        </div>
    </div>
</template>

<script>
import LogoNameComp from '../components/logoNameComp.vue';
export default {
    auth: false,
    components: { LogoNameComp },
    data() {
        return {};
    },
    mounted() {
        // FIXME - Ekranı ortalamak için
        document.body.style.display = 'flex';
        document.body.style['justify-content'] = 'center';
        document.body.style['align-items'] = 'center';
        document.body.style.height = '100vh';
    }
};
</script>

<style scoped>
.box {
    background: #551fff;
    padding: 2em;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    box-shadow: 0 0 2em #000000;
    width: 330px;
}

.box button {
    padding: 1em;
    background: #00b7fe;
    color: white;
    border: none;
    border-radius: 15px;
    font-weight: 500;
    margin-right: 20px;
    margin-left: 20px;
}
</style>
