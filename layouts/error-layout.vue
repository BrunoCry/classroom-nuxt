<template>
    <div class="error-layout">
        <Nuxt />
    </div>
</template>

<script>
    export default {
        name: 'ErrorLayout',

        head: {
            bodyAttrs: {
                class: 'no-padding overflow-x-hidden'
            }
        }
    }
</script>