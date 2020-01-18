<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body cert-block">
        <h4 class="card-title form-sub-title mb-4">Certificates</h4>

        <div v-if="loading">Loading...</div>
        <div v-if="status">
          <div v-for="item in certs" :key="item.id" class="d-flex block-divider">
            <div class="image-wrapper px-1">
              <img :src="item.img" alt class="image">
            </div>

            <div class="pl-4">
              <div class="block-title mb-2">{{ item.name }}</div>
              <div class="action-block">
                <div class="action-item">
                  <a href="#">
                    <img src="/img/sidebar/eye.png" alt="eye" class="action-image">
                  </a>
                  <div>View</div>
                </div>
                <div class="action-item">
                  <a href="#">
                    <img src="/img/sidebar/mail.png" alt="mail" class="action-image">
                  </a>
                  <div>Email</div>
                </div>
                <div class="action-item">
                  <a href="#">
                    <img src="/img/sidebar/download.png" alt="download" class="action-image">
                  </a>
                  <div>Download</div>
                </div>
              </div>
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
      certs: [
        {
          id: 1,
          name: "Certificate Name 1",
          img: "https://picsum.photos/200",
          email: "",
          document: "",
          document_file: ""
        },
        {
          id: 2,
          name: "Certificate Name 2",
          img: "https://picsum.photos/200",
          email: "",
          document: "",
          document_file: ""
        }
      ],
      loading: false,
      error: null,
      policyId: "",
      status: true
    };
  },
  methods: {
    openInNewWindow() {
      window.open(this.quotes[0].document);
    }
  },
  mounted() {
    // console.log("localStorage.getItem(quotation_id)",localStorage.getItem("quotation_id"));

    // if (this.status) {
      // axios
      //   .get(
      //     "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getpolicycertificate?policy_id=" +
      //       localStorage.getItem("policyId")
      //   )
      //   .then(res => {
      //     console.log("res", res.data);
      //     this.quotes[0].effectiveDate = res.data.effective_date;
      //     this.quotes[0].premium = res.data.premium;
      //     // this.quotes[0].document = res.data.certificate_file;
      //     this.quotes[0].document_file = res.data.document_file;
      //     // this.policyId = res.data.id;
      //   });
    // }
  },
  created() {
    this.$emit("update-hint", "Helpful hints about current section that will guide the user through the steps, and onto the next section of the form, coinciding with the input field that is active.");
  }
};
</script>

<style lang="scss" scoped>
.cert-block {
  padding: 34px;

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
  }

  .action-block {
    display: flex;
    justify-content: space-around;

    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 2.5rem;

      img {
        margin-bottom: 0.25rem;
      }

      div {
        font-weight: 700;
        font-size: 20px;
      }
    }
  }
}
</style>