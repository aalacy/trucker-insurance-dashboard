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

          <div v-if="formData.driverIsOwner" class="mt-2">
            <select v-model="formData.driverOwnerIndex" @change="onChange($event)" class="form-control col-sm-12 col-lg-6" id="driverList" >
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
            <div class="owner-form-item mob-2" v-for="(singleDriver, index) in ownerData" :key="index">
              <div class="row">
                <div class="col mb-3">
                  <h2 class="h4 font-weight-bold">Owner #{{ index + 1 }}</h2>
                </div>

                <button
                  v-show="index > 0"
                  type="button"
                  class="lt-button mx-2 mb-3"
                  @click="removeOwnerData(index)"
                  title="Remove Owner"
                >
                  <font-awesome-icon class="fontawesome minus" icon="minus" />
                </button>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <input
                      v-model="ownerData[index].firstName"
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      :class="{ 'has-error': !validations.ownerData[index].firstName.is_valid }"
                      @change="validateFieldCustom('firstName', index)"
                    />
                    <div class="text-danger" v-show="!validations.ownerData[index].firstName.is_valid">{{ validations.ownerData[index].firstName.text }}</div>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.lastName }" -->
                    <input
                      v-model="ownerData[index].lastName"
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      :class="{ 'has-error': !validations.ownerData[index].lastName.is_valid }"
                      @change="validateFieldCustom('lastName', index)"
                    />
                    <div class="text-danger" v-show="!validations.ownerData[index].lastName.is_valid">{{ validations.ownerData[index].lastName.text }}</div>
                  </div>
                </div>
              </div>

              <b-row>
                <b-col cols="12" md="6">
                  Date of Birth
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                  >
                    <b-form-datepicker 
                      reset-button 
                      locale="en-US"
                      placeholder="Choose a date"
                      v-model="ownerData[index].dob"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
              </b-row>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.address }" -->
                    <input
                      v-model="ownerData[index].address"
                      type="text"
                      class="form-control"
                      placeholder="Address"
                      :class="{ 'has-error': !validations.ownerData[index].address.is_valid }"
                      @change="validateFieldCustom('address', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('address')"
                      @blur="onBlur"
                      @change="validateField('address')" -->

                    <div class="text-danger" v-show="!validations.ownerData[index].address.is_valid">{{ validations.ownerData[index].address.text }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.city }" -->
                    <input
                      v-model="ownerData[index].city"
                      type="text"
                      class="form-control"
                      placeholder="City"
                      :class="{ 'has-error': !validations.ownerData[index].city.is_valid }"
                      @change="validateFieldCustom('city', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('city')"
                      @blur="onBlur"
                      @change="validateField('city')" -->

                    <div class="text-danger" v-show="!validations.ownerData[index].city.is_valid">{{ validations.ownerData[index].city.text }}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.state }" -->
                    <input
                      v-model="ownerData[index].state"
                      type="text"
                      class="form-control"
                      placeholder="State"
                      :class="{ 'has-error': !validations.ownerData[index].state.is_valid }"
                      @change="validateFieldCustom('state', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('state')"
                      @blur="onBlur"
                      @change="validateField('state')" -->

                    <div class="text-danger" v-show="!validations.ownerData[index].state.is_valid">{{ validations.ownerData[index].state.text }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.zip }" -->
                    <input
                      v-model="ownerData[index].zip"
                      type="text"
                      class="form-control"
                      minlength="5"
                      placeholder="Zip"
                      :class="{ 'has-error': !validations.ownerData[index].zip.is_valid }"
                       @change="validateFieldCustom('zip', index)"
                    >
                      <!-- required -->
                      <!-- @focus="onFocus('zip')"
                      @blur="onBlur"
                      @change="validateField('zip')" -->

                    <div class="text-danger" v-show="!validations.ownerData[index].zip.is_valid">{{ validations.ownerData[index].zip.text }}</div>
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
            <div class="col h5 font-weight-bold">Add another owner</div>

            <div class="col-auto text-right">
              <button type="button" class="lt-button px-3" @click="addDriverData" title="Add Owner">
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
<!--       <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
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
import uuidv4 from "uuid/v4";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import axios from "axios";
import Vue from "vue";

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
      ownerData: [],
      loading: false,
      error: null,
      selectedDriver: "",
      validations: {
        ownerData: {},
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
      if (this.ownerData[index][fieldName].trim() == '') {
        this.validations.ownerData[index][fieldName].is_valid = false;
        this.validations.ownerData[index][fieldName].text = 'Please enter   ' + fieldName + '!';
      } else {
        this.validations.ownerData[index][fieldName].is_valid = true;
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
        
        this.ownerData[0].firstName = "";
        this.ownerData[0].lastName = "";
        this.ownerData[0].dobM = "";
        this.ownerData[0].dobD = "";
        this.ownerData[0].dobY="";
        this.ownerData[0].address="";
        this.ownerData[0].city="";
        this.ownerData[0].state="";
        this.ownerData[0].zip=""
      }
    },
    addDriverDataValidation(count){
      let driverDatavalidationsLength = this.sizeOfObject(this.validations.ownerData);
      for (let index = 0; index < count; index++) {

        this.$set(this.validations.ownerData, driverDatavalidationsLength + index, {
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
        this.ownerData.push({
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
        this.ownerData.push(data);
      }
    },
    removeOwnerData( key ){
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
          this.ownerData.splice( key, 1 );
          Vue.delete(this.validations.ownerData,key)
        }
      })
    },
    validateNewDriverData() {
      let validNewDriverForm = true;
      for( var index in this.ownerData ) {
        if (this.ownerData.hasOwnProperty( index ) ) {
          
          if( this.ownerData[index].firstName.trim() == '' ){
            validNewDriverForm = false;
            this.validations.ownerData[index].firstName.is_valid = false;
            this.validations.ownerData[index].firstName.text = 'Please enter firstname!';
          }else{
            this.validations.ownerData[index].firstName.is_valid = true;
            this.validations.ownerData[index].firstName.text = '';
          }

          if( this.ownerData[index].lastName.trim() == '' ){
            validNewDriverForm = false;
            this.validations.ownerData[index].lastName.is_valid = false;
            this.validations.ownerData[index].lastName.text = 'Please enter lastname!';
          }else{
            this.validations.ownerData[index].lastName.is_valid = true;
            this.validations.ownerData[index].lastName.text = '';
          }

          if (this.ownerData[index].dobM < 1 || this.ownerData[index].dobM > 12)  {
              validNewDriverForm = false;
              this.validations.ownerData[index].dobM.is_valid = false;
              this.validations.ownerData[index].dobM.text =
              "Please enter valid month!";
          if( this.ownerData[index].dobM.trim() == '' ){
            validNewDriverForm = false;
            this.validations.ownerData[index].dobM.is_valid = false;
            this.validations.ownerData[index].dobM.text = 'Please enter month!';
          }}
          else{
            this.validations.ownerData[index].dobM.is_valid = true;
            this.validations.ownerData[index].dobM.text = '';
          }

          if (this.ownerData[index].dobD < 1 || this.ownerData[index].dobD > 31)  {
            validNewDriverForm = false;
            this.validations.ownerData[index].dobD.is_valid = false;
            this.validations.ownerData[index].dobD.text =
              "Please enter valid date!";
          if( this.ownerData[index].dobD.trim() == '' ){
            validNewDriverForm = false;
            this.validations.ownerData[index].dobD.is_valid = false;
            this.validations.ownerData[index].dobD.text = 'Please enter date!';
          }}else{
            this.validations.ownerData[index].dobD.is_valid = true;
            this.validations.ownerData[index].dobD.text = '';
          }
          
          if(this.ownerData[index].dobY.length<4){
              validNewDriverForm = false;
            this.validations.ownerData[index].dobY.is_valid = false;
            this.validations.ownerData[index].dobY.text =
              "Please enter valid year!";
          if( this.ownerData[index].dobY.trim() == '' ){
            validNewDriverForm = false;
            this.validations.ownerData[index].dobY.is_valid = false;
            this.validations.ownerData[index].dobY.text = 'Please enter year!';
          }}else{
            this.validations.ownerData[index].dobY.is_valid = true;
            this.validations.ownerData[index].dobY.text = '';
          }

          if( this.ownerData[index].address.trim() == '' ){
            validNewDriverForm = false;
            this.validations.ownerData[index].address.is_valid = false;
            this.validations.ownerData[index].address.text = 'Please enter an address!';
          }else{
            this.validations.ownerData[index].address.is_valid = true;
            this.validations.ownerData[index].address.text = '';
          }

          if(this.ownerData[index].city.trim() == '') {
            validNewDriverForm = false;
            this.validations.ownerData[index].city.is_valid = false;
            this.validations.ownerData[index].city.text = 'Please enter city!';
          } else {
            this.validations.ownerData[index].city.is_valid = true;
            this.validations.ownerData[index].city.text = '';
          }

          if(this.ownerData[index].state.trim() == '') {
            validNewDriverForm = false;
            this.validations.ownerData[index].state.is_valid = false;
            this.validations.ownerData[index].state.text = 'Please enter state!';
          } else {
            this.validations.ownerData[index].state.is_valid = true;
            this.validations.ownerData[index].state.text = '';
          }

          if(!this.ownerData[index].zip.match(/(^\d{5}$)/)){
            validNewDriverForm = false;
            this.validations.ownerData[index].zip.is_valid = false;
            this.validations.ownerData[index].zip.text = 'Please enter minimum 5 character!';
          if(this.ownerData[index].zip.trim() == '' ) {
            validNewDriverForm = false;
            this.validations.ownerData[index].zip.is_valid = false;
            this.validations.ownerData[index].zip.text = 'Please enter zip!';
          }} else {
            this.validations.ownerData[index].zip.is_valid = true;
            this.validations.ownerData[index].zip.text = '';
          }
        }
      }
      return validNewDriverForm;
    },
    addForm() {
      this.formData.owners.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.formData.owners.splice(index, 1);
    },

    onChange($event) {
      this.ownerData[0] = Object.assign({}, this.ownerData[0], this.drivers[$event.target.value]);
      this.ownerData[0].firstName = this.drivers[$event.target.value].firstName;
      this.ownerData[0].lastName = this.drivers[$event.target.value].lastName;
      this.ownerData[0].address = this.drivers[$event.target.value].address;
      this.ownerData[0].city = this.drivers[$event.target.value].city;
      this.ownerData[0].state = this.drivers[$event.target.value].state;
      this.ownerData[0].zip = this.drivers[$event.target.value].zip;
      this.ownerData[0].dobD = this.drivers[$event.target.value].dobD;
      this.ownerData[0].dobM = this.drivers[$event.target.value].dobM;
      this.ownerData[0].dobY = this.drivers[$event.target.value].dobY;
      
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

        if (res && res.status === "OK" && res.data.company) {
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
              this.ownerData = ownerInformationList;
              
              this.addDriverDataValidation(ownerInformationList.length)
            } else {
              this.addDriverData();
            }

          } else {
            this.addDriverData();
          }
        } else if (res && res.status === "ERROR") {
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
          ownerInformationList: this.ownerData.map(o => {
              let owner = { ...o };
              delete owner._uuid;
              return owner;
             }),
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
  select{
    position: relative;
    -webkit-appearance: none;
    background: url('../assets/images/arrow-dropdown.png') no-repeat 96% center;
    -moz-appearance: none;
  }

  .fontawesome path {
    fill: black;
  }
</style>

