import axios from "axios";
import { Store } from "vuex";
const state = {
  data: []
};

const actions = {
  loadData({ commit }, payload) {
    console.log("payload", payload);
    return axios
      .get(
        "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getComapnyDetail?uuid=" +
          payload
      )
      .then(coins => {
        commit("GET_DATA", coins);
        // return Store.state;
      });
  },
  cleanData({commit}){
     return commit("RESET_STATE");
  }

  // getDataObject:({commit},userObj) => {
  //     commit(',userObj)
  // }
};
const mutations = {
  GET_DATA(state, coins) {
    // console.log("coins", coins.data);
    state.data = coins.data;
  },
  RESET_STATE(state){
    // console.log("state be",state);
     state.data = null;
    //  console.log("state after",state);
    
  }
};

export default {
  state,
  mutations,
  actions
};
// store.replaceState({
//   data:[]
// })