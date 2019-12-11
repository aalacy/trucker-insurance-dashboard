<template>
  <div class="account-progress">
    <div class="font-weight-bold ">
        <span class="text-a-mob">For assistance, please call us at <a href="tel:16469330419" style="font-weight:bold;white-space:nowrap;">1-646-933-0419</a></span>
       <!-- <div class="d-flex"> -->
      <div class="title mb-0">Your Profile is {{ progress }}% complete.</div>
      
    <div v-if="count" class="d-flex">
      
      <div class="title d-flex justify-content-end" v-if="status">Status:  Completed!</div>
      <div class="title d-flex justify-content-end" v-else>Status:  Started</div>

      <button
        type="submit"
        class="lt-button lt-button-main justify-content-end go-button btn-viewPDF"
        @click="downloadPDF"
      >Download PDF</button>
    </div>
<!-- </div> -->
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
    if (localStorage.getItem("token") == null) {
      this.quote = true;
      this.localtoken = false;
    } else {
      this.localtoken = true;
      this.quote = false;
    }
    
  },
  mounted() {
  
    if (localStorage.getItem("token")) {
      this.count = true;
      // setTimeout(() => {
      //   axios
      //     .get(
      //       "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getcountofcompanybyuserid?user_id=" +
      //         localStorage.getItem("userId")
      //     )
      //     .then(res => {
            
      //       // this.count = res.data.count;
      //       if(res.data.count>=10){
      //         this.status = true;
      //       }else{
      //         this.status = false;
      //       }
      //     });
      // }, 500);
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
      if(this.status){
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
      quote: false
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
    padding: 1rem ;
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
