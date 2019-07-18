<template>
  <div class="sign-up-view d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <form class="sign-up-form" @submit.prevent>
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
              <input
                v-model="formData.firstName"
                type="text"
                class="lt-input border border-color"
                placeholder="First Name"
              />
            </div>

            <div class="form-group">
              <input
                v-model="formData.lastName"
                type="text"
                class="lt-input border border-color"
                placeholder="Last Name"
              />
            </div>

            <div class="form-group">
              <input
                v-model="formData.username"
                type="text"
                class="lt-input border border-color"
                placeholder="User Name"
              />
            </div>

            <div class="form-group">
              <input
                v-model="formData.email"
                type="email"
                class="lt-input border border-color"
                placeholder="Email"
              />
            </div>

            <div class="form-group">
              <input
                v-model="formData.password"
                type="password"
                class="lt-input border border-color"
                placeholder="Password"
              />
            </div>
             <div class="form-group">
              <input
                v-model="formData.confirmpassword"
                type="password"
                class="lt-input border border-color"
                placeholder="Confirm Password"
              />
            </div>
            <div class="row">
            <div class="d-flex col-lg-12 d-flex justify-content-center">
              <button type="submit" class="lt-button lt-button-main go-button float-right" @click="signup">
                Get Started
              </button>
                 <!-- <button
                  :disabled="loading"
                  type="submit"
                  @click="logout"
                  class="lt-button lt-button-main go-button"
                >LOGOUT</button> -->
            </div>
  </div>
            <div class="row align-items-stretch sign-in-with ">
              <div class="col mt-4  text-center">
                <div class="border-top pt-2 pb-2">Sign in With </div>
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook-square' }" size="2x" class="mr-4 color-fb"/>
              <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }" size="2x" class="color-g"/>
                <!-- <button
                  type="button"
                  class="lt-button lt-button-grey btn-block"
                >
                  Sign in with Google
                </button> -->
              </div>

          
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
  name: 'SignUpView',
  data() {
    return {
         loading: false,
      error: "",
      formData:{
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmpassword: ''
      }
      
    };
  },
  methods:{
    async signup(){
    try {
        let data = await API.post("users/register", { firstName:this.formData.firstName,lastName:this.formData.lastName,email:this.formData.email,password:this.formData.password,passwordConfirm:this.formData.confirmpassword});
        if (data.status === "ok") {
          console.log("data", data.status);
          this.$router.push({ name: "LogIn" });
        } else if (data.status === "error") {
          this.error = data.messages || data.data;
        }
      } catch (err) {
        console.error("catch aa ", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }

  }
}
</script>

<style lang="scss" scoped>

.border-color{
  border-color:#eaebec; 
}
input::-webkit-input-placeholder {
margin-left: 10px;
color: #b5bec7 ;
}
.color-fb ,.color-g{
  width: 28px;
  height: auto;
}
.color-fb path{
  fill: #3b5998;
   font-size: 18px;
}
.color-g path{
  fill: #db3236;
   font-size: 18px;
}
.welcomefont{
  font-size:23px;
}
.sign-up-view {
  @include begin-page;
  background: url('../assets/images/bg_home.png') center center no-repeat
    transparent;

  .sign-up-form {
    @include begin-form;

    .go-button {
      
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .sign-in-with {
     
    }
  }
}



</style>
