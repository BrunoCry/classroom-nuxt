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
            await this.$store.dispatch('rooms/getRoom', this.$route.params.id)
            await this.$store.dispatch('users/getCurrentUser')
            await this.$store.dispatch('roomposts/fetch', this.$route.params.id)
            
            this.$store.commit(
                'rooms/SET_CAN_MODERATE',
                this.$store.getters['rooms/item'].author.id === this.$store.getters['users/currentUser'].id
            )

            setTimeout(() => {
                this.loading = false
            }, 800)
        }
    }
</script>