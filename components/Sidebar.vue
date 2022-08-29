<template>
    <div class="sidebar" :class="{ 'opened-sidebar': opened == true }">
        <div class="sidebar-title uppercase text-center flex align-items-center lg:hidden text-xl mx-5">
            <span>Class<b>Space</b></span>
            <i @click.prevent="closeSidebar" class="pi pi-times close-sidebar"></i>
        </div>
        <div class="sidebar-title uppercase text-center hidden lg:block text-xl">
            Class<b>Space</b>
        </div>
        <div class="sidebar-content" @click.prevent="closeSidebar">
            <span class="sidebar-group-title">{{ $t('sidebar.group-title.navigation') }}</span>
            <NuxtLink to="/" class="sidebar-link">
                <i class="pi pi-home"></i>
                <span>{{ $t('sidebar.links.dashboard') }}</span>
            </NuxtLink>
            <template v-if="user != undefined">
                <span class="sidebar-group-title">{{ $t('sidebar.group-title.education') }}</span>
                <NuxtLink to="/rooms" class="sidebar-link">
                    <i class="pi pi-box"></i>
                    <span>{{ $t('sidebar.links.rooms') }}</span>
                </NuxtLink>
                <NuxtLink to="/dialogs" class="sidebar-link">
                    <i class="pi pi-comments"></i>
                    <span>{{ $t('sidebar.links.dialogs') }}</span>
                    <span class="msg-count">3 new</span>
                </NuxtLink>
            </template>
            <span class="sidebar-group-title">{{ $t('sidebar.group-title.profile') }}</span>
            <template v-if="user != undefined">
                <NuxtLink to="/profile" class="sidebar-link">
                    <i class="pi pi-user"></i>
                    <span>{{ $t('sidebar.links.profile') }}</span>
                </NuxtLink>
                <a @click.prevent="logout" href="/home" class="sidebar-link">
                    <i class="pi pi-sign-out"></i>
                    <span>{{ $t('sidebar.links.logout') }}</span>
                </a>
            </template>
            <template v-else>
                <NuxtLink to="/login" class="sidebar-link">
                    <i class="pi pi-sign-in"></i>
                    <span>{{ $t('sidebar.links.login') }}</span>
                </NuxtLink>
                <NuxtLink to="/registration" class="sidebar-link">
                    <i class="pi pi-user-plus"></i>
                    <span>{{ $t('sidebar.links.registration') }}</span>
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
                user: 'users/currentUser',
                opened: 'sidebar/opened'
            })
        },

        methods: {
            ...mapActions({
                logout_user: 'users/logoutUser',
                closeSidebar: 'sidebar/closeSidebar'
            }),

            async logout() {
                await this.logout_user()

                this.$router.push({ name: 'home' })
            }
        }
    }
</script>