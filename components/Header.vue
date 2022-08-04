<template>
    <nav class="header">
        <div class="container flex align-items-center">
            <Button @click.prevent="openSidebar" class="py-2 p-button-outlined inline lg:hidden">
                <i class="pi pi-list"></i>
            </Button>
            <span class="p-input-icon-left hidden lg:inline">
                <i class="pi pi-search" />
                <InputText type="text" class="py-2" :placeholder="$t('header.search')" />
            </span>
            <LocaleChanger />
            <div v-if="user != undefined" class="right-header ml-auto">
                <NuxtLink to="/profile" class="flex align-items-center user-info">
                    <Avatar label="D" shape="circle" class="mr-2" />
                    <b>{{ user.first_name }} {{ user.last_name }}</b>
                    <i class="pi pi-chevron-down ml-2"></i>
                </NuxtLink>
            </div>
            <div v-else class="right-header ml-auto">
                <NuxtLink to="/login">
                    <Button class="mr-2 p-button-text py-2">{{ $t('header.sign-in') }}</Button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <Button class="py-2">{{ $t('header.sign-up') }}</Button>
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script>
    import Avatar from 'primevue/avatar'
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import LocaleChanger from '~/components/LocaleChanger.vue'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'HeaderComponent',

        components: {
            Avatar, Button, InputText, LocaleChanger
        },

        data () {
            return {}
        },

        computed: {
            ...mapGetters({
                user: 'users/currentUser'
            })
        },

        methods: {
            ...mapActions({
                openSidebar: 'sidebar/openSidebar'
            })
        }
    }
</script>