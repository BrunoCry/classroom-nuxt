<template>
<div class="attachments-list">
    <Listbox
        :options="attachments"
        :filter="true"
        listStyle="max-height:250px"
        @change="changeItem"
    >   
        <template
            #option="attachment"
        >
            <div>
                <i v-if="!editable" class="pi pi-file" style="font-size:1.8rem;margin-right:1.3rem"></i>
                <i
                    v-else
                    class="pi pi-times"
                    style="font-size:1.8rem;margin-right:1.3rem"
                ></i>
                <span> {{attachment.option.filename || attachment.option.name }} </span>
            </div>
        </template> 
    </Listbox>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Listbox from 'primevue/listbox'
import { downloadFromBlob } from '@/utils/utils.js'

export default {
    props: {
        editable: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Listbox,
    },
    computed: {
        ...mapGetters({
            'attachments': 'attachments/items',
        })
    },
    methods: {
        ...mapActions({
            getAttachment: 'attachments/get',
            delete: 'attachments/delete',
        }),
        async changeItem(option) {
            if(this.editable) {
                await this.deleteAttachment(option)
            } else {
                await this.download(option)
            }
        },
        async download(option) {
            const attachment = option.value
            await this.getAttachment(attachment.id)
            return downloadFromBlob(this.$store.getters['attachments/item'], attachment.filename)
        },
        async deleteAttachment(option) {
            const attachment = option.value

            if(attachment.id) {
                await this.delete(attachment.id)
            }
            this.$store.commit('attachments/SET_ITEMS', this.attachments.filter(e => e !== attachment))
            console.log(attachment, this.attachments)
        }
    }
}
</script>