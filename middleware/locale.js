import { loadLocale } from '~/plugins/i18n'

export default async ({ store }) => {
  await loadLocale(store.getters['lang/locale'])
}