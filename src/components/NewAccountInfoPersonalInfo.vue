<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Personal Information</h4>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <input
                  v-model="formData.firstname"
                  :class="{ 'has-error': formErrors.firstname }"
                  type="text"
                  class="lt-input"
                  placeholder="First Name"
                  @change="validateField('lastname')"
                  @focus="onFocus('firstname')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.firstname" class="text-danger">{{ formErrors.firstname }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <input
                  v-model="formData.lastname"
                  :class="{ 'has-error': formErrors.lastname }"
                  type="text"
                  class="lt-input"
                  placeholder="Last Name"
                  @change="validateField('lastname')"
                  @focus="onFocus('lastname')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.lastname" class="text-danger">{{ formErrors.lastname }}</div>
              </div>
            </div>
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
        </div>
        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div v-if="mobile" class="col-6 p-0">
            
              <button
                :disabled="loading"
                type="button"
                class="lt-button px-4 text-center lt-button-default btn-block btn-border-radius-lb  d-flex align-itmes-center justify-content-center h-100"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title  px-4 text-center d-inline pl-2 mob-2 button-icon color-bg">Upload Documents</div>
              </button>
            
            </div>
              <div v-else class="w-100">
            <div class="lt-button px-4 text-center lt-button-default btn-block btn-border-radius-lb ">
              <!-- <font-awesome-icon icon="caret-left" size="2x" class="m-1"></font-awesome-icon> -->
              Previous
              
            </div>
            </div>
            <div class="col-6 p-0">
              
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb p-1 button-icon d-flex align-itmes-center justify-content-center h-100"
              >
              
                <span class="arrow-button ">{{ loading ? 'Loading...' : 'Next' }}</span>Business Structure
                <!-- <font-awesome-icon icon="caret-right" size="2x" class="m-1 fill-white"></font-awesome-icon> -->
              </button>
            </div>
          </div>
        </div>
      </div>

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
  name: "NewAccountInfoPersonalInfo",

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
    this.mobile = isMobile ? true : false;
    this.uuid = localStorage.getItem('uuid');
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
        firstname: "",
        lastname: "",
      },
      rules: {
        firstname: [required],
        lastname: [required],
        address: [required],
        city: [required],
        state: [required],
        zip: [required],
      },
      formErrors: {},
      hints: {
        firstname: "Please enter First Name",
        lastname: "Please enter Last Name",
        address: "Please enter Mailing Address",
        state: "Please enter State of Mailing Address",
        city: "Please enter State of Mailing Address",
        zip: "Please enter Zipcode of Mailing Address",
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

    onFocus(fieldName) {
      this.$emit("update-hint", this.hints[fieldName]);
    },
    onBlur() {
      this.$emit("update-hint", "");
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
      try {
        let data = await API.get("company/current");
        this.uuid = data.data.uuid;
  
        if (data.status === "OK") {
          let { company } = data.data;
        } else if (data.status === "ERROR") {
          // this.$router.replace({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    async updateCompany() {
      // let formIsValid = this.validateForm();
      // if (!formIsValid) {
      //   return;
      // }

      this.goNextForm();
      return;
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
