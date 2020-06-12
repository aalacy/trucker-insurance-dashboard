<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body cert-block">
        <h4 class="card-title form-sub-title mb-4">Certificates</h4>

        <div v-if="loading" class="col-12">
          <img
              src="../assets/images/loading/loading_truck_128.gif"
              class="d-block mx-auto rounded"
              alt="Loading"
            >
        </div>
        <template v-if="quoteSubmitted">
          <div v-if="status">
            <div v-for="(item, idx) in certs" :key="idx" class="quote-wrapper block-divider">
              <div class="image-wrapper px-1">
                <img src="https://picsum.photos/200" alt class="image">
              </div>

              <div class="quote-content">
                <div :class="highlightOldCert(item)" class="block-title mb-3">{{ item.title }}</div>
                <div class="action-block row">
                  <!-- <div class="col">
                    <div class="action-item">
                      <a href="#" class="lift">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'eye']" />
                      </a>
                      <div>View</div>
                    </div>
                  </div> -->
                  <div class="col">
                    <div class="action-item">
                      <a :href="mailto" class="lift">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'envelope']" />
                      </a>
                      <div>Email</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="javascript:;" class="lift" @click="downloadPDF(item)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'download']" />
                      </a>
                      <div>Download</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="javascript:;" class="lift" @click="displayPDF(item)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'file-pdf']" />
                      </a>
                      <div>PDF</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="javascript:;" class="lift" @click="editPDF(item)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'pen']" />
                      </a>
                      <div>Edit</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <button class="btn" :class="isOldCert(item) ? 'lift' : 'gray-opacity'" :disabled="!isOldCert(item)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'sync-alt']" />
                      </button>
                      <div>Refresh</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-else>
            <span>
              Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
              <a
                href="tel:15135062400"
                style="font-weight:bold; white-space:nowrap;"
              >1-513-506-2400</a>
            </span>
          </div> -->
        </template>
        <div v-else class="mt-3 text-center">
          <div>This page is currently empty and will be populated once your submitted Quote is processed.</div>
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

        <PDFViewer :showModal="showModal" :pdf="pdf" @close-modal="closeModal" />

        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import moment from "moment";
  import axios from "axios";
  import { API } from "../api.js";

export default {
  name: "CertificatesPast",

  components: {
    PDFViewer: () => import('./PDFViewer'),
  },

  data() {
    return {
      certs: [
      ],
      loading: true,
      error: null,
      email: '',
      policyId: "",
      dotId: '',
      certId: '',
      status: true,
      name: '',
      address: '',
      comments:'',
      inputModal: false,
      pdf: {},
      showModal: false
    };
  },
  methods: {
    highlightOldCert (item) {
      if (this.isOldCert(item)) {
        return 'gray-opacity'
      } else {
        return ''
      }
    },

    isOldCert (item) {
      const date = moment(item.updatedAt).add(60, 'days')
      if (!date.isAfter(moment())) {
        this.$emit("update-hint", "One of your certificates needs to be refreshed for most vendors to accept it.")
        return true
      } else {
        return false
      }
    },

    closeModal () {
      this.showModal = false
    },
    downloadPDF (item) {
      const downloadLink = document.createElement("a");

      downloadLink.href = `data:application/pdf;base64, ${item.content}`;
      downloadLink.download = item.title;
      downloadLink.click();
    },

    displayPDF (item) {
      this.pdf = {
        content: item.content,
        name: item.title
      }
      this.showModal = true
    },

    editPDF (item) {
      const data = JSON.parse(item.data)
      this.name = data.name
      this.address = data.address
      this.comments = data.comments
      this.certId = item.id
      this.policyId = data.policyId
      this.inputModal = true
    },

    async getPastCerts () {
      if (this.quoteSubmitted) {
        const userId = localStorage.getItem('userId');
        let res = await API.post("company/accountinfo/pastcerts", {
          userId
        });
        this.loading = false;
        const { certs, status, message } = res;
        if (status == 'ok') {
          this.certs = certs;
          this.status = true
        } else {
          this.error = message
          this.status = false
        }
      }
    },

    async submitRequest () {
      await this.createCOI(this.dotId, false, this.userId)
    },

    async createCOI (dotId, newpdf, userId) {
      this.loading = true
      this.error = ''
      let res = await API.post("company/coi", {
        id: this.certId,
        dotId,
        comments: this.comments,
        name: this.name,
        address: this.address,
        newpdf,
        userId,
        policyId: this.policyId
      });
      this.loading = false;
      if (res.status == 'ok') {
        this.pdf = res.pdf
        // this.$swal("", "Successfully created COI!", "success")
        if (this.pdf) {
          this.showModal = true
        }
      } else {
        console.log(res.message)
        this.error = 'Something wrong happened. Please try it again.'
      }
    },
  },

  mounted() {
    let user = {}
    try {
      user = JSON.parse(localStorage.getItem('token'))
    } catch (e) {}
    this.email = user.email || ''

    this.dotId = localStorage.getItem('usdot')
    
    this.getPastCerts()
  },

  created() {
    this.$emit("update-hint", "Use this section to manage your certificates. For more detailed certificates, please submit your request and someone from our team will manually create your certificate.");
  },

  computed: {
    ...mapState('auth', ['quoteSubmitted']),
    mailto () {
      return `mailto:${this.email}?subject=Insurance%20Quote%20from%20LuckyTruck`
    },
  },

  watch: {
    quoteSubmitted () {
      if (this.quoteSubmitted) {
        this.getPastCerts()
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.cert-block {
  padding: 34px;

  .gray-opacity {
    opacity: 0.7;
    background: lightgrey;
    border-radius: 4px;
    padding: 0 9px;
  }

  .quote-wrapper {
    display: flex;

    @media (max-width: 425px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .quote-content {
    margin-left: 1rem;

    @media (max-width: 425px) {
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }

  .image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .image {
      border-radius: 15px;
    }
  }

  .policy-info {

    .clr {
      color: #007bff;
      cursor: pointer;
    }
  }

  .block-title {
    font-weight: 500;

     @media (max-width: 425px) {
      text-align: center;
    }
  }

  .action-block {
    display: flex;

    @media (min-width: 425px) {
      flex-wrap: nowrap;
    }

    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      a, button {
        margin-bottom: 0.25rem;
        border-radius: 10px;
        background: #edf2f5;
        padding: 0.55rem 0.875rem;
      }

      div {
        font-weight: 700;
        font-size: 20px;

        @media (max-width: 768px) {
          display: none;
        }
      }

      .fontawesome {
        font-size: 1.5em;

        path {
          fill: #5e98f9e3;
        }
      }
    }
  }
}
</style>