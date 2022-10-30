<template>
  <div>
    <header class="flex align-items-center">
      <Avatar :image="lastMessage?.author?.profile_picture_path" shape="circle" class="mr-2" />
      <h2> {{lastMessage?.author?.full_name}}</h2>
    </header>
    <Divider />
    <main class="dialog-main" ref="block">
      <Dialog />
    </main>
  </div>
</template>

<script>
import Dialog from '@/components/chat/Dialog.vue'
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar'
import {mapGetters} from 'vuex'
export default {
  components: {
    Dialog, Divider,Avatar
  },
  async mounted() {
    await this.$store.dispatch('chat/getDialogDetail', this.$route.params.dialogId)
  },
  computed: {
    ...mapGetters({
      lastMessage: 'chat/lastMessage'
    }),
  },
}
</script>

<style scoped>
.dialog-main {
  margin-top: -15px;
}
</style>


