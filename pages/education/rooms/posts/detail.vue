<template>
    <div class="rooms-show">
      <transition name="fade_mem" mode="out-in">
        <template v-if="loading">
            <div class="flex justify-content-center">
                <ProgressSpinner />
            </div>
        </template>
        <template v-else>
            <PostDetail />
        </template>
      </transition>
    </div>
</template>

<script>
    import PostDetail from '@/components/posts/PostDetail.vue';
    import ProgressSpinner from 'primevue/progressspinner';

    export default {
        components: {
            PostDetail, ProgressSpinner
        },

        data () {
            return {
                loading: true
            }
        },

        async created () {
            const roomId = this.$route.params.roomId
            const postId = this.$route.params.postId

            await this.$store.dispatch('roomposts/get', postId)
            await this.$store.dispatch('participants/current', roomId)
            await this.$store.dispatch('users/getCurrentUser')

            const post = this.$store.getters['roomposts/item']

            await this.$store.commit('attachments/SET_ITEMS', post.attachments)

            this.loading = false
        }
    }
</script>