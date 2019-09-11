<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Owner(s)</h4>

          <div class="d-flex">
            <div class="pr-3">Are one of the drivers the owner?</div>

            <div class="flex-grow-1">
              <label>
                <input v-model="formData.driverIsOwner" type="checkbox"  v-on:change="changeData()"> Yes
              </label>
            </div>
          </div>

          <div v-if="formData.driverIsOwner" class="col-12 col-md-6">
            <select v-model="formData.driverOwnerIndex" @change="onChange($event)" class="lt-input" id="driverList" >
              <option value="">Select Driver</option>
 
              <option
                v-for="(item, index) in drivers.drivers"
                :key="index"
                :value="index"
              >{{ item.firstName }} {{ item.lastName }}</option>
            </select>
          </div>

          <hr>

          <template>
            <div class="owner-form-item container-fluid mob-2" v-for="(singleDriver, index) in driversData" :key="index">
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
                          type="text"
                          class="lt-input"
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
                          type="text"
                          class="lt-input"
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
                          type="text"
                          class="lt-input"
                          placeholder="YYYY"
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
                      placeholder="Zip"
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
                class="lt-button lt-button-default px-4 btn-block btn-border-radius-lb mob-2"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">Drivers</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main px-4 btn-block btn-border-radius-rb mob-2"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div
                  class="next-title text-center d-inline pl-3 text-white mob-2"
                >Additional Comments</div>
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
import headerAssistant from "./header.vue";

export default {
  name: "AccountInfoOwners",
  components: {
    AccountInfoOwnersItem: () => import("./AccountInfoOwnersItem.vue"),
    modelLogin: ModalLogin,
    headerAssistant:headerAssistant

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
        driversData: [],
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
      // console.log("VICKY@", driverIsOwner);
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
    changeData(){
      if(!this.driverIsOwner){
        console.log("this.driversData",this.driversData)
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
      let driverDatavalidationsLength = this.validations.driversData.length;
      for (let index = 0; index < count; index++) {
        this.validations.driversData[driverDatavalidationsLength + index] = {
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
        };
      }
    },
    addDriverData(data) {
      console.log("owener data",data)
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
      this.validations.driversData.splice( key, 1 );
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

          if( this.driversData[index].dobM.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].dobM.is_valid = false;
            this.validations.driversData[index].dobM.text = 'Please enter month!';
          }else{
            this.validations.driversData[index].dobM.is_valid = true;
            this.validations.driversData[index].dobM.text = '';
          }

          if( this.driversData[index].dobD.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].dobD.is_valid = false;
            this.validations.driversData[index].dobD.text = 'Please enter date!';
          }else{
            this.validations.driversData[index].dobD.is_valid = true;
            this.validations.driversData[index].dobD.text = '';
          }

          if( this.driversData[index].dobY.trim() == '' ){
            validNewDriverForm = false;
            this.validations.driversData[index].dobY.is_valid = false;
            this.validations.driversData[index].dobY.text = 'Please enter year!';
          }else{
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

          if(this.driversData[index].zip.trim() == '') {
            validNewDriverForm = false;
            this.validations.driversData[index].zip.is_valid = false;
            this.validations.driversData[index].zip.text = 'Please enter zip!';
          } else {
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
        console.log("willbe", willDelete);
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
      if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
        console.log("temp_uuid login after", temp_uuid);
      } else {
        temp_uuid = this.uuid;
        console.log("temp_uuid no login after", temp_uuid);
      }
      try {
        console.log("VICKY", this.formData)
        let data = await API.post("company/save", {
          key: "owners",
          val: {
            ...this.formData,
            owners: this.formData.owners.map(o => {
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
      // console.log(" _uuid: uuidv4()", uuidv4())

      // var dropDown = document.getElementById("driverList");
      // console.log("drop",dropDown)
      // dropDown.selectedIndex = 0;
      // console.log("document.getElementById(driverList)",document.getElementById("driverList"))
      // console.log("aaaa",dropDown.selectedIndex)
      this.formData.owners.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.formData.owners.splice(index, 1);
    },

    onChange($event) {
      
      console.log("this.drivers[$event.target.value]",this.drivers.drivers[$event.target.value])
      // if(this.drivers.drivers[$event.target.value] != undefined){
      this.driversData[0] = Object.assign({}, this.driversData[0], this.drivers.drivers[$event.target.value]);
      this.driversData[0].dobD = this.drivers.drivers[$event.target.value].dateOfBirth.split('/')[1];
      this.driversData[0].dobM = this.drivers.drivers[$event.target.value].dateOfBirth.split('/')[0];
      this.driversData[0].dobY = this.drivers.drivers[$event.target.value].dateOfBirth.split('/')[2];
      // }
      // else{
      //   console.log("else",this.formData.driverIsOwner)
        
      // this.formData.driverIsOwner= false;
      //     this.driversData[0] = "";
          
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

      try {
        let data = await API.get("company/current");

        if (data.status === "OK") {
          let { drivers, owners: ownersTab } = data.data.a;
          console.log("sssss", data.data.a);
          this.uuid = data.data.b;
          if (drivers) {
            this.drivers = drivers;
          }
          if (ownersTab) {
            let { owners } = ownersTab;

            this.formData = {
              ...this.formData,
              ...ownersTab,
              owners: owners.map(o => ({ ...o, _uuid: uuidv4() }))
            };

            if(data.data.a.owners.owners.length > 0) {
              this.driversData = data.data.a.owners.owners
              this.addDriverDataValidation(data.data.a.owners.owners.length)
            } else {
              this.addDriverData();
            }

          } else {
            // this.addForm();
            this.addDriverData();
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
    // setDataFromForms() {
    //   let owners = [];

    //   if (this.$refs.ownerForm) {
    //     this.$refs.ownerForm.forEach(formRef => {
    //       let formData = formRef.getFormData();
    //       owners.push(formData);
    //     });
    //   }

    //   this.formData.owners = owners;
    // },
    async updateCompany() {
      console.log("update company")
      if ( this.formData.driverIsOwner && this.formData.driverOwnerIndex === -1 ) {
        this.formData.driverIsOwner = false;
      }

      // this.setDataFromForms();

      // if (this.noOwners) {
      //   return;
      // }

      // let allFormAreValid = this.$refs.ownerForm
      //   ? this.$refs.ownerForm.every(formRef => formRef.validateForm())
      //   : true;

      let allFormAreValid = this.validateNewDriverData();
      if (!allFormAreValid) {
        console.log('FORM IS INVALID');
        return;
      } else {
        console.log('FORM IS VALID');
      }

      this.loading = true;
      this.error = null;
      if(localStorage.getItem('token')){

        this.final_uuid = this.userData;
        console.log("this.final_uuid login after",this.final_uuid )
      }else{
        this.final_uuid = this.uuid;
        console.log("this.final_uuid no login after",this.final_uuid )
      }
      try {
        let data = await API.post("company/save", {
          key: "owners",
          val: {
            ...this.driversData,
            // owners: this.formData.owners.map(o => {
            //   let owner = { ...o };
            //   delete owner._uuid;
            //   return owner;
            // })
            owners: this.driversData.map(o => {
              let owner = { ...o };
              delete owner._uuid;
              return owner;
            })
          },
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid
        });

        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
             axios.post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid="+this.final_uuid+"&user_id="+localStorage.getItem("userId")
          )
          .then(res => {
            console.log("ress post",res)
          })
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

