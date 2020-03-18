<template>
  <div class="sign-up-view d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <b-form class="sign-up-form" @submit.prevent="signup">
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
                v-model="formData.firstName"
                type="text"
                class="lt-input border border-color"
                placeholder="First Name"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="formData.lastName"
                type="text"
                class="lt-input border border-color"
                placeholder="Last Name"
                required
              >
            </div>
            <div class="form-group">
              <input
                v-model="formData.dotId"
                type="text"
                class="lt-input border border-color"
                placeholder="US DOT Number"
              >
            </div>
            <div class="form-group">
              <input
                v-model="formData.companyName"
                type="text"
                class="lt-input border border-color"
                placeholder="Company Name"
                required
              >
            </div>
            <div class="form-group">
              <input
                v-model="formData.email"
                type="text"
                class="lt-input border border-color"
                placeholder="Email"
                required
              >
            </div>

            <div class="form-group">
              <input
                v-model="formData.password"
                type="password"
                class="lt-input border border-color"
                placeholder="Password"
                :state="validatePassword"
              >
            </div>
            <div class="form-group">
              <b-input
                v-model="formData.confirmpassword"
                type="password"
                class="lt-input border border-color"
                placeholder="Confirm Password"
                :state="validatePassword"
              ></b-input>
              <b-form-invalid-feedback :state="validatePassword">
                Password does not match.
              </b-form-invalid-feedback>
            </div>
            <div class="row">
              <div class="d-flex col-lg-12 d-flex justify-content-center">
                <button
                  type="submit"
                  class="lt-button lt-button-main go-button float-right"
                >Get Started</button>
              </div>
            </div>
            <div class="pt-4 save-hover">
            <router-link :to="{ name: 'LogIn' }">
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
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
Vue.use(Loading);

export default {
  name: "SignUpView",
  data() {
    return {
      loading: false,
      error: "",
      fullpage: true,
      showError: false,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        dotId: "",
        companyName: "",
      }
    };
  },

  computed: {
    validatePassword() {
      if (!this.formData.password || !this.formData.confirmpassword) {
        return false
      }
      return this.formData.password == this.formData.confirmpassword
    }
  },

  mounted() {
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async signup() {
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
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            password: this.formData.password,
            passwordConfirm: this.formData.confirmpassword,
            companyName: this.formData.companyName,
            dotId :this.formData.dotId
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
</style>
