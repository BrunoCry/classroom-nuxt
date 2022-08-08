<template>
    <div class="container">
        <div class="grid justify-content-center align-items-center h-screen">
            <div class="col-12 md:col-8 lg:col-5">
                <div v-if="!is_complete" class="recovery-page">
                    <NuxtLink to="/">
                        <Button class="p-button-sm py-1 px-2 mb-2 p-button-text">{{ $t('back-to-home') }}</Button>
                    </NuxtLink>
                    <Card>
                        <template #title>
                            {{ $t('recovery_form.title') }}
                        </template>
                        <template #content>
                            <div>
                                <span class="p-input-icon-left d-block w-full mb-3">
                                    <i class="pi pi-inbox" />
                                    <InputText type="text" v-model="form.password" :placeholder="$t('recovery.placeholders.email')" class="w-full" />
                                </span>
                            </div>
                            <div>
                                <span class="p-input-icon-left d-block w-full mb-3">
                                    <i class="pi pi-inbox" />
                                    <InputText type="text" v-model="form.confirm_password" :placeholder="$t('recovery.placeholders.email')" class="w-full" />
                                </span>
                            </div>
                            <Button type="button" loadingIcon="pi pi-check" @click.prevent="recovery()" :loading="loading[0]" class="w-full text-center block">{{ $t('recovery.button') }}</Button>
                        </template>
                    </Card>
                </div>
                <div v-else>
                    <NuxtLink to="/">
                        <Button class="p-button-sm py-1 px-2 mb-2 p-button-text">{{ $t('back-to-home') }}</Button>
                    </NuxtLink>
                    <Card>
                        <template #title>
                            {{ $t('recovery.title_complete') }}
                        </template>
                        <template #content>
                            <p class="my-0 text-sm text-gray-500">{{ $t('recovery.description_complete_1') }} {{ form.email }} {{ $t('recovery.description_complete_2') }}</p>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import { apiClient } from '@/utils/api.js'

    export default {
        components: {
            Button, InputText
        },

        data () {
            return {
                form: {
                    password: '',
                    confirm_password: ''
                }
            }
        },

        methods: {
            async recoveryPassword () {
                // TODO
            }
        }
    }
</script>