import axios from "axios";
import { Store } from "vuex";
const state = {
  userData: []
};

const actions = {
  loadUserData({ commit }, payload) {
    console.log("coins getuserData", payload);
    return axios
      .get(
        "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getuuidbyuserid?user_id=" +
          payload
      )
      .then(coins => {
        commit("GET_USERDATA", coins);
        // return Store.state;
      });
  },
//   cleanData({commit}){
//      return commit("RESET_STATE");
//   }

  // getDataObject:({commit},userObj) => {
  //     commit(',userObj)
  // }
};
const mutations = {
  GET_USERDATA(state, coins) {
    console.log("coins getuserData", coins.data);
    state.userData = coins.data;
  },
//   RESET_STATE(state){
//     console.log("state be",state);
//      state.userData = null;
//      console.log("state after",state);
    
//   }
};

export default {
  state,
  mutations,
  actions
};
// store.replaceState({
//   data:[]
// })