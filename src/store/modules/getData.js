import axios from "axios"
const state ={
    data:[]
}


const actions = {
    loadData ({ commit },payload) {
        console.log("payload",payload)
        axios
          .get("http://3.13.68.92/luckytrucker_admin/api/CompanyController/getComapnyDetail?uuid="+ payload )
          .then(coins => {
          commit('GET_DATA', coins)
          })
      },

    // getDataObject:({commit},userObj) => {
    //     commit('GET_DATA',userObj)
    // }
}
const mutations = {
    GET_DATA (state,coins)
    {  console.log("coins",(coins.data))
        state.data=coins.data
    }
}

export default {
    state,
    mutations,
    actions
}