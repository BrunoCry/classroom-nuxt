<template>
    <div class="grid justify-content-center align-items-center h-screen">
        <div class="col-12 lg:col-3">
            <div class="registration-page">
                <NuxtLink to="/">
                    <Button class="p-button-sm py-1 px-2 mb-2 p-button-text">Back to home</Button>
                </NuxtLink>
                <Card>
                    <template #title>
                        Log In
                    </template>
                    <template #content>
                        <div>
                            <span class="p-input-icon-left d-block w-full mb-0">
                                <i class="pi pi-inbox" />
                                <InputText type="text" v-model="form.email" placeholder="Your E-Mail" class="w-full" />
                            </span>
                            <span v-if="errors" class="error text-red-400 mt-1 block">{{ errors.email }}</span>
                        </div>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>OR</b>
                        </Divider>
                        <div>
                            <span class="p-input-icon-left d-block w-full">
                                <i class="pi pi-phone" />
                                <InputText type="text" v-model="form.phone_number" placeholder="Your phone" class="w-full" />
                            </span>
                            <span v-if="errors" class="error text-red-400 mt-1 block">{{ errors.phone_number }}</span>
                        </div>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>Your password</b>
                        </Divider>
                        <span class="p-input-icon-left d-block w-full mb-3">
                            <i class="pi pi-lock" />
                            <InputText type="password" v-model="form.password" placeholder="Type your password" class="w-full" />
                        </span>
                        <div class="field-checkbox">
                            <Checkbox id="remember" v-model="form.remember" :binary="true" />
                            <label for="remember">Remember me</label>
                        </div>
                        <Button @click.prevent="loginUser()" :loading="loading" class="w-full text-center block">Log In</Button>
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
            errors: 'users/loginError',
            authenticationToken: 'users/authenticationToken'
        }),

        methods: {
            ...mapActions(
                { authenticateUser: 'users/authenticateUser' }
            ),
            async loginUser() {
                this.loading = true

                await this.authenticateUser(this.form)

                if(!this.errors) {
                    this.$router.push({ 'name': 'profile' })
                }

                this.loading = false
            }
        }
    }
</script>