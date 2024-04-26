// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{

    public:{
      apihost:process.env.NUXT_API_HOST
    }
    
  },
  modules:[
    'nuxt-quasar-ui',
    '@pinia/nuxt'
  ],
  quasar:{
    plugins: [
      'Notify',
      'Dialog',
      'Loading'
    ]
  }
})
