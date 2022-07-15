<template>
    <div class="grid justify-content-center align-items-center h-screen">
        <div class="col-12 lg:col-3">
            <div class="registration-page">
                <NuxtLink to="/">
                    <Button class="p-button-sm py-1 px-2 mb-2 p-button-text">Back to home</Button>
                </NuxtLink>
                <Card>
                    <template #title>
                        Registration
                    </template>
                    <template #content>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>Credentials</b>
                        </Divider>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full mb-1">
                                <i class="pi pi-inbox" />
                                <InputText type="text" v-model="form.email" placeholder="Your E-Mail" class="w-full" />
                            </span>
                            <span v-if="errors.email" class="error text-red-400">{{ errors.email }}</span>
                        </div>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full">
                                <i class="pi pi-phone" />
                                <InputText type="text" v-model="form.phone_number" placeholder="Your phone" class="w-full" />
                            </span>
                            <span v-if="errors.phone_number" class="error text-red-400">{{ errors.phone_number }}</span>
                        </div>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>Personal info</b>
                        </Divider>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full mb-1">
                                <i class="pi pi-user" />
                                <InputText type="text" v-model="form.first_name" placeholder="First name" class="w-full" />
                            </span>
                            <span v-if="errors.first_name" class="error text-red-400">{{ errors.first_name }}</span>
                        </div>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full mb-1">
                                <i class="pi pi-user" />
                                <InputText type="text" v-model="form.last_name" placeholder="Last name" class="w-full" />
                            </span>
                            <span v-if="errors.last_name" class="error text-red-400">{{ errors.last_name }}</span>
                        </div>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full">
                                <i class="pi pi-user" />
                                <InputText type="text" v-model="form.middle_name" placeholder="Middle name" class="w-full" />
                            </span>
                            <span v-if="errors.middle_name" class="error text-red-400">{{ errors.middle_name }}</span>
                        </div>
                        <Divider align="center" type="dashed" class="text-sm">
                            <b>Password and EULA</b>
                        </Divider>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full mb-1">
                                <i class="pi pi-lock" />
                                <InputText type="password" v-model="form.password" placeholder="Type your password" class="w-full" />
                            </span>
                            <span v-if="errors.password" class="error text-red-400">{{ errors.password }}</span>
                        </div>
                        <div class="mb-3">
                            <span class="p-input-icon-left d-block w-full mb-1">
                                <i class="pi pi-unlock" />
                                <InputText type="password" v-model="form.repeat_password" placeholder="Repeat your password" class="w-full" />
                            </span>
                        </div>
                        <div class="mb-2">
                            <div class="field-checkbox">
                                <Checkbox id="acceptEULA" v-model="form.accept_eula" :binary="true"/>
                                <label for="acceptEULA">Accept <a class="text-primary">EULA</a></label>
                            </div>
                            <span v-if="errors.accept_eula" class="error text-red-400 mb-3">{{ errors.accept_eula }}</span>
                        </div>
                        <Button @click.prevent="registrationUser()" class="w-full text-center block">Sign up for free</Button>
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
                    phone_number: '',
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    password: '',
                    repeat_password: '',
                    accept_eula: false
                }
            }
        },

        computed: {
            ...mapGetters({
                errors: 'users/registrationErrors'
            })
        },

        methods: {
            ...mapActions({
                registerUser: 'users/registerUser',
            }),
            
            async registrationUser() {
                await this.registerUser(this.form)

                if(Object.keys(this.errors).length == 0) {
                    this.$router.push({ name: 'login' })
                }
            }
        }
    }
</script>