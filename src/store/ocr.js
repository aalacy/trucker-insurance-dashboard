
export default {
  namespaced: true,
  state: {
    step: 'imageDOT', // DOT, VIN, DL
  	trigger: false,
  	cancel: false
  },

  mutations: {
  	SET_TRIGGER(state, payload) {
  		state.trigger = payload
  	},
  	SET_CANCEL (state, payload) {
  		state.cancel = payload
  	},
    SET_STEP (state, payload) {
      state.step = payload
    }
  },

  actions: { 
  	setTrigger( {commit}, payload) {
  		commit('SET_TRIGGER', payload)
  	},
  	setCancel( {commit}, payload) {
  		commit('SET_CANCEL', payload)
  	},
    setStep({ commit }, payload) {
      commit('SET_STEP', payload)
      commit('SET_CANCEL', true)
    }
  }
}