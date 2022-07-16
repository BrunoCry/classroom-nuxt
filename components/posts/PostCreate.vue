<template>
    <div class="attachments-add">
        <div class="flex align-items-center mb-3">
            <Button @click.prevent="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
            <h2 class="my-0">{{ post.id ? post.title : 'Add new post' }}</h2>
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
                <Button @click.prevent="createPost()" class="mt-3">{{ post.id ? 'Update post' : 'Create post' }}</Button>
            </div>
            <div class="col-12 xl:col-4">
                <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                    <h3 class="my-0">Attached files</h3>
                    <AttachmentList :editable="true" />
                    <Divider />
                </div>
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
import AttachmentList from '@/components/attachments/AttachmentList.vue'


export default {
    components: {
        Button, InputText, Textarea, FileUpload,
        Divider, AttachmentList,
    },

    data () {
        const post = this.$store.getters['roomposts/item']

        return {
            form: {
                title: post.title,
                text: post.text,
                description: post.description,
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
        async createNewPost(postForm, attachments) {
            await this.create(postForm)

            this.$toast.add({
                severity:'success',
                summary:'Success',
                detail:'Post Added',
                life: 3000
            })

            this.attachFiles({
                postId: this.post.id,
                attachments: attachments,
            })
            this.$store.commit('attachments/SET_ITEMS', [])
            this.$store.commit('roomposts/SET_ITEM', {})
        },

        async updatePost({ postId, requestBody }) {
            await this.$store.dispatch('roomposts/update', {
                postId: postId,
                requestBody: requestBody
            })

            let filesToAttach = this.attachments.filter(e => !e.id)

            this.attachFiles({
                postId: this.post.id,
                attachments: filesToAttach,
            })

            this.$toast.add({
                severity:'info',
                summary:'Success',
                detail:'Post updated',
                life: 3000
            })
        },

        async createPost() {
            if(!this.post.id) {
                await this.createNewPost(
                    this.form,
                    this.$store.getters['attachments/items'],
                )
            } else {
                await this.updatePost(
                    { postId: this.post.id, requestBody: this.form }
                )
            }
        },

        async createAttachments(event) {
            this.attachments = this.attachments.concat(event.files)
            let newAttachments = [...this.$store.getters['attachments/items']]

            for(let i = 0; i < event.files.length; i++) {
                newAttachments.push(event.files[i])
            }

            this.$store.commit('attachments/SET_ITEMS', newAttachments)
            this.$toast.add({
                severity:'info',
                summary:'Success',
                detail:`Attachments added`,
                life: 3000,
            })
        },
    }
}
</script>