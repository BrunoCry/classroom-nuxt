<template>
    <nav class="header">
        <div class="container flex align-items-center">
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText type="text" class="py-2" placeholder="Search" />
            </span>
            <div v-if="user != undefined" class="right-header ml-auto">
                <NuxtLink to="/profile" class="flex align-items-center user-info">
                    <Avatar label="D" shape="circle" class="mr-2" />
                    <b>{{ user.first_name }} {{ user.last_name }}</b>
                    <i class="pi pi-chevron-down ml-2"></i>
                </NuxtLink>
            </div>
            <div v-else class="right-header ml-auto">
                <NuxtLink to="/login">
                    <Button class="mr-2 p-button-text py-2">Sign in</Button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <Button class="py-2">Sign up</Button>
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script>
    import Avatar from 'primevue/avatar'
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import { mapGetters } from 'vuex'

    export default {
        name: 'HeaderComponent',

        components: {
            Avatar, Button, InputText
        },

        data () {
            return {}
        },

        computed: {
            ...mapGetters({
                user: 'users/currentUser'
            })
        }
    }
</script>