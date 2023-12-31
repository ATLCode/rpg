// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/eslint-module",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
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
  googleFonts: {
    families: {
      "Rubik Doodle Triangles": true,
    },
  },
});
