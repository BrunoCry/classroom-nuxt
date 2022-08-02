<template>
    <div class="grid justify-content-center align-items-center h-screen">
        <div class="col-12 lg:col-3">
            <div class="registration-page">
                <NuxtLink to="/">
                    <Button class="p-button-sm py-1 px-2 mb-2 p-button-text">{{ $t('back-to-home') }}</Button>
                </NuxtLink>
                <Card>
                    <template #title>
                        {{ $t('login.title') }}
                    </template>
                    <template #content>
                        <div>
                            <span class="p-input-icon-left d-block w-full mb-0">
                                <i class="pi pi-inbox" />
                                <InputText type="text" v-model="form.email" :placeholder="$t('login.placeholders.email')" class="w-full" />
                            </span>
                        </div>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>{{ $t('login.dividers.or') }}</b>
                        </Divider>
                        <div>
                            <span class="p-input-icon-left d-block w-full">
                                <i class="pi pi-phone" />
                                <InputText type="text" v-model="form.phone_number" :placeholder="$t('login.placeholders.phone')" class="w-full" />
                            </span>
                        </div>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>{{ $t('login.dividers.password') }}</b>
                        </Divider>
                        <span class="p-input-icon-left d-block w-full mb-3">
                            <i class="pi pi-lock" />
                            <InputText type="password" v-model="form.password" :placeholder="$t('login.placeholders.password')" class="w-full" />
                        </span>
                        <div class="field-checkbox">
                            <Checkbox id="remember" v-model="form.remember" :binary="true" />
                            <label for="remember">{{ $t('login.remember') }}</label>
                        </div>
                        <Button @click.prevent="loginUser()" :loading="loading" class="w-full text-center block">{{ $t('login.button') }}</Button>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from 'primevue/card';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';
    import Checkbox from 'primevue/checkbox';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        components: {
            Card, InputText, Button, Divider, Checkbox
        },

        layout: 'authentication',

        middleware: 'guest',

        data () {
            return {
                form: {
                    email: '',
                    phone_number: '',
                    password: '',
                    remember: false
                },
                loading: false
            }
        },

        computed: mapGetters({
            error: 'users/loginError',
            authenticationToken: 'users/authenticationToken'
        }),

        async created() {
            await this.$store.commit('users/SET_LOGIN_ERROR', undefined)
        },

        methods: {
            ...mapActions(
                { authenticateUser: 'users/authenticateUser' }
            ),
            async loginUser() {
                this.loading = true

                await this.authenticateUser(this.form)

                if(!this.error) {
                    this.$router.push({ 'name': 'profile' })
                } else {
                    this.$toast.add({
                        severity:'error',
                        summary:'Error',
                        detail:this.error,
                        life: 3000
                    })
                }

                this.loading = false
            }
        }
    }
</script>