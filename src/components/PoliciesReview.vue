<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Review Policies</h4>

        <div v-if="loading" class="col-12">
          <img
              src="../assets/images/loading/loading_truck_128.gif"
              class="d-block mx-auto rounded"
              alt="Loading"
            >
        </div>
        <div v-if="status">
          <div v-for="item in policies" :key="item.id" class="block-divider d-flex">
            <div class="policy-image-wrapper px-1">
              <img :src="item.img" alt class="policy-image">
            </div>

            <div class="policy-info px-3">
              <div class="block-title">{{ item.title }}</div>

              <!-- <div class="policy-subtitle">{{ item.policyType }}</div> -->
              <div class="block-subtitle">
                Policy Type:
                <strong >{{ item.policyType }}</strong>
              </div>

              <div class="block-subtitle">
                Effective Date:
                <strong>{{ item.effectiveDate }}</strong>
              </div>

              <div class="block-subtitle">
                Current Premium:
                <strong>{{ item.premium }}</strong>
              </div>

               <button
                type="button"
                class="lt-button lt-button-main mt-3 mb-3"
                @click="requestCertificate"
              >Request a Certificate</button>

              <div class="d-flex small">
                <div class="px-2">
                  <a href="#" class="underline-link" @click.prevent>View Details</a>
                </div>

                <div class="px-2">
                  <a href="#" class="underline-link" @click.prevent>View Change History</a>
                </div>
              </div>
            </div>
          </div>

         <!--  <div class="mt-3">
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
          </div> -->
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
    <b-modal id="inputModal" title="Information">
      <form>
        <b-form-group
          id="name"
          label="Enter a name"
          label-for="input-name"
        >
          <b-form-input id="input-name" v-model="name"  trim></b-form-input>
        </b-form-group>
        <b-form-group
          id="addr"
          label="Enter a address"
          label-for="input-addr"
        >
          <b-form-input id="input-addr" v-model="address" trim></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { API } from "../api.js";
import { setTimeout } from "timers";
import InputComponent from './InputComponent'

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
      policies: [
        
      ],
      status: true,
      loading: true,
      error: null,
      policyId: "",
      name: '',
      address: '',
      nameValidState: false,
      addrValidState: false,
      invalidFeedback: 'Invalid',
      validFeedback: 'Valid'
    };
  },

  methods: {
    changeValue (value) {
      console.log(value)
    },
    openInNewWindow() {
      window.open(this.quotes[0].document_file);
    },
    requestCertificate() {
      swal({
        title: "",
        text: "Would you like anything on it?",
        icon: "info",
        buttons: ["No", "Yes"]
      }).then(ok => {
        if (ok) {
          this.$bvModal.show('inputModal')
        } else {
        }
      });
    },
  },
  async mounted() {
    const usdot = localStorage.getItem('usdot');
    let res = await API.post("company/accountinfo/policies", {
      dotId: usdot
    });
    this.loading = false;
    const { policies, status } = res;
    if (status == 'ok') {
      policies.map((policy, i) => {
        this.policies.push({
          id: i,
          title: policy.accountName,
          policyType: policy.policyType,
          img: "https://picsum.photos/200",
          effectiveDate: policy.effectiveDate,
          premium: `$${policy.currentPremium ? policy.currentPremium : 0}`,
          document: "",
          document_file: ""
        })
      })
    } else {
      this.status = false
    }
  },
  created() {
    this.$emit("update-hint", "Helpful hints about current section that will guide the user through the steps, and onto the next section of the form, coinciding with the input field that is active.");
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
    
    .clr {
      color: #007bff;
      cursor: pointer;
    }
  }

  .underline-link {
    text-decoration: underline;
    color: #494f59;
    font-weight: 700;
    font-size: 15px;
  }
}
</style>

