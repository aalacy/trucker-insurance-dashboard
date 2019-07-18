import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from "vue-axios"
import axios from "axios"
import cargo from './modules/cargo.js';
import eld from './modules/eld';
import getData from "./modules/getData.js"

Vue.use(Vuex);
Vue.use(VueAxios,axios)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cargo,
    eld,
    getData
  },
  state: {},
  mutations: {},
  actions: {}
});
