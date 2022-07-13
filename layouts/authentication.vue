<template>
    <div class="auth-page">
        <Nuxt />
    </div>
</template>

<script>
    export default {
        name: "AuthLayout",
        head: {
            bodyAttrs: {
                class: 'no-padding'
            }
        }
    }
</script>