<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Business Information</h4>
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
            <div class="col-6">
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

            <div class="col-4">
              <div class="form-group">
                <select
                  v-model="formData.state"
                  :class="{ 'has-error': formErrors.state }"
                  class="lt-input"
                  required
                  @change="validateField('state')"
                  @focus="onFocus('state')"
                  @blur="onBlur"
                >
                  <option disabled value>State/Province</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>

                <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <input
                  v-model="formData.zip"
                  :class="{ 'has-error': formErrors.zip }"
                  type="text"
                  class="lt-input"
                  placeholder="Zip Code*"
                  required
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
            <div class="col-6">
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
            <div class="col-6">
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
            <input type="checkbox" id="checkbox" v-model="checked">
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
              <div class="col-6">
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

              <div class="col-4">
                <div class="form-group">
                  <select
                    v-model="formData.state1"
                    :class="{ 'has-error': formErrors.state1 }"
                    class="lt-input"
                    required
                    @change="validateField('state1')"
                    @focus="onFocus('state1')"
                    @blur="onBlur"
                  >
                    <option disabled value>State/Province</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>

                  <div v-if="formErrors.state" class="text-danger">{{ formErrors.state1 }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <input
                    v-model="formData.zip1"
                    :class="{ 'has-error': formErrors.zip1 }"
                    type="text"
                    class="lt-input"
                    placeholder="Zip Code*"
                    required
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
            <div class="col-6 p-0 d-flex pl-4 align-items-center color-font">
              <font-awesome-icon icon="caret-left" size="2x" class="m-1"></font-awesome-icon>Previous
            </div>
            <div class="col-6 p-0">
              <!-- <i class="fas fa-home" aria-hidden="true"></i>  -->
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb p-1"
              >
                <!-- <font-awesome-icon icon="amazon-pay" size="2x" class="m-1"></font-awesome-icon> -->
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline text-white">
                  Business Structure
                  <font-awesome-icon icon="caret-right" size="2x" class="m-1"></font-awesome-icon>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
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
import { mapState } from "vuex";

export default {
  name: "AccountInfoPersonalInfo",

  components: {
    "chat-boat": ChatBoat,
    modelLogin: ModalLogin
  },
  props: {
    nextForm: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  },
  beforeMount() {
    // console.log("beforeMount");
    localStorage.setItem("usdot", "");
  },
  mounted() {
    this.formData.USDOT = localStorage.getItem("usdot");
    this.formData.company = localStorage.getItem("company");
    this.formData.address = localStorage.getItem(["Mailing address"]);
    // [this.formData.dobD, this.formData.dobM, this.formData.dobY] = b.dateOfBirth.split('/');
    let x = localStorage.getItem("Mailing address");
    // this.formData.zip = x.split(',')
    this.formData.address1 = localStorage.getItem(["Physical address"]);
    this.formData.phone = localStorage.getItem("Phone");

    if (localStorage.getItem("token")) {
      this.save = false;
      this.$store.dispatch("loadData", this.uuid);
       let a = this.$store.state.getData.data[2]
      console.log("aaaa",a);
      let b = JSON.parse(a.val);
      this.formData.address = b.address;
      this.formData.city = b.city;
      this.formData.zip = b.zip;
      this.formData.USDOT = localStorage.getItem("usdot");
      this.formData.company = localStorage.getItem("company");
      this.formData.phone = localStorage.getItem("Phone");
      this.formData.state = b.state;
      this.formData.address1 = b.address1;
      this.formData.city1 = b.city1;
      this.formData.zip1 = b.zip1;
      this.formData.state1 = b.state1;
    } else {
      this.save = true;

      console.log("not logged in");
    }
  },
  beforeMount() {},
  computed: {
    ...mapState(["data"])
  },

  data() {
    return {
      checked: true,
      showmodel: false,
      save: true,
      uuid: "",
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
        address: "Another hint"
      },
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
    this.uuid = localStorage.getItem("uuid");
    // console.log("be",this.uuid)
    // console.log("mount api",JSON.parse(this.data.data[0].val).businessType)
  },
  updated() {
    if (localStorage.getItem("showModal") == "true") {
      this.showmodel = true;
    } else {
      this.showmodel = false;
    }
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
          key: "personalInfo",
          val: this.formData,
          userId: localStorage.getItem("userId"),
          uuid: localStorage.getItem("uuid")
        });
        console.log("this.formData per", this.formData);
        if (data.status === "OK") {
          if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
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

    onFocus(fieldName) {
      this.$emit("update-hint", this.hints[fieldName]);
    },
    onBlur() {
      this.$emit("update-hint", "");
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
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
        localStorage.setItem("uuid", data.data.b);
        if (data.status === "OK") {
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
        let data = await API.post("company/save", {
          key: "personalInfo",
          val: this.formData,
          userId: localStorage.getItem("userId"),
          uuid: localStorage.getItem("uuid")
        });
        // console.log(localStorage.getItem("userId"))
        // console.log(localStorage.getItem("uuid"))
        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          // console.log("data",data)
          this.error = data.messages[0] || data.data;
        }
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
.st-padding {
  // color: black;
  padding-left: 10px;
  font-weight: bold;
}
</style>
