import { apiClient } from '@/utils/api.js'


export const namespaced = true

export const state = () => ({
    item: null,
    items: [],
    errors: {},
})

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_ITEM(state, item) {
        state.item = item
    },
    SET_ERRORS(state, items) {
        state.errors = items
    }
}

export const actions = {
    async create({ commit, state }, { postId, assignmentId, attachments }) {
        const client = await apiClient
        const accessToken = this.$cookies.get('token')
        console.log(attachments)
        
        try {
            const response = await client.apis.attachments.createAttachments({
                post_id: postId,
                assignment_id: assignmentId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: {
                    attachments: attachments,
                }
            })
            let uploadedAttachments = state.items.filter(e => e.id) 

            commit('SET_ITEMS', uploadedAttachments.concat(response.body.created))
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
        }
    },

    async get({ commit, app }, attachmentId) {
        console.log(app)
        const client = await apiClient
        const accessToken = this.$cookies.get('token')
        
        try {
            const response = await client.apis.attachments.getAttachment({
                attachment_id: attachmentId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEM', response.data)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
        }
    },
    async delete({ commit }, attachmentId) {
        const client = await apiClient
        const accessToken = this.$cookies.get('token')
        
        try {
            await client.apis.attachments.deleteAttachment({
                attachment_id: attachmentId
            }, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
}