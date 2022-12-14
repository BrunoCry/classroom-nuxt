<template>
    <div class="room-join">
        <h2>You are joined the room</h2>
        <p>Redirecting to room list...</p>
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
            this.$router.push({ name: 'rooms.list' })
        }
    }
</script>