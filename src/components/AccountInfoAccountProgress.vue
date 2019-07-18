<template>
  <div class="account-progress">
    <div class="title mb-0 font-weight-bold">Your Profile is {{ progress }}% complete.</div>
    <button
      v-if="myacchide"
      @click="myacc"
      type="submit"
      class="lt-button lt-button-main justify-content-end go-button btn-myaccount "
    >My Account</button>
    <button
      type="submit"
      @click="logout"
      class="lt-button lt-button-main go-button d-flex btn-logout justify-content-end spl-logout"
      v-if="localtoken"
    >Logout</button>
    <button
      type="submit"
      @click="login"
      class="lt-button lt-button-main  d-flex btn-logout justify-content-end spl-login go-button"
      v-if="quote"
    >Login</button>

    <div class="progress rounded-0">
      <div
        :style="{ width: `${progress}%` }"
        :aria-valuenow="progress"
        class="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";
export default {
  name: "AccountInfoAccountProgress",

  updated() {
    if (localStorage.getItem("token") == null) {
      this.quote = true;
      this.localtoken = false;
    } else {
      this.localtoken = true;
      this.quote = false;
    }
    if(localStorage.getItem("accBtn") === "true"){
      this.myacchide = true;
    }
    else{
      this.myacchide = false;
    }
    
  },
  mounted() {
    // console.log("mounted",localStorage.getItem('viewQuote'))
    // console.log("this.quote",this.quote)
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") == null
    ) {
      // alert("")
    }

    if (localStorage.getItem("token")) {
      try {
        console.log("token acc", localStorage.getItem("token"));
        this.localtoken = true;
      } catch (e) {
        console.log(e);
        localStorage.removeItem("token");
      }
    } else {
      this.quote = "true";
    }
     if(localStorage.getItem("accBtn") === "true"){
      this.myacchide = true;
    }
    else{
      this.myacchide = false;
    }
    
  },
  
  methods: {
    async logout() {
      console.log("mounted", localStorage.getItem("viewQuote"));
      console.log("this.quote", this.quote);
      if(localStorage.getItem("viewQuote") == "true"){
        this.quote = true;
      }
      else{
        this.quote = false;
      }
      
      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("users/logout");
        localStorage.removeItem("token");
        localStorage.setItem("viewQuote", true);
        console.log(data);
        if (data.status === "ok") {
          localStorage.removeItem("accBtn")
          this.quote = "true";
          this.$router.push({ name: "Home" });

          // } else if (data.status === "ERROR") {
          //   this.error = data.messages[0] || data.data;
          // }
        }
      } catch (err) {
        console.error("catch", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    login() {
      console.log("login");
      localStorage.removeItem("viewQuote");
      localStorage.setItem("accBtn",true)
      this.$router.push({ name: "LogIn" });
    },
        myacc(){
      this.$router.push({name:'QuotesAllQuotes'})
      localStorage.setItem("viewQuote",true)
      this.myacchide = false
      }
  },

  props: {
    progress: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localtoken: false,
      myacchide:true,
      quote: false
    };
  }
};
</script>

<style lang="scss" scoped>
.spl-logout {
  width: 80px;
}
.btn-myaccount{
  position: absolute;
  z-index: 99999999999;
  right: 98px;
  top: -50px;
}
.spl-login {
  // width: 80px;
  // align-items: center;
  // text-align: center;
  // display: flex;
}
.btn-logout {
  position: absolute;
  z-index: 99999999999;
  right: 9px;
  top: -50px;
}
.account-progress {
  background-color: $color_lightblue_1;

  .title {
    padding: 1rem 2.5rem;
    color: $color_darkblue;
  }

  .progress {
    height: 0.4rem;
    background-color: #cbcbcb;

    .progress-bar {
      background-color: #3fc082;
    }
  }
}
</style>
