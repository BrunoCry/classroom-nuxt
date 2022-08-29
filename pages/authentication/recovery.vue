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
                            {{ $t('recovery.title') }}
                        </template>
                        <template #content>
                            <p class="mt-0 mb-4 text-sm text-gray-500">{{ $t('recovery.description') }}</p>
                            <div>
                                <span class="p-input-icon-left d-block w-full mb-3">
                                    <i class="pi pi-inbox" />
                                    <InputText type="text" v-model="form.email" :placeholder="$t('recovery.placeholders.email')" class="w-full" />
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
    import Card from 'primevue/card'
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import { apiClient } from '@/utils/api.js'

    export default {
        components: {
            Card, Button, InputText
        },
        data () {
            return {
                form: {
                    email: ''
                },
                loading: [ true ],
                is_complete: false,
            }
        },

        layout: 'authentication',

        middleware: 'guest',

        methods: {
            async recovery() {
                const client = await apiClient
                try {
                    var response = await client.apis.user.initiateUserPasswordReset({}, { requestBody: this.form })

                    console.log(response)

                    console.log(this.$cookies.getAll({ fromRes: true }))

                    setTimeout(() => {
                        var index = this.form.email.lastIndexOf('@') - 1;
                        for (let i = 2; i < index; i++) {
                            this.form.email = this.form.email.replace(this.form.email[i], '*');
                        };

                        this.is_complete = true
                    }, 500)
                } catch (error) {
                    this.$toast.add({
                        severity:'error',
                        summary: 'Ошибка',
                        detail:'Что-то пошло не так..',
                        life: 3000
                    })
                    
                    console.log(error)
                }
            }
        }
    }
</script>