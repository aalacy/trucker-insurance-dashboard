<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Owner(s)</h4>

          <div class="d-flex">
            <div class="pr-3">Are one of the drivers the owner?</div>

            <div class="flex-grow-1">
              <b-form-checkbox v-model="formData.driverIsOwner" v-on:change="changeData()">Yes</b-form-checkbox>
            </div>
          </div>

          <div v-if="formData.driverIsOwner" class="">
            <select v-model="formData.driverOwnerIndex" @change="onChange($event)" class="lt-input col-sm-12 col-lg-6" id="driverList" >
              <option value="" disabled>Select Driver</option>
 
              <option
                v-for="(item, index) in drivers"
                :key="index"
                :value="index"
              >{{ item.firstName }} {{ item.lastName }}</option>
            </select>
          </div>

          <hr>

          <template>
            <div class="owner-form-item mob-2" v-for="(singleDriver, index) in driversData" :key="index">
              <div class="row">
                <div class="col">
                  <h2 class="h5">Owner #{{ index + 1 }}</h2>
                </div>

                <button
                  v-show="index > 0"
                  type="button"
                  class="lt-button mx-2 mb-3"
                  @click="removeDriverData(index)"
                  title="Remove Owner"
                >
                  <h3>-</h3>
                </button>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.firstName }" -->
                    <input
                      v-model="driversData[index].firstName"
                      type="text"
                      class="lt-input"
                      placeholder="First name"
                      :class="{ 'has-error': !validations.driversData[index].firstName.is_valid }"
                      @change="validateFieldCustom('firstName', index)"
                    />
                      <!-- required -->
                      <!-- @focus="onFocus('firstName')"
                      @blur="onBlur"
                      @change="validateField('firstName')" -->
                    
                    <div class="text-danger" v-show="!validations.driversData[index].firstName.is_valid">{{ validations.driversData[index].firstName.text }}</div>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.lastName }" -->
                    <input
                      v-model="driversData[index].lastName"
                      type="text"
                      class="lt-input"
                      placeholder="Last name"
                      :class="{ 'has-error': !validations.driversData[index].lastName.is_valid }"
                      @change="validateFieldCustom('lastName', index)"
                    />
                      <!-- required -->
                      <!-- @focus="onFocus('lastName')"
                      @blur="onBlur"
                      @change="validateField('lastName')" -->

                    <div class="text-danger" v-show="!validations.driversData[index].lastName.is_valid">{{ validations.driversData[index].lastName.text }}</div>
                  </div>
                </div>
              </div>

              <div class="row" id="text-date">
                <div class="col-12 col-md-6 pt-2">
                  <div>Date of Birth</div>

                  <!-- <div
                    v-if="formErrors.dateOfBirth"
                    class="text-danger"
                  >{{ formErrors.dateOfBirth }}</div> -->
                </div>

                <div class="col-12 col-md-6">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobM }" -->
                        <input
                          v-model="driversData[index].dobM"
                          type="number"
                          class="lt-input"
                          :class="{ 'has-error': !validations.driversData[index].dobM.is_valid }"
                          @change="validateFieldCustom('dobM', index)"
                          placeholder="MM"
                        />
                          <!-- required -->
                          <!-- @focus="onFocus('dobM')"
                          @blur="onBlur"
                          @change="validateField('dobM')" -->

                        <div class="text-danger" v-show="!validations.driversData[index].dobM.is_valid">{{ validations.driversData[index].dobM.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobD }" -->
                        <input
                          v-model="driversData[index].dobD"
                          type="number"
                          class="lt-input"
                          :class="{ 'has-error': !validations.driversData[index].dobD.is_valid }"
                          @change="validateFieldCustom('dobD', index)"
                          placeholder="DD"
                        />
                          <!-- required -->
                          <!-- @focus="onFocus('dobD')"
                          @blur="onBlur"
                          @change="validateField('dobD')" -->

                        <div class="text-danger" v-show="!validations.driversData[index].dobD.is_valid">{{ validations.driversData[index].dobD.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobY }" -->
                        <input
                          v-model="driversData[index].dobY"
                          type="number"
                          class="lt-input"
                          placeholder="YYYY"
                          :class="{ 'has-error': !validations.driversData[index].dobY.is_valid }"
                          @change="validateFieldCustom('dobY', index)"
                        />
                          <!-- required -->
                          <!-- @focus="onFocus('dobY')"
                          @blur="onBlur"
                          @change="validateField('dobY')" -->

                        <div class="text-danger" v-show="!validations.driversData[index].dobY.is_valid">{{ validations.driversData[index].dobY.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.address }" -->
                    <input
                      v-model="driversData[index].address"
                      type="text"
                      class="lt-input"
                      placeholder="Address"
                      :class="{ 'has-error': !validations.driversData[index].address.is_valid }"
                      @change="validateFieldCustom('address', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('address')"
                      @blur="onBlur"
                      @change="validateField('address')" -->

                    <div class="text-danger" v-show="!validations.driversData[index].address.is_valid">{{ validations.driversData[index].address.text }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.city }" -->
                    <input
                      v-model="driversData[index].city"
                      type="text"
                      class="lt-input"
                      placeholder="City"
                      :class="{ 'has-error': !validations.driversData[index].city.is_valid }"
                      @change="validateFieldCustom('city', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('city')"
                      @blur="onBlur"
                      @change="validateField('city')" -->

                    <div class="text-danger" v-show="!validations.driversData[index].city.is_valid">{{ validations.driversData[index].city.text }}</div>
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
                      class="lt-input"
                      placeholder="State"
                      :class="{ 'has-error': !validations.driversData[index].state.is_valid }"
                      @change="validateFieldCustom('state', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('state')"
                      @blur="onBlur"
                      @change="validateField('state')" -->

                    <div class="text-danger" v-show="!validations.driversData[index].state.is_valid">{{ validations.driversData[index].state.text }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.zip }" -->
                    <input
                      v-model="driversData[index].zip"
                      type="text"
                      class="lt-input"
                      minlength="5"
                      placeholder="Zip"
                      :class="{ 'has-error': !validations.driversData[index].zip.is_valid }"
                       @change="validateFieldCustom('zip', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('zip')"
                      @blur="onBlur"
                      @change="validateField('zip')" -->

                    <div class="text-danger" v-show="!validations.driversData[index].zip.is_valid">{{ validations.driversData[index].zip.text }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- <account-info-owners-item
            v-for="(item, index) in formData.owners"
            ref="ownerForm"
            :key="item._uuid"
            :index="index"
            :owner="item"
            :drivers="drivers"
            :selectedDriver="selectedDriver"
            :id="formData.driverIsOwner"
            class="mb-5"
            @update-hint="updateHint"
            @remove-form="removeForm"
          />-->

          <hr>

          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another owner</div>

            <div class="col-auto text-right">
              <button type="button" class="lt-button px-3" @click="addDriverData" title="Add Owner">+</button>
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
                <div class="prev-title">Drivers</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Additional Comments</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
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
  name: "AccountInfoOwners",
  components: {
    // AccountInfoOwnersItem: () => import("./AccountInfoOwnersItem.vue"),
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
      uuid:"",
      final_uuid:"",
      selected:"Select Driver",
      showmodel: false,
      save: true,
      formData: {
        driverIsOwner: false,
        driverOwnerIndex: -1,
        owners: []
      },
      drivers: [],
      driversData: [],
      loading: false,
      error: null,
      selectedDriver: "",
      validations: {
        driversData: {},
        oneDriver: {
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
  computed: {
    noOwners() {
      return (
        this.formData.driverOwnerIndex === -1 && !this.formData.owners.length
      );
    }
  },
  watch: {
    "formData.driverIsOwner"(driverIsOwner) {
      if (!driverIsOwner) {
        this.formData.driverOwnerIndex = -1;
      }
    },
    noOwners(noOwners) {
      this.error = noOwners ? "Please add at least one owner" : null;
    }
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
    changeData(){
      if(this.driverIsOwner){
        
        this.driversData[0].firstName = "";
        this.driversData[0].lastName = "";
        this.driversData[0].dobM = "";
        this.driversData[0].dobD = "";
        this.driversData[0].dobY="";
        this.driversData[0].address="";
        this.driversData[0].city="";
        this.driversData[0].state="";
        this.driversData[0].zip=""
      }
    },
    addDriverDataValidation(count){
      let driverDatavalidationsLength = this.sizeOfObject(this.validations.driversData);
      for (let index = 0; index < count; index++) {

        this.$set(this.validations.driversData, driverDatavalidationsLength + index, {
          firstName: {
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
          }
        });
      }
    },
    addDriverData(data) {
      
      if  (data == undefined || data.firstName == undefined) {
        this.driversData.push({
          firstName: "",
          lastName: "",
          dobM: "",
          dobD: "",
          dobY: "",
          address: "",
          city: "",
          zip: "",
          state: ""
        });
        this.addDriverDataValidation(1);
      } else {
        this.driversData.push(data);
      }
    },
    removeDriverData( key ){
      this.driversData.splice( key, 1 );
      Vue.delete(this.validations.driversData,key)
      // this.validations.driversData.splice( key, 1 );
    },
    validateNewDriverData() {
      let validNewDriverForm = true;
      for( var index in this.driversData ) {
        if (this.driversData.hasOwnProperty( index ) ) {
          
          if( this.driversData[index].firstName.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].firstName.is_valid = false;
            this.validations.driversData[index].firstName.text = 'Please enter firstname!';
          }else{
            this.validations.driversData[index].firstName.is_valid = true;
            this.validations.driversData[index].firstName.text = '';
          }

          if( this.driversData[index].lastName.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].lastName.is_valid = false;
            this.validations.driversData[index].lastName.text = 'Please enter lastname!';
          }else{
            this.validations.driversData[index].lastName.is_valid = true;
            this.validations.driversData[index].lastName.text = '';
          }

          if (this.driversData[index].dobM < 1 || this.driversData[index].dobM > 12)  {
              validNewDriverForm = false;
              this.validations.driversData[index].dobM.is_valid = false;
              this.validations.driversData[index].dobM.text =
              "Please enter valid month!";
          if( this.driversData[index].dobM.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].dobM.is_valid = false;
            this.validations.driversData[index].dobM.text = 'Please enter month!';
          }}
          else{
            this.validations.driversData[index].dobM.is_valid = true;
            this.validations.driversData[index].dobM.text = '';
          }

          if (this.driversData[index].dobD < 1 || this.driversData[index].dobD > 31)  {
            validNewDriverForm = false;
            this.validations.driversData[index].dobD.is_valid = false;
            this.validations.driversData[index].dobD.text =
              "Please enter valid date!";
          if( this.driversData[index].dobD.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].dobD.is_valid = false;
            this.validations.driversData[index].dobD.text = 'Please enter date!';
          }}else{
            this.validations.driversData[index].dobD.is_valid = true;
            this.validations.driversData[index].dobD.text = '';
          }
          
          if(this.driversData[index].dobY.length<4){
              validNewDriverForm = false;
            this.validations.driversData[index].dobY.is_valid = false;
            this.validations.driversData[index].dobY.text =
              "Please enter valid year!";
          if( this.driversData[index].dobY.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].dobY.is_valid = false;
            this.validations.driversData[index].dobY.text = 'Please enter year!';
          }}else{
            this.validations.driversData[index].dobY.is_valid = true;
            this.validations.driversData[index].dobY.text = '';
          }

          if( this.driversData[index].address.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].address.is_valid = false;
            this.validations.driversData[index].address.text = 'Please enter an address!';
          }else{
            this.validations.driversData[index].address.is_valid = true;
            this.validations.driversData[index].address.text = '';
          }

          if(this.driversData[index].city.trim() == '') {
            validNewDriverForm = false;
            this.validations.driversData[index].city.is_valid = false;
            this.validations.driversData[index].city.text = 'Please enter city!';
          } else {
            this.validations.driversData[index].city.is_valid = true;
            this.validations.driversData[index].city.text = '';
          }

          if(this.driversData[index].state.trim() == '') {
            validNewDriverForm = false;
            this.validations.driversData[index].state.is_valid = false;
            this.validations.driversData[index].state.text = 'Please enter state!';
          } else {
            this.validations.driversData[index].state.is_valid = true;
            this.validations.driversData[index].state.text = '';
          }

          if(!this.driversData[index].zip.match(/(^\d{5}$)/)){
            validNewDriverForm = false;
            this.validations.driversData[index].zip.is_valid = false;
            this.validations.driversData[index].zip.text = 'Please enter minimum 5 character!';
          if(this.driversData[index].zip.trim() == '' ) {
            validNewDriverForm = false;
            this.validations.driversData[index].zip.is_valid = false;
            this.validations.driversData[index].zip.text = 'Please enter zip!';
          }} else {
            this.validations.driversData[index].zip.is_valid = true;
            this.validations.driversData[index].zip.text = '';
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

          this.$router.push({ name: "AccountInfoOwners" });
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
      if (
        this.formData.driverIsOwner &&
        this.formData.driverOwnerIndex === -1
      ) {
        this.formData.driverIsOwner = false;
      }

      this.setDataFromForms();
      var temp_uuid;
      if (this.noOwners) {
        return;
      }

      let allFormAreValid = this.$refs.ownerForm
        ? this.$refs.ownerForm.every(formRef => formRef.validateForm())
        : true;

      if (!allFormAreValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.final_uuid = this.uuid;
      try {
        let data = await API.post("company/save", {
          key: "owners",
          
          val: {
              owners:this.driversData.map(o => {
              let owner = { ...o };
              delete owner._uuid;
              return owner;
            })
          },
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
    addForm() {
      // 

      this.formData.owners.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.formData.owners.splice(index, 1);
    },

    onChange($event) {
      // if(this.drivers.drivers[$event.target.value] != undefined){
      this.driversData[0] = Object.assign({}, this.driversData[0], this.drivers[$event.target.value]);
      this.driversData[0].firstName = this.drivers[$event.target.value].firstName;
      this.driversData[0].lastName = this.drivers[$event.target.value].lastName;
      this.driversData[0].address = this.drivers[$event.target.value].address;
      this.driversData[0].city = this.drivers[$event.target.value].city;
      this.driversData[0].state = this.drivers[$event.target.value].state;
      this.driversData[0].zip = this.drivers[$event.target.value].zip;
      this.driversData[0].dobD = this.drivers[$event.target.value].dobD;
      this.driversData[0].dobM = this.drivers[$event.target.value].dobM;
      this.driversData[0].dobY = this.drivers[$event.target.value].dobY;
      
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

        if (res.status === "OK") {
          let { company: { driverInformationList, ownerInformationList } } = res.data;
          
          this.uuid = res.data.uuid;
          if (driverInformationList) {
            if (!Array.isArray(driverInformationList)) {
              this.drivers = JSON.parse(driverInformationList);
            } else {
              this.drivers = driverInformationList;
            }
          }
          if (ownerInformationList) {
            if (!Array.isArray(ownerInformationList)) {
              ownerInformationList = JSON.parse(ownerInformationList);
            }
            
            if(ownerInformationList.length > 0) {
              this.driversData = ownerInformationList;
              
              this.addDriverDataValidation(ownerInformationList.length)
            } else {
              this.addDriverData();
            }

          } else {
            this.addDriverData();
          }
        } else if (res.status === "ERROR") {
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    async updateCompany() {
      
      if ( this.formData.driverIsOwner && this.formData.driverOwnerIndex === -1 ) {
        this.formData.driverIsOwner = false;
      }

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
          ownerInformationList: this.driversData.map(o => {
              let owner = { ...o };
              delete owner._uuid;
              return owner;
             }),
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

<style lang="css">
select{
  position: relative;
  -webkit-appearance: none;
  background: url('../assets/images/arrow-dropdown.png') no-repeat 96% center;
  -moz-appearance: none;
}
</style>

