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
          <div v-for="item in policies" :key="item.policyId" class="block-divider policy-wrapper">
            <div class="policy-image-wrapper px-1 mb-2">
              <img src="https://picsum.photos/200" alt class="policy-image">
            </div>

            <div class="policy-info px-3">
              <div class="block-title">{{ item.accountName }}</div>

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
                <strong>${{ item.currentPremium }}</strong>
              </div>

               <button
                type="button"
                :disabled="loading"
                class="lt-button lt-button-main mt-3 mb-3"
                @click="requestCertificate(item)"
              >Request a Certificate</button>

              <div class="d-flex small">
                <div class="px-2">
                  <a href="#" class="underline-link" @click.prevent="viewDetails" :disabled="loading">View Details</a>
                </div>

                <div class="px-2">
                  <a href="#" class="underline-link" @click.prevent="viewHistory(item)" :disabled="loading">View Change History</a>
                </div>
              </div>
            </div>
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
    <b-modal v-model="inputModal" title="Information" @ok="submitRequest">
      <form>
        <b-form-group
          id="name"
          label="Enter a name"
          label-for="input-name"
        >
          <b-form-input id="input-name" v-model="name"  trim required></b-form-input>
        </b-form-group>
        <b-form-group
          id="addr"
          label="Enter a address"
          label-for="input-addr"
        >
          <b-form-input id="input-addr" v-model="address" trim required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal v-model="historyModal" size="lg" :title="historyTitle">
      <div class="company-table m-3">
        <b-table 
          :items="endorsements"
          :fields="fields" 
          sticky-header
          striped
          bordered
          hover
          no-border-collapse
          stacked="sm"
          thead-class="company-table-header"
          thead-tr-class="company-table-header"
          tbody-tr-class="company-table-body"
        >
          <template v-slot:cell(endorsementAmount)="data">
            {{data.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}
          </template>
        </b-table>
      </div>
    </b-modal>
    
    <PDFViewer :showModal="showPdfModal" :pdf="pdf" @close-modal="closeModal" />
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

  },

  components: {
    PDFViewer: () => import('./PDFViewer'),
  },

  data() {
    return {
      policies: [],
      endorsements: [],
      fields: [ 
        { key: 'endorsementType', label: 'Type' },
        { key: 'endorsementAmount', label: 'Amount ($)' },
        { key: 'driverName', label: 'Driver' },
        { key: 'vehicleName', label: 'Vehicle' },
      ],
      status: true,
      loading: true,
      error: null,
      policy: "",
      name: '',
      address: '',
      nameValidState: false,
      addrValidState: false,
      invalidFeedback: 'Invalid',
      validFeedback: 'Valid',
      pdf: {},
      showPdfModal: false,
      inputModal: false,
      historyModal: false,
      userId: '',
      dotId: '',
      uuid: ''
    };
  },

  computed: {
    historyTitle () {
      return 'Endorsements (' + this.endorsements.length +')'
    },
  },

  methods: {
    closeModal () {
      this.showPdfModal = false
    },

    changeValue (value) {
      console.log(value)
    },

    openInNewWindow () {
      window.open(this.quotes[0].document_file);
    },

    requestCertificate(item) {
      this.policy = item;
      swal({
        title: "",
        text: "Would you like anything on it?",
        icon: "info",
        buttons: ["No", "Yes"]
      }).then(ok => {
        if (ok) {
          this.inputModal = true
        } else {
        }
      });
    },
    async submitRequest () {
      await this.createCOI(this.dotId, this.uuid, this.userId)
    },

    async createCOI (dotId, uuid, userId) {
      this.loading = true
      let res = await API.post("company/coi", {
        dotId,
        name: this.name,
        address: this.address,
        uuid,
        policy: JSON.stringify(this.policy),
        userId
      });
      this.loading = false;
      if (res.status == 'ok') {
        this.pdf = res.pdf
      } else {
        console.log(res)
      }
    },

    // empty COI pdf
    async viewDetails () {
      this.policy = {}
      await this.createCOI("", "", this.userId)
      if (this.pdf) {
        this.showPdfModal = true
      }
    },

    // endorsement list
    async viewHistory (item) {
      this.loading = true
      const userId = localStorage.getItem('userId');
      let res = await API.post("company/accountinfo/policy/endorsements", {
        policyId: 'a021k000003muT4AAI',
        userId
      });
      this.loading = false;
      const { endorsements, status } = res;
      if (status == 'ok') {
        this.endorsements = endorsements
        this.historyModal = true
      } else {
        this.status = false
      }
    }
  },
  async mounted() {
    this.dotId = localStorage.getItem('usdot');
    this.userId = localStorage.getItem('userId');
    this.uuid = localStorage.getItem('uuid');
    let res = await API.post("company/accountinfo/policies", {
      dotId: this.dotId,
      userId: this.userId
    });
    this.loading = false;
    const { policies, status } = res;
    if (status == 'ok') {
      policies.map((policy, i) => {
        this.policies.push(policy)
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
.white-space {
  white-space: nowrap;
}
.policies-review {
  .policy-wrapper {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 425px) {
      justify-content: center;
    }
  }

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

