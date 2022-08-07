<template>
    <div class="rooms-edit">
        <template v-if="loading">
            <div class="flex justify-content-center">
                <ProgressSpinner />
            </div>
        </template>
        <template v-else>
            <div class="flex align-items-center mb-3">
                <NuxtLink to="/rooms">
                    <Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
                </NuxtLink>
                <h2 class="my-0">Edit room</h2>
            </div>
            <span class="text-sm mb-3 block">
                Last update: {{ room.updated_at }}
            </span>
            <div class="grid">
                <div class="col-12 xl:col-4">
                    <label for="first_name" class="mb-1 block">Name of room</label>
                    <InputText id="first_name" v-model="form.name" class="block w-full mb-4" placeholder="Enter a name of the room..." />

                    <label for="first_name" class="mb-1 block">Description of room</label>
                    <Textarea v-model="form.description" placeholder="Enter a description of the room..." :autoResize="true" rows="6" class="block w-full mb-3" />

                    <Button @click.prevent="updateRoomById()">Update the room</Button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import InputText from 'primevue/inputtext'
    import ProgressSpinner from 'primevue/progressspinner'
    import Button from 'primevue/button'
    import Textarea from 'primevue/textarea'

    export default {
        components: {
            InputText, ProgressSpinner, Button, Textarea
        },
        data () {
            return {
                form: {
                    name: '',
                    description: ''
                },
                loading: true
            }
        },

        computed: {
            ...mapGetters({
                room: 'rooms/item',
                errors: 'rooms/errors'
            })
        },

        methods: {
            ...mapActions({
                updateRoom: 'rooms/updateRoom'
            }),

            async updateRoomById() {
                await this.updateRoom({
                    roomId: this.$route.params.id,
                    requestBody: this.form
                })

                if(Object.keys(this.errors).length == 0) {
                    this.$router.push({ name: 'rooms.show', params: { id: this.room.id } })
                }
            }
        },
        async created() {
            await this.$store.dispatch(
                'rooms/getRoom',
                this.$route.params.id
            )

            setTimeout(() => {
                this.loading = false
            }, 100)

            this.form.name = this.room.name
            this.form.description = this.room.description
        }
    }
</script>