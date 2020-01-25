<template>
  <div id="app">
    <nav class="app-navbar navbar navbar-expand-lg navbar-light bg-white py-0 px-4">
      <router-link :to="{ name: 'Home' }" class="navbar-brand font-weight-bold lt-link" > 
        <img src="./assets/images/logo.svg" alt="logo" height="46px" width="269px">
      </router-link>
   <span class="text-right-a">For assistance, please call us at <a href="tel:15135062400 " style="color:#007bff; font-weight:bold; white-space:nowrap;">1-513-506-2400</a></span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" class="ml-auto collapse navbar-collapse">
        <div class="mr-auto"></div>

        <div class="d-flex align-items-center justify-content-end">
         
          <ul class="navbar-nav">
            <li class="nav-item">
              <div v-if="show">
                <div v-if="msg">
                  <router-link
                    :to="{ name: 'AccountInfoUploadDocuments' }"
                    class="btn btn-primary "
                    active-class="font-weight-bold"
                    @click.native="savequote"
                  >View Quotes</router-link>
                </div>
                <div v-else>
                  <router-link
                    :to="{ name: 'AccountInfo' }"
                    class="btn btn-primary "
                    active-class="font-weight-bold"
                    @click.native="savequote"
                  >View Quotes</router-link>
                </div>
              </div>
              <div v-else>
                <div v-if="myacchide">
                  <router-link
                    :to="{ name: '' }"
                    @click.native="myacc"
                    active-class="font-weight-bold"
                    class="btn btn-primary "
                  >My Account</router-link>
                </div>
                <!-- <div v-else> -->

                <!-- </div> -->
              </div>
            </li>
            <!-- <li class="nav-item">
              <span class="mx-3"> </span>
            </li> -->
            <div v-if="quote">
              <li class="nav-item">
                <router-link
                  @click.native="loginHide"
                  :to="{ name: 'LogIn', query: {next: this.$router.history.current.name == 'LogIn' ?  this.$router.history.current.query.next : this.$router.history.current.name} }"
                  class="btn btn-primary "
                  active-class="font-weight-bold"
                >Login</router-link>
              </li>
            </div>
            <div v-else>
              <li class="nav-item">
                <router-link
                  :to="{ name:'' }"
                  class="btn btn-primary "
                  @click.native="logoutPopUp"
                  active-class="font-weight-bold"
                >Logout</router-link>
              </li>
            </div>
            <div v-if="quote">
              <li class="nav-item">
                <router-link
                  @click.native="loginHide"
                  :to="{ name: 'SignUp', query: {next: this.$router.history.current.name == 'SignUp' ?  this.$router.history.current.query.next : this.$router.history.current.name} }"
                  class="btn btn-primary "
                  active-class="font-weight-bold"
                >Signup</router-link>
              </li>
            </div>
          </ul>
        </div>
       
      </div>
      
    </nav>

    <main class="app-main">
      <router-view/>
    </main>
    <footer class="app-footer lt-fixed px-4 flex-column">
      <div class="d-flex flex-row width-100">
        <form class="form-footer">
          <div class="form-group row d-flex flex-column align-items-center">
            <img
              src="./assets/images/loading/loading_truck_128.gif"
              class="d-block mx-auto rounded mb-3"
              alt="Loading"
              style="width: 100px; height: auto"
            >
            <h2 class="col-sm-12 col-lg-8 col-md-12 col-12 text-center text-white font-weight-bold mb-4">Subscribe to the Newsletter:</h2>
            <div class="col-sm-12 col-lg-8 col-md-12 col-12 position-relative">
              <input
                id="inputEmail"
                type="email"
                class="footer-input my-footer"
                placeholder="Enter Email Address"
              >
              <button type="submit" class="text-light bg-primary subscribea subscribe">Subscribe</button>
            </div>
          </div>
        </form>
      </div>
      <div class="container">
        <div class="d-flex flex-column flex-mob bottom-section">
          <div class="footer-contacts d-flex justify-content-center text-center">
            <ul>
                <li>
                    <a href="mailto:support@luckytruck.co">support@luckytruck.co</a>
                </li>
                <li>
                    <a href="tel:15135062400">1-513-506-2400</a>
                </li>
                <li>
                  8am-8pm ET
                </li>
                <li>
                  LuckyTruck, Inc.
                </li>

                <!-- social networks -->
                <li class="footer-social-networks">
                    <span>
                        <a href="#" target="_blank">
                           <font-awesome-icon :icon="['fab', 'twitter']" />
                        </a>
                    </span>
                    <span>
                        <a href="#" target="_blank">
                             <font-awesome-icon :icon="['fab', 'linkedin-in']"  />
                        </a>
                    </span>
                    <span>
                        <a href="#" target="_blank">
                             <font-awesome-icon :icon="['fab', 'facebook-f']"  />
                        </a>
                    </span>
                </li>
            </ul>
        </div>
        <div class="bottom-company">
          <div class="px-3 py-1">&copy;2020 LuckyTruck, Inc.</div>
          <div class="lists">
            <div class="px-3 py-1">
              <router-link
                  @click.native="loginHide"
                  :to="{ name: 'LogIn', query: {next: this.$router.history.current.name == 'LogIn' ?  this.$router.history.current.query.next : this.$router.history.current.name} }"
                  class="text-white"
                  active-class="font-weight-bold"
                >Login</router-link>
            </div>
            <div class="px-3 py-1">
              <router-link
                  @click.native="loginHide"
                  :to="{ name: 'SignUp', query: {next: this.$router.history.current.name == 'SignUp' ?  this.$router.history.current.query.next : this.$router.history.current.name} }"
                  class="text-white"
                >Signup</router-link>
            </div>
            <div class="px-3 py-1">
              <a
                class="text-white"
                href="https://luckytruck.co/backend/PRIVACY_POLICY_FOR_LuckyTruck.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >PRIVACY POLICY</a>
            </div>

            <div class="px-3 py-1">
              <a
                class="text-white"
                href="https://luckytruck.co/backend/TERMS_OF_SERVICE_FOR_LuckyTruck.co.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >TERMS OF USE</a>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="d-flex"></div>
    </footer>
   
  </div>
