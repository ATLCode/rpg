// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
  ],
  supabase: {
    // Options
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      exclude: [],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/colors.scss" as *;',
        },
      },
    },
  },
  eslint: {
    lintOnStart: false,
  },
});
