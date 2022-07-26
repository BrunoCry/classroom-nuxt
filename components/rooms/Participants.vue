<template>
    <div class="participants-list">
        <template v-if="loading">
            <div class="member flex align-items-center mb-3">
                <Skeleton shape="circle" size="3rem" class="mr-3" />
                <div>
                    <Skeleton width="10rem" class="mb-1" />
                    <Skeleton width="7rem" class="mb-1" />
                </div>
            </div>
            <div class="member flex align-items-center mb-3">
                <Skeleton shape="circle" size="3rem" class="mr-3" />
                <div>
                    <Skeleton width="12rem" class="mb-1" />
                    <Skeleton width="6rem" class="mb-1" />
                </div>
            </div>
            <div class="member flex align-items-center">
                <Skeleton shape="circle" size="3rem" class="mr-3" />
                <div>
                    <Skeleton width="9rem" class="mb-1" />
                    <Skeleton width="8rem" class="mb-1" />
                </div>
            </div>
        </template>
        <template v-else>
            <div v-for="member in participants.items" class="member flex align-items-center mb-3" :key="member.id">
                <Avatar :image="member.user.profile_picture_path" class="mr-3" size="large" shape="circle" />
                <div>
                    <h4 class="mt-0 mb-1">{{ member.user.first_name }} {{ member.user.last_name }}</h4>
                    <span>{{ member.user.email }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Avatar from 'primevue/avatar';
    import Skeleton from 'primevue/skeleton';

    export default {
        components: {
            Avatar, Skeleton
        },

        data () {
            return {
                loading: true
            }
        },

        computed: {
            ...mapGetters({
                participants: 'participants/items'
            })
        },

        async created () {
            await this.$store.dispatch(
                'participants/getParticipations',
                this.$route.params.id
            )

            setTimeout(() => {
                this.loading = false
            }, 1000)
        }
    }
</script>