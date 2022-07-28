<template>
    <div class="language-change ml-4">
        <Dropdown v-model="locale" :options="locales" class="py-0" placeholder="Set a language">
            <template #value="slotProps">
                <div class="flex align-items-center">
                    <img v-if="slotProps.value.code" :src="'https://flagcdn.com/w20/' + slotProps.value.code + '.png'" width="18" class="mr-2" />
                    <div>{{slotProps.value.name }}</div>
                </div>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center" @click.prevent="changeLocale(slotProps.option.code)">
                    <img :src="'https://flagcdn.com/w20/' + slotProps.option.code + '.png'" width="18" class="mr-2" />
                    <div>{{slotProps.option.name }}</div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>

<script>
    import Dropdown from 'primevue/dropdown'
    import { mapGetters } from 'vuex'
    import { loadLocale } from '~/plugins/i18n'

    export default {
        components: {
            Dropdown
        },

        data () {
            return {
                locale: '',
                locales: [
                    { name: "Русский", code: 'ru' },
                    { name: "English", code: 'gb-eng' }
                ]
            }
        },

        computed: mapGetters({
            currentLocale: 'locale/locale',
            store_locales: 'locale/locales'
        }),

        methods: {
            changeLocale(locale) {
                if (this.$i18n.locale !== locale) {
                    loadLocale(locale)
                    this.$store.dispatch('locale/setLocale', { locale })
                }
            }
        },

        created () {
            var setable = [

            ]
        }
    }
</script>

<style scoped>
    .p-dropdown-label + .p-inputtext {
        padding:4px 0px 0px 4px;
    }
</style>