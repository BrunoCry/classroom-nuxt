<template>
  <div>
    <div class="grid">
        <div class="col-12 xl:col-8">   
            <div class="mb-3">
              <div class="field col-12 md:col-3">
                  <div>
                    <label for="minmax-buttons">Number of points</label>
                    <InputNumber id="minmax-buttons" v-model="mark" mode="decimal" showButtons :min="0" :max="5" />
                  </div>
                  <div>
                    <h5>Comment</h5>
                    <Textarea v-model="comment" :autoResize="true" rows="5" cols="40" />
                  </div>
              </div>
            </div>
            <Button
                label="Submit"
                icon="pi pi-check"
                iconPos="right"
                @click="submitAssignment"
                class="p-button-success"
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
    currentAssignment: Object 
  },
  data() {
    return {
      mark: 0,
      comment: ''
    }
  },
  created() {
    this.$store.commit('attachments/SET_ITEMS', this.currentAssignment.attachments)
  },
  methods: {
    ...mapActions({
      rateHomework: 'assignments/rateHomework'
    }),
    async submitAssignment() {
      console.log(this.mark)
      await this.rateHomework({ assignmentId: this.currentAssigment.id, requestBody:{rate: this.mark, comment: this.comment}})
    }
  },
  
}
</script>