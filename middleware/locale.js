import { loadLocale } from '~/plugins/i18n'
import Cookies from 'js-cookie'

export default async ({ store }) => {
  await loadLocale(Cookies.get('locale'))
}