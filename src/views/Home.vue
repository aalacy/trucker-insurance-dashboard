<template>
  <div>
    <div class="home-view d-flex align-items-center">
      <div class="container">
        <div>
          <form class="mar-10" @submit.prevent="getStarted">
            <div class="d-flex align-items-center index1">
                          
              <div class="col-lg-12">
                <div class="form-header position-relative">
                  <input
                    v-model.trim="keyword"
                    type="text"
                    class="footer-input my-footer header"
                    placeholder="Search DOT or Name of Business"
                  >
                  <button
                    type="submit"
                    class="text-light bg-primary subscribe"
                    :disabled="loading"
                  >Get a Quote</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="row mt-5 white-bg">
          <div v-if="loading" class="col-12">Loading...</div>

          <div v-if="error" class="col-12 alert alert-danger" role="alert">{{ error }}</div>

          <div v-if="noData" class="col-12">No data for your request.</div>

          <template v-else-if="(companies.length || company) && !loading">
            <div class="col-sm-12 p-2">
              Here’s the data we’re pulling, please go through the form and
              confirm the information.
            </div>
            <div class="table-responsive company-table" id="btna-main">
              <table class="table table-light table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>US DOT</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody v-if="companies.length">
                  <tr v-for="(companyItem, index) in companies" :key="index">
                    <td>{{ companyItem.name }} <br/> 
                    <button
                        class="lt-button   mt-1  mob-showa lt-button-main"
                        @click="createCompany(companyItem.usdot,companyItem.name)"
                      >Confirm</button></td>
                    <td>{{ companyItem.usdot }}</td>
                    <td>{{ companyItem.location }}</td>
                    <td class ="mob-hide">
                      <button
                        class="lt-button  mob-hide lt-button-main"
                        @click="createCompany(companyItem.usdot,companyItem.name)"
                      >Confirm</button>
                    </td>
                  </tr>
                </tbody>

                <tbody v-if="company">
                  <tr>
                    <td>{{ company['DBA Name'] }}</td>
                    <td>{{ company['USDOT Number'] }}</td>
                    <td>{{ company['Physical Address'] }}</td>
                    <td class="pb-1">
                      <button
                        class="lt-button lt-button-main"
                        @click="createCompany(company['USDOT Number'])"
                      >Confirm</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="container-fluid back" id="lt-section">
      <div class="row d-flex pad-50 justify-content-center">
        <div class="col-sm-8 col-md-8 text-center">
          <h2>LuckyTruck Makes Trucking Easier.</h2>
          <p>Our team genuinely cares about your success and we do what we can to help you succeed by making trucking easier. </p>
        </div>
      </div>
    </div>

    <div class="container" id="img-text">
      <div class="row d-flex margin-50 justify-content-center">
        <div class="col-sm-8 col-md-8">
          <div class="row homeImage">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
              <img
                src="../assets/images/insurance.jpg"
                height="200"
                width="250"
                class="d-block mx-auto rounded"
                alt="Insurance"
              >
              <div class="d-flex justify-content-center">
                <div class="width-200 text-center">
                  <h2>Insurance</h2>
                  <p
                    class
                  >LuckyTruck makes your insurance more convenient. We provide an effective service, don’t charge extra fees and do what we can to keep you moving even if that’s taking a late night call or answering an email. We genuinely care about keeping you on the road and providing a reliable service. </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <img
                src="../assets/images/maint.jpg"
                height="200"
                width="250"
                class="d-block mx-auto rounded"
                alt="Insurance"
              >      <div class="d-flex justify-content-center">
                <div class="width-200 text-center">
                  <h2>Loads, Vehicles, and Drivers</h2>
                  <p
                    class
                  >Many trucking businesses are constantly changing. If yours is one of them, let us know. Our goal is to help you manage those changes. Stay tuned for more product updates and let us know what you want. We want to build what you need. </p>
                </div>
              </div>
              
            </div>
          </div>
          <div class="row homeImage">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <img
                src="../assets/images/risk.jpg"
                height="200"
                width="250"
                class="d-block mx-auto rounded"
                alt="Insurance"
              >
              <div class="d-flex justify-content-center">
                <div class="width-200 text-center">
                  <h2>Manage My Authority</h2>
                  <p
                    class
                  >Insurance is a key part of maintaining your authority. Talk to us about any concerns and we’ll try to figure it out</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <img
                src="../assets/images/fleet.png"
                height="200"
                width="250"
                class="d-block mx-auto rounded"
                alt="Insurance"
              >
        <div class="d-flex justify-content-center">
                <div class="width-200 text-center">
                  <h2>Maintainence</h2>
                  <p
                    class
                  >As you operate, let us know what holds you back. Our goal is to keep you running and we’re working on products to meet your operational goals. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">Modal body..</div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";
