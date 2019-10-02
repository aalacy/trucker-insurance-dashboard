<template>
  <div id="modal-template ">
    <transition name="modal">
      <div class="modal-mask " v-if="showModal">
        <div class="modal-wrapper col-12 col-sm-10 col-md-8 col-lg-5 ">
          <div class="modal-container bor-rad"  >
               <form class="login-form" @submit.prevent>
            <div class="form-title ">
              <div class="title log-in-text ">Welcome back!</div>
              <div class="form-group cross-arrow-relative">
                      <button type="button" class="btn ico-btna" @click="dosomething">
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
                <a href="#forgot-password" class="text-reset" @click="forgotPasswordModal">Forgot your password?</a>
              </div>

              <div class="text-right flex-grow-1">
                <button
                  type="submit"
                  @click="login"
                  class="lt-button lt-button-main go-button"
                >LOGIN</button>
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
              <router-link  :to="{ name: 'SignUp' }" @click.native="accountStatusUpdate">
                <span>New user? Sign up</span>
              </router-link>
            </div>
          </form>
          </div>
        </div>
      </div>

    </transition>
    <div v-if="forgotPasswordShow">
       <div id="modal-template ">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper col-12 col-sm-10 col-md-8 col-lg-5">
                <div class="modal-container bor-rad">
                  <form class="login-form" @submit.prevent>
                    <div class="form-title">
                      <div class="title log-in-text">Reset Password</div>
                      <div class="form-group cross-arrow-relative">
                        <button type="button" class="btn ico-btna btn-reset" @click="closeForgotPasswordModal">
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
</template>

<script>
import { API } from "../api.js";
import axios from 'axios';
export default {
  name: "ModalLogin",
  // updated() {
  //   if (localStorage.getItem("showModal") == "true") {
  //     this.showmodel = true;
  //   } else {
  //     this.showmodel = false;
  //   }
  // },
  data() {
    return {
      forgotPasswordShow:false,
      reset_email:"",
      showModal: true,
      formData:{
      email:'',
      password:'',
      userID:''
      // uuid:''
    }
    };
    
  },
  created(){
        localStorage.setItem("showModal",true)
  },
  mounted(){
    // localStorage.setItem("showModal",true)

  },
  methods:{
    closeForgotPasswordModal(){
        this.forgotPasswordShow = false;    
    },
    forgotPasswordModal(){
      this.forgotPasswordShow = true;
    },
     async forgotPassword() {
       
      axios
        .post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/forgotpassword?email_id=" +
            this.reset_email
        )
        .then(res => {
          console.log("res forgot password", res);
          if (res.data.flag == "1") {
            this.$swal("Done", res.data.msg, "success");
            this.forgotPasswordShow = false;    
          } else {
            this.$swal("Opps!", res.data.msg, "error");
            this.forgotPasswordShow = true;
          }
        });
    },
    accountStatusUpdate(){
      localStorage.setItem("register_status","1");
      localStorage.setItem("showModal",false);
    },
     async login() {
     
      try {
        let data = await API.post("users/login", {
          email: this.formData.email,
          password: this.formData.password,
          // accountStatus:'1'
        });
        console.log("data", data.data.id);

        if (data.status === "ok") {
          this.$swal("Thank You!", data.message, "success");
          console.log("data2", data.status);
           let t = data.data;
           this.showModal = false;
           console.log("status",t);
            localStorage.setItem("showModal",false)
           localStorage.setItem("token", t);  
          
           localStorage.setItem("userId",data.data.id)
             this.$router.push({ name: "AccountInfoPersonalInfo" });
          //  localStorage.setItem("accountStatus",t.account_status);
          //   if(t.account_status=="0"){
          //   this.$router.push({ name: "Home" });
          // }else{
          //    this.$router.push({ name: "AccountInfoPersonalInfo" });
          // }
          
        } else if (data.status === "error") {
            this.$swal("Opps!", this.error, "error");
          this.error = data.messages || data.data;
        }
      } catch (err) {
        this.$swal("Opps!", this.error, "error");
        console.error("catch", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    dosomething(){
      if(this.showModal)
      {
        localStorage.setItem("showModal",false)
        this.showModal = false;
      }
      else{
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
.cross-arrow{
      text-align: right;
    position: absolute;
    /* z-index: 333px; */
    /* left: 0px; */
    right: 0;
    top: -33px;
}
.cross-arrow-relative{
  position:relative;
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

