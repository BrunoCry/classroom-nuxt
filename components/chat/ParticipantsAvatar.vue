<template>
  <div class="flex">
    <Avatar v-for="avatar in avatars" :key="avatar" :image="avatar" class="mr-3" shape="circle" />
  </div>
</template>

<script>
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'

export default {
  components: {
    Avatar
  },
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  mounted() {
  },
  computed: {
    avatars() {
      return this.message?.dialog?.participants?.map(participant => {
        return participant?.profile_picture_path
      })
    }
  },
  data() {
    return {
    }
  }
  
}
</script>

<style>

</style>