import { isMobile } from "mobile-device-detect";
import axios from 'axios';

export default {
  name: "HomeView",
   updated() {
    if(this.keyword == '') {
    this.noData = false
    }
  },
  mounted() {
    this.msg = isMobile ? true : false;
    console.log("isMobile", this.msg);
    this.$store
      .dispatch("cleanData")
      .then(data => {
        console.log("clean", data);
      })
      .catch(e => console.log("e"));
  },
  data() {
    return {
      keyword: process.env.VUE_APP_GET_STARTED_DOT || "",
      companies: [],
      company: null,
      msg: false,
      noData: false,
      loading: false,
      error: null,
      localUsdot: "",
      localcompany: ""
    };
  },
  methods: {
    async getStarted() {
      if (!this.keyword) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.companies = [];
      this.company = null;
      this.noData = false;

      try {
        let data = await API.get("company/search", {
          keyword: this.keyword
        });

        if (Array.isArray(data.data)) {
          this.companies = data.data;
          this.noData = !this.companies.length;
          // console.log("companies",this.companies)
        } else {
          this.company = data.data;
          this.noData = !Object.keys(this.company).length;
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async createCompany(usdot, name) {
      this.localUsdot = usdot;
      this.localcompany = name;
      localStorage.setItem("usdot", this.localUsdot);
      localStorage.setItem("redirect",0);
      localStorage.setItem("company", this.localcompany);
      this.loading = true;

      try {
        let data = await API.post("company/create", null, {
          usdot
        });
        console.log("data", data);
        localStorage.setItem("Physical address", data.data["Physical Address"]);
        localStorage.setItem("Mailing address", data.data["Mailing Address"]);
        localStorage.setItem("Phone", data.data.Phone);
        localStorage.setItem("accBtn", false);
        if (data.status === "OK") {
          if(localStorage.getItem("token") && (localStorage.getItem("accountStatus") == "0")){
            axios.get("http://3.13.68.92/luckytrucker_admin/api/CompanyController/updateaccountinfostatus?user_id="+localStorage.getItem("userId")).then((res)=>console.log("home res",res))
          }
          //logged in to status 0 to 
          if (this.msg) {
            this.$router.push({ name: "AccountInfoUploadDocuments" });
          } else {
            this.$router.push({ name: "AccountInfoPersonalInfo" });
          }
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-clr {
  background-color: hsl(211, 58%, 44%);
  height: 109px;
  opacity: 0.9;
  border-radius: 10px;
}
.index1 {
  z-index: -1;
  // opacity: 50;
}
.home-view {
  @include begin-page;
  background: url("../assets/images/bg_home.png") center center no-repeat
    transparent;
  background-size: cover;

  .home-title {
    color: white;
    // border-top-left-radius: 20px;
  }

  .home-btn {
    right: -20px;
    width: 150px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .ee {
    img {
      display: block;

      margin-left: auto;
      margin-right: auto;
    }
  }
  .home-search {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .todo-container {
    border-bottom: 5px solid $color_blue;

    .todo-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(94, 152, 249, 0.7);
      border-right: 1px solid rgba(255, 255, 255, 0.5);
      font-weight: 400;
      font-size: 1rem;
      color: white;
      padding: 0.5rem 0;
      a {
        color: white;
        text-decoration: none;
        width: 100%;
        height: 100%;
      }
      &:hover {
        background-color: rgba(36, 66, 118, 0.9);
      }
    }
    .todo-item:last-child {
      border-right: 0px !important;
    }
  }

  .white-bg {
    background-color: white;
  }
  
}
.homeImage img{
    width:70% !important;
  }
  .company-table{
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
