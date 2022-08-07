<template>
    <div v-if="!loading" class="participants-list">
      <transition name="fade_mem" mode="out-in">
        <component :is="activeComponent"></component>
      </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Avatar from 'primevue/avatar';
    import Skeleton from 'primevue/skeleton';
    import PreLoad from '@/components/rooms/MemPreLoad';
    import Members from '@/components/rooms/Members';

    export default {
        components: {
            Avatar, Skeleton,
            PreLoad, Members
        },

        data () {
            return {
                loading: true,
                activeComponent: 'PreLoad'
            }
        },

        computed: {
            ...mapGetters({
                participants: 'participants/items'
            })
        },

        async created () {
            await this.$store.dispatch('participants/getParticipations', this.$route.params.id)
            this.activeComponent = 'Members'
            this.loading = false
        }
    }
</script>

<style scoped>
.participants-list {
  position: relative;
}
.content {
  position: absolute;
  top: 0;
}

.fadev-enter-active, 
.fadev-leave-active { 
  transition: all .5s ease;
}

.fadev-leave-active, 
.fadev-enter { 
  opacity: 0;
  display: none;
}
</style>