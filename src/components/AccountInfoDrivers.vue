<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <div class="d-flex justify-content-space align-items-center mb-4">
            <h4 class="card-title form-sub-title mb-0 mr-3">Drivers
            </h4>
            <b-form-checkbox v-on:change="changeData()">Same as Mailing Address</b-form-checkbox>
          </div>
          <template
            v-for="(driver, index) in $v.form.drivers.$each.$iter"
          >
            <div class="row">
              <div class="col mt-3 mb-2">
                <h2 class="h4 font-weight-bold">Driver #{{ Number(index) + 1 }}</h2>
              </div>

              <button
                v-show="index > 0"
                type="button"
                class="lt-button mx-2 mb-3"
                @click="removeDriverData(index)"
                title="Remove Driver"
              >
                <font-awesome-icon class="fontawesome minus" icon="minus" />
              </button>
            </div>
            <b-row>
              <b-col cols="12" md="4">
                <b-form-group
                  label="First Name"
                >
                  <b-form-input 
                    v-model="driver.firstName.$model"
                    :state="validateState(index, 'firstName')"
                    :aria-describedby="`firstName${index}`"
                  />
                  <b-form-invalid-feedback :id="`firstName${index}`">{{ errorMessage(index, 'firstName')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group
                  label="Middle Name"
                >
                  <b-form-input 
                    v-model="driver.middleName.$model"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group
                  label="Last Name"
                >
                  <b-form-input 
                    v-model="driver.lastName.$model"
                    :state="validateState(index, 'lastName')"
                  />
                  <b-form-invalid-feedback>{{ errorMessage(index, 'lastName')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Date of Birth"
                >
                  <!-- <b-form-datepicker 
                    reset-button 
                    locale="en-US" 
                    placeholder="Choose a date" 
                    v-model="driver.dob.$model"
                    min="01/01/1900" 
                    max="01/01/9999"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    :state="validateState(index, 'dob')" 
                  > -->
                  <input 
                    type="date" 
                    class="form-control"
                    :class="{ 'is-invalid': !driver.dob.$model}"
                    v-model="driver.dob.$model"
                    :aria-describedby="`dob${index}`"
                  />
                  <b-form-invalid-feedback :id="`dob${index}`">{{ errorMessage(index, 'dob')}}</b-form-invalid-feedback>
                  </b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="License Number"
                  description="11 - 15 digits"
                >
                  <b-form-input 
                    v-model="driver.licenseNumber.$model"
                    :state="validateState(index, 'licenseNumber')"
                  />
                  <b-form-invalid-feedback>{{ errorMessage(index, 'licenseNumber')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Class Type ( i.e. CDL)"
                >
                  <b-form-select v-model="driver.CDL.$model" :state="validateState(index, 'CDL')" :options="CDLOptions"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Address"
                >
                  <b-form-input 
                    v-model="driver.address.$model"
                    :state="validateState(index, 'address')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="City"
                >
                  <b-form-input 
                    v-model="driver.city.$model"
                    :state="validateState(index, 'city')"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="State"
                >
                  <b-form-input 
                    v-model="driver.state.$model"
                    :state="validateState(index, 'state')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Zip"
                  description="5 digits"
                >
                  <b-form-input 
                    type="number"
                    v-model="driver.zip.$model"
                    :state="validateState(index, 'zip')"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Previous Commercial Driving Experience - years"
                >
                  <b-form-input 
                    type="number"
                    v-model="driver.prevCDE.$model"
                    :state="validateState(index, 'prevCDE')"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Year's Licensed (In Class Type)"
                  label-for="Q38"
                >
                  <b-form-input 
                    type="number"
                    id="Q38"
                    v-model="driver.dlYearLicensed.$model"
                    :state="validateState(index, 'dlYearLicensed')"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Type of Unit (Bus, Van, Truck, Tractor, etc.)"
                >
                  <b-form-input 
                    v-model="driver.typeOfUnit.$model"
                    :state="validateState(index, 'typeOfUnit')"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Number of Years Driving"
                  label-for="Q40"
                >
                  <b-form-input 
                    type="number"
                    id="Q40"
                    v-model="driver.noOfYearsDriving.$model"
                    :state="validateState(index, 'noOfYearsDriving')"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-row>
              
              <b-col cols="12" md="6">
                <div
                  class="mb-2 form-group"
                  role="group"
                >
                  <label
                    class="d-flex"
                  >
                    Date of Hire
                    <b-form-checkbox
                      class="ml-2"
                      name="owner"
                      @change="ownerOperator(index)"
                    >
                      Owner Operator
                    </b-form-checkbox>
                  </label>
                  <b-form-datepicker 
                    reset-button 
                    locale="en-US" 
                    placeholder="Choose a date" 
                    v-model="driver.doh.$model"
                    min="01/01/1900" 
                    max="01/01/9999"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    :state="validateState(index, 'doh')" 
                  >
                  </b-form-datepicker>
                </div>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col cols="12">
                  <b-form-group
                    label="Accidents and Minor Moving Traffic Violations in Past 5 Years"
                  >
                    <b-form-row class="mb-3">
                      <b-col cols="12" md="6">
                        <b-form-input 
                          type="number"
                          placeholder="No. of Accidents"
                          v-model="driver.noOfAccidents.$model"
                          :state="validateState(index, 'noOfAccidents')"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="12" md="6">
                          <b-form-datepicker 
                            reset-button 
                            locale="en-US" 
                            v-model="driver.noOfAccidentsDate.$model"
                            :state="validateIfDate(driver.noOfAccidentsDate.$model, driver.noOfAccidents.$model)"
                            placeholder="Choose a date">
                          </b-form-datepicker>
                      </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col cols="12" md="6">
                          <b-form-input 
                            type="number"
                            placeholder="No. of Violations"
                            v-model="driver.noOfViolations.$model"
                            :state="validateState(index, 'noOfViolations')"
                          ></b-form-input>
                      </b-col>
                      <b-col cols="12" md="6">
                          <b-form-datepicker 
                            reset-button 
                            locale="en-US" 
                            v-model="driver.noOfViolationsDate.$model"
                            :state="validateIfDate(driver.noOfViolationsDate.$model, driver.noOfViolations.$model)"
                            placeholder="Choose a date">
                          </b-form-datepicker>
                      </b-col>
                    </b-form-row>
                  </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row >
              <b-col cols="12">
                <b-form-group
                  label="Major Convictions"
                  description="maximum 100 characters"
                >
                  <b-form-row >
                    <b-col cols="12" md="6">
                      <b-form-textarea 
                        placeholder="Describe Conviction"
                        v-model="driver.conviction.$model"
                        rows="2"
                        max-rows="7"
                      ></b-form-textarea>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-datepicker 
                          reset-button 
                          locale="en-US" 
                          v-model="driver.convictionDate.$model"
                          :state="validateIfDate(driver.convictionDate.$model, driver.conviction.$model)"
                          placeholder="Choose a date">
                        </b-form-datepicker>
                    </b-col>
                  </b-form-row>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col cols="12">
                <b-form-group
                  label="(E) Employee? (IC) Independent Contractor? (O/O) Owner/Operator? (F) Franchisee?"
                >
                  <b-form-select 
                    v-model="driver.EICOOF.$model"
                    :state="validateState(index, 'EICOOF')"
                    :options="driverInfoList">
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>
          </template>
          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold h5">Add another driver</div>

            <div class="col-auto text-right">
              <button
                type="button"
                class="lt-button px-3"
                @click="addDefaultDrivers"
                title="Add Driver"
              >
                <font-awesome-icon class="fontawesome minus" icon="plus" />
              </button>
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
                <div class="prev-title">ELD Provider</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Owners</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- fab for DL on mobile -->
    <b-button v-if="showDLFab" pill variant="primary" class="ocr-fab" @click="fillDL">
      <b-icon  icon="upc-scan" variant="primary"></b-icon>
    </b-button>
  </div>
</template>

<script>
import uuidv4 from "uuid/v4";
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, minValue, maxValue } from "vuelidate/lib/validators";

import { API } from "../api.js";
import { isMobile } from "mobile-device-detect";

export default {
  name: "AccountInfoDrivers",
  mixins: [validationMixin],

  components: {
    AccountInfoDriversItem: () => import("./AccountInfoDriversItem.vue"),
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
      uuid: "",
      loading: false,
      error: null,
      save: true,
      mobile: false,
      mailingAddress: {},
      doh: '',
      form: {
        drivers: []
      },
      operator: false,
      driverInfoList: [
        { value: '', text: 'Please select an option' },
        { value: 'E', text: 'Employee' },
        { value: 'IC', text: 'Independent Contractor' },
        { value: 'O/O', text: 'Owner/Operator' },
        { value: 'F', text: 'Franchisee' },
      ],
      CDLOptions: [
        'Class A',
        'Class B',
        'Class C',
      ]
    };
  },

  computed: {
    showDLFab () {
      return localStorage.getItem('imageDL') && this.mobile
    },
  },

  validations() {
    return {
      form: {
        drivers: {
          required,

          $each: {
            firstName: {
              required
            },
            middleName: {
            },
            lastName: {
              required
            },
            dob: {
              required,
            },
            doh: {
              required,
            },
            licenseNumber: {
              required,
              minLength: minLength(11),
              maxLength: maxLength(15)
            },
            CDL: {
            },
            address: {
              required
            },
            city: {
              required
            },
            state: {
              required
            },
            zip: {
              required,
              minLength: minLength(5),
              maxLength: maxLength(5)
            },
            dlYearLicensed: {
              required,
              minValue: minValue(1)
            },
            typeOfUnit: {
              required
            },
            noOfYearsDriving: {
              required,
              minValue: minValue(1)
            },
            prevCDE: {
              required
            },
            noOfAccidents: {
            },
            noOfAccidentsDate: {
            },
            noOfViolations: {
            },
            noOfViolationsDate: {
            },
            conviction: {
            },
            convictionDate: {
            },
            EICOOF: {
              required
            }
          }
        }
      }
    }
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
    } else {
      this.save = true;
    }

    this.mobile = isMobile ? true : false;
  },

  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },
  methods: {
    fillDL () { 
      try {
        const DL = JSON.parse(localStorage.getItem('imageDL'))
        if (DL) {
          if (this.driversData.length) {
            this.driversData = [DL]
          }
        }
      } catch(e) {
        console.log(e)
      }
    },
    validateState(index, name) {
      const { $dirty, $error } = this.$v.form.drivers.$each.$iter[index][name];
      return $dirty ? !$error : null;
    },

    validateIfDate(date, cond) {
      if (cond > 0) {
        return date != ''
      } else {
        return null
      }
    },

    errorMessage(index, name) {
      const { required, minLength, maxLength } = this.$v.form.drivers.$each.$iter[index][name]

      let msg = ''
      if (required != undefined && !required) {
        msg = 'This field is required.'
      } 

      if ((minLength != undefined && !minLength) || (maxLength != undefined && !maxLength)) {
        msg = 'The length must be correct'
      } 

      return msg
    },

    addDefaultDrivers () {
      this.form.drivers.push({
        firstName: '',
        lastName: '',
        middleName: '',
        dob: '',
        licenseNumber: '',
        CDL: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        dlYearLicensed: '',
        typeOfUnit: '',
        noOfYearsDriving: '',
        prevCDE: '',
        doh: '',
        noOfAccidents: '',
        noOfAccidentsDate: '',
        noOfViolations: '',
        noOfViolationsDate: '',
        conviction: '',
        convictionDate: '',
        EICOOF: ''
      })
    },

    ownerOperator(index) {
      if (!this.operator) {
        this.form.drivers[index].doh = this.doh;
      }
    },
    changeData() {
      if (this.form.drivers.length > 0 && this.mailingAddress) {
        this.form.drivers[0].address = this.mailingAddress.address;
        this.form.drivers[0].city = this.mailingAddress.city;
        this.form.drivers[0].state = this.mailingAddress.state;
        this.form.drivers[0].zip = this.mailingAddress.zip;
      }
    },
    removeDriverData(key) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((willDelete) => {
        if (willDelete) {
          this.form.drivers.splice(key, 1);
        }
      })
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
        if (res && res.status === "OK") {
          this.uuid = res.data.uuid;
          let { company: { driverInformationList, mailingAddress, businessStructureRaw } } = res.data;
          
          if (mailingAddress && mailingAddress.constructor !== Object) {
            this.mailingAddress = JSON.parse(mailingAddress);
          } else {
            this.mailingAddress = mailingAddress || {};
          }

          let structure = {}
          if (businessStructureRaw && businessStructureRaw.constructor !== Object) {
            structure = JSON.parse(businessStructureRaw)
          }

          if (structure) {
            let doh = structure['MCS-150 Form Date'];
            if (doh) {
              this.doh = doh
            }
            console.log(this.doh)
          }

          if (driverInformationList) {
            if (!Array.isArray(driverInformationList)) {
              driverInformationList = JSON.parse(driverInformationList);
            }

            if(driverInformationList.length > 0 && driverInformationList[0].prevCDE != undefined){
              this.form.drivers = driverInformationList;
            } else {
              this.addDefaultDrivers()
            }
          } else {
            this.addDefaultDrivers()
          }
        } else if (res && res.status === "ERROR") {
        }
      } catch (err) {
        this.error = err.message;
        // this.addDefaultDrivers()
      } finally {
        this.loading = false;
      }
    },
    
    async updateCompany() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const data = {
          driverInformationList: JSON.stringify(this.form.drivers),
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
select {
  position: relative;
  -webkit-appearance: none;
  background: url("../assets/images/arrow-dropdown.png") no-repeat 96% center;
  -moz-appearance: none;
}

.fontawesome path {
  fill: black;
}

.ocr-fab {
  position: fixed;
  left: 5%;
  z-index: 9999;
  bottom: 5%;
  overflow: initial;
  box-sizing: border-box;
  opacity: .7;

  svg {
    fill: white;
  }
}
</style>

