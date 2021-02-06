module.exports = {
	plugins: [
        {src: '~plugins/iview', ssr: true},
        {src: '~plugins/vuetify.js', ssr: true},
        {src: '~plugins/vuemat.js', ssr: true},
        {src: '~plugins/vuelidate.js', ssr: true},
        {src: '~/plugins/flutterwave', ssr: false},
        {src: '~/plugins/korapay', ssr: false},
      ],
      
    head: {
        title: 'Lego Hotel',

        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: 'Lego Hotel offers very nice and conducive environment with a lovely view at an affordable price.' }
        ],

        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" },
          { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" },
          { rel: "stylesheet", type: "text/css", href: "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons" },
          { rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" },
          { rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" },
          
        ],

        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
            { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
            { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
        ]
    },

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'cookie-universal-nuxt',
        ['vue-scrollto/nuxt', { duration: 3000 }],
    ],

    buildModules: [
      '@nuxtjs/dotenv',
    ],
    publicRuntimeConfig: {
      axios: {
        baseURL: process.env.BASE_URL || 'http://localhost/my-app/back_end/myAppApi'
      }
    },
}
