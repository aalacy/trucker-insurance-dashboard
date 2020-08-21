<template>
  <div class="quotes-all-quotes container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">All Quotes</h4>

        <div v-if="loading" class="col-12">
          <img
              src="../assets/images/loading/loading_truck_128.gif"
              class="d-block mx-auto rounded"
              alt="Loading"
            >
        </div>
        <div v-if="quoteSubmitted">
          <!-- <template v-if="status=='ok'"> -->
            <div v-for="item in quotes" :key="item.id + key" class="quote-wrapper block-divider">
              <div class="image-wrapper px-1">
                <img :src="item.img" alt class="image">
              </div>

              <div class="quote-content">
                <div class="block-title mb-3">{{ item.title }}</div>
                <div class="action-block row">
                 <!--  <div class="col">
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
                      <a href="javascript:;" class="lift" @click="downloadPDF(item.pdf)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'download']" />
                      </a>
                      <div>Download</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="javascript:;" class="lift" @click="displayPDF(item.pdf)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'file-pdf']" />
                      </a>
                      <div>PDF</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="action-item">
                      <a href="javascript:;" class="lift" @click="editQuote(item.id)">
                        <font-awesome-icon class="fontawesome" :icon="['fas', 'pen']" />
                      </a>
                      <div>Edit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- </template> -->
         <!--  <span v-else>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a href="tel:15135062400" style="font-weight:bold; white-space:nowrap;">1-513-506-2400</a>
          </span> -->
        </div>
        <div v-else class="mt-3 text-center">
          <div>You can see your Quotes once you submit it to us. Click <a href="/account-info/personal-info">here</a> to send a quote.</div>
           <!--  <div class="font-weight-bold">Devin Bostick</div>
            <div>LuckyTruck | luckytruck.co</div>
            <p>d: +1 (513) 619-0110</p>

            <a href="https://www.linkedin.com/in/devin-bostick" target="_blank" class="mr-3" title="Devin Bostick">
             <font-awesome-icon class="portal-fontawesome linkedin" :icon="['fab', 'linkedin-in']"  />
            </a>
            <a href="tel:15135062400" title="Devin Bostick" style="font-weight:bold; white-space:nowrap;">1-513-506-2400</a> -->
        </div>

        <div v-if="error404" class="text-center h5 mt-4">We're processing your order and it may take a few days but if you need an update, <a href="javascript::void(0)" @click="showWaitInfo">here's how to do it</a></div>
        <div v-else-if="error" class="text-center h5 mt-4" v-html="error"></div>

        <b-modal v-model="showEditModal" centered  size="md" title="Edit a quote" hide-footer>
          <form class="p-3" @submit.prevent="_editQuote">
            <textarea
              class="col-10 mb-2"
              style="min-height: 81px;"
              v-model="description"
              placeholder="Description..."
            ></textarea>
            <div class="mt-3 d-flex justify-content-end">
              <b-button @click="showEditModal=false" class="mr-2">Cancel</b-button>
              <b-button type="submit" variant="primary">Ok</b-button>
            </div>
          </form>
        </b-modal>
      
        <PDFViewer :showModal="showModal" :pdf="pdf" @close-modal="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import { API } from "../api.js";

export default {
  name: "QuotesAllQuotes",

  components: {
    PDFViewer: () => import('./PDFViewer'),
  },

  data() {
    return {
      accept: false,
      buttonHide: false,
      status: true,
      apires: [],
      key: 1,
      auto_liability: "",
      aggregate: "",
      cargo_deductible: "",
      cargo_limits: "",
      general_liability: "",
      total_premium: "",
      document_file: "",
      filename: "",
      quotes: [],
      loading: false,
      error: null,
      error404: null,
      pdf: {},
      showModal: false,
      showEditModal: false,
      quoteId: '',
      description: ''
    }
  },

  created() {
    this.$emit('update-hint', 'Here are all of your current quotes. If anything is missing, just send us a message or call us.');
  },

  methods: {
    editQuote (id) {
      this.quoteId = id
      this.showEditModal = true
    },

    async _editQuote (id) {
      this.showEditModal = false
      this.loading = true
      const userId = localStorage.getItem('userId');
      let res = await API.post("company/accountinfo/quotes/edit", {
        userId,
        quoteId: this.quoteId,
        description: this.description
      });
      this.loading = false;
      const { status } = res;
      if (status == 'ok') {
        this.$swal("", "Successfully Updated!", "success")
      } else {
        this.status = false
        this.error = res.message
      }
    },

    closeModal() {
      this.showModal = false
    },
    downloadPDF (pdf) {
      const downloadLink = document.createElement("a");

      downloadLink.href = `data:application/pdf;base64, ${pdf.content}`;
      downloadLink.download = pdf.name;
      downloadLink.click();
    },
    displayPDF (pdf) {
      this.pdf = pdf
      this.showModal = true
    },

    request () {
    },

    showWaitInfo () {
      this.$swal("", "If you have any urgent question please contact us at 1-513-506-2400", "info")
    },

    async fetchQuotes () {
      if (this.quoteSubmitted) {
        this.loading = true;
        const dotId = localStorage.getItem('usdot');
        const userId = localStorage.getItem('userId');
        let res = await API.post("company/accountinfo/quotes", {
          dotId,
          userId
        });
        this.loading = false;
        this.error = this.error404 = null
        const { quoteList, status, code } = res;
        this.quotes = []
        this.status = status
        if (status == 'ok' && quoteList && quoteList.length > 0) {
          this.quotes = quoteList.map(quote => {
            return {
              id: quote.id,
              title: quote.name,
              pdf: quote.quotePdf,
              img: "https://picsum.photos/200",
            }
          })
          this.key++
        } else {
          this.status = false
          console.log(res.message)
          if (code == 400) {
            this.error = 'Sorry, Something wrong happened on the server. Please contact support if you see this issue again.'
          } else if (code == 404) {
            this.error404 = true
          } else if (code == 500) {
            this.error = 'Sorry, Something wrong happened on the server. Please try again later.'
          }
        }
      }
    }
  },
  computed: {
    ...mapState(["policyData"]),
    ...mapState('auth', ["quoteSubmitted"]),

    mailto () {
      let token = localStorage.getItem("token")
      try {
        token = JSON.parse(token)
      } catch (e) {}

      return `mailto:${token.email}?subject=Insurance%20Quote%20from%20LuckyTruck`
    }
  },

  watch: {
    quoteSubmitted: {
      handler(newValue) {
        if (newValue == true) {
          this.fetchQuotes()
        }
      },
      immediate: true
    }
  },

  async mounted() {
    this.fetchQuotes()
  }
}
</script>

<style lang="scss" scoped>
.quote-subtitle span {
  /* font-size: 14px; */
  font-weight: bold;
  margin-right: 5px;
}
.quote-title2 {
  font-size: 20px;
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

      @media (max-width: 768px) {
        margin-bottom: 0;
      }
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

.danger-text {
  color: #fd5f00!important;
}

</style>
