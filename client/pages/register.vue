<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->

<template>
    <div>
        <div class="box">
            <LogoNameComp :color="'ffffff'" :size="1" @click.native="$router.push('/')"></LogoNameComp>
            <hr width="100%" color="white" />
            <div class="mb-3">
                <div class="input mb-3">
                    <input type="text" name="firstName" placeholder="Adınız" v-model="registerUser.firstName" />
                </div>
                <div class="input mb-3">
                    <input class="pas" type="text" name="lastName" placeholder="Soyadınız"
                        v-model="registerUser.lastName" />
                </div>
                <div class="email mb-3">
                    <input type="email" name="email" placeholder="E-posta adresiniz" v-model="registerUser.email" />
                </div>
                <div class="password mb-3">
                    <input type="password" name="password" placeholder="Parolanız" v-model="registerUser.password" />
                </div>
                <div class="password">
                    <input type="password" name="password" placeholder="Parolanız tekrar"
                        v-model="registerUser.repeat_password" />
                </div>
            </div>
            <button class="mb-3" :style="registerButtonDisabled ? 'background:#92959e;' : 'background:#f5315d;'"
                @click="register" :disabled="registerButtonDisabled">Kayıt ol</button>
            <div class="footer d-flex justify-content-center">
                <span @click="$router.push('login')">Zaten bir hesabınız var mı?</span>
            </div>
        </div>
    </div>
</template>

<script>
import LogoNameComp from '../components/logoNameComp.vue';
import { registerSchema } from '../validations/auth.js';
import { validate } from '../utilities/validator.js';
export default {
    auth: false,
    components: { LogoNameComp },
    data() {
        return {
            registerUser: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repeat_password: ''
            },
            registerButtonDisabled: false,
        };
    },
    beforeCreate() {
        // FIXME
        if (this.$auth.loggedIn) {
            this.$router.push('/dashboard');
        }
    },
    mounted() {
        // FIXME - Ekranı ortalamak için
        document.body.style.display = 'flex';
        document.body.style['justify-content'] = 'center';
        document.body.style['align-items'] = 'center';
        document.body.style.height = '100vh';
    },
    methods: {
        async register() {
            const validationResult = validate(this.registerUser, registerSchema);
            this.validationErrors = validationResult.error ? validationResult.error.details : [];
            if (this.validationErrors.length > 0) {
                this.validationErrors.forEach((error) => {
                    this.$toast.error(error.message);
                });
                return;
            }
            try {
                this.registerButtonDisabled = true;
                const response = await this.$axios.post('auth/register', this.registerUser);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                await this.$auth.setUserToken(response.data.data.tokens.access_token, undefined);
                this.$store.dispatch('setUser');
                this.$toast.success('Başarıyla kayıt oldunuz. Panele yönlendiriliyorsunuz...', {
                    onComplete: () => {
                        return this.$router.push('/dashboard');
                    },
                    duration: 1000,
                });
            } catch (err) {
                const errorMessage = err?.response?.data?.error?.message || err.message;
                this.$toast.error(errorMessage);
                this.registerButtonDisabled = false;
                this.$store.dispatch('deleteUser');
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

.box .input {
    background: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 10px;
    color: #4d4d4d;
}

.box .input input {
    outline: none;
    border: none;
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
