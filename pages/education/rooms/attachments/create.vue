<template>
    <div class="attachments-add">
        <div class="flex align-items-center mb-3">
            <Button @click.prevent="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
            <h2 class="my-0">Add attachment to room</h2>
        </div>
        <div class="grid">
            <div class="col-12 xl:col-4">
                {{ errors }}
                <label class="text-sm mb-3 block">Type of attachment: <b>{{ $route.query.type }}</b></label>
                <div class="mb-3">
                    <InputText v-model="form.title" placeholder="Title of room" class="block w-full" />
                    <span class="text-sm text-red-400" v-if="errors.title">{{ errors.title }}</span>
                </div>
                <InputText v-model="form.text" placeholder="Text of room" class="block w-full mb-3" />
                <Textarea v-model="form.description" placeholder="Description of room" autoresize="true" class="block w-full mb-3" rows="6" />
                <Control />
                <List />
                <Button @click.prevent="createAttachment()" class="mt-3">Create attachment</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import Textarea from 'primevue/textarea'
    import { mapActions, mapGetters } from 'vuex'
    import List from '../../../../components/attachments/List.vue'
    import Control from '../../../../components/attachments/Control.vue'

    export default {
        components: {
            Button, InputText, Textarea, List, Control
        },

        data () {
            return {
                form: {
                    title: '',
                    text: '',
                    description: '',
                    room_id: this.$route.params.id,
                    type: this.$route.query.type || 'material'
                }
            }
        },

        computed: {
            ...mapGetters({
                errors: 'roomposts/errors',
            })
        },

        methods: {
            ...mapActions({
                create: 'roomposts/create',
                attachFiles: 'roomposts/attachFilesToRoomPost'
            }),

            back() {
                this.$router.go(-1)
            },

            async createAttachment() {
                await this.create(this.form)
            }
        }
    }
</script>