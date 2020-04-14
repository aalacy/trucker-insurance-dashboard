export const strict = false

export default {
  namespaced: true,
  state: {
    loggedIn: false,
  },
  mutations: {
  	setLoggedIn (state, e) {
  		state.loggedIn = e
  	},
  },
  actions: {
  	setLoggedIn({ commit }, payload) {
  		commit('setLoggedIn', payload)
  	}
  }
};