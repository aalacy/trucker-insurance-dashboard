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
                  required
                  @change="validateField('businessStructure')"
                  @focus="onFocus('businessStructure')"
                  @blur="onBlur"
                >
                  <option disabled value="">Business Structure*</option>
                  <option
                    v-for="item in businessStructures"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>

                <div v-if="formErrors.businessStructure" class="text-danger">
                  {{ formErrors.businessStructure }}
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <select
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
                </select>

                <div
                  v-if="formErrors.businessClassification"
                  class="text-danger"
                >
                  {{ formErrors.businessClassification }}
                </div>
              </div>
            </div>
          </div>

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
                />

                <div v-if="formErrors.MC" class="text-danger">
                  {{ formErrors.MC }}
                </div>
              </div>
            </div>
          </div>


          <h4 class="card-title form-sub-title">Business Type</h4>

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <select
                  v-model="formData.businessType"
                  :class="{ 'has-error': formErrors.businessType }"
                  class="lt-input"
                  required
                  @change="validateField('businessType')"
                  @focus="onFocus('businessType')"
                  @blur="onBlur"
                >
                  <option disabled value="">Business Type*</option>
                  <option
                    v-for="item in businessTypes"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>

                <div v-if="formErrors.businessType" class="text-danger">
                  {{ formErrors.businessType }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>  
        </div>
        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="button"
                class="lt-button lt-button-default px-4 btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3">
                  Business Info
                </div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
                @click="goNextForm"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white">
                  Cargo Group
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
      <span class="save-hover">Save & Continue</span>
    </div>
    <div class=" " v-if="showmodel">
      <modelLogin/>
    </div>
  </div>
</template>

<script>
import ModalLogin from "./ModalLogin.vue"
import {
  validateField,
  validateForm,
  required,
   minLength
} from '../validators.js';
import { API } from '../api.js';
import {mapState} from "vuex"
import { constants } from 'fs';

export default {
  name: 'AccountInfoBusinessStructure',
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
  components:{
    "modelLogin":ModalLogin
  },
  data() {
    return {
      showmodel:false,
      save:true,
      formData: {
        businessStructure: '',
        businessClassification: '',
        MC: '',
        businessType: ''
      },
      rules: {
        businessStructure: [required],
        businessClassification: [required],
        businessType: [required]
      },
      formErrors: {},
      hints: {
        businessStructure: 'Some hint',
        MC: 'Another hint'
      },
      businessStructures: [
        'Sole Proprietorship',
        'Partnership',
        'Corporation',
        'Limited Liability Company'
      ],
      
      businessClassifications: [
       'Private(Proerty)'
       
        // { name: 'Private (Property)', value: 'Private(Property)' }
        // 'Private (Property)',
      ],
      businessTypes: [
        'Trucker - General Freight',
        'Dirt, Sand & Gravel (DSG) Hauler',
        'Excavating, Landscaping or Building Contractor',
        'Trucker - Refrigerated Goods',
        'For-Hire Trucking – Additional Specialty Classes',
        'Agricultural Hauling',
        'Livestock Hauling',
        'Farmer',
        'Auto Hauler',
        'Towing',
        'Courier',
        'Expediter',
        'For-Hire Livery – Taxi, Black Car, Limousine, Sightseeing/Guided Tours',
        'Not-For-Hire Livery – Social Services, Courtesy (Hotel) Shuttle, Religious Organization, Child/Adult Daycare'
      ],
      loading: false,
      error: null
    };
  },
 
mounted(){
    if(localStorage.getItem("token")){
     this.save = false
     this.$store.dispatch('loadData',localStorage.getItem("uuid"))
    let a = this.$store.state.getData.data[0]
    let b = JSON.parse(a.val)
    console.log("ba",b)
    this.formData.businessStructure =  b.businessStructure;
    this.formData.businessClassification = b.businessClassification;  
    this.formData.businessType = b.businessType
    this.formData.MC = b.MC
    console.log("b.businessStructure",b.businessStructure)
    console.log("b.",b)
    console.log("b.businessClassification",b);
   }else{
     this.save = true
   }
 },
 computed:{
...mapState([
    'data'
  ])
} ,
 updated(){
if(localStorage.getItem("showModal") == "true")
     {
       this.showmodel = true;
     }
     else{
       this.showmodel = false;
     }
 },
  created() {
    this.$emit('update-progress', this.progress);
    // this.loadCompany();
  },
  methods: {    
     async show() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }
      
      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("company/save", {
          key: "cargoGroup",
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });
        if (data.status === "OK") {
           if(this.showmodel){
          this.showmodel = false;
          
        }else{
          this.showmodel = true;
        }
        } else if (data.status === "ERROR") {
          // this.showmodel = true;
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        // this.showmodel = true;

        console.error(err);
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
      }
    },
    onFocus(fieldName) {
      this.$emit('update-hint', this.hints[fieldName]);
    },
    onBlur() {
      this.$emit('update-hint', '');
    },
    goPrevForm() {
      this.$emit('go-to-form', this.prevForm);
    },
    goNextForm() {
      this.$emit('go-to-form', this.nextForm);
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
        let data = await API.get('company/current');

        if (data.status === 'OK') {
          let { businessStructure } = data.data;
          if (businessStructure) {
            this.formData = {
              ...this.formData,
              ...businessStructure
            };
          }
        } else if (data.status === 'ERROR') {
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
        let data = await API.post('company/save', {
          key: 'businessStructure',
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });

        if (data.status === 'OK') {
          this.goNextForm();
        } else if (data.status === 'ERROR') {
          this.error = data.messages[0] || data.data;
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
</style>
