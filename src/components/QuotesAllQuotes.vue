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
        <div v-if="status">
          <div v-for="item in quotes" :key="item.name" class="quote-wrapper block-divider">
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
                    <a href="#" class="lift">
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
                    <a href="#" class="lift">
                      <font-awesome-icon class="fontawesome" :icon="['fas', 'pen']" />
                    </a>
                    <div>Edit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="buttonHide">
            <div v-if="accept">
              <router-link
                :to="{ name: '' }"
                class="lt-button pad-10 lt-button-main viewquote m-2"
                active-class="font-weight-bold"
                @click.native="savequote"
              >Accept</router-link>
              <router-link
                :to="{ name: '' }"
                class="lt-button pad-10 lt-button-main viewquote m-2"
                active-class="font-weight-bold"
                @click.native="request"
              >Request a new quote</router-link>

              <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
            </div>
            <div v-else>
              <span>Quotation has been accepted.</span>
            </div>
          </div>
        </div>
        <div v-else>
          <span>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a href="tel:15135062400" style="font-weight:bold; white-space:nowrap;">1-513-506-2400</a>
          </span>
        </div>
      
        <PDFViewer :showModal="showModal" :pdf="pdf" @close-modal="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      pdf: {},
      showModal: false
    }
  },

  methods: {
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
      // axios
      //   .post(
      //     "http://3.13.68.92/luckytrucker_admin/api/CompanyController/quotationrequote?quotation_id=" +
      //       this.apires.id +
      //       "&re_quote_status=1"
      //   )
      //   .then(res => {
      //     if (res.status == 200) {
      //       //  this.$swal("Thank You!", "You will get our agent call in next 24 hours!", "success").then(()=>this.$route.push({name:"AccountInfo"}))
      //       swal({
      //         title: "Are you sure?",
      //         text: "Do you want to request for a new Quote?",
      //         icon: "warning",
      //         buttons: ["No", "Yes"]
      //       }).then(willDelete => {
      //         console.log("willbe", willDelete);
      //         if (willDelete) {
      //           this.$router.push({ name: "AccountInfo" });
      //         } else {
      //           // swal(
      //           //   "Thank You!",
      //           //   "Your changes has been accepted! You will get new Updated Quote",
      //           //   {
      //           //     icon: "success"
      //           //   }
      //           // );
      //         }
      //       });
      //     } else if (res.status != 200)
      //       this.$swal("Opps!", res.data.msg, "error");
      //   })
      //   .catch(err => this.$swal("Opps!", err, "error"))
      //   .finally(() => console.log("hiiiiiiii"));
    }
  },
  computed: {
    ...mapState(["policyData"])
  },
  async mounted() {
    this.loading = true;

    const dotId = localStorage.getItem('usdot');
    const userId = localStorage.getItem('userId');
    let res = await API.post("company/accountinfo/quotes", {
      dotId,
      userId
    });
    this.loading = false;
    const { quoteList, status } = res;
    if (status == 'ok' && quoteList && quoteList.length > 0) {
      quoteList.forEach(quote => {
        this.quotes.push({
          title: quote.name,
          pdf: quote.quotePdf,
          img: "https://picsum.photos/200",
        })
      })
    } else {
      this.status = false
    }
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

</style>
