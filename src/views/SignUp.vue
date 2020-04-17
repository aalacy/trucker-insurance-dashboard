<template>
  <div class="sign-up-view d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <b-form class="sign-up-form" @submit.stop.prevent="signup">
            <div class="form-title">
              <div class="title welcomefont">Welcome!</div>
              <div class="form-group">
                <router-link
                  :to="{ name: 'Home' }"
                  tag="button"
                  type="button"
                  class="lt-button lt-button-close"
                />
              </div>
            </div>

            <div class="form-group">
              <b-input
                v-model="$v.form.firstName.$model"
                type="text"
                class="lt-input border border-color"
                placeholder="First Name"
                :state="validateState('firstName')"
                aria-describedby="first-name"
              />
              <b-form-invalid-feedback id="first-name">
                The minimum length is 3 characters.
              </b-form-invalid-feedback>
            </div>

            <div class="form-group">
              <b-input
                v-model="$v.form.lastName.$model"
                type="text"
                class="lt-input border border-color"
                placeholder="Last Name"
                :state="validateState('lastName')"
                aria-describedby="last-name"
              />
              <b-form-invalid-feedback id="last-name">
                The minimum length is 3 characters.
              </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <b-input
                v-model="form.dotId"
                type="text"
                class="lt-input border border-color"
                placeholder="US DOT Number"
              />
            </div>
            <div class="form-group">
              <b-input
                v-model="$v.form.companyName.$model"
                type="text"
                class="lt-input border border-color"
                placeholder="Company Name"
                aria-describedby="company-name"
                :state="validateState('companyName')"
              />
              <b-form-invalid-feedback id="company-name">
                This field is required.
              </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <b-input
                v-model="$v.form.email.$model"
                type="text"
                class="lt-input border border-color"
                placeholder="Email"
                :state="validateState('email')"
                aria-describedby="email"
              />
              <b-form-invalid-feedback id="email">
                This field must to be valid email.
              </b-form-invalid-feedback>
            </div>

            <div class="form-group">
              <b-input
                v-model="$v.form.password.$model"
                type="password"
                class="lt-input border border-color"
                placeholder="Password"
                :state="checkPassword()"
                aria-describedby="input-password"
              />
              <b-form-invalid-feedback id="input-password">
                {{ passwordError }}
              </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <b-input
                v-model="$v.form.confirmpassword.$model"
                type="password"
                class="lt-input border border-color"
                placeholder="Confirm Password"
                :state="checkPassword()"
              ></b-input>
              <b-form-invalid-feedback id="input-confirmpassword">
                {{ passwordConfirmError }}
              </b-form-invalid-feedback>
            </div>
            <ul>
              <li v-bind:class="{ is_valid: contains_eight_characters }">6 Characters At Least</li>
              <li v-bind:class="{ is_valid: contains_number }">Contains 1 Number At Least</li>
              <li v-bind:class="{ is_valid: contains_uppercase }">Contains 1 Uppercase At Least</li>
              <li v-bind:class="{ is_valid: contains_special_character }">Contains 1 Special Character At Least</li>
            </ul>
            <div class="row">
              <div class="d-flex col-lg-12 d-flex justify-content-center">
                <button
                  type="submit"
                  class="lt-button lt-button-main go-button float-right"
                >Get Started</button>
              </div>
            </div>
            <div class="pt-4 save-hover">
            <router-link :to="{ name: 'LogIn', query: this.$router.history.current.query }">
                <span>Already registered? Login</span>
              </router-link>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

export default {
  name: "SignUpView",
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      error: "",
      fullpage: true,
      showError: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        dotId: "",
        companyName: "",
      },
      passwordError: 'Password does not match',
      passwordConfirmError: 'Password does not match',
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false
    };
  },

  computed: {
    validatePassword() {
      let valid = false
      if (!this.form.password || !this.form.confirmpassword) {
        valid = false
      }
      valid = this.form.password == this.form.confirmpassword

      return valid
    },
  },

  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmpassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      companyName: {
        required,
        minLength: minLength(3)
      }
    }
  },

  mounted() {
    console.log(this.$router.history.current)
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    checkPassword() {
      if (!this.form.password || !this.form.confirmpassword ||  this.form.password != this.form.confirmpassword) {
        this.valid_password = false
        this.passwordError = this.passwordConfirmError = 'Password does not match'
        return false
      }

      this.password_length = this.form.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      
      if (this.password_length > 5) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }
      
      this.contains_number = /\d/.test(this.form.password);
      this.contains_uppercase = /[A-Z]/.test(this.form.password);
      this.contains_special_character = format.test(this.form.password);
      
      if (this.contains_eight_characters === true &&
          this.contains_special_character === true &&
          this.contains_uppercase === true &&
          this.contains_number === true) {
            this.valid_password = true;     

      } else {
        this.valid_password = false;
        this.passwordError = this.passwordConfirmError = 'Password is so weak'
      }

      return this.valid_password
    },

    required (value) {
      if (!value) {
        return false
      } 
      return true
    },

    validateName (value) {
      return value.length > 2
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async signup() {
      this.$v.form.$touch();
      console.log(this.form.$anyError)
      if (this.$v.form.$anyError || !this.valid_password) {
        return;
      }
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullpage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        color: "#5e98f9",
        width: 64,
        height: 64,
        backgroundColor: "#ffffff",
        opacity: 0.5,
        zIndex: 999
      });
      try {
        this.loading = true;
        let data;
        try {
          data = await API.post("users/register", {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            email: this.form.email,
            password: this.form.password,
            passwordConfirm: this.form.confirmpassword,
            companyName: this.form.companyName,
            dotId :this.form.dotId,
            sf: this.$router.history.current.query.sf // if the pre form is sign signature, skip sf account signup
          });
        } catch (err) {
          console.log(err);
        }

        if (data.status === "ok") {
          this.loading = false;
          localStorage.setItem("token", data.data.Tokens[0].token);
          localStorage.setItem("userId",data.data.id);
          loader.hide();
          this.$swal( "", "You are successfully Registered!", "success")
              .then((value) => {
                this.$router.push({ name: this.$router.history.current.query.next || 'AccountInfoPersonalInfo' });
              });
          document.querySelector('.swal-button--confirm').style.display = 'contents';
          setTimeout(function(){ document.querySelector('.swal-button--confirm').click(); }, 3000);
        } else if (data.status === "error") {
          this.loading = false;
          loader.hide();
          this.error = data.message;
          this.$swal("Opps!", this.error, "error");
          this.showError = true;
        }
      } catch (err) {
        console.error("catch aa ", err);
        this.error = err.message;
      } finally {
        this.loading = false;
        loader.hide();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.border-color {
  border-color: #eaebec;
}
input::-webkit-input-placeholder {
  margin-left: 10px;
  color: #b5bec7;
}
.color-fb,
.color-g {
  width: 28px;
  height: auto;
}
.color-fb path {
  fill: #3b5998;
  font-size: 18px;
}
.color-g path {
  fill: #db3236;
  font-size: 18px;
}
.welcomefont {
  font-size: 23px;
}
.sign-up-view {
  @include begin-page;
  background: url("../assets/images/bg_home.png") center center no-repeat
    transparent;

  .sign-up-form {
    @include begin-form;

    .go-button {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}

.form-control {
  padding: 0.6rem 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  border-radius: 5px;
  height: calc(1.5em + 1.25rem + 2px);
  border: 1px solid #6f6f6f;
  color: #6f6f6f;
  background-color: #f8f8f8;
}

.is_valid { 
  color: rgba(136, 152, 170, 0.8);
  text-decoration: line-through;
}

.is_valid:before { width: 100%; }

</style>
