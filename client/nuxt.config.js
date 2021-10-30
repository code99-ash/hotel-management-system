module.exports = {
	plugins: [
        {src: '~plugins/iview', ssr: true},
        // {src: '~plugins/lightbox', ssr: false},
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
        ],

        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
            { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
            { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
        ]
    },

    css: [
      '~assets/style.scss'
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'cookie-universal-nuxt',
        ['vue-scrollto/nuxt', { duration: 3000 }],
    ],

    buildModules: [
      '@nuxtjs/dotenv',
      '@nuxtjs/style-resources',
    ],

    styleResources: {
      scss: [
        '~assets/scss/mixins.scss',
        '~assets/scss/variables.scss'
      ]
    },
    
    publicRuntimeConfig: {
      axios: {
        baseURL: process.env.BASE_URL || 'http://127.0.0.1:3001'
      }
    },

    auth: {
      strategies: {
        local: {
          scheme: 'refresh',
          token: {
            property: 'access_token',
            maxAge: 1800,
            global: true,
            // type: 'Bearer'
          },
          refreshToken: {
            property: 'refresh_token',
            data: 'refresh_token',
            maxAge: 60 * 60 * 24 * 30
          },
          user: {
            property: 'user',
           // autoFetch: true
          },
          endpoints: {
            login: { url: '/api/auth/login', method: 'post' },
            refresh: { url: '/api/auth/refresh', method: 'post' },
            user: { url: '/api/auth/user', method: 'get' },
            logout: { url: '/api/auth/logout', method: 'post' }
          },
          // autoLogout: false
        }
      }
    }
}
