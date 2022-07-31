<template>
  <div>
    <div class="grid">
        <div class="col-12 xl:col-8">
            <h3>Status: <Badge
                :value="assignment.status || 'unassigned'"
                :severity="statusState"
                >
                </Badge>
            </h3>
            <FileUpload
                :customUpload="true"
                @uploader="createAttachments"
                v-model="this.attachments"
                :multiple="true"
            />
            <Button
                label="Submit"
                icon="pi pi-check"
                iconPos="right"
                @click="submitAssignment"
            />
        </div>
        <div class="col-12 xl:col-4">
            <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                <h3 class="my-0">
                    Attached files
                    <b>Edit: {{ attachFiles ? 'ON' : 'OFF' }}.</b>
                </h3>
                <InputSwitch v-model="attachFiles" />
                <AttachmentList :editable="attachFiles" />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttachmentList from '@/components/attachments/AttachmentList.vue'
import FileUpload from 'primevue/fileupload';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import attachmentsCreate from '~/mixins/attachmentsCreate.js'


export default {
    components: {
        AttachmentList, Badge, FileUpload,
        Button, InputSwitch,
    },
    mixins: [attachmentsCreate],
    data() {
        return {
            attachments: [],
            attachFiles: false,
        }
    },
    async created() {
        await this.$store.commit('attachments/SET_ITEMS', this.assignment.attachments || [])
    },
    computed: {
        ...mapGetters({
            'assignment': 'assignments/item',
        }),
        statusState() {
            const assignment = this.$store.getters['assignments/item']

            if(Object.keys(assignment).length === 0)
                return 'danger'
            else if(assignment.status_assigned)
                return 'info'
            else if(assignment.status_request_changes)
                return 'danger'
            else if(assignment.status_done)
                return 'success'
        }
    },
    methods: {
        async uploadAttachments() {
            const currentAttachments = this.$store.getters['attachments/items']
            let filesToAttach = currentAttachments.filter(e => !e.id)

            if(filesToAttach.length)
                await this.$store.dispatch('attachments/create', {
                    assignmentId: this.assignment.id,
                    attachments: filesToAttach,
                })
        },
        async createAssignment() {
            await this.$store.dispatch('assignments/create', {
                post_id: this.$store.getters['roomposts/item'].id,
            })

            if(this.assignment.id) {
                await this.uploadAttachments()

                this.$toast.add({
                    severity: 'success',
                    summary: "Your homework has been assigned!",
                    detail: "Keep on the great work!",
                    life: 3000
                })
            }
        },
        async updateAssignment() {
            await this.$store.dispatch('assignments/reassign', this.assignment.id)
            await this.uploadAttachments()

            this.$toast.add({
                severity: 'success',
                summary: "Assignment updated!",
                detail: "Keep on the great work!",
                life: 3000
            })
        },
        async submitAssignment() {
            if(!this.assignment.id) {
                await this.createAssignment()
            } else {
                await this.updateAssignment()
            }
        }
    },
}
</script>

<style>

</style>