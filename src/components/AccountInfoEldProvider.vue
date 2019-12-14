<template>
  <div class="eld-provider-form container-fluid mob-2">
    
    <form id="eldProviderForm" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">ELD Provider</h4>

          <form id="addProviderForm" class="mb-2" @submit.prevent="addProvider">
            <div class="d-flex">
              <div class="flex-grow-1 form-group">
                <input
                  v-model.trim="userProviderName"
                  type="text"
                  placeholder="Other Provider"
                  required
                  class="lt-input"
                >
              </div>

              <div class="px-2">
                <button
                  form="addProviderForm"
                  type="submit"
                  class="px-3 lt-button lt-button-main get-data"
                >ADD</button>
              </div>
            </div>
          </form>

          <div class="container">
            <div class="row cargo-group-page">
              <div
                v-for="(item, index) in allProviders"
                :key="index"
                class="col-3 text-center pointer mb-2 p-1 "
                @click="selectProvider(item.value)"  :class="{ selected: eldProviderMap[item.value] }"
              >
              <div class="eld-provider">
                <div class="p-1 provider-img-wrapper">
                  <img v-if="item.image" :src="item.image" alt class="provider-img rounded">
                  <!-- <div v-else class="p-1 provider-img-wrapper">
                  <img
                    src="../assets/images/bigroad.jpeg"
                    alt=""
                    class="provider-img"
                  />
                  
                  
                  </div>-->
                </div>
                <div
                  class="font-weight-bold name"
                  :class="{ selected: eldProviderMap[item.value] }"
                >{{ item.value }}</div>
              </div>
              </div>
            </div>
          </div>

          <div v-if="formErrors.eldProvider" class="text-danger">{{ formErrors.eldProvider }}</div>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
        </div>

        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="button"
                class="lt-button lt-button-default btn-block btn-border-radius-lb mob-2"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">Vehicles & Trailers</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                form="eldProviderForm"
                type="submit"
                class="lt-button lt-button-main px-4 btn-block btn-border-radius-rb mob-2"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white mob-2">Drivers</div>
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
        <modelLogin/>
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
import { setTimeout } from 'timers';

export default {
  name: "AccountInfoEldProvider",
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
  data() {
    return {
      final_uuid:"",
      uuid:"",
      showmodel: false,
      userData:"",
      formData: {
        eldProvider: []
      },
      rules: {
        eldProvider: [val => minLength(val, 1, "Please select ELD Provider")]
      },
      formErrors: {},
      hints: {},
      userProviders: [],
      userProviderName: "",
      loading: false,
      error: null,
      save: true
    };
  },
  computed: {
    ...mapState("eld", ["eldProviders"]),
    allProviders() {
      return this.eldProviders.concat(this.userProviders);
    },
    eldProviderMap() {
      let map = {};
      this.formData.eldProvider.forEach(val => (map[val] = true));
      return map;
    },
    ...mapState(["data"])
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },
  components: {
    modelLogin: ModalLogin,

  },
  mounted() {
    if (localStorage.getItem("token")) {
     this.save = false;
    } else {
      this.save = true;
    }
    
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
          this.$router.push({ name: "AccountInfoEldProvider" });
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
    async show() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }
    var temp_uuid;
      this.loading = true;
      this.error = null;
  if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
        
      } else {
        temp_uuid = this.uuid;
        
      }
      
      try {
        let data = await API.post("company/save", {
          key: "eldProvider",
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
          this.showmodel = true;
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        console.error(err);
        // this.showmodel = true;
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
      }
    },
    addProvider() {
      if (
        !this.userProviderName ||
        this.eldProviderMap[this.userProviderName]
      ) {
        return;
      }

      this.userProviders.push({ value: this.userProviderName });
      this.userProviderName = "";
    },
    selectProvider(providerValue) {
      if (this.eldProviderMap[providerValue]) {
        this.formData.eldProvider = this.formData.eldProvider.filter(
          val => val !== providerValue
        );
        this.$emit("update-hint", "");
      } else {
        this.formData.eldProvider.push(providerValue);
        this.$emit("update-hint", this.hints[providerValue]);
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
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let res = await API.get("company/current");

        if (res.status === "OK") {
          let { company: { currentEldProvider } } = res.data;
          this.uuid = res.data.uuid;
          if (currentEldProvider) {
            currentEldProvider = JSON.parse(currentEldProvider);
            this.formData.eldProvider = currentEldProvider;
            this.addUserProviders(currentEldProvider);
          }
        } else if (res.status === "ERROR") {
          // this.$router.replace({ name: 'Home' });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    addUserProviders(eldProvider) {
      eldProvider.forEach(providerName => {
        let providersIndex = this.eldProviders.findIndex(
          p => p.value === providerName
        );
        if (providersIndex === -1) {
          this.userProviders.push({ value: providerName });
        }
      });
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;
         if(localStorage.getItem('token')){
        
          this.final_uuid = this.userData;
          
      }else{
        this.final_uuid = this.uuid;
        
      }
      try {
        const { eldProvider } = this.formData;
        const data = {
          currentEldProvider: eldProvider,
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid
        };
        let res = await API.post("company/save", { data });

        if (res.status === "OK") {
          this.goNextForm();
        } else if (res.status === "ERROR") {
          this.error = res.messages[0] || res.data;
        }
      } catch (err) {
        console.error(err);
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
.eld-provider-form {
  .eld-provider {
    .provider-img-wrapper {
      height: 100px;
      width: 100px;
      margin: 0 auto;

      // .provider-img {
      //   max-width: 100%;
      //   height: auto;
      // }
    }

    .name {
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      // min-height: 50px;
      // height: 100%;
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
