import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from "vue-axios"
import axios from "axios"
import cargo from './modules/cargo.js';
import eld from './modules/eld';
import getData from "./modules/getData.js"
import getPolicyData from "./modules/getPolicyData.js"
// import getUserData from "./modules/getUserData.js"

import layout from './layout';
import auth from './auth';

export const strict = false

Vue.use(Vuex);
Vue.use(VueAxios,axios)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cargo,
    eld,
    getData,
    getPolicyData,
    layout,
    auth,
  },
  state: {},
  mutations: {},
  actions: {}
});

// const initialStateCopy = JSON.parse(JSON.stringify(store.state))

// export function resetState () {
//   store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
// }