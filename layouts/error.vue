<template>
    <div class="error-page">
        <div class="grid justify-content-center">
            <div class="col-12 xl:col-5">
                <h1 class="error-code">
                    {{ error.statusCode }}
                </h1>
            </div>
            <div class="col-12 xl:col-5">
                <h2 class="error-oops">Oops!</h2>
                <div v-if="error.statusCode === 404" class="block mb-4">
                    This page could not be found :(
                </div>
                <div v-else class="block mb-4">
                    {{ error.message }}
                </div>
                <NuxtLink to="/">
                    <Button class="py-2">Go back to home page</Button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from 'primevue/button';

    export default {
        props: ['error'],

        components: {
            Button
        },

        layout: 'error-layout'
    }
</script>