<template>
    <div class="room-join">
        123
    </div>
</template>

<script>
    export default {
        async created() {
            try {
                await this.$store.dispatch('rooms/join', this.$route.params.link)
                this.$toast.add({
                    severity:'success',
                    summary:'Success',
                    detail:'You are joined a new room!',
                    life: 3000
                })
            } catch (e) {
                console.error(e.response)
            }
        }
    }
</script>