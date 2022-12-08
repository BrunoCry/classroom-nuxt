<template>
  <div>
    <header class="flex align-items-center">
      <Button
        icon="pi pi-arrow-left"
        class="p-button-rounded p-button-text p-button-plain mr-2"
        @click="$router.push({name: 'last-messages'})"
      />
      <Avatar :image="dialog?.author?.profile_picture_path" shape="circle" class="mr-2" />
      <h2> {{dialog?.author?.full_name}}</h2>
    </header>
    <Divider />
    <main class="dialog-main" ref="block">
      <DialogComponent />
    </main>
    
  </div>
</template>

<script>
import DialogComponent from '@/components/chat/Dialog.vue'
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar'
import {mapGetters} from 'vuex'
import Button from 'primevue/button'

export default {
  components: {
    DialogComponent, Divider,
    Avatar, Button
  },
  async mounted() {
    await this.$store.dispatch('chat/getDialogDetail', this.$route.params.dialogId)
  },
  computed: {
    ...mapGetters({
      dialog: 'chat/dialog'
    }),
  },
}
</script>

<style scoped>
.dialog-main {
  margin-top: -15px;
}
</style>


