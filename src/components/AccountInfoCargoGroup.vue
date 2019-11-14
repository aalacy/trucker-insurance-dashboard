<template>
  <div class="cargo-group-form">
    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Cargo Group</h4>
          <div class="container">
            <div class="row cargo-group-page">
              <div
                v-for="(item, index) in cargoGroups"
                :key="index"
                class="col-3 text-center pointer mb-2 p-1 "
                @click="selectCargoGroup(item.value)"
              :class="{ selected: cargoGroupMap[item.value] }">
              <div class="cargo-group">
                <div class="p-1">
                  <img :src="item.src" alt>
                </div>

                <div
                  class="font-weight-bold name"
                  :class="{ selected: cargoGroupMap[item.value] }"
                >{{ item.value }}</div>
              </div>
              </div>
            </div>
          </div>

          <div v-if="formErrors.cargoGroup" class="text-danger">{{ formErrors.cargoGroup }}</div>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="button"
                class="lt-button lt-button-default btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">Business Structure</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white">Cargo Hauled</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
      </div>
      <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
        <span class="save-hover">Save Changes</span>
      </div>
      <div v-if="showmodel">
        <modalLogin/>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validateField, validateForm, minLength } from "../validators.js";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import axios from "axios";
import { setTimeout } from "timers";
export default {
  name: "AccountInfoCargoGroup",
  props: {
    prevForm: {
      type: String,
      required: true
    },
    nextForm: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
     
      this.save = false;
      axios
        .get(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getuuidbyuserid?user_id=" +
            localStorage.getItem("userId")
        )
        .then(coins => {
          this.userData = coins.data.uuid;
        });
      setTimeout(() => {
        this.$store.dispatch("loadData", this.userData).then(() => {
          let len = this.$store.state.getData.data;
          for (let j = 0; j <= len.length; j++) {
            if (this.$store.state.getData.data[j].key == "cargoGroup") {
              let a = this.$store.state.getData.data[j];
              let b = JSON.parse(a.val).cargoGroup;
             
              let c = [];
              for (var i = 0; i < this.cargoGroups.length; i++) {
                c.push(this.cargoGroups[i].value);
              }
              let filteredKeywords = c.filter(word => b.includes(word));
             
              for (var i = 0; i < filteredKeywords.length; i++) {
                this.selectCargoGroup(filteredKeywords[i]);
              }
            }
          }
          // let b = JSON.parse(a.val).cargoGroup;
        });
      }, 1000);
    } else {
     
      this.save = true;
      setTimeout(() => {
        this.$store.dispatch("loadData", this.uuid).then(() => {
          let len = this.$store.state.getData.data;
          for (let j = 0; j <= len.length; j++) {
            if (this.$store.state.getData.data[j].key == "cargoGroup") {
              let a = this.$store.state.getData.data[j];
              let b = JSON.parse(a.val).cargoGroup;
             
              let c = [];
              for (var i = 0; i < this.cargoGroups.length; i++) {
                c.push(this.cargoGroups[i].value);
              }
              let filteredKeywords = c.filter(word => b.includes(word));
             
              for (var i = 0; i < filteredKeywords.length; i++) {
                this.selectCargoGroup(filteredKeywords[i]);
              }
            }
          }
          // let b = JSON.parse(a.val).cargoGroup;
        });
      }, 1000);
    }
  },
  components: {
    modalLogin: ModalLogin,
    
  },

  data() {
    return {
      final_uuid:"",
      uuid: "",
      showmodel: false,
      save: true,
      userData: "",
      formData: {
        cargoGroup: []
      },
      selectedCargoGroup: [],
      rules: {
        cargoGroup: [val => minLength(val, 1, "Please select Cargo Group")]
      },
      formErrors: {},
      hints: {},
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState("cargo", ["cargoGroups"]),
    cargoGroupMap() {
      let map = {};
      this.formData.cargoGroup.forEach(val => {
        map[val] = true;
        //
      });
      //
      return map;
    },
    ...mapState(["data"])
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },
  updated() {
    if (localStorage.getItem("showModal") == "true") {
      this.showmodel = true;
    } else {
      this.showmodel = false;
    }
  },

  methods: {
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
       
        this.show();
        if (willDelete) {
          
          this.$router.push({ name: "AccountInfoCargoGroup" });
        } else {
          
          swal(
            "Thank You!",
            "Your changes has been accepted! You will get new Updated Quote",
            {
              icon: "success"
            }
          );
        }
      });
    },
    selectCargoGroup(cargoGroupValue) {
      //
      // this.formData.cargoGroup.push(cargoGroupValue)
      //
      if (this.cargoGroupMap[cargoGroupValue]) {
        this.formData.cargoGroup = this.formData.cargoGroup.filter(
          val => val !== cargoGroupValue
        );
        this.$emit("update-hint", "");
      } else {
        this.formData.cargoGroup.push(cargoGroupValue);
        this.$emit("update-hint", this.hints[cargoGroupValue]);
      }

      this.formErrors = {};
    },
    goPrevForm() {
      this.$emit("update-hint", "");
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("update-hint", "");
      this.$emit("go-to-form", this.nextForm);
    },
    validateField(fieldName) {
      validateField(fieldName, this.formData, this.rules, this.formErrors);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    },
    async show() {
      let formIsValid = this.validateForm();
      var temp_uuid;
      if (!formIsValid) {
        return;
      }
      if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
       
      } else {
        temp_uuid = this.uuid;
       
      }

      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("company/save", {
          key: "cargoGroup",
          val: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: temp_uuid
        });
        if (data.status === "OK") {
          if(!localStorage.getItem("token")){
            if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
          }
          }
          
        } else if (data.status === "ERROR") {
          // this.showmodel = true;
          this.error = data.messages[0] || data.data;
        }
        // axios
        //   .post(
        //     "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid=" +
        //       this.uuid +
        //       "&user_id=" +
        //       localStorage.getItem("userId")
        //   )
        //   .then(res => {
        //    
        //   });
      } catch (err) {
        // this.showmodel = true;

       
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
      }
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");

        if (data.status === "OK") {
          let { cargoGroup } = data.data;
          this.uuid = data.data.b;
          if (cargoGroup) {
            this.formData = {
              ...this.formData,
              ...cargoGroup
            };
          }
        } else if (data.status === "ERROR") {
          // this.$router.replace({ name: 'Home' });
         
        }
      } catch (err) {
       
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      if (localStorage.getItem("token")) {
        this.final_uuid = this.userData;
       
      } else {
        this.final_uuid = this.uuid;
       
      }
      try {
        let data = await API.post("company/save", {
          key: "cargoGroup",
          val: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid
        });
       
        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
        axios
          .post(
            "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid=" +
             this.final_uuid +
              "&user_id=" +
              localStorage.getItem("userId")
          )
          .then(res => {
           
          });
      } catch (err) {
       
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }
.cargo-group-form {
  .cargo-group {
    .pad-none {
      padding-left: 0px;
      padding-right: 0px;
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      min-height: 50px;
      font-size: 12px;
      word-break: break-word;

      &.selected {
        color: #5e98f9;
      }
    }
  }
  @media screen and (max-width: 639px) {
    .cargo-group-page .col-3 {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
  }

  @media screen and (max-width: 479px) {
    .cargo-group-page .col-3 {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  // .next-wrapper {
  //   display: flex;
  //   justify-content: space-between;

  //   .next-title {
  //     font-size: 1.2rem;
  //   }
  // }
}
</style>
