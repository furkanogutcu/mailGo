<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Abone düzenle'"
                    :subtitle="subscriber.fullName == ' ' ? '' : subscriber.fullName + ' abonesini düzenle'">
                </PageTitle>
            </div>
        </div>

        <div class="subscriber-update-box">
            <div class="form-group">
                <label for="firstName">Adı</label>
                <input type="text" class="form-control" id="firstName" v-model="updatedSubscriber.firstName"
                    placeholder="Abone adını giriniz">
            </div>
            <div class="form-group">
                <label for="lastName">Soyadı</label>
                <input type="text" class="form-control" id="lastName" v-model="updatedSubscriber.lastName"
                    placeholder="Abone soyadını giriniz">
            </div>
            <div class="form-group">
                <label for="email">E-mail adresi</label>
                <input type="email" class="form-control" id="email" v-model="updatedSubscriber.email"
                    placeholder="Abone e-mail adresini giriniz">
            </div>
            <div class="form-group">
                <label for="email">Kullanıcı rolleri</label>
                <!-- Kullanıcı rollerini göster ve işaretle -->
                <div v-for="role in roleList" :key="role._id">
                    <input type="checkbox" v-model="updatedSubscriber.roles" :value="{ _id: role._id, name: role.name }"
                        :checked="true">
                    <span>{{ role.name }}</span>
                </div>
            </div>
            <button class="btn btn-primary" :disabled="true">Şifre sıfırla</button>
            <button @click="updateSubscriber(updatedSubscriber)" class="btn btn-primary"
                :disabled="buttonDisabled">Güncelle</button>
        </div>
    </div>
</template>

<script>
import { updateValidation } from '../../../validations/subscriber.js';
import { validate } from '../../../utilities/validator.js';
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
    data() {
        return {
            subscriber: {
                firstName: '',
                lastName: '',
                email: '',
                subscribedCategories: [],
                roles: []
            },
            updatedSubscriber: {
                firstName: '',
                lastName: '',
                email: '',
                subscribedCategories: [],
                roles: []
            },
            roleList: [],
            buttonDisabled: false
        };
    },
    // FIXME
    async created() {
        await this.$store.dispatch('fetchAllSubscribers');
        await this.$store.dispatch('fetchCategories');
        await this.$store.dispatch('fetchRoles');
        const result = this.$store.getters.getAllSubscribers.find(s => s._id === this.$route.query.id);
        if (result) {
            this.subscriber = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                fullName: result.fullName,
                email: result.email,
                subscribedCategories: result.subscribedCategories,
                roles: result.roles
            };
            this.updatedSubscriber = {
                _id: this.subscriber._id,
                firstName: this.subscriber.firstName,
                lastName: this.subscriber.lastName,
                email: this.subscriber.email,
                subscribedCategories: this.subscriber.subscribedCategories,
                roles: this.subscriber.roles
            };
            // Roller listesine role id, role adı ve kullanıcı o role sahip mi objelerini ekle
            this.roleList = this.$store.getters.getRoles.map((role) => {
                return {
                    _id: role._id,
                    name: role.name,
                    isChecked: this.subscriber.roles.includes(role._id)
                };
            });
        } else {
            this.$router.push('/admin/subscriber-management');
            this.$toast.error('Abone bulunamadı');
        }
    },
    mounted() {
        // FIXME - Ekran ortalamasını düzeltmek için
        document.body.style.display = 'block';
        document.body.style['justify-content'] = 'default';
        document.body.style['align-items'] = 'default';
        document.body.style.height = '100vh';
        document.body.style['overflow-x'] = 'hidden';
        document.body.style['overflow-y'] = 'hidden';
    },
    methods: {
        async updateSubscriber(subscriber) {
            const processedSubscriber = {
                _id: subscriber._id,
                firstName: subscriber.firstName,
                lastName: subscriber.lastName,
                email: subscriber.email,
                subscribedCategories: subscriber.subscribedCategories.map((c) => {
                    return {
                        category: c.category._id,
                        subscriptionDate: c.subscriptionDate
                    };
                }),
                roles: subscriber.roles.map(r => r._id)
            };
            // Doğrulamaları yap
            const validationResult = validate(processedSubscriber, updateValidation);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.buttonDisabled = true;
                const response = await this.$axios.post('subscriber/update', processedSubscriber);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.$toast.success('Abone başarıyla güncellendi!');
                this.$router.push('/admin/subscriber-management');
                this.buttonDisabled = false;
            } catch (err) {
                const errorMessage = err?.response?.data?.error?.message || err.message;
                this.$toast.error(errorMessage);
                this.buttonDisabled = false;
            }
        }
    },
};
</script>

<style scoped>
.subscriber-update-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
