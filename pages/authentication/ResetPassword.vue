<template>
    <div class="container">
        <div class="grid justify-content-center align-items-center h-screen">
            <div class="col-12 md:col-8 lg:col-5">
                <div class="recovery-page">
                    <NuxtLink to="/">
                        <Button class="p-button-sm py-1 px-2 mb-2 p-button-text">{{ $t('recovery.cancelText') }}</Button>
                    </NuxtLink>
                    <Card>
                        <template #title>
                            {{ $t('recovery.resetTitle') }}
                        </template>
                        <template #content>
                            <p class="mt-0 mb-4 text-sm text-gray-500">{{ $t('recovery.passwordDescription') }}</p>
                            <div>
                                <span class="p-input-icon-left d-block w-full mb-3">
                                    <i class="pi pi-inbox" />
                                    <InputText type="password" v-model="form.password" :placeholder="$t('recovery.placeholders.password')" class="w-full" />
                                    <span v-if="errors.password" class="error text-red-400 mb-3">{{ errors.password }}</span>
                                </span>
                            </div>
                            <p class="mt-0 mb-4 text-sm text-gray-500">{{ $t('recovery.resetPasswordDescription') }}</p>
                            <div>
                                <span class="p-input-icon-left d-block w-full mb-3">
                                    <i class="pi pi-inbox" />
                                    <InputText type="password" v-model="form.repeat_password" :placeholder="$t('recovery.placeholders.repeatPassword')" class="w-full" />
                                    <span v-if="errors.repeat_password" class="error text-red-400 mb-3">{{ errors.repeat_password }}</span>
                                </span>
                            </div>
                            <Button type="button" loadingIcon="pi pi-check" @click.prevent="reset()" class="w-full text-center block">{{ $t('recovery.resetButton') }}</Button>
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
import { mapGetters } from 'vuex'

export default {
    components: {
        Card, Button, InputText
    },
    data () {
        return {
            form: {
                password: '',
                repeat_password: '',
            }
        }
    },
    computed: {
        ...mapGetters({
            'errors': 'users/registrationErrors'
        })
    },
    layout: 'authentication',
    middleware: 'guest',
    methods: {
        async reset() {
            await this.$store.dispatch(
                'users/resetPassword', { token: this.$route.params.token, data: this.form }
            )

            if(Object.keys(this.errors).length === 0) {
                this.$router.push({ name: 'login' })
                this.$toast.add({
                    severity: 'success',
                    summary: "Password reset complete!",
                    detail: "Use your new password to log in!.",
                    life: 3000
                })
            }
        }
    }
}
</script>