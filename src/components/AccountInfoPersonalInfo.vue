<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Business Information</h4>
          <div class="col-md-6 col-lg-12 row">
              <h6 class="">Mailing Address</h6>
            </div>
          <div class="row">
            
            <div class="col">
              <div class="form-group">
                <input
                  v-model="formData.address"
                  :class="{ 'has-error': formErrors.address }"
                  type="text"
                  class="lt-input"
                  placeholder="Street Address*"
                  required
                  @change="validateField('address')"
                  @focus="onFocus('address')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.address" class="text-danger">{{ formErrors.address }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.city"
                  :class="{ 'has-error': formErrors.city }"
                  type="text"
                  class="lt-input"
                  placeholder="City*"
                  required
                  @change="validateField('city')"
                  @focus="onFocus('city')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.city" class="text-danger">{{ formErrors.city }}</div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.state"
                  :class="{ 'has-error': formErrors.state }"
                  type="text"
                  class="lt-input"
                  placeholder="State*"
                  required
                  @change="validateField('state')"
                  @focus="onFocus('state')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.zip"
                  :class="{ 'has-error': formErrors.zip }"
                  type="text"
                  class="lt-input"
                  placeholder="Zip Code*"
                  required
                  minlength="5"
                  @change="validateField('zip')"
                  @focus="onFocus('zip')"
                  @blur="onBlur"
                >
                {{data}}
                <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.dotNumber"
                  :class="{ 'has-error': formErrors.dotNumber }"
                  type="text"
                  class="lt-input"
                  placeholder="USDOT"
                  @focus="onFocus('USDOT')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.dotNumber" class="text-danger">{{ formErrors.dotNumber }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <input
                  v-model="formData.name"
                  :class="{ 'has-error': formErrors.name }"
                  type="text"
                  class="lt-input"
                  placeholder="Company name"
                  @focus="onFocus('Company name')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.name" class="text-danger">{{ formErrors.name }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.phoneNumber"
                  :class="{ 'has-error': formErrors.phoneNumber }"
                  type="text"
                  class="lt-input"
                  placeholder="Phone no"
                  @focus="onFocus('Phone number')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.phoneNumber" class="text-danger">{{ formErrors.phoneNumber }}</div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <input type="checkbox" id="checkbox" class = "mt-1" v-model="checked" v-on:change="changeData()">
            <label for="checkbox" class="st-padding d-inline">Is Garaging address the same location?</label>
          </div>
          <div>
            <div class="row">
              <div class="col-md-6 col-lg-12 py-3">
                <h6 class="pt-2">Garaging Address</h6>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <input
                    v-model="formData.address1"
                    :class="{ 'has-error': formErrors.address1 }"
                    type="text"
                    class="lt-input"
                    placeholder="Garaging Address*"
                    required
                    @change="validateField('address1')"
                    @focus="onFocus('address1')"
                    @blur="onBlur"
                  >

                  <div v-if="formErrors.address1" class="text-danger">{{ formErrors.address1 }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 ">
                <div class="form-group">
                  <input
                    v-model="formData.city1"
                    :class="{ 'has-error': formErrors.city1 }"
                    type="text"
                    class="lt-input"
                    placeholder="City*"
                    required
                    @change="validateField('city1')"
                    @focus="onFocus('city1')"
                    @blur="onBlur"
                  >
                  <div v-if="formErrors.city1" class="text-danger">{{ formErrors.city1 }}</div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-6 ">
                <div class="form-group">
                  <input
                    v-model="formData.state1"
                    :class="{ 'has-error': formErrors.state1 }"
                    type="text"
                    class="lt-input"
                    placeholder="State*"
                    required
                    @change="validateField('state1')"
                    @focus="onFocus('state1')"
                    @blur="onBlur"
                  >
                  <div v-if="formErrors.city1" class="text-danger">{{ formErrors.state1 }}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 ">
                <div class="form-group">
                  <input
                    v-model="formData.zip1"
                    :class="{ 'has-error': formErrors.zip1 }"
                    type="text"
                    class="lt-input"
                    placeholder="Zip Code*"
                    required
                    minlength="5"
                    @change="validateField('zip1')"
                    @focus="onFocus('zip1')"
                    @blur="onBlur"
                  >

                  <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip1 }}</div>
                </div>
              </div>
            </div>
            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          </div>
        </div>
        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="true"
                type="button"
                class="lt-button lt-button-default btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title"></div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Business Structure</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
<!-- 
      <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
      </div>
      <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
        <span class="save-hover">Save Changes</span>
      </div>
 -->
      <div v-if="showmodel">
        <modelLogin/>
      </div>
    </form>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import { mapState, mutations } from "vuex";
import { isMobile } from "mobile-device-detect";
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "AccountInfoPersonalInfo",

  components: {
    modelLogin: ModalLogin,
    
  },
  props: {
    nextForm: {
      type: String,
      required: true
    },
    prevForm:{
      type:String,
    },
    progress: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.$emit("update-hint", "Please be sure that the mailing address is where you want to receive physical documents. The garage address is where you keep your truck.");
    
    this.mobile = isMobile ? true : false;
    this.uuid = localStorage.getItem('uuid');
    if (localStorage.getItem("token")) {
      this.save = false;
      this.formData.dotNumber = localStorage.getItem("usdot");
      this.formData.name = localStorage.getItem("company");
      this.formData.phoneNumber = localStorage.getItem("Phone");
      let MailingAddress = this.formatAddress(
        localStorage.getItem(["Mailing address"])
      );
      let PhysicalAddress = this.formatAddress(
        localStorage.getItem(["Physical address"])
      );
      this.formData.address = MailingAddress[3].trim().replace(",", "");
      this.formData.state = MailingAddress[1].trim().replace(",", "");
      this.formData.city = MailingAddress[2].trim().replace(",", "");
      this.formData.zip = MailingAddress[0].trim().replace(",", "");

      this.formData.address1 = PhysicalAddress[3].trim().replace(",", "");
      this.formData.state1 = PhysicalAddress[1].trim().replace(",", "");
      this.formData.city1 = PhysicalAddress[2].trim().replace(",", "");
      this.formData.zip1 = PhysicalAddress[0].trim().replace(",", "");
    } else {
      this.save = true;
      
      this.formData.dotNumber = localStorage.getItem("usdot");
      this.formData.name = localStorage.getItem("company");
      this.formData.phoneNumber = localStorage.getItem("Phone");

      let MailingAddress = this.formatAddress(
        localStorage.getItem(["Mailing address"])
      );
      this.formData.address = MailingAddress[3].trim().replace(",", "");
      this.formData.state = MailingAddress[1].trim().replace(",", "");
      this.formData.city = MailingAddress[2].trim().replace(",", "");
      this.formData.zip = MailingAddress[0].trim().replace(",", "");
      let PhysicalAddress = this.formatAddress(
        localStorage.getItem(["Physical address"])
      );
      this.formData.address1 = PhysicalAddress[3].trim().replace(",", "");
      this.formData.state1 = PhysicalAddress[1].trim().replace(",", "");
      this.formData.city1 = PhysicalAddress[2].trim().replace(",", "");
      this.formData.zip1 = PhysicalAddress[0].trim().replace(",", "");
    }
  },
  beforeMount() {
    // localStorage.setItem("uuid", null);
  },
  computed: {
    ...mapState(["data"])
  },

  data() {
    return {
      checked: true,
      showmodel: false,
      final_uuid:"",
      save: true,
      mobile:false,
      uuid: "",
      // newQuote: false,
      userData: "",
      formData: {
        address: "",
        city: "",
        state: "",
        zip: "",
        dotNumber: "",
        name: "",
        phoneNumber: "",
        address1: "",
        city1: "",
        state1: "",
        zip1: ""
      },
      rules: {
        // firstName: [required],
        // lastName: [required],
        address: [required],
        city: [required],
        state: [required],
        zip: [required],
        address1: [required],
        city1: [required],
        state1: [required],
        zip1: [required]
      },
      formErrors: {},
      hints: {
        address: "Please enter Mailing Address",
        state: "Please enter State of Mailing Address",
        city: "Please enter State of Mailing Address",
        zip: "Please enter Zipcode of Mailing Address",
        address1: "Please enter Garaging Address",
        city1: "Please enter State of Garaging Address",
        state1: "Please enter State of Garaging Address",
        zip1: "Please enter Zipcode of Garaging Address"
      },
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit("update-progress", this.progress);
    // localStorage.setItem("uuid", null);

    this.loadCompany();
  },
  updated() {
    // if (localStorage.getItem("showModal") == "true") {
    //   this.showmodel = true;
    // } else {
    //   this.showmodel = false;
    // }
  },
  methods: {
    
    changeData() {
      if (this.checked) {
        this.formData.address1 = this.formData.address;
        this.formData.city1 = this.formData.city;
        this.formData.state1 = this.formData.state;
        this.formData.zip1 = this.formData.zip;
      } else {
        this.formData.address1 = "";
        this.formData.city1 = "";
        this.formData.state1 = "";
        this.formData.zip1 = "";
      }
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
          
          this.$router.push({ name: "AccountInfoPersonalInfo" });
          
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
      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("company/save", {
          key: "personalInfo",
          val: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: this.uuid
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
          // this.showmodel = true;
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
      this.$emit("update-hint", "Please be sure that the mailing address is where you want to receive physical documents. The garage address is where you keep your truck.");
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    validateField(fieldName) {
      validateField(fieldName, this.formData, this.rules, this.formErrors);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    },
    async loadCompany() {
      this.loading = false;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
        this.uuid = res.data.uuid;
  
        if (res.status === "OK") {
          let { company } = res.data;
        } else if (res.status === "ERROR") {
          // this.$router.replace({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatAddress(fullAddress) {
      let splitAddress = fullAddress.split(" ");
      splitAddress.reverse();
      let cnt = 0,
        val = [],
        index = 0;
        while (cnt != 4 && splitAddress.length > index) {
          if (splitAddress[index].trim() != "") {
            if (cnt < 2) {
              val[cnt++] = splitAddress[index];
            } else {
              val[cnt] = "";
            do {
              val[cnt] = splitAddress[index] + " " + val[cnt];
            } while (
              splitAddress[index++].trim() != "" &&
              splitAddress.length > index
            );
            cnt++;
          }
        }
        index++;
      }
      return val;
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.final_uuid = this.uuid;
      let emailAddress = "";
      try {
        emailAddress = JSON.parse(localStorage.getItem('token')).email;
      } catch (e) {

      }
      try {
        const { name, dotNumber, phoneNumber } = this.formData;
        let data = {
          name,
          dotNumber,
          phoneNumber,
          mailingAddress: {
            address: this.formData.address,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip,
          },
          garagingAddress: {
            address: this.formData.address1,
            city: this.formData.city1,
            state: this.formData.state1,
            zip: this.formData.zip1,
          },
          user_id: localStorage.getItem("userId"),
          emailAddress,
          uuid: this.final_uuid
        };
        let res = await API.post("company/save", { data});
  
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

<style lang="scss" scoped>
.color-bg{
  color:#6f6f6f
}
.st-padding {
  padding-left: 10px;
  font-weight: bold;
}
</style>
