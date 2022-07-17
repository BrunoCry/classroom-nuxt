<template>
    <div class="rooms-show">
        <template v-if="loading">
            <div class="flex justify-content-center">
                <ProgressSpinner />
            </div>
        </template>
        <template v-else>
            <AssignmentsList />
        </template>
    </div>
</template>

<script>
    import ProgressSpinner from 'primevue/progressspinner';
    import AssignmentsList from '@/components/assignments/AssignmentsList.vue'

    export default {
        components: {
            AssignmentsList, ProgressSpinner
        },

        data () {
            return {
                loading: true
            }
        },

        async created () {
            const roomId = this.$route.params.roomId

            await this.$store.dispatch('assignments/fetch', this.$route.query)
            await this.$store.dispatch('participants/current', roomId)
            await this.$store.dispatch('users/getCurrentUser')

            setTimeout(() => {
                this.loading = false
            }, 800)
        }
    }
</script>