require('dotenv').config()

export default {
    srcDir: __dirname,

    ssr: true,

    head: {
        title: 'ClassSpace',
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
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap' },
            { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css' }
        ]
    },

    css: [
        { src: 'primevue/resources/themes/tailwind-light/theme.css', lang: 'css' },
        //{ src: 'primevue/resources/themes/lara-light-blue/theme.css', lang: 'css' },
        { src: 'primevue/resources/primevue.min.css', lang: 'css' },
        { src: 'primeflex/primeflex.css', lang: 'css' },
        { src: 'primeicons/primeicons.css', lang: 'css' },
        { src: 'assets/scss/app.scss', lang: 'scss'}
    ],

    router: {
        middleware: ['locale', 'check-auth']
    },

    plugins: [
        'plugins/primevue',
        'plugins/nuxt-client-init',
        'plugins/i18n',
        {src: '@/plugins/date-format', mode: 'client'},
    ],

    components: true,

    buildModules: [
        '@nuxtjs/router',
        '@nuxtjs/axios'
    ],

    modules: [
        'nuxt-clipboard',
        ['nuxt-clipboard', { autoSetContainer: true }],
        
        'cookie-universal-nuxt',
        ['cookie-universal-nuxt', { alias: 'cookies' }],

        '@nuxtjs/dotenv',
        ['@nuxtjs/dotenv', {}]
    ],

    clipboard: {
        autoSetContainer: true
    },

    build: {
        transpile: ['primevue'],
    },

    // настройка сервера для запуска nuxt в локальной сети, убрать на деплое
    server: {
        host: process.env.NUXT_HOST || 'localhost',
        port: process.env.NUXT_PORT || '3000',
    }
}