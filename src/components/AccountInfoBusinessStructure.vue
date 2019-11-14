<template>
  <div class="business-structure-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Business Structure</h4>

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <select
                  v-model="formData.businessStructure"
                  :class="{ 'has-error': formErrors.businessStructure }"
                  class="lt-input"
                  @blur="onBlur"
                   @click="onFocus('businessStructure')"
                  required
                  @change="validateField('businessStructure')"
                  
                  
                >
                <!-- @focus="onFocus('businessStructure')" -->
                <!-- @blur="onBlur" -->
                  <option value>Business Structure*</option>
                  <option v-for="item in businessStructures" :key="item" :value="item">{{ item }}</option>
                </select>

                <div
                  v-if="formErrors.businessStructure"
                  class="text-danger"
                >{{ formErrors.businessStructure }}</div>
              </div>
            </div>
          </div>

          <!-- <div class="row"> -->
          <!-- <div class="col-12"> -->
          <!-- <div class="form-group"> -->
          <!-- <select
                  v-model="formData.businessClassification"
                  :class="{ 'has-error': formErrors.businessClassification }"
                  class="lt-input"
                  required
                  @change="validateField('businessClassification')"
                  @focus="onFocus('businessClassification')"
                  @blur="onBlur"
                >

                  <option disabled value="">Business Classification*</option>
                  <option
                    v-for="item in businessClassifications"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
          </select>-->
          <!-- <input
                  v-model="formData.businessClassification"
                  :class="{ 'has-error': formErrors.businessClassification }"
                  type="text"
                  class="lt-input"
                  placeholder="Business Classification# (Optional)"
                  @focus="onFocus('businessClassification')"
                  @blur="onBlur"
                />
                <div
                  v-if="formErrors.businessClassification"
                  class="text-danger"
                >
                  {{ formErrors.businessClassification }}
                </div>
              </div>
            </div>
          </div>-->

          <div class="row">
            <div class="col-9">
              <div class="form-group">
                <input
                  v-model="formData.MC"
                  :class="{ 'has-error': formErrors.MC }"
                  type="text"
                  class="lt-input"
                  placeholder="MC# (Optional)"
                  @focus="onFocus('MC')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.MC" class="text-danger">{{ formErrors.MC }}</div>
              </div>
            </div>
          </div>

          <h4 class="card-title form-sub-title">Business Type</h4>

          <div class="row">
            <div class="col-12">
              <div class="form-group" @click="onFocus('businessType')">
                <select
                  v-model="formData.businessType"
                  :class="{ 'has-error': formErrors.businessType }"
                  class="lt-input"
                  required
                  @change="validateField('businessType')"
                  
                  @blur="onBlur"
                >
                <!-- @focus="onFocus('businessType')" -->
                  <option value>Business Type*</option>
                  <option v-for="item in businessTypes" :key="item" :value="item">{{ item }}</option>
                </select>

                <div
                  v-if="formErrors.businessType"
                  class="text-danger"
                >{{ formErrors.businessType }}</div>
              </div>
            </div>
          </div>

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
                <div class="next-title text-center d-inline pl-3">Business Info</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white">Cargo Group</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
      <span class="save-hover">Save & Continue</span>
    </div>
    <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
      <span class="save-hover">Save Changes</span>
    </div>
    <div class v-if="showmodel">
      <modelLogin/>
    </div>
  </div>
</template>

<script>
import ModalLogin from "./ModalLogin.vue";
import {
  validateField,
  validateForm,
  required,
  minLength
} from "../validators.js";
import { API } from "../api.js";
import { mapState } from "vuex";
import { constants } from "fs";
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "AccountInfoBusinessStructure",
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
    
    modelLogin: ModalLogin
  },
  data() {
    return {
      final_uuid: "",
      uuid: "",
      showmodel: false,
      save: true,
      userData: "",
      formData: {
        businessStructure: "",
        // businessClassification: '',
        MC: "",
        businessType: ""
      },
      rules: {
        businessStructure: [required],
        // businessClassification: [required],
        businessType: [required]
      },
      formErrors: {},
      hints: {
        businessStructure: "Please select Business Structure from below List",
        businessType:
          "It’s very important to make the correct selection here. Before purchasing a policy, confirm that business type is accurate",
        // businessClassification:"Please add Business Classfication here",
        MC: "Please add MC number"
      },
      businessStructures: [
        "Sole Proprietorship",
        "Partnership",
        "Corporation",
        "Limited Liability Company"
      ],

      // businessClassifications: [
      //  'Private(Proerty)'

      //   // { name: 'Private (Property)', value: 'Private(Property)' }
      //   // 'Private (Property)',
      // ],
      businessTypes: [
        "Trucker - General Freight",
        "Dirt, Sand & Gravel (DSG) Hauler",
        "Excavating, Landscaping or Building Contractor",
        "Trucker - Refrigerated Goods",
        "For-Hire Trucking – Additional Specialty Classes",
        "Agricultural Hauling",
        "Livestock Hauling",
        "Farmer",
        "Auto Hauler",
        "Towing",
        "Courier",
        "Expediter",
        "For-Hire Livery – Taxi, Black Car, Limousine, Sightseeing/Guided Tours",
        "Not-For-Hire Livery – Social Services, Courtesy (Hotel) Shuttle, Religious Organization, Child/Adult Daycare"
      ],
      loading: false,
      error: null
    };
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
        this.$store.dispatch("loadData", this.userData).then(res => {
          let len = this.$store.state.getData.data;
          for (let i = 0; i <= len.length; i++) {
            if (this.$store.state.getData.data[i].key == "businessStructure") {
              let a = this.$store.state.getData.data[i];
              let b = JSON.parse(a.val);
              
              this.formData.businessStructure = b.businessStructure;
              this.formData.businessType = b.businessType;
              this.formData.MC = b.MC;
            }
          }
        });
      }, 1000);
    } else {
      this.save = true;
      
      setTimeout(() => {
        this.$store.dispatch("loadData", this.uuid).then(res => {
          let len = this.$store.state.getData.data;
          for (let i = 0; i <= len.length; i++) {
            if (this.$store.state.getData.data[i].key == "businessStructure") {
              let a = this.$store.state.getData.data[i];
              let b = JSON.parse(a.val);
              
              this.formData.businessStructure = b.businessStructure;
              this.formData.businessType = b.businessType;
              this.formData.MC = b.MC;
            }
          }
        });
      }, 1000);
    }
  },
  computed: {
    ...mapState(["data"])
  },
  updated() {
    if (localStorage.getItem("showModal") == "true") {
      this.showmodel = true;
    } else {
      this.showmodel = false;
    }
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
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
          this.$router.push({ name: "AccountInfoBusinessStructure" });
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
          key: "businessStructure",
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
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    onFocus(fieldName) {
      this.$emit("update-hint", this.hints[fieldName]);
    },
    onBlur() {
      this.$emit("update-hint", "");
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
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
        let data = await API.get("company/current");

        if (data.status === "OK") {
          let { businessStructure } = data.data;
          this.uuid = data.data.b;
          if (businessStructure) {
            this.formData = {
              ...this.formData,
              ...businessStructure
            };
          }
        } else if (data.status === "ERROR") {
          // this.$router.replace({ name: 'Home' });
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
          key: "businessStructure",
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

<style>
select{
  position: relative;
  -webkit-appearance: none;
  background: url('../assets/images/arrow-dropdown.png') no-repeat 96% center;
  -moz-appearance: none;
}
</style>
