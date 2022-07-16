<template>
    <div class="rooms-show">
        <template>
            <PostCreate />
        </template>
    </div>
</template>

<script>
    import PostCreate from '@/components/posts/PostCreate.vue'

    export default {
        components: {
            PostCreate
        },
        async created() {
            await this.$store.commit('roomposts/SET_ITEM', {})
            await this.$store.commit('attachments/SET_ITEMS', [])
        }
    }
</script>