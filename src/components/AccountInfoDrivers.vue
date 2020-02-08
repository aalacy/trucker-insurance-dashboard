<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <div class="d-flex">
            <h4 class="card-title form-sub-title mb-4 mr-3">Drivers
              <label class="label">
                <input type="checkbox" v-on:change="changeData()"> Same as Mailing Address
              </label>
            </h4>
            
          </div>

          <hr>

          <template>
            
            <div
              class="owner-form-item mob-2"
              v-for="(singleDriver, index) in driversData"
              :key="index"
            >
            
              <div class="row">
                <div class="col">
                  <h2 class="h5">Driver #{{ index + 1 }}</h2>
                </div>

                <button
                  v-show="index > 0"
                  type="button"
                  class="lt-button mx-2 mb-3"
                  @click="removeDriverData(index)"
                  title="Remove Driver"
                >
                  <h3>-</h3>
                </button>
              </div>

              <div class="row">
                <div class="col-12 col-lg-5">
                  <div class="form-group">
                    <input
                      v-model="driversData[index].firstName"
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      :class="{ 'has-error': !validations.driversData[index].firstName.is_valid }"
                      @change="validateFieldCustom('firstName', index)"
                    >
                    <div
                      class="text-danger"
                      v-show="!validations.driversData[index].firstName.is_valid"
                    >{{ validations.driversData[index].firstName.text }}</div>
                  </div>
                </div>
                  <div class="col-4 col-lg-2">
                    <div class="form-group">
                      <input
                      v-model="driversData[index].middleName"
                      type="text"
                      class="form-control"
                      maxlength="1"
                      placeholder="M."
                    >
                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].middleName.is_valid"
                      >{{ validations.driversData[index].middleName.text }}</div>
                   </div>
                  </div>

                  <div class="col-12 col-lg-5">
                    <div class="form-group">
                      <input
                        v-model="driversData[index].lastName"
                        type="text"
                        class="form-control"
                        placeholder="Last name"
                        :class="{ 'has-error': !validations.driversData[index].lastName.is_valid }"
                        @change="validateFieldCustom('lastName', index)"
                      >
                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].lastName.is_valid"
                      >{{ validations.driversData[index].lastName.text }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="row" id="text-date">
                  <div class="col-12 col-md-6 pt-2">
                    <div>Date of Birth</div>
                  </div>

                  <div class="col-12 col-md-6" id="text-date">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <input
                            v-model="driversData[index].dobM"
                            type="number"
                            class="form-control"
                            placeholder="MM"
                            :class="{ 'has-error': !validations.driversData[index].dobM.is_valid }"
                            @change="validateFieldCustom('dobM', index)"
                          >
                          <!-- required -->
                          <!-- @focus="onFocus('dobM')"
                          @blur="onBlur"
                          @change="validateField('dobM')"-->

                          <div
                            class="text-danger"
                            v-show="!validations.driversData[index].dobM.is_valid"
                          >{{ validations.driversData[index].dobM.text }}</div>
                        </div>
                      </div>
                      <span class="mt-1">/</span>
                      <div class="col">
                        <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobD }" -->
                          <input
                            v-model="driversData[index].dobD"
                            type="number"
                            class="form-control"
                            placeholder="DD"
                            :class="{ 'has-error': !validations.driversData[index].dobD.is_valid }"
                            @change="validateFieldCustom('dobD', index)"
                          >
                          <!-- required -->
                          <!-- @focus="onFocus('dobD')"
                          @blur="onBlur"
                          @change="validateField('dobD')"-->

                          <div
                            class="text-danger"
                            v-show="!validations.driversData[index].dobD.is_valid"
                          >{{ validations.driversData[index].dobD.text }}</div>
                        </div>
                      </div>
                      <span class="mt-1">/</span>
                      <div class="col">
                        <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobY }" -->
                          <input
                            v-model="driversData[index].dobY"
                            type="number"
                            class="form-control"
                            placeholder="YYYY"
                            :class="{ 'has-error': !validations.driversData[index].dobY.is_valid }"
                            @change="validateFieldCustom('dobY', index)"
                          >
                          

                          <div
                            class="text-danger"
                            v-show="!validations.driversData[index].dobY.is_valid"
                          >{{ validations.driversData[index].dobY.text }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <input
                        v-model="driversData[index].licenseNumber"
                        type="text"
                        class="form-control"
                        placeholder="License Number"
                        :class="{ 'has-error': !validations.driversData[index].licenseNumber.is_valid }"
                        @change="validateFieldCustom('licenseNumber', index)"
                      >

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].licenseNumber.is_valid"
                      >{{ validations.driversData[index].licenseNumber.text }}</div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="form-group">
                      <input
                        v-model="driversData[index].CDL"
                        type="number"
                        class="form-control"
                        placeholder="Years of CDL Experience"
                      >

                      <!-- <div
                        class="text-danger"
                        v-show="!validations.driversData[index].CDL.is_valid"
                      >{{ validations.driversData[index].CDL.text }}</div> -->
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.address }" -->
                      <input
                        v-model="driversData[index].address"
                        type="text"
                        class="form-control"
                        placeholder="Address"
                       :class="{ 'has-error': !validations.driversData[index].address.is_valid }"
                       @change="validateFieldCustom('address', index)"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('address')"
                      @blur="onBlur"
                      @change="validateField('address')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].address.is_valid"
                      >{{ validations.driversData[index].address.text }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.city }" -->
                      <input
                        v-model="driversData[index].city"
                        type="text"
                        class="form-control"
                        placeholder="City"
                       :class="{ 'has-error': !validations.driversData[index].city.is_valid }"
                       @change="validateFieldCustom('city', index)"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('city')"
                      @blur="onBlur"
                      @change="validateField('city')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].city.is_valid"
                      >{{ validations.driversData[index].city.text }}</div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.state }" -->
                      <input
                        v-model="driversData[index].state"
                        type="text"
                        class="form-control"
                        placeholder="State"
                       :class="{ 'has-error': !validations.driversData[index].state.is_valid }"
                       @change="validateFieldCustom('state', index)"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('state')"
                      @blur="onBlur"
                      @change="validateField('state')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].state.is_valid"
                      >{{ validations.driversData[index].state.text }}</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.zip }" -->
                      <input
                        v-model="driversData[index].zip"
                        type="number"
                        class="form-control"
                        minlength="5"
                        placeholder="Zip"
                      :class="{ 'has-error': !validations.driversData[index].zip.is_valid }"
                      @change="validateFieldCustom('zip', index)"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('zip')"
                      @blur="onBlur"
                      @change="validateField('zip')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].zip.is_valid"
                      >{{ validations.driversData[index].zip.text }}</div>
                    </div>
                  </div>
              
              </div>
              <div class="row" id="text-date">
                <div class="col-12 col-md-6 pt-2">
                  <div>Date of Hire</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData[index].dohM"
                          type="number"
                          class="form-control"
                          placeholder="MM"
                          :class="{ 'has-error': !validations.driversData[index].dohM.is_valid }"
                          @change="validateFieldCustom('dohM', index)"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData[index].dohM.is_valid"
                        >{{ validations.driversData[index].dohM.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData[index].dohD"
                          type="number"
                          class="form-control"
                          placeholder="DD"
                           :class="{ 'has-error': !validations.driversData[index].dohD.is_valid }"
                          @change="validateFieldCustom('dohD', index)"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData[index].dohD.is_valid"
                        >{{ validations.driversData[index].dohD.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData[index].dohY"
                          type="number"
                          class="form-control"
                          placeholder="YYYY"
                           :class="{ 'has-error': !validations.driversData[index].dohY.is_valid }"
                          @change="validateFieldCustom('dohY', index)"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData[index].dohY.is_valid"
                        >{{ validations.driversData[index].dohY.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>
             
            </div>
            </div>
          </template>

          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another driver</div>

            <div class="col-auto text-right">
              <button
                type="button"
                class="lt-button px-3"
                @click="addDriverData"
                title="Add Driver"
              >+</button>
            </div>
          </div>

          <!-- <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div> -->
        </div>

        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="button"
                class="lt-button lt-button-default mob-2 px-4 btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">ELD Provider</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main mob-2 px-4 btn-block btn-border-radius-rb"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white mob-2">Owners</div>
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
import uuidv4 from "uuid/v4";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import axios from "axios";

export default {
  name: "AccountInfoDrivers",
  components: {
    AccountInfoDriversItem: () => import("./AccountInfoDriversItem.vue"),
    modelLogin: ModalLogin,
  },
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
      userData:"",
      final_uuid: "",
      uuid: "",
      loading: false,
      error: null,
      save: true,
      showmodel: false,
      formData: {
        drivers: []
      },
      mailingAddress: {},
      driversData: [],
      validations: {
        driversData: {},
        oneOwner: {
          is_valid: true,
          text: ""
        },
        website: {
          is_valid: true,
          text: ""
        }
      }
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
    } else {
      this.save = true;
    }
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
    changeData() {
      if (this.driversData.length > 0 && this.mailingAddress) {
        this.driversData[0].address = this.mailingAddress.address;
        this.driversData[0].city = this.mailingAddress.city;
        this.driversData[0].state = this.mailingAddress.state;
        this.driversData[0].zip = this.mailingAddress.zip;
      }
    },
    validateFieldCustom(fieldName, index){
      if (this.driversData[index][fieldName].trim() == '') {
        this.validations.driversData[index][fieldName].is_valid = false;
        this.validations.driversData[index][fieldName].text = 'Please enter   ' + fieldName + '!';
      } else {
        this.validations.driversData[index][fieldName].is_valid = true;
      }
    },
    sizeOfObject(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    },
   
     addDriverDataValidation(count){
      let driverDatavalidationsLength = this.sizeOfObject(this.validations.driversData);
      for (let index = 0; index < count; index++) {

        this.$set(this.validations.driversData, driverDatavalidationsLength + index, {
         firstName: {
            is_valid: true,
            text: ""
          },
          middleName: {
            is_valid: true,
            text: ""
          },
          lastName: {
            is_valid: true,
            text: ""
          },
          dobM: {
            is_valid: true,
            text: ""
          },
          dobD: {
            is_valid: true,
            text: ""
          },
          dobY: {
            is_valid: true,
            text: ""
          },
          dohM: {
            is_valid: true,
            text: ""
          },
          dohD: {
            is_valid: true,
            text: ""
          },
          dohY: {
            is_valid: true,
            text: ""
          },
          address: {
            is_valid: true,
            text: ""
          },
          city: {
            is_valid: true,
            text: ""
          },
          state: {
            is_valid: true,
            text: ""
          },
          zip: {
            is_valid: true,
            text: ""
          },
          licenseNumber: {
            is_valid: true,
            text: ""
          },
          // yearsOfExperience: {
          //   is_valid: true,
          //   text: ""
          // },
          CDL: {
            is_valid: true,
            text: ""
          }
        });
      }
    },
    addDriverData(data) {
      // 
      if (data == undefined || data.firstName   == undefined ) {
        // 
       this.driversData.push({
          firstName: '',
          middleName: '',
          lastName: '',
          dobM: '',
          dobD: '',
          dobY: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          dohM: '',
          dohD: '',
          dohY: '',
          licenseNumber: '',
          CDL: ''
        });
        // 
        this.addDriverDataValidation(1);
      } else {
        
        this.driversData.push(data);
      }
      
    },
    removeDriverData(key) {
      this.driversData.splice(key, 1);
      // this.validations.driversData.splice(key, 1);
      Vue.delete(this.validations.driversData,key)
    },
    validateNewDriverData() {
      let validNewDriverForm = true;
      for (var index in this.driversData) {
        if (this.driversData.hasOwnProperty(index)) {
          if (this.driversData[index].firstName.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].firstName.is_valid = false;
            this.validations.driversData[index].firstName.text =
              "Please enter firstname!";
          } else {
            this.validations.driversData[index].firstName.is_valid = true;
            this.validations.driversData[index].firstName.text = "";
          }

          if (this.driversData[index].lastName.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].lastName.is_valid = false;
            this.validations.driversData[index].lastName.text =
              "Please enter lastname!";
          } else {
            this.validations.driversData[index].lastName.is_valid = true;
            this.validations.driversData[index].lastName.text = "";
          }

          if (this.driversData[index].dobM < 1 || this.driversData[index].dobM > 12)  {
              validNewDriverForm = false;
            this.validations.driversData[index].dobM.is_valid = false;
            this.validations.driversData[index].dobM.text =
              "Please enter valid month!";
            if(this.driversData[index].dobM.trim() == ""){
            validNewDriverForm = false;
            this.validations.driversData[index].dobM.is_valid = false;
            this.validations.driversData[index].dobM.text =
              "Please enter month!";
          }
           }else {
            this.validations.driversData[index].dobM.is_valid = true;
            this.validations.driversData[index].dobM.text = "";
          }

          if (this.driversData[index].dobD < 1 || this.driversData[index].dobD > 31)  {
            validNewDriverForm = false;
            this.validations.driversData[index].dobD.is_valid = false;
            this.validations.driversData[index].dobD.text =
              "Please enter valid date!";
          if (this.driversData[index].dobD.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dobD.is_valid = false;
            this.validations.driversData[index].dobD.text =
              "Please enter date!";
          } }else {
            this.validations.driversData[index].dobD.is_valid = true;
            this.validations.driversData[index].dobD.text = "";
          }

          if(this.driversData[index].dobY.length<4){
              validNewDriverForm = false;
            this.validations.driversData[index].dobY.is_valid = false;
            this.validations.driversData[index].dobY.text =
              "Please enter valid year!";
          if (this.driversData[index].dobY.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dobY.is_valid = false;
            this.validations.driversData[index].dobY.text =
              "Please enter year!";
          } }else {
            
            this.validations.driversData[index].dobY.is_valid = true;
            this.validations.driversData[index].dobY.text = "";
          }

           if (this.driversData[index].dohM < 1 || this.driversData[index].dohM > 12)  {
              validNewDriverForm = false;
            this.validations.driversData[index].dohM.is_valid = false;
            this.validations.driversData[index].dohM.text =
              "Please enter valid month!";
          if (this.driversData[index].dohM.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dohM.is_valid = false;
            this.validations.driversData[index].dohM.text =
              "Please enter month!";
          } }else {
            this.validations.driversData[index].dohM.is_valid = true;
            this.validations.driversData[index].dohM.text = "";
          }
          
          if (this.driversData[index].dohD < 1 || this.driversData[index].dohD > 31)  {
            validNewDriverForm = false;
            this.validations.driversData[index].dohD.is_valid = false;
            this.validations.driversData[index].dohD.text =
              "Please enter valid date!";
          if (this.driversData[index].dohD.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dohD.is_valid = false;
            this.validations.driversData[index].dohD.text =
              "Please enter date!";
          }} else {
            this.validations.driversData[index].dohD.is_valid = true;
            this.validations.driversData[index].dohD.text = "";
          }

          if(this.driversData[index].dohY.length<4){
              validNewDriverForm = false;
            this.validations.driversData[index].dohY.is_valid = false;
            this.validations.driversData[index].dohY.text =
              "Please enter valid year!";
          if (this.driversData[index].dohY.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dohY.is_valid = false;
            this.validations.driversData[index].dohY.text =
              "Please enter year!";
          }} else {
            this.validations.driversData[index].dohY.is_valid = true;
            this.validations.driversData[index].dohY.text = "";
          }

          if (this.driversData[index].address.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].address.is_valid = false;
            this.validations.driversData[index].address.text =
              "Please enter an address!";
          } else {
            this.validations.driversData[index].address.is_valid = true;
            this.validations.driversData[index].address.text = "";
          }

          if (this.driversData[index].city.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].city.is_valid = false;
            this.validations.driversData[index].city.text =
              "Please enter city!";
          } else {
            this.validations.driversData[index].city.is_valid = true;
            this.validations.driversData[index].city.text = "";
          }

          if (this.driversData[index].state.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].state.is_valid = false;
            this.validations.driversData[index].state.text =
              "Please enter state!";
          } else {
            this.validations.driversData[index].state.is_valid = true;
            this.validations.driversData[index].state.text = "";
          }

          if(!this.driversData[index].zip.match(/(^\d{5}$)/)){
            validNewDriverForm = false;
            this.validations.driversData[index].zip.is_valid = false;
            this.validations.driversData[index].zip.text = 'Please enter minimum 5 character!';
          
          if (this.driversData[index].zip.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].zip.is_valid = false;
            this.validations.driversData[index].zip.text = "Please enter zip!";
          }} else {
            this.validations.driversData[index].zip.is_valid = true;
            this.validations.driversData[index].zip.text = "";
          }

          if (this.driversData[index].licenseNumber.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].licenseNumber.is_valid = false;
            this.validations.driversData[index].licenseNumber.text =
              "Please enter licenseNumber!";
          } else {
            this.validations.driversData[index].licenseNumber.is_valid = true;
            this.validations.driversData[index].licenseNumber.text = "";
          }
          
        }
      }
      return validNewDriverForm;
    },
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
        
        this.show();
        if (willDelete) {
          this.$router.push({ name: "AccountInfoDrivers" });
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
      this.setDataFromForms();

      let driverForms = this.$refs.driverForm;
      if (!driverForms.length) {
        return;
      }

      let allFormAreValid = driverForms.every(formRef =>
        formRef.validateForm()
      );

      if (!allFormAreValid) {
        return;
      }
      var temp_uuid;
      this.loading = true;
      this.error = null;

      this.final_uuid = this.uuid;
      try {
        let data = await API.post("company/save", {
          key: "drivers",
          val: {
          drivers:this.driversData.map(d => {
            let driver = { ...d };
            delete driver._uuid;
            return driver;
          }),
          },
          user_id: localStorage.getItem("userId"),
          uuid: temp_uuid
        });

        if (data.status === "OK") {
          if (!localStorage.getItem("token")) {
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
    addForm() {
      this.drivers.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.drivers.splice(index, 1);

      // if (!this.drivers.length) {
      //   this.error = "Please add at least one driver";
      // }
    },

    updateHint(hint) {
      this.$emit("update-hint", hint);
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
        this.uuid = res.data.uuid;
        if (res.status === "OK") {
          let { company: { driverInformationList, mailingAddress } } = res.data;
          
          if (fullProfile.mailingAddress.constructor !== Object) {
            this.mailingAddress = JSON.parse(mailingAddress);
          } else {
            this.mailingAddress = mailingAddress;
          }

          if (driverInformationList) {
            if (!Array.isArray(driverInformationList)) {
              driverInformationList = JSON.parse(driverInformationList);
            }
            
            this.drivers = driverInformationList.map(d => ({ ...d, _uuid: uuidv4() }));

            if(driverInformationList.length > 0){
              this.driversData = driverInformationList;
              
              this.addDriverDataValidation(driverInformationList.length)
            }else{
              this.addDriverData();
            }
          } else {
            // this.addForm();
             this.addDriverData();
          }
        } else if (res.status === "ERROR") {
           
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
           this.addDriverData();
      } finally {
        this.loading = false;
           
      }
    },
    
    async updateCompany() {
      // if (!this.driversData.length) {
      //   return;
      // }
      let allFormAreValid = this.validateNewDriverData();
      if (!allFormAreValid) {
        
        return;
      } else {
        
      }

      this.loading = true;
      this.error = null;
      this.final_uuid = this.uuid;
      try {
        const data = {
          driverInformationList: this.driversData,
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid
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
select {
  position: relative;
  -webkit-appearance: none;
  background: url("../assets/images/arrow-dropdown.png") no-repeat 96% center;
  -moz-appearance: none;
}

.label {
  font-weight: 500;
  font-size: 15px;
  margin-left: 0.5rem;
}
</style>

