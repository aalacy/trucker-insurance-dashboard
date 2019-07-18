<template>
  <div id="app">
    <nav class="app-navbar navbar navbar-expand-lg navbar-light bg-white py-0 px-4">
      <router-link :to="{ name: 'Home' }" class="navbar-brand font-weight-bold lt-link">
        <img src="./assets/images/logo.png">
      </router-link>

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

      <div
        v-if="showSignLinks"
        id="navbarSupportedContent"
        class="ml-auto collapse navbar-collapse"
      >
        <div class="mr-auto"></div>

        <div class="d-flex align-items-center justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">

              <div v-if="msg">
                <router-link
                  :to="{ name: 'AccountInfoUploadDocuments' }"
                  class="lt-button lt-button-main viewquote"
                  active-class="font-weight-bold"
                  @click.native="savequote"
                >View Quotes</router-link>
              </div>
              <div v-else>
                <router-link
                  :to="{ name: 'AccountInfo' }"
                  class="lt-button lt-button-main viewquote"
                  active-class="font-weight-bold"
                  @click.native="savequote"
                >View Quotes</router-link>
              </div>
            </li>
            <li class="nav-item">
              <span class="mx-3">|</span>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'LogIn' }"
                class="lt-link"
                active-class="font-weight-bold"
              >Login</router-link>
            </li>
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
          <div class="form-group row d-flex align-items-center">
            <div class="col-sm-4 flex-mob-a">Subscribe to the Newsletter:</div>
            <div class="col-sm-8 position-relative">
              <input
                id="inputEmail"
                type="email"
                class="footer-input my-footer"
                placeholder="Enter Email Address"
              >
              <button type="submit" class="text-light bg-primary subscribe">Subscribe</button>
            </div>
          </div>
        </form>
      </div>

      <div class="d-flex"></div>

      <div class="d-flex flex-mob">
        <div class="px-3 py-1">&copy;2019 LuckTruck LLC. All rights Reserved</div>

        <div class="px-3 py-1">
          <a
            href="./PRIVACY_POLICY_FOR_LuckyTruck.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >PRIVACY POLICY</a>
        </div>

        <div class="px-3 py-1">
          <a
            href="./TERMS_OF_SERVICE_FOR_LuckyTruckers.com.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >TERMS OF USE</a>
        </div>
      </div>
      <chat-boat/>
    </footer>
  </div>
</template>

<script>
import ChatBoat from "./components/ChatBoat.vue";
import { isMobile } from "mobile-device-detect";
export default {
  name: "App",
  beforeMount(){
localStorage.removeItem("Phone");
      localStorage.removeItem("Physical address");
      localStorage.removeItem("Mailing address");
      localStorage.removeItem("company");
      localStorage.removeItem("usdot");
  },
  mounted() {
    this.msg = isMobile ? true : false;
    console.log("isMobile", this.msg);
  },
  data() {
    return {
      msg: false,
      show: true
    };
  },
  components: {
    "chat-boat": ChatBoat
  },
  methods: {
    savequote() {
      // console.log("hi");
      localStorage.setItem("viewQuote", false);
      localStorage.setItem("accBtn",false)
      this.show = false;
      localStorage.removeItem("Phone");
      localStorage.removeItem("Physical address");
      localStorage.removeItem("Mailing address");
      localStorage.removeItem("company");
      localStorage.removeItem("usdot");
    },
    // accountBtn(){
    //   localStorage.setItem("accBtn",true)
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

.viewquote {
  padding-bottom: 10px;
  padding-top: 9px;
}
</style>
