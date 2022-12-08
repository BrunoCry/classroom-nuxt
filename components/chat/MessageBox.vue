<template>
    <div :class="`flex mb-2 ${isNotMyMessage ? '' : 'justify-content-end'}`">
      <div :class="`flex px-2 border-round-lg xl:max-w-27rem max-w-20rem align-items-center border-1 border-300
        ${isNotMyMessage ? '' : 'justify-content-end bc-color-own-message'}`"
      >
        <Avatar v-if="isNotMyMessage" class="message-box-avatar" :image="message.sender.profile_picture_path" shape="circle" />
        <p :class="`word-break ${isNotMyMessage ? 'ml-2' : 'justify-content-end'}`">
          {{message.text}}
        </p>
      </div>
    </div>
</template>

<script>
import Avatar from 'primevue/avatar'
import { mapGetters } from 'vuex'

export default {
  components: {
    Avatar
  },
  props: {
    message: Object
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      user: 'users/currentUser'
    }),
    isNotMyMessage() {
      return this.user.id !== this.message.sender.id ? true : false
    },
  }
}
</script>

<style>
.display-none {
  display: none;
}
.message-box-avatar {
    min-width: 40px;
    min-height: 40px;
    margin-bottom: auto;
    margin-top: 5px;
}
.bc-color-own-message {
  background-color: #4F46E5;
  color: #fff;
}
.word-break {
  word-break: break-all;
  white-space: normal
}

</style>