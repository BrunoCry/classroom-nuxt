<template>
    <div class="auth-page">
        <Toast />
        <Nuxt />
    </div>
</template>

<script>
    import Toast from 'primevue/toast';


    export default {
        components: {
            Toast,
        },
        name: "AuthLayout",
        head: {
            bodyAttrs: {
                class: 'no-padding'
            }
        }
    }
</script>