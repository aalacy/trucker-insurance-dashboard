<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Business Information</h4>
          <div class="col-md-6 col-lg-12 py-3 row">
              <h6 class="pt-2">Mailing Address</h6>
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
                  v-model="formData.USDOT"
                  :class="{ 'has-error': formErrors.USDOT }"
                  type="text"
                  class="lt-input"
                  placeholder="USDOT"
                  @focus="onFocus('USDOT')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.USDOT" class="text-danger">{{ formErrors.USDOT }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <input
                  v-model="formData.company"
                  :class="{ 'has-error': formErrors.company }"
                  type="text"
                  class="lt-input"
                  placeholder="Company name"
                  @focus="onFocus('Company name')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.company" class="text-danger">{{ formErrors.company }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.phone"
                  :class="{ 'has-error': formErrors.phone }"
                  type="text"
                  class="lt-input"
                  placeholder="Phone no"
                  @focus="onFocus('Phone number')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.phone" class="text-danger">{{ formErrors.phone }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-sm-6 col-lg-12">
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
import { validateField, validateForm, required } from "../validators.js";
import { API } from "../api.js";
import ChatBoat from "./ChatBoat.vue";
import ModalLogin from "./ModalLogin.vue";
import { mapState, mutations } from "vuex";
import { isMobile } from "mobile-device-detect";
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "AccountInfoPersonalInfo",

  components: {
    "chat-boat": ChatBoat,
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
    if (localStorage.getItem("token")) {
      this.save = false;
      axios
        .get(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getuuidbyuserid?user_id=" +
            localStorage.getItem("userId")
        )
        .then(coins => {
          this.userData = coins.data.uuid;
          localStorage.setItem("uuid",coins.data.uuid);
          
        });
      setTimeout(() => {
        this.$store.dispatch("loadData", this.userData).then(res => {
          let len = this.$store.state.getData.data;
          for (let k = 0; k <= len.length; k++) {
            if (this.$store.state.getData.data[k].key == "personalInfo") {
              let a = this.$store.state.getData.data[k];
              let b = JSON.parse(a.val);
              this.formData.address = b.address;
              this.formData.city = b.city;
              this.formData.zip = b.zip;
              this.formData.USDOT = b.USDOT;
              this.formData.company = b.company;
              this.formData.phone = b.phone;
              this.formData.state = b.state;
              this.formData.address1 = b.address1;
              this.formData.city1 = b.city1;
              this.formData.zip1 = b.zip1;
              this.formData.state1 = b.state1;
            }
          }
        });

        
      }, 1000);
      this.formData.USDOT = localStorage.getItem("usdot");
      this.formData.company = localStorage.getItem("company");
      this.formData.phone = localStorage.getItem("Phone");
      let fullAddress = localStorage.getItem(["Mailing address"]);

      let MailingAddress = this.formatAddress(
        localStorage.getItem(["Mailing address"])
      );
      console.log('MailingAddress', MailingAddress);
      let PhysicalAddress = this.formatAddress(
        localStorage.getItem(["Physical address"])
      );
      console.log('PhysicalAddress', PhysicalAddress);
      this.formData.address = MailingAddress[3].trim().replace(",", "");
      this.formData.city = MailingAddress[1].trim().replace(",", "");
      this.formData.state = MailingAddress[2].trim().replace(",", "");
      this.formData.zip = MailingAddress[0].trim().replace(",", "");

      this.formData.address1 = PhysicalAddress[3].trim().replace(",", "");
      this.formData.city1 = PhysicalAddress[1].trim().replace(",", "");
      this.formData.state1 = PhysicalAddress[2].trim().replace(",", "");
      this.formData.zip1 = PhysicalAddress[0].trim().replace(",", "");
    } else {
      this.save = true;
      
      this.formData.USDOT = localStorage.getItem("usdot");
      this.formData.company = localStorage.getItem("company");
      this.formData.phone = localStorage.getItem("Phone");
      let fullAddress = localStorage.getItem(["Mailing address"]);
      


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


      setTimeout(() => {
        this.$store
          .dispatch("loadData", this.uuid)
          .then(res => {
            let len = this.$store.state.getData.data;
            for (let i = 0; i <= len.length; i++) {
              if (this.$store.state.getData.data[i].key == "personalInfo") {
                let a = this.$store.state.getData.data[i];
                let b = JSON.parse(a.val);
                this.formData.address = b.address;
                this.formData.city = b.city;
                this.formData.zip = b.zip;
                this.formData.USDOT = b.USDOT;
                this.formData.company = b.company;
                this.formData.phone = b.phone;
                this.formData.state = b.state;
                this.formData.address1 = b.address1;
                this.formData.city1 = b.city1;
                this.formData.zip1 = b.zip1;
                this.formData.state1 = b.state1;
              }
            }
          })
          .catch(() => {});
      }, 1000);
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
        // firstName: "",
        // lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        USDOT: "",
        company: "",
        phone: "",
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
    var temp_uuid;
      this.loading = true;
      this.error = null;
      if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
  
      } else {
        temp_uuid = this.uuid;
  
      }
      try {
        let data = await API.post("company/save", {
          key: "personalInfo",
          val: this.formData,
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
        this.uuid = data.data.b;
  
        if (data.status === "OK") {
          // localStorage.setItem("uuid",data.data.b)
          let { personalInfo } = data.data;
          if (personalInfo) {
            this.formData = {
              ...this.formData,
              ...personalInfo
            };
          }
        } else if (data.status === "ERROR") {
          // this.$router.replace({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;

        // }, 5000);
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
      if(localStorage.getItem('token')){
        
          this.final_uuid = this.userData;
    
      }else{
        this.final_uuid = this.uuid;
  
      }
      try {
        let data = await API.post("company/save", {
          key: "personalInfo",
          val: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid
        });
  
        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          
          this.error = data.messages[0] || data.data;
        }

        // second API
        // axios.post
        axios
          .post(
            "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid=" +
              this.uuid +
              "&user_id=" +
              localStorage.getItem("userId")
          )
          .then(res => {
      
          });
        // .catch(err => this.$swal("Opps!",err, "error"))
        // .finally(() 
      } catch (err) {
        // console.error(err);
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
  // color: black;
  padding-left: 10px;
  font-weight: bold;
}
</style>
