<template>
    <div class="rooms-page">
        <h2 class="mt-0">{{ $t('rooms.list') }} ({{ rooms.total }})</h2>
        <p>{{ $t('rooms.description') }}</p>
        <div class="pt-2 pb-4">
            <NuxtLink to="/rooms/create">
                <Button class="p-button-primary shadow-sm">{{ $t('rooms.create') }}</Button>
            </NuxtLink>
        </div>
        <div class="rooms-list">
            <template v-if="loading">
              <div class="flex">
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
              </div>
            </template>
            <template v-else>
                <div v-if="rooms.total > 0">
                    <div class="room-card-container">
                      <NuxtLink :to="'/rooms/show/' + room.room.id" v-for="room in rooms.items" class="xl:col-4 col-12" :key="room.id">
                          <div class="room-card bg-white border-solid border-1 p-3 border-round-lg border-300">
                              <div class="flex align-items-center mb-2">
                                  <h3 class="m-0 white-space-nowrap overflow-hidden text-overflow-ellipsis">{{ room.room.name }}</h3>
                                  <span class="ml-auto flex align-items-center"><i class="pi pi-user mr-2"></i> {{ room.room.participations_count }}</span>
                              </div>
                              <span class="text-sm">Created by <b>{{ room.room.author.first_name}} {{ room.room.author.last_name}}</b></span>
                              <Divider />
                              <p class="room-description">{{ room.room.description }}</p>
                              <span class="text-xs">{{ new Date(room.room.created_at) | dateFormat('YYYY.MM.DD') }}</span>
                          </div>
                      </NuxtLink>
                    </div>
                    <Paginator v-if="rooms.total > rows" :first="startItem" :rows="rows" :totalRecords="this.rooms.total" class="pagination" @page="onPage($event)"></Paginator>
                </div>
                <div v-else>
                    <div class="col-12">
                        <Message :closable="false" severity="warn">At the moment you are not a member of any rooms. Join or create your own room!</Message>
                    </div>
                </div>
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
    import Paginator from 'primevue/paginator';

    export default {
        name: 'RoomsListPage',
        scrollToTop: false,
        components: {
            Button, Divider, Skeleton, Message,
            Paginator
        },

        data () {
            return {
                loading: true,
                currentPage: 0,
                rows: 50
            }
        },
        methods: {
          async onPage(e) {
            if(e.page != this.currentPage){
              this.loading = true
              this.currentPage = e.page
              localStorage.currentPage = e.page
              await this.$store.dispatch('rooms/getRooms', this.currentPage)
              await this.$router.push({query: {roomPage: this.currentPage}})
              this.loading = false
            }
          },
          showScroll() {
            console.log(document.querySelector('.el-for-scroll').scrollTop, document.body.scrollHeight, document.body.offsetHeight)
          }
        },

        async mounted() {
          this.loading = true
          if(this.$route.query.roomPage) {
            this.currentPage = this.$route.query.roomPage
            await this.$store.dispatch('rooms/getRooms', this.currentPage)
          }
          if(!this.$route.query.roomPage && localStorage.currentPage) {
            this.currentPage = localStorage.currentPage
            await this.$store.dispatch('rooms/getRooms', this.currentPage)
          }
          if(!this.$route.query.roomPage && !localStorage.currentPage){
            await this.$store.dispatch('rooms/getRooms', 0)
          }
          this.loading = false
        },
        updated() {
          //console.log(this.$route, this.$router)
          // if(this.$route.meta.scrollPos.y) {
          //   window.scrollTo(0, this.$route.meta.scrollPos.y)
          // } offsetHeight
          
        },
        computed: {
          ...mapGetters({
            rooms: 'rooms/items',
            //totalRoomsCount: 'rooms/totalRoomsCount'
          }),
          startItem() {
            return this.currentPage * this.rows
          }
        },

        async created() {
          //await this.$store.dispatch('rooms/getRooms') здесь должен быть эндпоинт на количество всех комнат
          
        }
    }
</script>

<style lang="scss" scoped>
.room-card-container {
  display: flex;
  flex-wrap: wrap;
}

.rooms-list {
  min-height: 805px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-card {
  height: 100%;
}

.el-for-scroll {
  height: 50px;
  overflow: auto;
}
</style>