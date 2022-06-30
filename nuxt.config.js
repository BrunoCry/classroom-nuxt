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
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
        { src: 'primeflex/primeflex.css', lang: 'css' },
        { src: 'assets/scss/app.scss', lang: 'scss'}
    ],

    plugins: [
    ],

    components: true,

    buildModules: [
        //
    ],

    modules: [
        'primevue/nuxt',
    ],

    build: {
        transpile: ['primevue'],
    }
}
