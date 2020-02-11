<template>
  <div class="account-progress">
    <div class="font-weight-bold ">
      <span class="text-a-mob">For assistance, please call us at <a href="tel:15135062400" style="font-weight:bold;white-space:nowrap;">1-513-506-2400</a></span>
      <div class="d-flex align-items-center">
        <div class="title mb-0 flex-fill">Your Profile is {{ progress }}% complete.</div>
        <div class="title mr-2" v-if="US_DOT_or_company_name">{{ US_DOT_or_company_name }}</div>
      </div>
    <div v-if="count" class="d-flex">
      
      <div class="title d-flex justify-content-end" v-if="status">Status:  Completed!</div>
    </div>
    </div>
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
import axios from "axios";
import { setTimeout } from "timers";
export default {
  name: "AccountInfoAccountProgress",

  updated() {
    console.log('===== updated =======');
    if (localStorage.getItem("token") == null) {
      this.quote = true;
      this.localtoken = false;
    } else {
      this.localtoken = true;
      this.quote = false;
    }
    
  },
  mounted() {
    const usdot = localStorage.getItem('usdot');
    if (usdot) {
      this.US_DOT_or_company_name = usdot
    } else {
      this.US_DOT_or_company_name = localStorage.getItem('company');
    }
    if (localStorage.getItem("token")) {
      this.count = true;
     
      if(this.progress >= 100){
        this.status = true;
      }else{
        this.status = false;
      }
    }else{
      this.count = false;
    }
  },

  methods: {
    downloadPDF() {
      if(this.progress >= 100){
          window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf`);
      }else{
           swal(
            "Sorry",
            "You need to complete 10 steps process first",
            {
              icon: "warning"
            }
          );
      }
      
    },
    login() {
      
      // localStorage.setItem("accBtn", true);
      this.$router.push({ name: "LogIn" });
    },
    myacc() {
      this.$router.push({ name: "QuotesAllQuotes" });
      this.myacchide = false;
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
      status:false,
      count: false,
      localtoken: false,
      myacchide: true,
      quote: false,
      US_DOT_or_company_name: ''
    };
  }
};
</script>

<style lang="scss" scoped>

.btn-myaccount {
  position: absolute;
  z-index: 99999999999;
  right: 98px;
  top: -50px;
}
.btn-logout {
  position: absolute;
  z-index: 99999999999;
  right: 9px;
  top: -50px;
}
.btn-viewPDF {
  position: absolute;
  right: 0px;
  // top:-3px;
  margin: 10px;

  // left: 4px;
}
.account-progress {
  background-color: $color_lightblue_1;

  .title {
    padding: .55rem;
    color: $color_darkblue;
  }

  .progress {
    height: 0.2rem;
    background-color: #393e46;

    .progress-bar {
      background-color: #3dc081;
    }
  }
}
</style>
