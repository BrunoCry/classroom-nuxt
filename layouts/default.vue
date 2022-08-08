<template>
    <div class="page">
        <v-header />
        <sidebar />
        <Toast />
        <div class="container pt-4">
            <transition name="fade">
              <Nuxt />
            </transition>
        </div>
    </div>
</template>

<script>
import Toast from 'primevue/toast'
import Sidebar from '@/components/Sidebar.vue'
import VHeader from '@/components/Header.vue'


export default {
    components: {
        Sidebar, Toast, VHeader,
    },

    name: 'DefaultLayout'
}
</script>