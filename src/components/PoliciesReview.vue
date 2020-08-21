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
        <template v-if="quoteSubmitted">
          <div v-if="status">
            <div v-for="(item, i) in policies" :key="i+key" class="block-divider policy-wrapper">
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
                    <a href="#" class="underline-link" @click.prevent="viewDetails(item)" :disabled="loading">View Details</a>
                  </div>

                  <div class="px-2">
                    <a href="#" class="underline-link" @click.prevent="viewHistory(item)" :disabled="loading">View Change History</a>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          </div>
        </template>
        <div v-else class="mt-3 text-center">
          <div>This page is currently empty and will be populated once your submitted Quote is processed.</div>
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
          <b-form-input id="input-name" v-model="name" @focus="onFocus('name')"  trim required></b-form-input>
        </b-form-group>
        <b-form-group
          id="addr"
          label="Enter an address"
          label-for="input-addr"
        >
          <b-form-input id="input-addr" v-model="address" @focus="onFocus('address')" trim required></b-form-input>
        </b-form-group>
        <b-form-group
          id="comments"
          label="Comments"
          label-for="input-comments"
        >
          <b-form-input id="input-comments" v-model="comments" @focus="onFocus('comments')" trim required></b-form-input>
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
  import { mapState, mapActions } from "vuex";
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
        { key: 'name', label: 'Name' },
        { key: 'endorsementType', label: 'Type' },
        { key: 'endorsementAmount', label: 'Amount ($)' },
      ],
      key: 1,
      status: true,
      loading: false,
      error: null,
      policy: "",
      name: '',
      address: '',
      comments:'',
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
    ...mapState('auth', ['quoteSubmitted']),
    historyTitle () {
      return 'Endorsements (' + this.endorsements.length +')'
    },
  },

  methods: {
    closeModal () {
      this.showPdfModal = false
    },

    onFocus (value) {
      switch (value) {
        case 'comments':
          this.$emit("update-hint", "Only enter information if you need more than just name and address on the COI and someone from our team will process shortly. Name and address COIs are typically generated automatically.")
          break

        default:
          this.$emit("update-hint", "Here are your current policies, to add vehicles and drivers, please see the side bar on the left. Please contact us with any questions or changes.");
          break
      }
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
          this.showModal()
        } else {
        }
      });
    },
    async submitRequest () {
      await this.createCOI(this.dotId, false, this.userId)
    },

    async createCOI (dotId, newpdf, userId) {
      this.loading = true
      this.error = ''
      let res = await API.post("company/coi", {
        dotId,
        comments: this.comments,
        name: this.name,
        address: this.address,
        newpdf,
        userId,
        policyId: this.policy.policyId
      });
      this.loading = false;
      if (res.status == 'ok') {
        this.pdf = res.pdf
        // this.$swal("", "Successfully created COI!", "success")
        if (this.pdf) {
          this.showPdfModal = true
        }
      } else {
        console.log(res.message)
        this.error = 'Something wrong happened. Please try it again.'
      }
    },

    // empty COI pdf
    async viewDetails (item) {
      this.policy = item
      await this.createCOI("", true, this.userId)
    },

    showModal () {
      this.name = this.address = this.comments = ''
      this.inputModal = true
    },

    // endorsement list
    async viewHistory (item) {
      const self = this
      this.policies.map(policy => {
        if (policy.policyId == item.policyId) {
          self.endorsements = policy.endorsementList
        }
      })
      this.historyModal = true
      // this.loading = true
      // const userId = localStorage.getItem('userId');
      // let res = await API.post("company/accountinfo/policy/endorsements", {
      //   policyId: item.policyId,
      //   userId
      // });
      // this.loading = false;
      // const { endorsements, status } = res;
      // if (status == 'ok') {
      //   this.endorsements = endorsements
      //   this.historyModal = true
      // } else {
      //   this.status = false
      // }
    },

    async getPolicies () {
      if (this.quoteSubmitted) {
        this.loading = true
        let res = await API.post("company/accountinfo/policies", {
          dotId: this.dotId,
          userId: this.userId
        });
        this.loading = false;
        const { policies, status } = res;
        if (status == 'ok') {
          this.status = 'ok'
          this.policies = policies
          this.key++
        } else {
          this.status = false
        }
      }
    }
  },

  watch: {
    quoteSubmitted: {
      handler(newValue) {
        if (newValue == true) {
          this.getPolicies()
        }
      },
      immediate: true
    }
  },

  async mounted() {
    this.dotId = localStorage.getItem('usdot');
    this.userId = localStorage.getItem('userId');
    this.uuid = localStorage.getItem('uuid');
    
    this.getPolicies()
  },

  created() {
    this.$emit("update-hint", "Here are your current policies, to add vehicles and drivers, please see the side bar on the left. Please contact us with any questions or changes.");
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

