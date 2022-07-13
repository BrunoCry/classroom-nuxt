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
                        {{ errors }}
                        <span class="p-input-icon-left d-block w-full mb-0">
                            <i class="pi pi-inbox" />
                            <InputText type="text" v-model="form.email" placeholder="Your E-Mail" class="w-full" />
                        </span>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>OR</b>
                        </Divider>
                        <span class="p-input-icon-left d-block w-full">
                            <i class="pi pi-phone" />
                            <InputText type="text" v-model="form.phone" placeholder="Your phone" class="w-full" />
                        </span>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>Your password</b>
                        </Divider>
                        <span class="p-input-icon-left d-block w-full mb-3">
                            <i class="pi pi-lock" />
                            <InputText type="password" v-model="form.password" placeholder="Type your password" class="w-full" />
                        </span>
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

        data () {
            return {
                form: {
                    email: '',
                    phone: '',
                    password: ''
                },
                loading: true
            }
        },

        computed: mapGetters({
            user: 'users/currentUser',
            errors: 'users/loginError',
            authenticationToken: 'users/authenticationToken'
        }),

        methods: {
            ...mapActions(
                { authenticateUser: 'users/authenticateUser' }
            ),
            async loginUser() {
                this.loading = true

                const requestBody = {
                    email: this.form.email,
                    phone_number: this.form.phone,
                    password: this.form.password,
                }

                await this.authenticateUser(requestBody)

                if(!this.error) {
                    this.$router.push({ 'name': 'profile' })
                }

                this.loading = false
            }
        }
    }
</script>