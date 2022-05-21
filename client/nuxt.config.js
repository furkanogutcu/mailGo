export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mailGo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/mailGo.svg' }
    ]
  },

  loading: { color: '#fd2254' },

  router: {
    middleware: ['auth']
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/chart.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next'
  ],

  bootstrapVue: {
    icons: true
  },

  toast: {
    position: 'bottom-right',
    duration: 3000,
    keepOnHover: true,
    closeOnSwipe: true,
    theme: 'bubble',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          logout: false,
          user: false,
          login: { url: 'auth/login', method: 'post' },
        },
      },
    },
    redirect: {
      login: '/login', // Oturum açmak gerekirse kullanıcı bu yola yönlendirilecektir .
      logout: '/login', // Oturumu kapattıktan sonra mevcut rota korunuyorsa, kullanıcı bu yola yönlendirilecektir .
      home: '/', // Kullanıcı giriş yaptıktan sonra bu yola yönlendirilecektir
      callback: '/', // Kullanıcı oturum açtıktan sonra kimlik sağlayıcı tarafından bu yola yönlendirilecektir
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
};
