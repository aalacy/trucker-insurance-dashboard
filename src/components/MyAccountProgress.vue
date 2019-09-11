<template>
  <div class></div>
</template>

<script>
import { API } from "../api.js";
export default {
  name: "MyAccountProgress",

  updated() {
    if (localStorage.getItem("token") == null) {
      this.quote = true;
      this.localtoken = false;
    } else {
      this.localtoken = true;
      this.quote = false;
    }
  },
  mounted() {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") == null
    ) {
      // alert("")
    }

    if (localStorage.getItem("token")) {
      try {
        this.localtoken = true;
      } catch (e) {
        console.log(e);
        localStorage.removeItem("token");
      }
    } else {
      this.quote = "true";
    }
    // if(localStorage.getItem("isAccountInfo") == "true")
    // {
    //   this.loginHide = true;
    // }else{
    //   this.loginHide = false;
    // }
  },

  methods: {
    async logout() {
      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("users/logout");
        localStorage.removeItem("token");
        // localStorage.setItem("viewQuote", true);
        console.log(data);
        if (data.status === "ok") {
          localStorage.removeItem("accBtn");
          localStorage.removeItem("uuid");
          localStorage.removeItem("redirect");
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
      // localStorage.removeItem("viewQuote");
      this.$router.push({ name: "LogIn" });
    },
    myacc() {
      this.$router.push({ name: "QuotesAllQuotes" });
      this.myacchide = false;
    }
  },

  data() {
    return {
      localtoken: false,
      // myacchide:true,
      quote: false
      // loginHide:false
    };
  }
};
</script>

<style lang="scss" scoped>
.spl-logout {
  // width: 80px;
}
.btn-myaccount {
  position: absolute;
  z-index: 99999999999;
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
