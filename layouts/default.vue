<template>
    <div class="page">
        <sidebar />
        <div class="container p-5">
            <transition name="fade">
                <div>
                    <Toast />
                    <Nuxt />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Toast from 'primevue/toast';
import Sidebar from '@/components/Sidebar.vue'

export default {
    components: {
        Sidebar, Toast
    },

    name: 'DefaultLayout'
}
</script>