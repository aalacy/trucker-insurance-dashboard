<template>
  <div class="log-in-view d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <form class="login-form login-new" @submit.prevent ref="formContainer">
            <div class="form-title">
              <div class="title log-in-text">Welcome back!</div>
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
              <input
                v-model="formData.email"
                type="email"
                class="lt-input lt-input-border"
                placeholder="Email"
              >
            </div>

            <div class="form-group mb-0">
              <input
                v-model="formData.password"
                type="password"
                class="lt-input lt-input-border"
                placeholder="Password"
              >
            </div>

            <div class="d-flex align-items-center">
              <div>
                <a
                  href="#forgot-password"
                  class="text-reset font-small"
                  @click.prevent="model"
                >Forgot your password?</a>
              </div>

              <div class="text-right flex-grow-1 font-small">
                <router-link :to="{ name: 'SignUp', query: this.$router.history.current.query }" @click.native="accountStatusUpdate">
                <span>New user? Sign up</span>
              </router-link>
              </div>
            </div>
            <div class="text-center mt-3">
              <button
                :disabled="loading"
                type="submit"
                @click="login"
                class="lt-button lt-button-main go-button"
              >LOGIN</button>
            </div>
            <div class="d-flex justify-content-center mt-2">
              <v-facebook-login 
                app-id="456259108336704"
                @sdk-init="handleSdkInit"
                @login="handleConnect"
                @logout="handleLogout">
              </v-facebook-login>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-2">
              <g-signin-button
                      :params="googleSignInParams"
                      @success="onGoogleSignInSuccess"
                      @error="onGoogleSignInError">
                <img src="https://developers.google.com/identity/images/g-logo.png" style="width: 24px"/>
                <div class="d-inline-block ml-3">Sign in with Google</div>
              </g-signin-button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="showmodel">
        <div id="modal-template ">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper col-12 col-sm-10 col-md-8 col-lg-5">
                <div class="modal-container bor-rad">
                  <form class="login-form" @submit.prevent>
                    <div class="form-title">
                      <div class="title log-in-text">Reset Password</div>
                      <div class="form-group cross-arrow-relative">
                        <button type="button" class="btn ico-btna btn-reset" @click="dosomething">
                          <font-awesome-icon
                            icon="times"
                            size="2x"
                            class="d-flex ml-5 cross-arrow"
                          />
                        </button>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        v-model="reset_email"
                        type="email"
                        class="lt-input lt-input-border"
                        placeholder="Email Address"
                      >
                    </div>

                    <div class="d-flex align-items-center">
                      <div class="text-right flex-grow-1">
                        <button
                          type="submit"
                          @click="forgotPassword"
                          class="lt-button lt-button-main go-button"
                        >Done</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";
import Vue from "vue";
import axios from "axios";
import { VFBLogin as VFacebookLogin, VFBLoginScope  } from 'vue-facebook-login-component'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

