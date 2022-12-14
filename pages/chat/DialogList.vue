<template>
  <div>
    <header class="border-round-lg min-h-4rem flex box-sadow ">
      <div>
        <h2 class="mt-0">List of your dialogs</h2>
      </div>
    </header>
    <main>
      <div class="flex flex-wrap">
        <ChatCard v-for="message in lastMessages" :key="message.id" :message="message" />
      </div>
    </main>
    <footer class="flex">
    </footer>
  </div>
</template>

<script>
import ChatCard from '@/components/chat/ChatCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChatCard
  },
  data() {
    return {
      dialogName: "Чат папича с дядей богданом"
    }
  },
  computed: {
    ...mapGetters({
      lastMessages: 'chat/lastMessages'
    })
  },
  async mounted() {
    await this.$store.dispatch('chat/getAllUserLastMessages')
  }
}
</script>

<style>
.chat-header {
  border: 1px solid rgb(222, 222, 222);
}
.chat-main {
  border: 1px solid rgb(222, 222, 222);
  height: 100%;
  height: calc(100vh - 145px);
}
.chat-card-main {
  height: 79vh!important;
  position: relative!important;
}
</style>