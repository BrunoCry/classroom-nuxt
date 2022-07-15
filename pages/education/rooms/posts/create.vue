<template>
    <div class="attachments-add">
        <div class="flex align-items-center mb-3">
            <Button @click.prevent="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
            <h2 class="my-0">Add attachment to room</h2>
        </div>
        <div class="grid">
            <div class="col-12 xl:col-5">
                <label class="text-sm mb-3 block">Type of post: <b>{{ $route.query.type }}</b></label>
                <div class="mb-3">
                    <InputText v-model="form.title" placeholder="Title of post" class="block w-full" />
                    <span class="text-sm text-red-400" v-if="errors.title">{{ errors.title }}</span>
                </div>
                <InputText v-model="form.description" placeholder="Description of post" class="block w-full mb-3" />
                <Textarea v-model="form.text" placeholder="Text of room" autoresize="true" class="block w-full mb-3" rows="6" />

                <Divider align="center" type="dashed" class="text-sm">
                    <b>Attach files</b>
                </Divider>

                <FileUpload name="demo[]" :customUpload="true" @uploader="createAttachments" v-model="this.attachments" :multiple="true"/>
                <Button @click.prevent="createPost()" class="mt-3">Create post</Button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button'
import Divider from 'primevue/divider';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { mapActions, mapGetters } from 'vuex'
import List from '../../../../components/attachments/List.vue'
import Control from '../../../../components/attachments/Control.vue'


export default {
    components: {
        Button, InputText, Textarea, List, Control, FileUpload,
        Divider,
    },

    data () {
        return {
            form: {
                title: '',
                text: '',
                description: '',
                room_id: this.$route.params.id,
                type: this.$route.query.type || 'material'
            },
            attachments: [],
        }
    },

    computed: {
        ...mapGetters({
            errors: 'roomposts/errors',
            post: 'roomposts/item'
        }),
    },

    methods: {
        ...mapActions({
            create: 'roomposts/create',
            attachFiles: 'attachments/create'
        }),

        back() {
            this.$router.go(-1)
        },

        async createPost() {
            await this.create(this.form)

            if(this.post.id) {
                this.$toast.add({
                    severity:'success',
                    summary:'Success',
                    detail:'Post Added',
                    life: 3000
                })

                this.attachFiles({
                    postId: this.post.id,
                    attachments: this.attachments,
                })
            }
        },

        async createAttachments(event) {
            this.attachments = this.attachments.concat(event.files)
            this.$toast.add({
                severity:'info',
                summary:'Success',
                detail:`Attachments added. Current added files: ${this.attachments.length}`,
                life: 3000
            })
        },
    }
}
</script>