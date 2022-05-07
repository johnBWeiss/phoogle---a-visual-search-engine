import axios from "axios"

export default {

    state: {
        error: false,
        phootle: [],
    },

    mutations: {
        phootle(state, data) { state.phootle.push(...data) },
    },

    getters: {
        imageArray: (state) => state.phootle,
    },

    actions: {
        phoogleGet: async (context, payload) => {
            try {
                const data = await axios.get(`http://localhost:5000/screenshots/google/${payload}`)
                context.commit('phootle', data.data)
            } catch (e) {
                context.commit('error', e)
            }
        },
    },
}