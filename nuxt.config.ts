// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/eslint-module",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/leaflet",
  ],

  supabase: {
    // Options
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      exclude: [],
    },
  },

  vite: {},

  eslint: {
    lintOnStart: false,
  },

  css: ["~/assets/scss/main.scss", "~/assets/scss/colors.scss"],

  googleFonts: {
    families: {
      "Rubik Doodle Triangles": true,
    },
  },

  components: [{ path: "~/components/base" }, "~/components"],
  compatibilityDate: "2024-11-23",
});
