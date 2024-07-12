export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "tickop",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/style.scss"],
  transpileDependencies: ["vuex-persist"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/ant-design-vue.js",
    "~/plugins/csrf.js",

    // "~/plugins/axios.js",
    // "~/plugins/vuelidate.js",

    // { src: "~/plugins/initialize-state.js", mode: "client" },
    // { src: "~/plugins/click-out-side.js", mode: "client" },
    // { src: "~/plugins/observer.js", mode: "client" },
    // { src: "~/plugins/validate-onload.js", mode: "client" },
    // { src: "~/plugins/pagination.js", mode: "client" },
    // { src: "~/plugins/tippy.js", mode: "client" },
    // { src: "~/plugins/bus.js", mode: "client" },
    // { src: "~/plugins/flatpickr.js", mode: "client" },

    // { src: "~/plugins/de-svg.js", mode: "client" },
    // { src: "~/plugins/desvg.js", mode: "client" },
    // { src: "~/plugins/date-picker.js", mode: "client" },
    // { src: "~/plugins/mixin.js" },
    // { src: "~/plugins/mixin-client-only.js", mode: "client" },
    // { src: "~/plugins/router.js", mode: "client" },

    // { src: "~/plugins/vuex-persist.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/i18n",
    "portal-vue/nuxt",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build

  build: {
    transpile: ["ant-design-vue"],
  },
  i18n: {
    // locales: [
    //   {
    //     code: "en",
    //     file: "locales.js",
    //   },
    //   {
    //     code: "ja",
    //     file: "locales.js",
    //   },
    // ],
    // langDir: "static/locales/",
    // defaultLocale: "ja",
    // detectBrowserLanguage: false,
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: "i18n_redirected",
    // },
    // strategy: "no_prefix",
    // vueI18n: {
    //   fallbackLocale: "ja",
    //   silentTranslationWarn: true, // suppress localization fail warnings
    // },
  },
  ssr: false,
  axios: {
    proxy: true,
    credentials: true,
  },
  proxy: {
    "/laravel": {
      target: "http://10.101.11.6/api/",
      pathRewrite: { "^/laravel": "/" },
    },
  },

  auth: {
    redirect: {
      login: "/login",
      logout: "/login/",
      home: "/dashboard",
    },
    strategies: {
      laravelSanctum: {
        // scheme: "~/strategies/cookie",
        provider: "laravel/sanctum",
        url: "/laravel",
        endpoints: {
          // (optional) If set, we send a get request to this endpoint before login
          csrf: {
            url: "/csrf-cookie",
          },
          login: {
            url: `/auth/login/`,
            method: "post",
          },
          logout: {
            url: `/auth/logout/`,
            method: "post",
          },
          user: {
            url: "/me/",
            method: "get",
          },
          loginTwoFa: {
            url: "/auth/user/two-factor-authentication",
            method: "post",
          },
        },
      },
    },
  },
  router: {
    // middleware: ["auth"],
  },
};
