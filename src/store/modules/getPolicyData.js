import axios from "axios";
import { Store } from "vuex";

const state = {
  policyData: []
};

const actions = {
  loadPolicyData({ commit }, payload) {
    console.log("policy payload", payload);
    return axios
      .get(
        "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getpolicy?user_id=" +
          payload
      )
      .then(info => {
        commit("GET_POLICY_DATA", info);
      });
  }
};

const mutations = {
  GET_POLICY_DATA(state, info) {
    console.log("info", info);
    state.policyData = info;
  }
};

export default {
  state,
  mutations,
  actions
};




