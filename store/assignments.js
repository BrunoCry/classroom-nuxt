import { apiClient } from "@/utils/api.js";


export const namespaced = true;

export const state = () => {
    return {
        item: {},
        items: [],
        errors: {},
    }
}

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
        state.items = items
    },
    SET_ITEM(state, item) {
        state.item = item
    },
    SET_ERRORS(state, items) {
        state.errors = items
    }
}

export const actions = {
    async fetch({ commit }, { postId, roomId }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.fetchAssignments({
                post_id: postId,
                room_id: roomId,
            }, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
            
            commit('SET_ITEMS', response.body)
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e)
        }
    },
    async getRoomAssigments({ commit }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.assignment.fetchAssignments({
                room_id: roomId
            }, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
            
            commit('SET_ITEMS', response.body)
            console.log(response.body)
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e)
        }
    },
    async create(context, requestBody) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.assignHomework({}, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
            context.commit('SET_ERRORS', e)
        }
    },
    async requestChanges(context, { assignmentId, requestBody }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.requestAssignmentChanges({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async reassign(context, assignmentId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.reassignHomework({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async rateHomework(context, { assignmentId, requestBody }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.rateHomework({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async myInPost({ commit }, postId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.myInPost({
                post_id: postId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async get({ commit }, assignmentId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.assignment.get({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    }
}