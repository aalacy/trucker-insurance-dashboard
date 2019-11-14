<template>
  <div class="quotes-all-quotes container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Your Quote</h4>

        <div v-if="loading">Loading...</div>
        <div v-if="status">
           <div v-for="item in quotes" :key="item.id" class="mb-4 d-flex align-items-start flex-wrap">
            <div class="quote-image-wrapper px-1">
              <img :src="item.img" alt class="quote-image">
            </div>

            <div class="quote-info px-3">
              <div class="quote-title quote-title2">
                <h4>ForAgentsOnly</h4>
              </div>

              <div class="quote-subtitle quote-subtitle2">
                <span>Total Premium:</span>
                {{total_premium}}
              </div>

              <div class="quote-subtitle">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-> Cargo Deductible:</span>
                {{cargo_deductible}}
              </div>

              <div class="quote-subtitle">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-> Cargo Limits:</span>
                {{cargo_limits}}
              </div>

              <div class="quote-subtitle">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-> General Liability:</span>
                {{general_liability}}
              </div>
              <div class="quote-subtitle">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-> View PDF:</span>

                <a @click="openInNewWindow">
                  <strong class="clr">{{filename}}</strong>
                </a>
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
            <a href="tel:16469330419" style="font-weight:bold; white-space:nowrap;">1-646-933-0419</a>
          </span>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "QuotesAllQuotes",

  data() {
    return {
      accept: false,
      buttonHide: false,
      status: false,
      apires: [],
      auto_liability: "",
      aggregate: "",
      cargo_deductible: "",
      cargo_limits: "",
      general_liability: "",
      total_premium: "",
      document_file: "",
      filename: "",
      quotes: [
        {
          id: 1,
          title: "StateFarm",
          subtitle: "Carrier Coverage",
          price: "Price",
          img: "https://picsum.photos/200"
        }
      ],
      loading: false,
      error: null
    };
  },

  methods: {
    openInNewWindow() {
      window.open(this.apires.file);
    },
    savequote() {
      console.log("this.acc", this.accept);
      axios
        .post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/quotationapprove?quotation_id=" +
            this.apires.id +
            "&approve_status=1"
        )
        .then(res => {
          console.log("ress", res);
          if (res.data.flag == "1") {
            console.log("this.acc2", this.accept);
            this.accept = false;
            this.$swal(
              "Quotation Accepted!",
              "You will get our agent call in next 24 hours!",
              "success"
            );
          } else if ((res.data.flag = "0"))
            this.$swal("Opps!", res.data.msg, "error");
          this.accept = false;
          console.log("this.acc1", this.accept);
        })
        .catch(err => this.$swal("Opps!", err, "error"))
        .finally();
    },
    request() {
      let a = localStorage.getItem("userId");
      axios
        .post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/quotationrequote?quotation_id=" +
            this.apires.id +
            "&re_quote_status=1"
        )
        .then(res => {
          if (res.status == 200) {
            //  this.$swal("Thank You!", "You will get our agent call in next 24 hours!", "success").then(()=>this.$route.push({name:"AccountInfo"}))
            swal({
              title: "Are you sure?",
              text: "Do you want to request for a new Quote?",
              icon: "warning",
              buttons: ["No", "Yes"]
            }).then(willDelete => {
              console.log("willbe", willDelete);
              if (willDelete) {
                this.$router.push({ name: "AccountInfo" });
              } else {
                // swal(
                //   "Thank You!",
                //   "Your changes has been accepted! You will get new Updated Quote",
                //   {
                //     icon: "success"
                //   }
                // );
              }
            });
          } else if (res.status != 200)
            this.$swal("Opps!", res.data.msg, "error");
        })
        .catch(err => this.$swal("Opps!", err, "error"))
        .finally(() => console.log("hiiiiiiii"));
    }
  },
  computed: {
    ...mapState(["policyData"])
  },
  mounted() {
    if (localStorage.getItem("token")) {
      
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
              console.log("status",this.status);
            } else {
              this.status = false;
            }
          });
      }
      console.log("this.status",this.status);

      // if (this.status) {
        let a = localStorage.getItem("userId");
        console.log("a", a);
        axios
          .get(
            `http://3.13.68.92/luckytrucker_admin/api/CompanyController/getquotation?user_id=${a}`
          )
          .then(res => {
            console.log("ressssssss", res);

            this.apires = res.data[0];
            if (res.data[0].file) {
              this.buttonHide = true;
            } else {
              this.buttonHide = false;
            }

            localStorage.setItem("quotation_id", res.data[0].id);
            console.log("apires", res.client_approval);
            if (this.apires.client_approval == "0") {
              this.accept = true;
            } else {
              this.accept = false;
            }
            this.aggregate = this.apires.aggregate;
            this.total_premium = this.apires.total_premium;
            this.cargo_deductible = this.apires.cargo_deductible;
            this.cargo_limits = this.apires.cargo_limits;
            this.general_liability = this.apires.general_liability;
            this.document_file = this.apires.file;
            this.filename = this.document_file.split("/")[6];
            console.log(this.document_file.split("/")[6]);
            if (this.apires.auto_liability == "1") {
              this.auto_liability = "Yes";
            } else {
              this.auto_liability = "No";
            }
            console.log("apires", this.apires);
          })
          .catch(err => console.log("err", err))
          .finally(() => console.log("hiiiiiiii"));
      }
    }
  // }

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
.quotes-all-quotes {
  .quote-image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .quote-image {
      border-radius: 15px;
    }
  }

  .quote-info {
    .quote-title {
      font-size: 1.3rem;
    }

    .quote-subtitle {
      font-size: 0.8rem;
    }
    .quote-subtitle2 {
      font-size: 16px;
    }

    .quote-price {
      font-weight: 200;
    }
  }
  .clr {
    color: #007bff;
    cursor: pointer;
  }
}
</style>
