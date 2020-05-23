export const strict = false
import axios from "axios";

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    quoteSubmitted: false
  },
  mutations: {
  	setLoggedIn (state, e) {
  		state.loggedIn = e
  	},
    GET_STATUS(state, info) {
      state.quoteSubmitted = info;
      localStorage.setItem('submitted', info)
    }
  },
  actions: {
  	setLoggedIn({ commit }, payload) {
  		commit('setLoggedIn', payload)
  	},

    checkQuoteSubmittedStatus({ commit }) {
      const userId = localStorage.getItem('userId')
      return axios({
          url: `${process.env.VUE_APP_BACKEND_URL}/company/checkQuotedWithDotId`,
          data: { userId} ,
          method: 'POST'
        })
        .then(info => {
          commit("GET_STATUS", info.data.submitted);
        });
    },

    updateSubmittedStatus({ commit }, payload) {
      commit("GET_STATUS", payload);
    },
  }
};