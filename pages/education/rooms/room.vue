<template>
    <div class="rooms-show">
        <template v-if="loading">
            <div class="flex justify-content-center">
                <ProgressSpinner />
            </div>
        </template>
        <template v-else>
            <RoomDetails />
        </template>
    </div>
</template>

<script>
    import RoomDetails from '../../../components/rooms/RoomDetails.vue';
    import ProgressSpinner from 'primevue/progressspinner';

    export default {
        components: {
            RoomDetails, ProgressSpinner
        },

        data () {
            return {
                loading: true
            }
        },

        async created () {
            const roomId = this.$route.params.id
            await this.$store.dispatch('rooms/getRoom', roomId)
            await this.$store.dispatch('users/getCurrentUser')
            await this.$store.dispatch('roomposts/fetch', roomId)
            await this.$store.dispatch('participants/current', roomId)

            setTimeout(() => {
                this.loading = false
            }, 800)
        }
    }
</script>