<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Abone ekle'" :subtitle="'Yeni bir abone ekleyin'">
                </PageTitle>
            </div>
        </div>

        <div class="subscriber-add-box">
            <div class="form-group">
                <label for="firstName">Adı</label>
                <input type="text" class="form-control" id="firstName" v-model="subscriber.firstName"
                    placeholder="Abone adını giriniz">
            </div>
            <div class="form-group">
                <label for="lastName">Soyadı</label>
                <input type="text" class="form-control" id="lastName" v-model="subscriber.lastName"
                    placeholder="Abone soyadını giriniz">
            </div>
            <div class="form-group">
                <label for="email">E-mail adresi</label>
                <input type="email" class="form-control" id="email" v-model="subscriber.email"
                    placeholder="Abone e-mail adresini giriniz">
            </div>
            <p><strong>NOT:</strong> Yeni abonenin parolası kendisine e-mail olarak gönderilecektir</p>
            <button @click="addSubscriber(subscriber)" class="btn btn-primary"
                :disabled="buttonDisabled">Kaydet</button>
        </div>
    </div>
</template>

<script>
import generator from 'generate-password';
import { addValidation } from '../../../validations/subscriber.js';
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
                email: ''
            },
            buttonDisabled: false
        };
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
        async addSubscriber(subscriber) {
            subscriber.password = this.generatePassword(20);
            subscriber.repeat_password = subscriber.password;
            const validationResult = validate(subscriber, addValidation);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.buttonDisabled = true;
                const response = await this.$axios.post('auth/register', subscriber);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.$toast.success('Abone başarıyla eklendi!');
                this.$router.push('/admin/subscriber-management');
                this.buttonDisabled = false;
            } catch (err) {
                const errorMessage = err?.response?.data?.error?.message || err.message;
                this.$toast.error(errorMessage);
                this.buttonDisabled = false;
            }
        },
        generatePassword(length) {
            return generator.generate({
                length,
                numbers: true,
                uppercase: true,
                lowercase: true,
                symbols: true,
                strict: true,
            });
        }

    },
};
</script>

<style scoped>
.subscriber-add-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
