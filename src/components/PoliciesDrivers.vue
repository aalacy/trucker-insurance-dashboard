<template>
  <div class="policies-drivers container-fluid">

    <div class="card mb-5">
      <div class="card-body">
        <div class="d-flex">
          <h4 class="card-title form-sub-title flex-grow-1 mb-4">
            Drivers
          </h4>

          <div class="block-subtitle">
            <strong class="mr-3">Add a Driver</strong>
            <button class="btn btn-light border" @click="show=true"><b>+</b></button>
          </div>
        </div>

        <div v-if="loading" class="col-12">
          <img
              src="../assets/images/loading/loading_truck_128.gif"
              class="d-block mx-auto rounded"
              alt="Loading"
            >
        </div>
        
        <template v-if="auth.quoteSubmitted == 'true'">
          <div v-for="item in drivers" :key="item.id" class="block-divider d-flex">
            <div class="policy-image-wrapper px-1">
              <img :src="item.img" alt="" class="policy-image" />
            </div>

            <div class="policy-info w-100 px-3">
              <div class="block-title mb-2">
                {{ item.firstName }} {{ item.lastName }}
              </div>

              <div class="row">
                <div class="col">
                  <div class="block-subtitle">
                    Policy Type:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>{{ item.policyType }}</strong></div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="block-subtitle">
                    Date of Birth:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>{{ item.dob  }}</strong></div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="block-subtitle">
                    Mo/Yr Premium:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>$ {{ item.premium | premium }}</strong></div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="block-subtitle">
                    License Number:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>{{ item.licenseNumber }}</strong></div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="block-subtitle">
                    State:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>{{ item.state }}</strong></div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="block-subtitle">
                    Date Hired:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>{{ item.hireDate  }}</strong></div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col">
                  <div class="block-subtitle">
                    Years of Experience:
                  </div>
                </div>
                <div class="col">
                  <div class="block-subtitle"><strong>{{ item.cdlYearsExperience }}</strong></div>
                </div>
              </div>
              <div>
                <div class="block-subtitle mb-1">
                  <strong>Remove this Driver</strong>
                </div>

                <textarea
                  class="col-10 mb-2"
                  style="min-height: 81px;"
                  v-model="item.reasonOfRemove"
                  placeholder="Reason..."
                ></textarea>

                <div>
                  <button type="button" class="lt-button lt-button-main" :disabled="loading" @click="removeDriver(item.driverId, item.reasonOfRemove)">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
        </template>
        <template v-else>
          <div>This page is currently empty and will be populated once your submitted Quote is processed.</div>
        </template>

        <b-modal v-model="show" id="modal-pdf" centered  size="lg" title="Add a driver" hide-footer>
          <form class="p-3" @submit.prevent="addDriver">
            <div class="row">
              <div class="col-12 col-lg-5">
                <div class="form-group">
                  <input
                    v-model="driversData.firstName"
                    type="text"
                    class="lt-input"
                    placeholder="First Name"
                    :class="{ 'has-error': !validations.driversData.firstName.is_valid }"
                    @change="validateFieldCustom('firstName')"
                  >
                  <div
                    class="text-danger"
                    v-show="!validations.driversData.firstName.is_valid"
                  >{{ validations.driversData.firstName.text }}</div>
                </div>
              </div>
                <div class="col-6 col-lg-2">
                  <div class="form-group">
                    <input
                    v-model="driversData.middleName"
                    type="text"
                    class="lt-input"
                    maxlength="1"
                    placeholder="M."
                  >
                    <div
                      class="text-danger"
                      v-show="!validations.driversData.middleName.is_valid"
                    >{{ validations.driversData.middleName.text }}</div>
                 </div>
                </div>

                <div class="col-12 col-lg-5">
                  <div class="form-group">
                    <input
                      v-model="driversData.lastName"
                      type="text"
                      class="lt-input"
                      placeholder="Last Name"
                      :class="{ 'has-error': !validations.driversData.lastName.is_valid }"
                      @change="validateFieldCustom('lastName')"
                    >
                    <div
                      class="text-danger"
                      v-show="!validations.driversData.lastName.is_valid"
                    >{{ validations.driversData.lastName.text }}</div>
                  </div>
                </div>
              </div>
              
              <div class="row" id="text-date">
                <div class="col-sm-12 col-md-5 pt-2">
                  <b class="mr-3">Date of Birth</b>
                </div>

                <div class="col-sm-12 col-md-7" id="text-date">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData.dobM"
                          type="number"
                          class="lt-input"
                          placeholder="MM"
                          :class="{ 'has-error': !validations.driversData.dobM.is_valid }"
                          @change="validateFieldCustom('dobM')"
                        >
                        <!-- required -->
                        <!-- @focus="onFocus('dobM')"
                        @blur="onBlur"
                        @change="validateField('dobM')"-->

                        <div
                          class="text-danger"
                          v-show="!validations.driversData.dobM.is_valid"
                        >{{ validations.driversData.dobM.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                        <!-- :class="{ 'has-error': formErrors.dobD }" -->
                        <input
                          v-model="driversData.dobD"
                          type="number"
                          class="lt-input"
                          placeholder="DD"
                          :class="{ 'has-error': !validations.driversData.dobD.is_valid }"
                          @change="validateFieldCustom('dobD')"
                        >
                        <!-- required -->
                        <!-- @focus="onFocus('dobD')"
                        @blur="onBlur"
                        @change="validateField('dobD')"-->

                        <div
                          class="text-danger"
                          v-show="!validations.driversData.dobD.is_valid"
                        >{{ validations.driversData.dobD.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col-5">
                      <div class="form-group">
                        <!-- :class="{ 'has-error': formErrors.dobY }" -->
                        <input
                          v-model="driversData.dobY"
                          type="number"
                          class="lt-input"
                          placeholder="YYYY"
                          :class="{ 'has-error': !validations.driversData.dobY.is_valid }"
                          @change="validateFieldCustom('dobY')"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData.dobY.is_valid"
                        >{{ validations.driversData.dobY.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <input
                      v-model="driversData.licenseNumber"
                      type="text"
                      class="lt-input"
                      placeholder="License Number"
                      :class="{ 'has-error': !validations.driversData.licenseNumber.is_valid }"
                      @change="validateFieldCustom('licenseNumber')"
                    >

                    <div
                      class="text-danger"
                      v-show="!validations.driversData.licenseNumber.is_valid"
                    >{{ validations.driversData.licenseNumber.text }}</div>
                  </div>
                </div>

                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <input
                      v-model="driversData.CDL"
                      type="number"
                      class="lt-input"
                      placeholder="Years of CDL Experience"
                    >

                    <!-- <div
                      class="text-danger"
                      v-show="!validations.driversData.CDL.is_valid"
                    >{{ validations.driversData.CDL.text }}</div> -->
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <!-- :class="{ 'has-error': formErrors.address }" -->
                    <input
                      v-model="driversData.address"
                      type="text"
                      class="lt-input"
                      placeholder="Address"
                     :class="{ 'has-error': !validations.driversData.address.is_valid }"
                     @change="validateFieldCustom('address')"
                    >
                    <!-- required -->
                    <!-- @focus="onFocus('address')"
                    @blur="onBlur"
                    @change="validateField('address')"-->

                    <div
                      class="text-danger"
                      v-show="!validations.driversData.address.is_valid"
                    >{{ validations.driversData.address.text }}</div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <!-- :class="{ 'has-error': formErrors.city }" -->
                    <input
                      v-model="driversData.city"
                      type="text"
                      class="lt-input"
                      placeholder="City"
                     :class="{ 'has-error': !validations.driversData.city.is_valid }"
                     @change="validateFieldCustom('city')"
                    >
                    <!-- required -->
                    <!-- @focus="onFocus('city')"
                    @blur="onBlur"
                    @change="validateField('city')"-->

                    <div
                      class="text-danger"
                      v-show="!validations.driversData.city.is_valid"
                    >{{ validations.driversData.city.text }}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <!-- :class="{ 'has-error': formErrors.state }" -->
                    <input
                      v-model="driversData.state"
                      type="text"
                      class="lt-input"
                      placeholder="State"
                     :class="{ 'has-error': !validations.driversData.state.is_valid }"
                     @change="validateFieldCustom('state')"
                    >
                    <!-- required -->
                    <!-- @focus="onFocus('state')"
                    @blur="onBlur"
                    @change="validateField('state')"-->

                    <div
                      class="text-danger"
                      v-show="!validations.driversData.state.is_valid"
                    >{{ validations.driversData.state.text }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <!-- :class="{ 'has-error': formErrors.zip }" -->
                    <input
                      v-model="driversData.zip"
                      type="number"
                      class="lt-input"
                      minlength="5"
                      placeholder="Zip Code"
                    :class="{ 'has-error': !validations.driversData.zip.is_valid }"
                    @change="validateFieldCustom('zip')"
                    >
                    <!-- required -->
                    <!-- @focus="onFocus('zip')"
                    @blur="onBlur"
                    @change="validateField('zip')"-->

                    <div
                      class="text-danger"
                      v-show="!validations.driversData.zip.is_valid"
                    >{{ validations.driversData.zip.text }}</div>
                  </div>
                </div>
            
            </div>
            <div class="row" id="text-date">
              <div class="col-12 col-md-5 pt-2">
                 <div class="d-flex">
                    <b class="mr-3">Date of Hire</b> <b-form-checkbox v-model="operator" v-on:change="ownerOperator()">Owner Operator</b-form-checkbox>
                  </div>
              </div>

              <div class="col-12 col-md-7">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <input
                        v-model="driversData.dohM"
                        type="number"
                        class="lt-input"
                        placeholder="MM"
                        :class="{ 'has-error': !validations.driversData.dohM.is_valid }"
                        @change="validateFieldCustom('dohM')"
                      >
                      <div
                        class="text-danger"
                        v-show="!validations.driversData.dohM.is_valid"
                      >{{ validations.driversData.dohM.text }}</div>
                    </div>
                  </div>
                  <span class="mt-1">/</span>
                  <div class="col">
                    <div class="form-group">
                      <input
                        v-model="driversData.dohD"
                        type="number"
                        class="lt-input"
                        placeholder="DD"
                         :class="{ 'has-error': !validations.driversData.dohD.is_valid }"
                        @change="validateFieldCustom('dohD')"
                      >
                      <div
                        class="text-danger"
                        v-show="!validations.driversData.dohD.is_valid"
                      >{{ validations.driversData.dohD.text }}</div>
                    </div>
                  </div>
                  <span class="mt-1">/</span>
                  <div class="col-5">
                    <div class="form-group">
                      <input
                        v-model="driversData.dohY"
                        type="number"
                        class="lt-input"
                        placeholder="YYYY"
                         :class="{ 'has-error': !validations.driversData.dohY.is_valid }"
                        @change="validateFieldCustom('dohY')"
                      >
                      <div
                        class="text-danger"
                        v-show="!validations.driversData.dohY.is_valid"
                      >{{ validations.driversData.dohY.text }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 d-flex justify-content-end">
              <b-button @click="show=false" class="mr-2">Cancel</b-button>
              <b-button type="submit" variant="primary">Ok</b-button>
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import moment from 'moment';
  import axios from "axios";
  import { API } from "../api.js";

export default {
  name: 'PoliciesDrivers',
 
  filters: {
    date(date) {
      return moment(date).format('MM/DD/YYYY');
    },
    premium(num) {
      if (!num) {
        return  0;
      }
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  },
  data() {
    return {
      drivers: [],
      loading: true,
      error: null,
      show: false,
      driversData: {},
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
      },
      operator: false,
      doh: {
        dohM: '',
        dohD: '',
        dohY: ''
      }
    };
  },
  created() {
    // initialized validations
    this.addDriverData()

    this.$emit('update-hint', 'Please be sure that all drivers currently operating under your authority are added to your current policy. Please use this section to add or subtract drivers.');
  },

  mounted () {
    // fetch drivers from SF
    this.loadDrivers()
  },

  computed: {
    ...mapState(["auth"]),
  },

  watch: {
    auth: {
      deep: true,
      handler () {
        this.loadDrivers()
      }
    }
  },

  methods: {
    async loadDrivers () {
      if (this.auth.quoteSubmitted == 'true') {
        this.loading = true
        const dotId = localStorage.getItem('usdot');
        const userId = localStorage.getItem('userId');
        let res = await API.post("company/accountinfo/drivers", {
          dotId,
          userId
        });
        this.loading = false;
        const { drivers, status } = res;
        if (status == 'ok') {
          this.drivers = drivers;
        } else {
          this.status = false
        }
      }
    },

    ownerOperator() {
      if (!this.operator) {
        this.driversData.dohD = this.doh.dohD;
        this.driversData.dohM = this.doh.dohM;
        this.driversData.dohY = this.doh.dohY;
      }
    },
    validateFieldCustom(fieldName){
      if (this.driversData[fieldName].trim() == '') {
        this.validations.driversData[fieldName].is_valid = false;
        let text = fieldName;
        if (fieldName == 'licenseNumber') {
          text = 'license number';
        }
        this.validations.driversData[fieldName].text = 'Please enter   ' + text + '!';
      } else {
        this.validations.driversData[fieldName].is_valid = true;
      }
    },
    sizeOfObject(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    },

    addDriverData(data) {
      if (data == undefined || data.firstName   == undefined ) {
       this.driversData = {
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
        };
        this.addDriverDataValidation(1);
      } else {
        this.driversData.push(data);
      }
    },
   
    addDriverDataValidation(count){
      this.validations.driversData =  {
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
      }
    },
    validateNewDriverData() {
      let validNewDriverForm = true;
        if (this.driversData.firstName.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.firstName.is_valid = false;
          this.validations.driversData.firstName.text =
            "Please enter firstname!";
        } else {
          this.validations.driversData.firstName.is_valid = true;
          this.validations.driversData.firstName.text = "";
        }

        if (this.driversData.lastName.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.lastName.is_valid = false;
          this.validations.driversData.lastName.text =
            "Please enter lastname!";
        } else {
          this.validations.driversData.lastName.is_valid = true;
          this.validations.driversData.lastName.text = "";
        }

        if (this.driversData.dobM < 1 || this.driversData.dobM > 12)  {
            validNewDriverForm = false;
          this.validations.driversData.dobM.is_valid = false;
          this.validations.driversData.dobM.text =
            "Please enter valid month!";
          if(this.driversData.dobM.trim() == ""){
          validNewDriverForm = false;
          this.validations.driversData.dobM.is_valid = false;
          this.validations.driversData.dobM.text =
            "Please enter month!";
        }
         }else {
          this.validations.driversData.dobM.is_valid = true;
          this.validations.driversData.dobM.text = "";
        }

        if (this.driversData.dobD < 1 || this.driversData.dobD > 31)  {
          validNewDriverForm = false;
          this.validations.driversData.dobD.is_valid = false;
          this.validations.driversData.dobD.text =
            "Please enter valid date!";
        if (this.driversData.dobD.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.dobD.is_valid = false;
          this.validations.driversData.dobD.text =
            "Please enter date!";
        } }else {
          this.validations.driversData.dobD.is_valid = true;
          this.validations.driversData.dobD.text = "";
        }

        if(this.driversData.dobY.length<4){
            validNewDriverForm = false;
          this.validations.driversData.dobY.is_valid = false;
          this.validations.driversData.dobY.text =
            "Please enter valid year!";
        if (this.driversData.dobY.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.dobY.is_valid = false;
          this.validations.driversData.dobY.text =
            "Please enter year!";
        } }else {
          
          this.validations.driversData.dobY.is_valid = true;
          this.validations.driversData.dobY.text = "";
        }

         if (this.driversData.dohM < 1 || this.driversData.dohM > 12)  {
            validNewDriverForm = false;
          this.validations.driversData.dohM.is_valid = false;
          this.validations.driversData.dohM.text =
            "Please enter valid month!";
        if (this.driversData.dohM.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.dohM.is_valid = false;
          this.validations.driversData.dohM.text =
            "Please enter month!";
        } }else {
          this.validations.driversData.dohM.is_valid = true;
          this.validations.driversData.dohM.text = "";
        }
        
        if (this.driversData.dohD < 1 || this.driversData.dohD > 31)  {
          validNewDriverForm = false;
          this.validations.driversData.dohD.is_valid = false;
          this.validations.driversData.dohD.text =
            "Please enter valid date!";
        if (this.driversData.dohD.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.dohD.is_valid = false;
          this.validations.driversData.dohD.text =
            "Please enter date!";
        }} else {
          this.validations.driversData.dohD.is_valid = true;
          this.validations.driversData.dohD.text = "";
        }

        if(this.driversData.dohY.length<4){
            validNewDriverForm = false;
          this.validations.driversData.dohY.is_valid = false;
          this.validations.driversData.dohY.text =
            "Please enter valid year!";
        if (this.driversData.dohY.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.dohY.is_valid = false;
          this.validations.driversData.dohY.text =
            "Please enter year!";
        }} else {
          this.validations.driversData.dohY.is_valid = true;
          this.validations.driversData.dohY.text = "";
        }

        if (this.driversData.address.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.address.is_valid = false;
          this.validations.driversData.address.text =
            "Please enter an address!";
        } else {
          this.validations.driversData.address.is_valid = true;
          this.validations.driversData.address.text = "";
        }

        if (this.driversData.city.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.city.is_valid = false;
          this.validations.driversData.city.text =
            "Please enter city!";
        } else {
          this.validations.driversData.city.is_valid = true;
          this.validations.driversData.city.text = "";
        }

        if (this.driversData.state.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.state.is_valid = false;
          this.validations.driversData.state.text =
            "Please enter state!";
        } else {
          this.validations.driversData.state.is_valid = true;
          this.validations.driversData.state.text = "";
        }

        if(!this.driversData.zip.match(/(^\d{5}$)/)){
          validNewDriverForm = false;
          this.validations.driversData.zip.is_valid = false;
          this.validations.driversData.zip.text = 'Invalid Zip Code';
        
        if (this.driversData.zip.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.zip.is_valid = false;
          this.validations.driversData.zip.text = "Please enter zip!";
        }} else {
          this.validations.driversData.zip.is_valid = true;
          this.validations.driversData.zip.text = "";
        }

        if (this.driversData.licenseNumber.trim() == "") {
          validNewDriverForm = false;
          this.validations.driversData.licenseNumber.is_valid = false;
          this.validations.driversData.licenseNumber.text =
            "Please enter license Number!";
        } else {
          this.validations.driversData.licenseNumber.is_valid = true;
          this.validations.driversData.licenseNumber.text = "";
        }
      return validNewDriverForm;
    },

    async addDriver() {
      let allFormAreValid = this.validateNewDriverData();
      if (!allFormAreValid) {
        return;
      } 

      this.show = false

      this.loading = true;
      this.error = null;
      const userId = localStorage.getItem('userId');
      const dotId = localStorage.getItem('usdot');
      try {
        const data = {
          driversData: this.driversData,
          operator: this.operator ? 'yes': 'no',
          userId,
          dotId
        };
        let res = await API.post("company/accountinfo/drivers/new", data);

        if (res.status === "ok") {
          this.$swal("", "Successfully added!", "success")
          await this.loadDrivers()
        } else if (res.status === "ERROR") {
          this.error = res.messages[0] || res.data;
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async removeDriver (driverId, reason) {
      this.loading = true;
      this.error = null;
      const userId = localStorage.getItem('userId');
      try {
        const data = {
          driverId,
          userId,
          reason,
        };
        let res = await API.post("company/accountinfo/drivers/delete", data);

        if (res.status === "ok") {
          this.$swal("", "Successfully removed!", "success")
          await this.loadDrivers()
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
  },
};
</script>

<style lang="scss" scoped>
.policies-drivers {
  .policy-image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .policy-image {
      border-radius: 15px;
    }
  }

  .policy-info {
    .policy-title {
      font-size: 1.3rem;
      color: #5e98f9;
      font-weight: 700;
    }

    .policy-subtitle {
      font-size: 0.8rem;
      line-height: 25px;
    }
  }
}
</style>
