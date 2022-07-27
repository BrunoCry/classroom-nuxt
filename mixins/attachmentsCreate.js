export default {
    methods: {
        async createAttachments(event) {
            this.attachments = this.attachments.concat(event.files)
            const currentAttachments = this.$store.getters['attachments/items'] || []
            let newAttachments = [...currentAttachments]

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
    },
    data() {
        return {
            attachments: [],
        }
    },
}