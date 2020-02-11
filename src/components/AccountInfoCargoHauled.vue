<template>
  <div class="cargo-hauled-form container-fluid mob-2">
    
    <form @submit.prevent="updateCompany">
      <div class="mb-4">
        <img src="https://picsum.photos/g/100/100" alt style="width:50px;" class="d-inline mr-2">
        <h4 class="card-title d-inline form-sub-title">Cargo Hauled</h4>
      </div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Cargo Hauled</h4>
          <div
            v-for="(item, index) in selectedCargoGroups"
            :key="index"
            class="col-12 text-center mb-2 p-1"
          >
            <div class="font-weight-bold ft-clr">{{ item.value }}</div>

            <div class="container">
              <div class="row cargo-group-page">
                <div
                  v-for="(subItem, subIndex) in item.cargoHauled"
                  :key="subIndex"
                  class="col-3 text-center mb-2 p-1 pointer "
                  @click="selectHaulType(item.value, subItem.value)"
                  :class="{
                      selected:
                          cargoHauledMap[item.value] &&
                        cargoHauledMap[item.value][subItem.value]
                    }"
                >
                <div class="haul-type">
                  <div class="haul-type-wrapper">
                    <img :src="subItem.img" alt="haul type">
                  </div>

                  <div
                    class="name"
                    :class="{
                      selected:
                        cargoHauledMap[item.value] &&
                        cargoHauledMap[item.value][subItem.value]
                    }"
                  >{{ subItem.value }}</div>
                </div>
                </div>
              </div>
            </div>

            <div v-if="formErrors.haulType" class="text-danger">{{ formErrors.haulType }}</div>

            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          </div>
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
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title">Cargo Group</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Vehicles & Trailers</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
     <!--  <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
      </div>
      <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
        <span class="save-hover">Save Changes</span>
      </div> -->
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
  name: "AccountInfoCargoHauled",
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
  components: {
    modelLogin: ModalLogin,
    
  },
  data() {
    return {
      final_uuid:"",
      showmodel: false,
      save: true,
      userData:"",
      uuid:"",
      prevCargoGroup: [],
      formData: {
        haulType: {}
      },
      rules: {
        haulType: [val => minLength(val, 1, "Please select Cargo Type")]
      },
      formErrors: {},
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState("cargo", ["cargoGroups"]),
    selectedCargoGroups() {
      return this.cargoGroups.filter(
        group => this.prevCargoGroup.indexOf(group.value) > -1
      );
      
    },
    cargoHauledMap() {
      let map = {};

      for (let cargoGroupValue in this.formData.haulType) {
        map[cargoGroupValue] = {};

        let haulTypes = this.formData.haulType[cargoGroupValue];
        haulTypes.forEach(haulType => {
          map[cargoGroupValue][haulType] = true;
        });
      }

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
  mounted() {
  
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
          
          this.$router.push({ name: "AccountInfoCargoHauled" });
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

      this.loading = true;
      this.error = null;
      var temp_uuid;
      temp_uuid = this.uuid;

      try {
        let data = await API.post("company/save", {
          key: "cargoHauled",
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
      } catch (err) {
        console.error(err);
        // this.showmodel = true;
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
      }
    },
    selectHaulType(cargoGroupValue, haulTypeValue) {
      if (!this.formData.haulType[cargoGroupValue]) {
        this.$set(this.formData.haulType, cargoGroupValue, []);
      }

      let haulTypeIndex = this.formData.haulType[cargoGroupValue].indexOf(
        haulTypeValue
      );


      if (haulTypeIndex > -1) {
        this.formData.haulType[cargoGroupValue].splice(haulTypeIndex, 1);

        if (!this.formData.haulType[cargoGroupValue].length) {
          this.$delete(this.formData.haulType, cargoGroupValue);
        }
      } else {
        this.formData.haulType[cargoGroupValue].push(haulTypeValue);
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
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
  
        if (res.status === "OK") {
          let { company: { cargoGroup, cargoHauled } } = res.data;
          if (!Array.isArray(cargoGroup)) {
            this.prevCargoGroup = JSON.parse(cargoGroup);
          } else {
            this.prevCargoGroup = cargoGroup;
          }
          if (Object.keys(cargoHauled ).length === 0 && cargoHauled.constructor === Object) {
            this.formData.haulType =  {};
          } else if (cargoHauled.constructor !== Object){
            this.formData.haulType = JSON.parse(cargoHauled); // 
          } else {
            this.formData.haulType = cargoHauled;
          }
          this.uuid = res.data.uuid;
        } else if (res.status === "ERROR") {
          // this.$router.replace({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        console.log('invalid');
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const { haulType } = this.formData;
        const data = {
          cargoHauled: haulType,
          user_id: localStorage.getItem("userId"),
          uuid: this.uuid
        };
        let res = await API.post("company/save", { data });
        if (res.status === "OK") {
          localStorage.setItem('uuid', res.data);
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
.ft-clr {
  padding: 10px;
  color: #5e98f9;
  border: #5e98f9 solid 1px;
  border-radius: 10px;
}
.cargo-hauled-form {
  .haul-type {
    .haul-type-wrapper {
      width: 120px;
      height: auto;
      margin: 0 auto;
      background: #edf2f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;

      img {
        padding: 22px;
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      min-height: 50px;
      font-size: 12px;
      word-break: break-word;
      font-weight: 700 !important;
      &.selected {
        color: #5e98f9;
      }
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

</style>