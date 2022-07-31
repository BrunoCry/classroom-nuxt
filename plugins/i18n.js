import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'gb-eng',
    messages: {}
})

export default async ({ app, store }) => {
    if (process.client) {
        await loadLocale(app.$cookies.get('locale') || 'gb-eng')
    }
  
    app.i18n = i18n
}

export async function loadLocale(locale = 'gb-eng') {
    if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
        const messages = await import(`~/lang/${locale}`)
        i18n.setLocaleMessage(locale, messages)
    }

    if (i18n.locale !== locale) {
        i18n.locale = locale
    }
}