</template>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144855806-1"></script>
<script>
import { setTimeout } from "timers";

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-144855806-1");
</script>

<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-144855806-1");
</script>

<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-144855806-1");
</script>

<script>
import { isMobile } from "mobile-device-detect";
import { mapState,mutations } from "vuex";
import { API } from "./api.js";

export default {
  name: "App",
  updated() {
    if (localStorage.getItem("token"))
     {
        this.quote = false;
        this.myacchide = true;
        // this.show = true;
        // localStorage.removeItem("token");
      }
    else {
      this.quote =true;
      this.myacchide = false;
    }
  },
  
  mounted() {
    this.$intercom.boot({
      user_id: this.userId,
      name: this.name,
      email: this.email,
    });
  if(localStorage.getItem("token")){
     this.show=true;
   }else{
     this.quote=false;
     this.show=false;
   }
    
    this.msg = isMobile ? true : false;
  },
    
  data() {
    return {
       localtoken: false,
      myacchide:false,
      quote: true,
      msg: false,
      show: false,
      extraquote:false,
    };
  },
  components: {
  },
  methods: {
    loginHide()
    {
      // setTimeout(()=>{
        this.show=false;
        
      // },500)
      
      // this.quote = false;
    },
    myacc(){
      // localStorage.setItem("accBtn",true)
      this.myacchide = false;
      this.show = true;
      this.$router.push({name:'QuotesAllQuotes'})
      // localStorage.setItem("",true)
     
      },
    async logout(){
      this.loading = true;
      this.error = null;
      try {
        if (window.FB) {
          window.FB.logout();
        }
     
        let data = await API.post("users/logout");
        localStorage.removeItem("token");
        // localStorage.setItem("", true);
        
        if (data.status === "ok") {
            
          this.quote = false;
          this.show=false;
          setTimeout(()=>{
          
          
          this.myacchide = false;
          // localStorage.removeItem("accBtn");
          localStorage.removeItem("token");
          localStorage.removeItem("userId")
          // localStorage.removeItem("registredUserId");
          localStorage.removeItem("redirect");
              this.$router.push({ name: "Home" });
          },500)
            
        }
      } catch (err) {
        console.error("catch", err);
        this.error = err.message;
      } finally {
        // this.quote = false;
        // this.show=false;
        // this.loading = false;
        // this.myacchide = false;
      }
},

    logoutPopUp() {
        swal({
        title: "Are you sure?",
        text: "Do you want to logout?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
        
      
        // this.show();
        if (willDelete) {
        this.logout();    
          // this.$router.push({ name: "AccountInfoBusinessStructure" });
        } else {
          
          // swal(
          //   "Thank You!",
          //   "Your changes has been accepted! You will get new Updated Quote",
          //   {
          //     icon: "success"
          //   }
          // );
        }
      });
    },

    savequote() {
      if (localStorage.getItem("token"))
     {
        this.myacchide = true;
      }

    else {
      this.myacchide =false;
    }
  
      // localStorage.setItem("accBtn",false)
      this.show = false;
      localStorage.setItem("Phone","");
      localStorage.setItem("Physical address","");
      localStorage.setItem("Mailing address","");
      localStorage.setItem("company","");
      localStorage.setItem("usdot","");
    },
    // accountBtn(){
     
    // }
  },

  computed: {
    showSignLinks() {
      let isAuth = false; // TODO

      if (isAuth) {
        return false;
      }

      let isAccountInfo =
        this.$route.path && this.$route.path.indexOf("/account-info") === 0;
        localStorage.setItem("isAccountInfo",isAccountInfo)
      return !isAccountInfo;
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "./assets/scss/main.scss";


.text-right-a{
        /* color: black; */
    font-size: 16px;
    font-weight: bold;
    width: 60%;
    text-align: center;
    /* position: absolute; */
    /* z-index: 111; */

}
.viewquote{
  padding-bottom: 10px;
  white-space: nowrap;
  margin-left: 10px;
  padding-top: 9px;
}
.v-facebook-login span {
  color: white !important;
}
</style>

