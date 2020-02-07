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
                  class="form-control"
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

          <div class="row">
            <div class="col-9">
              <div class="form-group">
                <input
                  v-model="formData.mcNumber"
                  :class="{ 'has-error': formErrors.mcNumber }"
                  type="text"
                  class="form-control"
                  placeholder="MC# (Optional)"
                  @focus="onFocus('mcNumber')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.mcNumber" class="text-danger">{{ formErrors.mcNumber }}</div>
              </div>
            </div>
          </div>

          <h4 class="card-title form-sub-title mb-3">Business Type</h4>

          <div class="row">
            <div class="col-12">
              <div class="form-group" @click="onFocus('businessType')">
                <select
                  v-model="formData.businessType"
                  :class="{ 'has-error': formErrors.businessType }"
                  class="form-control"
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
        mcNumber: "",
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
        mcNumber: "Please add MC number"
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
    this.$emit("update-hint", "It's important to correctly list your business structure. It should be as reported on SAFER.");
    
    this.uuid = localStorage.getItem('uuid');
    if (localStorage.getItem("token")) {
      this.save = false;
      
    } else {
      this.save = true;
      
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
      temp_uuid = this.uuid;

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
      this.$emit("update-hint", "It's important to correctly list your business structure. It should be as reported on SAFER.");
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
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);

        if (res.status === "OK") {
          let { company: { businessStructure, businessType, mcNumber }, uuid } = res.data;
          this.uuid = uuid;
          this.formData = {
            ...this.formData,
            businessStructure,
            businessType,
            mcNumber
          };
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
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      try {

        const { businessType, mcNumber, businessStructure } = this.formData;
        const data = {
          businessType,
          mcNumber,
          businessStructure,
          user_id: localStorage.getItem("userId"),
          uuid: this.uuid
        };

        let res = await API.post("company/save", {data});

        if (res.status === "OK") {
          localStorage.setItem('uuid', res.data);
          this.goNextForm();
        } else if (res.status === "ERROR") {
          this.error = res.messages[0] || res.data;
        }
       
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
