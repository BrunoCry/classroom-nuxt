<template>
  <div class="flex flex-column dialog-container">
    <MessagesList />
    <div class="flex align-items-center input-message-container" >
      <InputText class="message-input" type="text" v-model="messageText" id="" @keyup.enter="sendMessage($event)" />
      <label for="text" class="file-label">
        <i class="pi pi-paperclip" style="font-size: 2rem"></i>
      </label>
      <input @change="show" v-bind="files" type="file" id="text" class="file-input">
    </div>
  </div>
</template>

<script>
import { WS_URL } from '@/utils/config';
import InputText from 'primevue/inputtext'
import MessagesList from '@/components/chat/MessagesList'
export default {
  components: {
    InputText, MessagesList
  },
    data() {
        return {
            messages: [],
            messageText: '',
            files: [],
        }
    },
    created() {
        if (process.client) {
            const dialogId = this.$route.params.dialogId
            const token = this.$store.getters['users/token']

            const socket = new WebSocket(WS_URL + `api/v1/chat/?jwt_token=${token}&dialog_id=${dialogId}&limit=20`)
            socket.onmessage = (message) => { this.$store.commit('chat/PUSH_DIALOG_MESSAGE', JSON.parse(message.data))}
            this.socket = socket;
        }
        
    },
    async mounted() {
    },
    watch: {
    },
    methods: {
      sendMessage(e) {
        if(this.messageText !== '') {
          this.socket.send(JSON.stringify({ text: this.messageText }))
          this.messageText = ""
        }
        
      },
      show(e) {
        console.log(e.target.files)
      }
    }
}
</script>

<style>
.dialog-container {
  min-height: 79vh;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.message-input {
  width: 100%;
  margin-left: 45px;
}
.file-label {
  position: absolute;
  left: 5px;
  opacity: 0.5;
  cursor: pointer;
}
.file-input {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
}
.input-message-container {
  position: absolute;
  bottom: 1px;
  left: 0;
  right: 8px;
}
</style>