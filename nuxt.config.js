require('dotenv').config()

export default {
    srcDir: __dirname,

    head: {
        title: 'ClassRoom',
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

    plugins: [
        'plugins/primevue'
    ],

    components: true,

    buildModules: [
        '@nuxtjs/router',
        '@nuxtjs/axios'
    ],

    modules: [
        '@nuxtjs/dotenv',
        //'primevue/nuxt'
    ],

    build: {
        transpile: ['primevue'],
    }
}
