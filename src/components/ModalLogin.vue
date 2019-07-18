<template>
  <div id="modal-template ">
    <transition name="modal">
      <div class="modal-mask " v-if="showModal">
        <div class="modal-wrapper col-12 col-sm-10 col-md-8 col-lg-5 ">
          <div class="modal-container bor-rad"  >
               <form class="login-form" @submit.prevent>
            <div class="form-title row">
              <div class="title log-in-text ">Welcome back!</div>
              <div class="form-group">
                      <button type="button" class="btn ico-btna" @click="dosomething">
                     <font-awesome-icon
                        icon="times"
                        size="2x"
                       class="d-flex ml-5"
                      />
                      </button>
                <!-- <router-link
                 @click.native="dosomething"
                 to="/"
                  tag="button"
                  type="button"
                  class="lt-button lt-button-close pl-5"
                /> -->
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
    </transition>
    <div id="app">
      <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
      <!-- use the modal component, pass in the prop -->
      <!-- <modal v-if="showModal" @close="showModal = false"> -->
        <!--
      you can use custom content here to overwrite
      default content
        -->
      <!-- </modal> -->
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";

export default {
  name: "ModalLogin",
  data() {
    return {
      
      showModal: true,
      formData:{
      email:'',
      password:'',
      userID:''
      // uuid:''
    }
    };
    
  },
  mounted(){
    localStorage.setItem("showModal",true)
    // this.uuid = localStorage.getItem("uuid")
    // console.log("uuid login",this.uuid)
  },
  methods:{
     async login() {
     
      try {
        let data = await API.post("users/login", {
          email: this.formData.email,
          password: this.formData.password,
        });
        console.log("data", data.data.id);

        if (data.status === "ok") {
          console.log("data2", data.status);
           let t = data.data;
           localStorage.setItem("token", t);
           localStorage.setItem("accBtn",true);
           localStorage.setItem("userId",data.data.id)
           localStorage.setItem("viewQuote", false);
           localStorage.setItem("showModal",false)
          this.$router.push({ name: "AccountInfoPersonalInfo" });
        } else if (data.status === "error") {
          this.error = data.messages || data.data;
        }
      } catch (err) {
        console.error("catch", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    dosomething(){
      if(this.showModal)
      {
        // console.log("modal if1",this.showModal)
        localStorage.setItem("showModal",false)
        // console.log("modal local set",localStorage.getItem("showModal"))
        this.showModal = false;
        // console.log("modal if2",this.showModal)
      }
      else{
        // localStorage.setItem("showModal",true)
        console.log("modal else",this.showModal)
        this.showModal = true;
      }
    }
  }

  
};
</script>


<style>
.bor-rad{
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

.modal-container {
  width: 300px;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
</style>

