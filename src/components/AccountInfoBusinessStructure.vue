<template>
  <div class="business-structure-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="form-sub-title mt-2">Business Structure</h4>

          <div class="row">
            <div class="col-lg-7 col-md-12">
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
            <div class="col-lg-7 col-md-12">
              <div class="form-group">
                <input
                  v-model="formData.mcNumber"
                  :class="{ 'has-error': formErrors.mcNumber }"
                  type="text"
                  class="lt-input"
                  placeholder="MC# (Optional)"
                  @focus="onFocus('mcNumber')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.mcNumber" class="text-danger">{{ formErrors.mcNumber }}</div>
              </div>
            </div>
          </div>

          <h4 class="form-sub-title mt-3 mb-4">Business Type</h4>

          <div class="row mb-3">
            <div class="col-lg-7 col-md-12">
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
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title">Personal Info</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Cargo Group</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
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
        "Not-For-Hire Livery – Social Services, Courtesy (Hotel) Shuttle, Religious Organization, Child/Adult Daycare",
        "LLC",
        "INC",
        "LLP"
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

        if (res && res.status === "OK") {
          let { company: { businessStructureRaw, businessStructure, businessType, mcNumber }, uuid } = res.data;
          this.uuid = uuid;
          this.formData = {
            ...this.formData,
            businessStructure,
            businessType,
            mcNumber
          };
          if (!businessType) {
            let _businessStuctureRaw = businessStructureRaw
            if (_businessStuctureRaw && _businessStuctureRaw.constructor !== Object) {
              _businessStuctureRaw = JSON.parse(businessStructureRaw)
            }
            if (_businessStuctureRaw && _businessStuctureRaw['Legal Name']) {
              const names = _businessStuctureRaw['Legal Name'].split(' ')
              const _type = names[names.length -1]
              if (['LLC', 'LLP', 'INC'].includes(_type)) {
                this.formData.businessType = _type
              }
            }
          }
        } else if (res && res.status === "ERROR") {
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
