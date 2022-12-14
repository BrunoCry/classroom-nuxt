<template>
  <div @click="$router.push({ path: '/dialogs/' + message.dialog.id})" class="col-12 cursor-pointer xl:col-4 col-12">
    <div class="room-card bg-white p-3 border-round-lg border-300 shadow-2">
        <div class="flex flex-column mb-3" >
          <div class="flex avatar-container align-items-center">
            <Avatar :image="participant.profile_picture_path" class="mr-3" size="large" shape="circle" />
            <h4>{{participant.full_name}}</h4>
          </div>
        </div>
        <Divider />
        <div class="flex align-items-center">
          <div>
            <Avatar :image="message.sender.profile_picture_path" class="mr-2" shape="circle" />
          </div>
          <p class="white-space-nowrap overflow-hidden text-overflow-ellipsis max-w-14rem">{{message.text}}</p>
        </div>
        <Divider />
        <div class="flex flex-column">
          <div class="flex">
            <ParticipantsAvatar  :message="message"/>
          </div>
          <span class="text-xs mt-2 text-overflow-ellipsis">{{$moment(timeFromLastMessage).fromNow()}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'
import ParticipantsAvatar from '@/components/chat/ParticipantsAvatar.vue'

export default {
  components: {
    Divider, Avatar,
    ParticipantsAvatar
  },
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  computed: {
    participant() {
      let participant = this.message.dialog.participants
      .find(participant => participant.id != this.$store.getters['users/currentUser'].id);
      return participant
    },
    timeFromLastMessage() {
      return this.message.created_at + '+00:00'
    }

  },
}
</script>

<style scoped>
.room-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap !important;
}
</style>