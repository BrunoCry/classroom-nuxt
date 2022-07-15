import { apiClient } from "@/utils/api.js";

export const namespaced = true;

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
    async create({ commit }, { postId, assignmentId, attachments }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
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
            commit('SET_ITEM', response.data)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    },

    async get({ commit }, attachmentId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
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
            commit('SET_ERRORS', e.response.body.detail)

        }
    },
    async delete({ commit }, attachmentId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            await client.apis.attachments.deleteAttachment({
                attachment_id: attachmentId
            }, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
        } catch (e) {
            console.error(e.response.body)
            commit('SET_ERRORS', e.response.body.detail)
        }
    }
}