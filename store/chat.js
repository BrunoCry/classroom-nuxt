import { apiClient } from '@/utils/api.js'
import Cookies from 'js-cookie'

export const namespaced = true;

export const state = () => ({
    lastMessages: null,
    lastMessage: null,
    errors: {},
    current: null,
    dialog: {},
})

export const getters = {
    dialog(state) {
        return state.dialog;
    },
    lastMessages(state) {
      return state.lastMessages
    },
    lastMessage(state) {
      return state.lastMessage
    },
    items(state) {
        return state.items
    },
    current(state) {
        return state.current
    }
}

export const mutations = {
    SET_PARTICIPANTS(state, participants) {
        state.participants = participants;
    },
    SET_DIALOG(state, dialog) {
        state.dialog = dialog
    },
    SET_LAST_MESSAGES(state, lastMessages) {
      state.lastMessages = lastMessages
    },
    SET_LAST_MESSAGE(state, lastMessage) {
      state.lastMessage = lastMessage
    },
    SET_ERRORS(state, items) {
        state.errors = items
    },
}

export const actions = {
  async createChat({commit}, requestBody) {
    const client = await apiClient
    const accessToken = this.$cookies.get('token')
    
    try {
      const response = await client.apis.chat.startDialogWithTeacher(
        {}, 
        {
        requestInterceptor: (request) => {
          request.headers.Authorization = `Bearer ${accessToken}`
        },
        requestBody: requestBody
      })
      commit('SET_DIALOG', response.body)
      commit('SET_ERRORS', {})
    } catch (e) {
      console.error(e?.response?.body)
      commit('SET_ERRORS', e.response.body.detail)
    }
  },
  async getAllUserLastMessages({commit}, requestBody) {
    const client = await apiClient
    const accessToken = this.$cookies.get('token')

    try {
      const response = await client.apis.chat.getLastMessages(
        {},
        {
        requestInterceptor: (request) => {
          request.headers.Authorization = `Bearer ${accessToken}`
        },
        requestBody: requestBody
      })
      commit('SET_LAST_MESSAGES', response.body)
      commit('SET_ERRORS', {})

    } catch (e) {
      console.error(e?.response?.body)
      commit('SET_ERRORS', e.response.body.detail)
    }
  },
  async getDialogDetail({commit}, requestBody) {
    const client = await apiClient
    const accessToken = this.$cookies.get('token')

    try {
      const response = await client.apis.chat.getDialogDetail(
        {dialog_id: requestBody},
        {
        requestInterceptor: (request) => {
          request.headers.Authorization = `Bearer ${accessToken}`
        },
        })
      commit('SET_LAST_MESSAGE', response.body)
      commit('SET_ERRORS', {})

    } catch (e) {
      console.error(e?.response?.body)
      commit('SET_ERRORS', e.response.body.detail)
    }
  }
}