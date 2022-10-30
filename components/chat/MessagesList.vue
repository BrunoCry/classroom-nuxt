<template>
  <div class="message-wrapper" ref="messageWrapper">
    <MessageBox v-for="message, index in messages" :key="index" :message="message" />
  </div>
</template>

<script>
import MessageBox from '@/components/chat/MessageBox'

export default {
  components: {
    MessageBox
  },
  props: {
    messages: Array
  },
  data() {
    return {
      isNotLoadMessages: false,
    }
  },
  mounted(){
    this.$refs.messageWrapper.style.opacity = 0
  },
  watch: {
    async messages() {
      await setTimeout( () => {
        this.$refs.messageWrapper.scrollTop = this.$refs.messageWrapper.scrollHeight
      })
      setTimeout( () => {
        this.$refs.messageWrapper.style.opacity = 1
      }, 100)
    }
  }
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