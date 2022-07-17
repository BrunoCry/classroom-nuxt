<template>
    <div>
        <div class="flex align-items-center mb-3">
            <NuxtLink :to="{ name: 'rooms.show', params: { id: $route.params.roomId } }">
                <Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
            </NuxtLink>
            <h2 class="my-0">{{ post.title }}</h2>
        </div>
        <div class="grid">
            <div class="col-12 xl:col-8">
                <span class="text-sm mb-1 mt-3 block">Description:</span>
                <p class="text-lg mt-0">{{ post.description }}</p>
                <div class="flex" v-if="post.is_assignable">
                    <Button
                        v-if="currentParticipation.can_manage_assignments"
                        class="p-button-outlined"
                        @click="goToPostAssignmentsList"
                    >
                        Assigned Homeworks ({{ post.assignments_count }})
                    </Button>
                    <Button
                        v-else-if="currentParticipation.can_assign_homeworks"
                        class="p-button-outlined"
                    >
                        Assign
                    </Button>
                </div>
                <Divider />
                <p class="text-lg mt-0">{{ post.text }}</p>
            </div>
            <div class="col-12 xl:col-4">
                <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                    <h3 class="my-0">Attached files</h3>
                    <AttachmentList />
                    <Divider />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';
    import InputText from 'primevue/inputtext';
    import AttachmentList from '@/components/attachments/AttachmentList.vue'

    export default {
        components: {
            Button, Divider, InputText, AttachmentList,
        },
        computed: {
            ...mapGetters({
                canModerate: 'rooms/canModerate',
                currentUser: 'users/currentUser',
                currentParticipation: 'participants/current',
                post: 'roomposts/item',
            }),
        },
        methods: {
            async goToPostAssignmentsList() {
                this.$router.push({'name': 'rooms.assignments.list', query: {
                    postId: this.post.id
                }})
            }
        }
    }
</script>