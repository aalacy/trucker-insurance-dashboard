<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Certificates</h4>

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
                Certificate:
                <!-- <strong>{{ item.document }}</strong> -->
                <a @click="openInNewWindow">
                  <strong class="clr">{{ item.document_file }}</strong>
                </a>
              </div>

              <div class="policy-subtitle">
                Mo/Yr Premium:
                <strong>$ {{ item.premium }}</strong>
              </div>

              <!-- <div class="py-2">
              <button type="button" class="btn btn-sm btn-primary" @click="requestCertificate">Request a Certificate</button>
              </div>-->

              <!-- <div class="d-flex small">
              <div class="px-2">
                <a href="#" @click.prevent>View Details</a>
              </div>

              <div class="px-2">
                <a href="#" @click.prevent>View Change History</a>
              </div>-->
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div v-else>
          <span>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a
              href="tel:16469330419"
              style="font-weight:bold; white-space:nowrap;"
            >1-646-933-0419</a>
          </span>
        </div>

        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "CertificatesPast",
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
      loading: false,
      error: null,
      policyId: "",
      status: false
    };
  },
  methods: {
    openInNewWindow() {
      window.open(this.quotes[0].document);
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

    // if (this.status) {
      axios
        .get(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getpolicycertificate?policy_id=" +
            localStorage.getItem("policyId")
        )
        .then(res => {
          console.log("res", res.data);
          this.quotes[0].effectiveDate = res.data.effective_date;
          this.quotes[0].premium = res.data.premium;
          // this.quotes[0].document = res.data.certificate_file;
          this.quotes[0].document_file = res.data.document_file;
          // this.policyId = res.data.id;
        });
    // }
  },
  created() {
    this.$emit("update-hint", " ");
  }
};
</script>

<style lang="scss" scoped>
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