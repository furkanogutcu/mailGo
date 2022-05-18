<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div class="menu">
        <div class="logo">
            <LogoNameComp :color="'551fff'" :size="0.8"></LogoNameComp>
        </div>
        <div class="buttons d-flex justify-content-center mt-5">
            <b-button @click="changePage(1)" class="d-flex justify-content-center align-items-center"
                :style="activePage === 1 ? 'background:#ded3ff;' : 'background:#f8f9fc;'">
                <b-icon icon=" speedometer2" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Panelim
            </b-button>
            <b-button @click="changePage(2)" class="d-flex justify-content-center align-items-center"
                :style="activePage == 2 ? 'background:#ded3ff;' : 'background:#f8f9fc;'">
                <b-icon icon="person-fill" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Profilim
            </b-button>
            <b-button @click="changePage(3)" class="d-flex justify-content-center align-items-center" :style="activePage == 3 ? 'background:#ded3ff;' :
            'background:#f8f9fc;'">
                <b-icon icon="bookmark-fill" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Aboneliklerim
            </b-button>
            <hr width="80%" color="d0d2da" />
            <b-button @click="logout" class="d-flex justify-content-center align-items-center" :style="activePage == 4 ? 'background:#ded3ff;' :
            'background:#f8f9fc;'">
                <b-icon icon="gear-fill" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Çıkış Yap
            </b-button>
        </div>
    </div>
</template>

<script>
import LogoNameComp from './logoNameComp.vue';
export default {
    components: { LogoNameComp },
    computed: {
        user() {
            if (!this.$store.getters.user) {
                this.$store.dispatch('setUser');
            }
            return this.$store.getters.user;
        },
        activePage() {
            return this.$store.getters.activePage;
        },
    },
    methods: {
        changePage(pageNumber) {
            this.$store.dispatch('changePage', pageNumber);
        },
        logout() {
            this.$auth.logout();
            this.$store.dispatch('deleteUser');
        },
    },
};
</script>

<style>
.menu .logo {
    padding-top: 20px;
}

.buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3vh;
}

.buttons button {
    padding: 1em;
    background: #ded3ff;
    color: #551fff;
    border: none;
    font-size: 18px;
    border-radius: 30px;
    font-weight: 500;
    width: 70%;
}

.buttons button:hover {
    background-color: #551fff;
    color: #ff6a00;
}

.buttons button:focus {
    border: 0;
    outline: 0;
    box-shadow: none;
    color: #551fff;
}
</style>
