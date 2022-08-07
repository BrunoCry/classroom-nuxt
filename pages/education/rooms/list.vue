<template>
    <div class="rooms-page">
        <h2 class="mt-0">{{ $t('rooms.list') }} ({{ rooms.total }})</h2>
        <p>{{ $t('rooms.description') }}</p>
        <div class="pt-2 pb-4">
            <NuxtLink to="/rooms/create">
                <Button class="p-button-primary shadow-sm">{{ $t('rooms.create') }}</Button>
            </NuxtLink>
        </div>
        <div class="rooms-list grid">
            <template v-if="loading">
                <div class="xl:col-4 col-12">
                    <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                        <div class="flex align-items-center mb-2">
                            <Skeleton width="14rem" height="1.2rem" />
                            <Skeleton width="4rem" height="1.2rem" style="margin-left:auto;" />
                        </div>
                        <Skeleton />
                        <Divider />
                        <Skeleton height="4rem" class="mb-3" />
                        <Skeleton width="8rem" />
                    </div>
                </div>
                <div class="xl:col-4 col-12">
                    <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                        <div class="flex align-items-center mb-2">
                            <Skeleton width="14rem" height="1.2rem" />
                            <Skeleton width="4rem" height="1.2rem" style="margin-left:auto;" />
                        </div>
                        <Skeleton />
                        <Divider />
                        <Skeleton height="4rem" class="mb-3" />
                        <Skeleton width="8rem" />
                    </div>
                </div>
                <div class="xl:col-4 col-12">
                    <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                        <div class="flex align-items-center mb-2">
                            <Skeleton width="14rem" height="1.2rem" />
                            <Skeleton width="4rem" height="1.2rem" style="margin-left:auto;" />
                        </div>
                        <Skeleton />
                        <Divider />
                        <Skeleton height="4rem" class="mb-3" />
                        <Skeleton width="8rem" />
                    </div>
                </div>
            </template>
            <template v-else>
                <template v-if="rooms.items && rooms.items.length != 0">
                    <NuxtLink :to="'/rooms/show/' + room.room.id" v-for="room in rooms.items" class="xl:col-4 col-12" :key="room.id">
                        <div class="room-card bg-white border-solid border-1 p-3 border-round-lg border-300">
                            <div class="flex align-items-center mb-2">
                                <h3 class="m-0 white-space-nowrap overflow-hidden text-overflow-ellipsis">{{ room.room.name }}</h3>
                                <span class="ml-auto flex align-items-center"><i class="pi pi-user mr-2"></i> {{ room.room.participations_count }}</span>
                            </div>
                            <span class="text-sm">Created by <b>{{ room.room.author.first_name}} {{ room.room.author.last_name}}</b></span>
                            <Divider />
                            <p>{{ room.room.description }}</p>
                            <span class="text-xs">{{ room.room.created_at }}</span>
                        </div>
                    </NuxtLink>
                </template>
                <template v-else>
                    <div class="col-12">
                        <Message :closable="false" severity="warn">At the moment you are not a member of any rooms. Join or create your own room!</Message>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';
    import Skeleton from 'primevue/skeleton';
    import Message from 'primevue/message';
    import { mapGetters } from 'vuex';

    export default {
        name: 'RoomsListPage',

        components: {
            Button, Divider, Skeleton, Message
        },

        data () {
            return {
                loading: true
            }
        },

        computed: mapGetters({
            rooms: 'rooms/items'
        }),

        async created() {
          // this.$store.dispatch('rooms/getRooms')
          //   setTimeout(() => {
          //       this.loading = false
          //   }, 100)
          await this.$store.dispatch('rooms/getRooms')
          this.loading = false
        }
    }
</script>