export default {
  name: "LogInView",
  components: {
    VFacebookLogin,
    VFBLoginScope 
  },

  data() {
    return {
      formData: {
        email: "",
        password: ""
      },
      fullpage: true,
      loading: false,
      error: "",
      reset_email: " ",
      sendStatus:"",
      showmodel: false,
      formErrors: {},
      googleSignInParams: {
        client_id: '39806248401-uhgunuto8qbiqnpbtcna8kqi1caraidc.apps.googleusercontent.com'
      },
      facebook: {
        FB: {},
        model: {},
        appId: '456259108336704'
      },
    };
  },
  mounted(){
  },

  methods: {
    accountStatusUpdate() {
      localStorage.setItem("register_status", "0");
    },

    dosomething() {
      if (this.showmodel) {
        this.showmodel = false;
      } else {
        this.showmodel = true;
      }
    },

    model() {
      this.showmodel = true;
    },

    async forgotPassword() {
      const res = await API.post("users/forgot_password", {
        email: this.reset_email
      });
      if (res.flag == "1") {
        this.$swal("Done", `If you're already registered on our site then please check your ${this.reset_email} for further details.`, "success");
      } else {
        this.$swal("Opps!", res.data.msg, "error");
      }
    },

    proceedAfterLogin(data, loader) {
      if (data.status === "ok") {
        this.loading = false;
        if (loader) {
          loader.hide();
        }
        this.$swal("Thank You!", data.message, "success")
          .then((value) => {
            this.$router.push({ name: this.$router.history.current.query.next || 'AccountInfoPersonalInfo' });
          });
        let t = data.data;
        localStorage.setItem("userId", t.id);
        localStorage.setItem("token", JSON.stringify(t));
        localStorage.setItem("showModal", false);
        document.querySelector('.swal-button--confirm').style.display = 'contents';
        setTimeout(function(){ document.querySelector('.swal-button--confirm').click(); }, 3000);
      } else if (data.status === "error") {
        this.loading = false;
        if (loader) {
          loader.hide();
        }
        this.error = data.message || data.data;
        this.$swal("Opps!", this.error, "error");
      }
    },
    async logout() {
      try {
      if (window.FB) {
        window.FB.logout();
      }

        let data = await API.post("users/logout");
        localStorage.removeItem("token");
        setTimeout(()=>{
          
        this.myacchide = false;
          // localStorage.removeItem("accBtn");
          localStorage.removeItem("token");
          localStorage.removeItem("userId")
          // localStorage.removeItem("registredUserId");
          localStorage.removeItem("redirect");
              this.$router.push({ name: "Home" });
          },500)
        } catch (err) {
          console.error("catch", err);
          this.error = err.message;
        } 
    },
    async login() {
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
      this.error = null;
      try {
        this.loading = true;
        let data = await API.post("users/login", {
          email: this.formData.email,
          password: this.formData.password,
        });
        this.proceedAfterLogin(data, loader)
      } catch (err) {
        console.error("catch", err);
        this.error = err.message;
      } finally {
        this.loading = false;
        loader.hide();
      }
    },
    async onGoogleSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      let data = await API.post("users/login/social", {
          email: profile.getEmail(),
          id: profile.getId(),
          lastName: profile.getFamilyName(),
          firstName: profile.getGivenName(),
          type: 'google'
      });
      
      this.proceedAfterLogin(data);
    },
    onGoogleSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    async getUserData() {
      const { api } = window.FB
      api('/me', { fields: 'id, email, name' }, async user => {
        let data = await API.post("users/login/social", {
            email: user.email,
            id: user.id,
            lastName: user.name.split(' ')[1],
            firstName: user.name.split(' ')[0],
            type: 'fb'
        });
        
        this.proceedAfterLogin(data);
      })
    },
    handleSdkInit({ FB }) {
      window.FB = FB
    },
    handleConnect() {
      this.getUserData()
    },
    handleLogout() {
      this.logout()
    }
  }
};
</script>

<style lang="scss" scoped>
.login-new {
  border: none;
  padding: 0px;
}
.btn-reset {
  font-size: 12px;
  position: absolute;
  right: -15px;
  top: 13px;
}
.bor-rad {
  border-radius: 20px !important;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.cross-arrow {
  text-align: right;
  position: absolute;
  /* z-index: 333px; */
  /* left: 0px; */
  right: 0;
  top: -33px;
}
.cross-arrow-relative {
  position: relative;
}
.modal-container {
  width: 360px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.font-small{
  font-size: 1rem;
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
.log-in-text {
  font-size: 1.5rem;
}
@media screen and (max-width: 1024px) {
  .dispay {
    display: block !important;
  }
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
.log-in-text {
  font-size: 1.5rem;
}
.log-in-view {
  @include begin-page;
  background: url("../assets/images/bg_home.png") center center no-repeat
    transparent;
  background-size: cover;

  .login-form {
    @include begin-form;

    .go-button {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}
@media screen and (max-width: 1024px) {
  .dispay {
    display: block !important;
  }
}
.g-signin-button:hover {
  opacity: 0.8;
}
.g-signin-button {
  display: inline-block;
  padding: 7px 24px;
  border-radius: 3px;
  background-color: #ffffff;
  border: 1px solid #cdcdcd;
  cursor: pointer;
}
</style>
