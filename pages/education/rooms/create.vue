<template>
    <div class="rooms-create">
        <Toast />
        <div class="flex align-items-center mb-3">
            <NuxtLink to="/rooms">
                <Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
            </NuxtLink>
            <h2 class="my-0">Create new room</h2>
        </div>
        <div class="xl:col-4 col-12">
            <div class="mb-3">
                <InputText placeholder="Name of your room" v-model="form.name" class="block w-full" />
                <span class="text-sm text-red-400">{{ errors.name }}</span>
            </div>
            <Textarea placeholder="Description of room" v-model="form.description" :autoResize="true" rows="6" class="block w-full mb-3" />
            <Button @click="createRoom()">Create new room</Button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import Textarea from 'primevue/textarea';
    import Toast from 'primevue/toast';

    export default {
        name: 'CreateRoomPage',

        components: {
            InputText, Textarea, Button, Toast
        },

        data () {
            return {
                form: {
                    name: '',
                    description: ''
                }
            }
        },

        computed: {
            ...mapGetters({
                errors: 'rooms/errors'
            }),

            joinLink() {
                return window.location.host + this.$router.resolve(
                    { name: 'room.join', params: { join_slug: this.room.join_slug } }
                ).fullPath
            }
        },

        methods: {
            ...mapActions({
                createNewRoom: 'rooms/createRoom'
            }),
            async createRoom() {
                await this.createNewRoom(this.form)

                if(Object.keys(this.errors).length == 0) {
                    this.$toast.add({
                        severity:'success',
                        summary: 'Success!',
                        detail:'You have successfully created a new room',
                        life: 3000
                    });
                    this.$router.push({ name: 'rooms.list' })
                }
            }
        }
    }
</script>