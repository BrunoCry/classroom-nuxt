import { apiClient } from '@/utils/api.js'
import Cookies from 'js-cookie'

export const namespaced = true;

export const state = () => ({
    lastMessages: [],
    diaogMessages: [],
    dialog: null,
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
    diaogMessages(state) {
      return state.diaogMessages
    },
    dialog(state) {
      return state.dialog
    },
    items(state) {
        return state.items
    },
    current(state) {
        return state.current
    },
    errors(state) {
      return state.errors
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
    SET_LAST_MESSAGE(state, dialog) {
      state.dialog = dialog
    },
    PUSH_DIALOG_MESSAGE(state, diaogMessages) {
      state.diaogMessages.push(diaogMessages)
    },
    UNSHIFT_DIALOG_MESSAGES(state, diaogMessages) {
      state.diaogMessages.unshift(...diaogMessages)
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
      console.error(e)
      commit('SET_ERRORS', e.response.body.detail)
    }
  },
  async loadMessages({commit}, requestBody) {
    const client = await apiClient
    const accessToken = this.$cookies.get('token')
    try {
      const response = await client.apis.chat.getMessages(
        requestBody,
        {
          requestInterceptor: (request) => {
            request.headers.Authorization = `Bearer ${accessToken}`
          },
        })
        console.log(response.body)
      commit('UNSHIFT_DIALOG_MESSAGES', response.body)
      //commit('SET_ERRORS', {})
    } catch (e) {
      console.error(e.response.body.detail)
      commit('SET_ERRORS', e.response.body.detail)
    }
  }
}