<template>
  <div>
    <div class="grid">
      
        <div class="col-12 xl:col-8">
            <div class="mb-3">
              <h5>Comment</h5>
              <Textarea v-model="value2" :autoResize="true" rows="5" cols="40" />
            </div>
            <Button
                label="Reject"
                icon="pi pi-check"
                iconPos="right"
                @click="submitAssignment"
                class="p-button-danger"
            />
        </div>
        <div class="col-12 xl:col-4">
            <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                <h3 class="my-0">Attached files</h3>
                <AttachmentList />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AttachmentList from '@/components/attachments/AttachmentList.vue'
import InputSwitch from 'primevue/inputswitch';
import FileUpload from 'primevue/fileupload';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import attachmentsCreate from '~/mixins/attachmentsCreate.js'
import SelectButton from 'primevue/selectbutton';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';

export default {
  components: {
    AttachmentList,InputSwitch,
    FileUpload,Badge,Button,
    attachmentsCreate,SelectButton,
    InputNumber,Textarea
  },
  props: {
    currentAssigment: Object
  },
  data() {
    return {
      commentValue: '',
    }
  },
  methods: {
    ...mapActions({
      reassignHomework: 'assignments/requestChanges'
    }),
    async submitAssignment() {
      await this.reassignHomework({assignmentId: this.currentAssigment.id, requestBody: {comment: this.commentValue}})
    },
  },
  
}
</script>