<template>
    <div>
        <Button label="Submit">
            123
        </Button>
    </div>
</template>

<script>
    import Sidebar from 'primevue/sidebar';
    import Button from 'primevue/button';

    export default {
        components: {
            Sidebar, Button
        },
        name: 'IndexPage',

        data () {
            return {
                sidebar: true
            }
        }
    }
</script>
