<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="box">
            <LogoNameComp :color="'ffffff'" :size="1" @click.native="$router.push('/')"></LogoNameComp>
            <hr width="100%" color="white" />
            <div class="mb-3">
                <div class="email mb-3">
                    <input type="email" name="email" placeholder="E-posta adresiniz" v-model="loginUser.email" />
                </div>
                <div class="password">
                    <input class="pas" type="password" name="password" placeholder="Parolanız"
                        v-model="loginUser.password" />
                </div>
            </div>
            <button class="mb-3" :style="loginButtonDisabled ? 'background:#92959e;' : 'background:#f5315d;'"
                @click="login" :disabled="loginButtonDisabled">Giriş Yap</button>
            <div class=" footer d-flex justify-content-between ml-2 mr-2">
                <span @click="$router.push('register')">Hesabınız yok mu?</span>
                <span>Şifremi unuttum</span>
            </div>
        </div>
    </div>
</template>

<script>
import LogoNameComp from '../components/logoNameComp.vue';
import { loginSchema } from '../validations/auth.js';
import { validate } from '../utilities/validator.js';
export default {
    auth: false,
    components: { LogoNameComp },
    middleware: ['unLoggedInCheck'],
    data() {
        return {
            loginUser: {
                email: '',
                password: ''
            },
            loginButtonDisabled: false,
        };
    },
    mounted() {
        // FIXME - Ekranı ortalamak için
        document.body.style.display = 'flex';
        document.body.style['justify-content'] = 'center';
        document.body.style['align-items'] = 'center';
        document.body.style.height = '100vh';
    },
    methods: {
        async login() {
            const validationResult = validate(this.loginUser, loginSchema);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.loginButtonDisabled = true;
                const response = await this.$auth.loginWith('local', { data: this.loginUser });
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                this.loginUser.email = '';
                this.loginUser.password = '';
                await this.$auth.setUserToken(response.data.data.tokens.access_token, undefined);
                this.$toast.success('Giriş başarılı. Panele yönlendiriliyorsunuz...', {
                    onComplete: () => {
                        return this.$router.push('/dashboard');
                    },
                    duration: 1000,
                });
            } catch (err) {
                const errorMessage = err?.response?.data?.error?.message || err.message;
                this.$toast.error(errorMessage);
                this.loginButtonDisabled = false;
                this.$store.dispatch('deleteSubscriber');
            }
        }
    }
};
</script>

<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
}

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
    background: #f5315d;
    color: white;
    border: none;
    border-radius: 15px;
    font-weight: 500;
}

.box .email {
    background: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 10px;
    color: #4d4d4d;
}

.box .email input {
    outline: none;
    border: none;
}

.box .password {
    background: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 10px;
    color: #4d4d4d;
}

.box .password input {
    outline: none;
    border: none;
}

.box .footer {
    display: flex;
    font-size: 13px;
    color: #ffffff;
}

.box .footer span {
    cursor: pointer;
}
</style>
