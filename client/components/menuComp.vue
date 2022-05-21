<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div class="menu">
        <div class="logo">
            <LogoNameComp :color="'551fff'" :size="0.8"></LogoNameComp>
        </div>
        <div class="buttons d-flex justify-content-center mt-5">
            <button @click="changePage(1, '/dashboard')" class="d-flex justify-content-center align-items-center"
                :style="activePage === 1 ? 'background:#ded3ff;' : 'background:#f8f9fc;'">
                <b-icon icon=" speedometer2" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Panelim
            </button>
            <button @click="changePage(2, '/campaigns')" class="d-flex justify-content-center align-items-center"
                :style="activePage == 2 ? 'background:#ded3ff;' :
                'background:#f8f9fc;'">
                <b-icon icon="percent" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Kampanyalar
            </button>
            <button @click="changePage(3, '/my-subscriptions')" class="d-flex justify-content-center align-items-center"
                :style="activePage == 3 ? 'background:#ded3ff;' :
                'background:#f8f9fc;'">
                <b-icon icon="bookmark-fill" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Aboneliklerim
            </button>
            <hr width="80%" color="d0d2da" />
            <button v-if="isAdmin()" @click="changePage(4, '/admin/category-management')"
                class="d-flex justify-content-center align-items-center" :style="activePage == 4 ? 'background:#ded3ff;' :
                'background:#f8f9fc;'">
                <b-icon icon="list-ul" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Kategori Yönetim
            </button>
            <button v-if="isAdmin()" @click="changePage(5, '/admin/campaign-management')"
                class="d-flex justify-content-center align-items-center" :style="activePage == 5 ? 'background:#ded3ff;' :
                'background:#f8f9fc;'">
                <b-icon icon="percent" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Kampanya Yönetim
            </button>
            <button v-if="isAdmin()" @click="changePage(6, '/admin/subscriber-management')"
                class="d-flex justify-content-center align-items-center" :style="activePage == 6 ? 'background:#ded3ff;' :
                'background:#f8f9fc;'">
                <b-icon icon="people-fill" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Abone Yönetim
            </button>
            <button @click="logout" class="d-flex justify-content-center align-items-center" :style="activePage == 7 ? 'background:#ded3ff;' :
            'background:#f8f9fc;'">
                <b-icon icon="gear-fill" font-scale="1.5" class="mr-3" aria-hidden="true">
                </b-icon>
                Çıkış Yap
            </button>
        </div>
    </div>
</template>

<script>
import LogoNameComp from './logoNameComp.vue';
export default {
    components: { LogoNameComp },
    async fetch() {
        if (this.$store.state.getters?.getSubscriber._id === '') {
            await this.$store.dispatch('getSubscriber');
        }
    },
    computed: {
        subscriber() {
            return this.$store.getters.getSubscriber;
        },
        activePage() {
            return this.$store.getters.activePage;
        },
    },
    methods: {
        changePage(pageNumber, route) {
            this.$store.dispatch('changePage', pageNumber);
            this.$router.push(route);
        },
        logout() {
            this.$auth.logout();
            this.$store.dispatch('deleteSubscriber');
        },
        isAdmin() {
            if (!this.subscriber) {
                return false;
            }
            return this.subscriber.roles.some(role => role.name.toLowerCase() === 'admin');
        }
    }
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
    gap: 2vh;
}

.buttons button {
    padding: 1em;
    color: #551fff;
    font-size: 18px;
    border-radius: 30px;
    font-weight: 500;
    width: 70%;
    border: none;
}

.buttons button:hover {
    color: #ff6a00;
}
</style>
