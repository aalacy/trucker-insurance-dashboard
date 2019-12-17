<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Review Policies</h4>

        <div v-if="loading">Loading...</div>
        <div v-if="status">
          <div v-for="item in quotes" :key="item.id" class="mb-2 d-flex">
            <div class="policy-image-wrapper px-1">
              <img :src="item.img" alt class="policy-image">
            </div>

            <div class="policy-info px-3 pt-2">
              <div class="policy-title">{{ item.title }}</div>

              <!-- <div class="policy-subtitle">{{ item.policyType }}</div> -->

              <div class="policy-subtitle">
                Effective Date:
                <strong>{{ item.effectiveDate }}</strong>
              </div>
              <div class="policy-subtitle">
                Policy:
                <!-- <strong>{{ item.document }}</strong> -->
                <a @click="openInNewWindow">
                  <strong class="clr">{{ item.document }}</strong>
                </a>
              </div>

              <div class="policy-subtitle">
                Mo/Yr Premium:
                <strong>$ {{ item.premium }}</strong>
              </div>

              <!-- <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="requestCertificate"
              >Request a Certificate</button>-->

              <!-- <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="requestAutoCertificate"
              >Request Automated Certificate</button>
              </div>-->

              <!-- <div class="d-flex small">
              <div class="px-2">
                <a href="#" @click.prevent>View Details</a>
              </div>

              <div class="px-2">
                <a href="#" @click.prevent>View Change History</a>
              </div>
              </div>-->
            </div>
          </div>

          <div class="mt-3">
            <router-link
              :to="{ name: '' }"
              class="lt-button pad-10 mr-2 lt-button-main viewquote mb-1 white-space d-block text-center"
              active-class="font-weight-bold"
              @click.native="requestCertificate"
            >Request Manual Certificate</router-link>
            <span class="d-block text-center">OR</span>

            <router-link
              :to="{ name: '' }"
              class="lt-button pad-10 lt-button-main viewquote mb-1 white-space d-block text-center"
              active-class="font-weight-bold"
              @click.native="requestAutoCertificate"
            >Generate Automated Certificate</router-link>
          </div>
          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <div v-else>
          <span>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a href="tel:15135062400" style="font-weight:bold; white-space:nowrap;">1-513-506-2400</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "PoliciesReview",
  filters: {
    // date(date) {
    //   return moment(date).format("MMM, DD, YYYY");
    // },
    // premium(num) {
    //   // 12345.67 -> 12,345.67
    //   return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    // }
  },

  data() {
    return {
      quotes: [
        {
          id: 1,
          title: "ForAgentsOnly",
          policyType: "Policy Type",
          img: "https://picsum.photos/200",
          effectiveDate: "",
          premium: "",
          document: "",
          document_file: ""
        }
      ],
      status: false,
      loading: false,
      error: null,
      policyId: ""
    };
  },

  methods: {
    openInNewWindow() {
      window.open(this.quotes[0].document_file);
    },
    requestCertificate() {
      axios
        .post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/requestforcertificate?policy_id=" +
            this.policyId +
            "&certificate_status=1"
        )
        .then(res => {
          if (res.status == 200) {
            //  this.$swal("Thank You!", "You will get our agent call in next 24 hours!", "success").then(()=>this.$route.push({name:"AccountInfo"}))
            localStorage.setItem("policyId", this.policyId);

            swal({
              title: "Thank You!",
              text: "Your request has been accepted",
              icon: "success",
              buttons: ["No", "Yes"]
            }).then(willDelete => {
              console.log("willbe", willDelete);
              if (willDelete) {
                this.$router.push({ name: "Certificates" });
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
          } else if (res.status != 200)
            this.$swal("Opps!", res.data.msg, "error");
        })
        .catch(err => this.$swal("Opps!", err, "error"))
        .finally(() => console.log("hiiiiiiii"));
    },
    requestAutoCertificate() {
      axios
        .post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/requestforcertificate?policy_id=" +
            this.policyId +
            "&certificate_status=2"
        )
        .then(res => {
          if (res.status == 200) {
            //  this.$swal("Thank You!", "You will get our agent call in next 24 hours!", "success").then(()=>this.$route.push({name:"AccountInfo"}))
            localStorage.setItem("policyId", this.policyId);
            setTimeout(() => {
              axios
                .get(
                  "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getpolicycertificate?policy_id=" +
                    this.policyId
                )
                .then(res => {
                  // console.log("res", res.data);
                  console.log("res.data.document_file", res.data.document_file);
                  window.open(res.data.certificate_file);
                });
            }, 700);

            // swal({
            //   title: "Thank You!",
            //   text: "Your request has been accepted",
            //   icon: "success",
            //   buttons: ["No", "Yes"]
            // }).then(willDelete => {
            //   console.log("willbe", willDelete);
            //   if (willDelete) {
            //     this.$router.push({ name: "Certificates" });
            //   } else {
            //   }
            // });
          } else if (res.status != 200) {
            // this.$swal("Opps!", res.data.msg, "error");
          }
        })
        .catch(err => this.$swal("Opps!", err, "error"))
        .finally(() => console.log("hiiiiiiii"));
    }
  },
  mounted() {
    // console.log("localStorage.getItem(quotation_id)",localStorage.getItem("quotation_id"));

    // setTimeout(() => {
      axios
        .get(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getcountofcompanybyuserid?user_id=" +
            localStorage.getItem("userId")
        )
        .then(res => {
          console.log("res", res.data.count);
          // this.count = res.data.count;
          if (res.data.count >= 10) {
            this.status = true;
          } else {
            this.status = false;
          }
        });
    // }, 500);


  // if(this.status){
    axios
      .get(
        "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getpolicydocument?quotation_id=" +
          localStorage.getItem("quotation_id")
      )
      .then(res => {
        console.log("res", res.data);
        this.quotes[0].effectiveDate = res.data.effective_date;
        this.quotes[0].premium = res.data.premium;
        this.quotes[0].document = res.data.document_file.split("/")[6];
        this.quotes[0].document_file = res.data.document_file;
        this.policyId = res.data.id;
      });
  // }
    
  },
  created() {
    this.$emit("update-hint", " ");
  }
};
</script>

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }
.white-space {
  white-space: nowrap;
}
.policies-review {
  .policy-image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .policy-image {
      border-radius: 15px;
    }
  }

  .policy-info {
    .policy-title {
      font-size: 1.3rem;
    }

    .policy-subtitle {
      font-size: 0.8rem;
    }
    .clr {
      color: #007bff;
      cursor: pointer;
    }
  }
}
</style>

