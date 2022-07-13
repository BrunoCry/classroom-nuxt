<template>
    <div class="sidebar">
        <div class="sidebar-title uppercase text-center block text-xl">
            Class<b>Room</b>
        </div>
        <div class="sidebar-content">
            <span class="sidebar-group-title">Navigation</span>
            <NuxtLink to="/">
                <i class="pi pi-home"></i>
                <span>Dashboard</span>
            </NuxtLink>
            <template v-if="user != undefined">
                <span class="sidebar-group-title">Education</span>
                <NuxtLink to="/rooms">
                    <i class="pi pi-box"></i>
                    <span>Rooms</span>
                </NuxtLink>
                <NuxtLink to="/dialogs">
                    <i class="pi pi-comments"></i>
                    <span>Dialogs</span>
                    <span class="msg-count">3 new</span>
                </NuxtLink>
            </template>
            <span class="sidebar-group-title">My profile</span>
            <template v-if="user != undefined">
                <NuxtLink to="/profile">
                    <i class="pi pi-user"></i>
                    <span>My profile</span>
                </NuxtLink>
                <a @click.prevent="logout" href="/home">
                    <i class="pi pi-sign-out"></i>
                    <span>Log out</span>
                </a>
            </template>
            <template v-else>
                <NuxtLink to="/login">
                    <i class="pi pi-sign-in"></i>
                    <span>Log in</span>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <i class="pi pi-user-plus"></i>
                    <span>Registration</span>
                </NuxtLink>
            </template>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "SidebarComponent",

        components: {},

        data: () => {
            return {}
        },

        computed: {
            ...mapGetters({
                user: 'users/currentUser'
            })
        },

        methods: {
            ...mapActions({
                logout_user: 'users/logoutUser'
            }),

            async logout() {
                await this.logout_user()

                this.$router.push({ name: 'home' })
            }
        },

        async mounted() {
            this.$forceUpdate()
        }
    }
</script>