import { loadLocale } from '~/plugins/i18n'

export default async ({ app }) => {
  await loadLocale(app.$cookies.get('locale'))
}