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
        <div v-if="status">
          <div v-for="(item, idx) in certs" :key="idx" class="quote-wrapper block-divider">
            <div class="image-wrapper px-1">
              <img src="https://picsum.photos/200" alt class="image">
            </div>

            <div class="quote-content">
              <div class="block-title mb-3">{{ item.title }}</div>
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
                    <a href="#" class="lift">
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
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <span>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a
              href="tel:15135062400"
              style="font-weight:bold; white-space:nowrap;"
            >1-513-506-2400</a>
          </span>
        </div>

        <PDFViewer :showModal="showModal" :pdf="pdf" @close-modal="closeModal" />

        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
      policyId: "",
      status: true,
      pdf: {},
      showModal: false
    };
  },
  methods: {
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
  },
  async mounted() {
    const dotId = localStorage.getItem('usdot');
    const userId = localStorage.getItem('userId');
    let res = await API.post("company/accountinfo/pastcerts", {
      userId
    });
    this.loading = false;
    const { certs, status } = res;
    if (status == 'ok') {
      this.certs = certs;
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
.cert-block {
  padding: 34px;

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

      a {
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