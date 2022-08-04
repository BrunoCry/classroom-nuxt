export const namespaced = true

export const state = () => ({
    open: false
})

export const getters = {
    opened: state => state.open
}

export const mutations = {
    OPEN_SIDEBAR (state) {
        state.open = true
    },
    CLOSE_SIDEBAR (state) {
        state.open = false
    }
}

export const actions = {
    openSidebar ({ commit }) {
        commit('OPEN_SIDEBAR')
    },
    closeSidebar ({ commit }) {
        commit('CLOSE_SIDEBAR')
    }
}