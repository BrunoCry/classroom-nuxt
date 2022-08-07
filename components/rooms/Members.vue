<template>
  <div>
    <div v-for="member in participants.items" class="member flex align-items-center mb-3" :key="member.id">
        <Avatar :image="member.user.profile_picture_path" class="mr-3" size="large" shape="circle" />
        <div>
            <h4 class="mt-0 mb-1">{{ member.user.first_name }} {{ member.user.last_name }}</h4>
            <span>{{ member.user.email }}</span>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Avatar from 'primevue/avatar';

  export default {
    components: {
      Avatar
    },

    data () {
      return {
        loading: true
      }
    },

    computed: {
      ...mapGetters({
        participants: 'participants/items'
      })
    },
  }
</script>