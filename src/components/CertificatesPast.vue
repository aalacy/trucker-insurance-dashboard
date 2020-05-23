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
        <template v-if="auth.quoteSubmitted == 'true'">
          <div v-if="status">
            <div v-for="(item, idx) in certs" :key="idx" class="quote-wrapper block-divider">
              <div :class="highlightOldCert(item)" class="image-wrapper px-1">
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
                      <a href="javascript:;" class="lift" @click="downloadPDF(item.data)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'download']" />
                      </a>
                      <div>Download</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="javascript:;" class="lift" @click="displayPDF(item.data)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'file-pdf']" />
                      </a>
                      <div>PDF</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="#" class="lift">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'pen']" />
                      </a>
                      <div>Edit</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <button class="btn" :class="isOldCert(item) ? 'gray-opacity' : 'lift'" :disabled="isOldCert(item)">
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
      status: true,
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
      const date = moment(item.createDate).add(60, 'days')
      if (!date.isAfter(moment())) {
        return true
      } else {
        return false
      }
    },

    closeModal () {
      this.showModal = false
    },
    downloadPDF (pdf) {
      const downloadLink = document.createElement("a");

      downloadLink.href = `data:application/pdf;base64, ${pdf}`;
      downloadLink.download = 'COI.pdf';
      downloadLink.click();
    },
    displayPDF (pdf) {
      this.pdf = {
        content: pdf,
        name: 'COI.pdf'
      }
      this.showModal = true
    },

    async getPastCerts () {
      if (this.auth.quoteSubmitted == 'true') {
        const dotId = localStorage.getItem('usdot');
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
    }
  },

  mounted() {
    let user = {}
    try {
      user = JSON.parse(localStorage.getItem('token'))
    } catch (e) {}
    this.email = user.email || ''
    
    this.getPastCerts()
  },

  created() {
    this.$emit("update-hint", "Use this section to manage your certificates. For more detailed certificates, please submit your request and someone from our team will manually create your certificate.");
  },

  computed: {
    ...mapState(["auth"]),
    mailto () {
      return `mailto:${this.email}?subject=Insurance%20Quote%20from%20LuckyTruck`
    },
  },

  watch: {
    auth: {
      deep: true,
      handler () {
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