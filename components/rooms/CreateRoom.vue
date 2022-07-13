<template>
    <Dialog v-model:visible="modal" :modal="true" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
        <p>123123</p>
        <template #footer>
            123
        </template>
    </Dialog>
</template>

<script>
    import Dialog from 'primevue/dialog';

    export default {
        props: {
            open: Boolean
        },

        name: 'CreateRoomComponent',

        components: { Dialog },

        data () {
            return {
                modal: true
            }
        }
    }
</script>