<template>
    <div class="page">
        <sidebar />
        <div class="container p-5">
            <transition name="fade">
                <Nuxt />
            </transition>
        </div>
    </div>
</template>

<script>
    import Sidebar from '@/components/Sidebar.vue'

    export default {
        components: {
            Sidebar
        },

        name: 'DefaultLayout'
    }
</script>