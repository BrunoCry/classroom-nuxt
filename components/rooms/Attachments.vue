<template>
    <div class="attachments-block">
        <NuxtLink to="/home" v-for="(item, key) in typedPosts" class="bg-white border-solid border-1 p-3 border-round-lg border-300 mb-4 block" :key="key">
            <div class="flex align-items-center">
                <i class="pi pi-file" style="font-size:1.8rem;margin-right:1.3rem"></i>
                <div>
                    <div class="flex align-items-center">
                        <h4 class="mt-0 mb-2 mr-auto">{{ item.title }}</h4>
                    </div>
                    <span>{{ item.description }}</span>
                </div>
            </div>
            <Divider />
            <div class="flex align-items-center text-sm">
                <span class="time text-gray-500">{{ item.created_at }}</span>
                <span class="files ml-auto">{{ item.attachments_count }} files attached</span>
            </div>
            <template v-if="canModerate">
                <Divider />
                <Button class="p-button-sm px-2 py-1">
                    <i class="pi pi-pencil mr-2" style="font-size:0.9rem"></i>
                    Edit
                </Button>
                <Button @click.prevent="deletePostHelper(item)" class="p-button-sm p-button-danger px-2 py-1 mr-2">
                    <i class="pi pi-times mr-2" style="font-size:0.9rem"></i>
                    Delete
                </Button>
            </template>
        </NuxtLink>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Button from 'primevue/button'
    import Divider from 'primevue/divider'
    import ConfirmDialog from 'primevue/confirmdialog'

    export default {
        props: {
            type: String
        },

        components: {
            Button, Divider, ConfirmDialog
        },
        
        computed: {
            ...mapGetters({
                items: 'roomposts/items',
                canModerate: 'rooms/canModerate'
            }),

            typedPosts() {
                return this.items.filter(e => e.type === this.type)
            },
        },

        methods: {
            ...mapActions({
                deletePost: 'roomposts/delete'
            }),

            async deletePostHelper(post) {
                this.$confirm.require({
                    header: 'Confirm the action',
                    message: 'Do you really want to delete a post?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.deletePost(post)
                    },
                    reject: () => {}
                });
            }
        }
    }
</script>