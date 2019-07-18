<template>
  <div class="log-in-view d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <form class="login-form" @submit.prevent>
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

            <div class="form-group">
              <input
                v-model="formData.password"
                type="password"
                class="lt-input lt-input-border"
                placeholder="Password"
              >
            </div>

            <div class="d-flex align-items-center">
              <div>
                <a href="#forgot-password" class="text-reset" @click.prevent>Forgot your password?</a>
              </div>

              <div class="text-right flex-grow-1">
                <button
                  :disabled="loading"
                  type="submit"
                  @click="login"
                  class="lt-button lt-button-main go-button"
                >LOGIN</button>
                <!-- <button
                  :disabled="loading"
                  type="submit"
                  @click="logout"
                  class="lt-button lt-button-main go-button"
                >LOGOUT</button>-->
              </div>
            </div>
            <div class="row align-items-stretch sign-in-with">
              <div class="col mt-4 text-center">
                <div class="border-top  pt-2 pb-2">Sign in With</div>
                <font-awesome-icon
                  :icon="{ prefix: 'fab', iconName: 'facebook-square' }"
                  size="2x"
                  class="mr-4 color-fb"
                />
                <font-awesome-icon
                  :icon="{ prefix: 'fab', iconName: 'google' }"
                  size="2x"
                  class="color-g"
                />
              </div>
            </div>
            <div>
              <router-link  :to="{ name: 'SignUp' }">
                <span>New user? Sign up</span>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";
export default {
  name: "LogInView",
  data() {
    return {
      formData: {
        // username: '',
        email: "",
        password: ""
      },

      loading: false,
      error: "",
      formErrors: {}
    };
  },

  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("users/login", {
          email: this.formData.email,
          password: this.formData.password
        });
        console.log("data", data);

        if (data.status === "ok") {
          // console.log("data", data.data.Tokens[0].token);
          let t = data.data;
          console.log("data", data.data.id);
          localStorage.setItem("userId",data.data.id)
          localStorage.setItem("token", t);
          localStorage.setItem("viewQuote", false);
          localStorage.setItem("accBtn",true)
          this.$router.push({ name: "AccountInfo" });
        } else if (data.status === "error") {
          this.error = data.messages || data.data;
        }
      } catch (err) {
        console.error("catch", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }}
};
</script>

<style lang="scss" scoped>
.sign-in-with {
  // border-right: 1px solid black;
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
</style>
