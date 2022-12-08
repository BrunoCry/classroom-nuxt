<template>
  <div  class="message-wrapper" ref="messageWrapper">
    <Button @click="loadMessages" v-if="dialog.messages_count > diaogMessages.length" class="mb-2 m-auto">{{$t('messages.showMore')}}</Button>
    <MessageBox v-for="message, index in diaogMessages" :key="index" :message="message" />
  </div>
</template>

<script>
import MessageBox from '@/components/chat/MessageBox'
import Button from 'primevue/button';
import { mapGetters } from 'vuex';

export default {
  components: {
    MessageBox, Button
  },
  data() {
    return {
      scrollFromTop: this.$refs.messageWrapper?.scrollTop,
    }
  },
  methods: {
    async loadMessages() {
      await this.$store.dispatch('chat/loadMessages', {offset: this.diaogMessages.length, limit: 15, dialog_id: this.$route.params.dialogId})
    }
  },
  mounted(){
    this.$refs.messageWrapper.style.opacity = 0
    //setInterval(() => {console.log(this.$refs.messageWrapper?.scrollTop)}, 500)
  },
  computed: {
    ...mapGetters({
        diaogMessages: 'chat/diaogMessages',
        dialog: 'chat/dialog',
        errors: 'chat/diaogMessages'
      })
    
    // scrollFromTop() {
    //   return this.$refs.messageWrapper?.scrollTop
    // }
  },
  watch: {
    async diaogMessages() {
      await setTimeout( () => {
        this.$refs.messageWrapper.scrollTop = this.$refs.messageWrapper.scrollHeight
      })
      setTimeout( () => {
        this.$refs.messageWrapper.style.opacity = 1
      }, 100)
    },
    scrollFromTop() {
      if(this.$refs.messageWrapper?.scrollTop === 0) {
        console.log('Мы наверху')
      }
      console.log('Мы наверху')
    }
  },
  
}
</script>

<style>
.message-wrapper {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0px;
  bottom: 45px;
  overflow-y: auto;
  padding: 5px;

  display: flex;
  flex-direction: column;
}

.message-wrapper::-webkit-scrollbar {
  width: 7px;
}
.message-wrapper::-webkit-scrollbar-track {
  background: rgb(231, 231, 231);
  border-radius: 20px;
}
.message-wrapper::-webkit-scrollbar-thumb {
  background-color: #4F46E5;
  border-radius: 20px;
}
</style>