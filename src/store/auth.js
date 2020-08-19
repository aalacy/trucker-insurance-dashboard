export const strict = false
import axios from "axios";
import { getExistingDots, getEmail } from '../services/authService.js'

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    quoteSubmitted: false,
    existingDots: [],
    email: getEmail()
  },
  mutations: {
  	setLoggedIn (state, e) {
  		state.loggedIn = e
  	},
    GET_STATUS(state, info) {
      state.quoteSubmitted = info;
      localStorage.setItem('submitted', info)
    },
    GET_EXISTING_DOTS(state, dots) {
      state.existingDots = dots
    }
  },
  actions: {
  	setLoggedIn({ commit }, payload) {
  		commit('setLoggedIn', payload)
  	},

    async getDots({ commit }) {
      let dots = getExistingDots().then(data => {
        commit("GET_EXISTING_DOTS", data.dots)
      })
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