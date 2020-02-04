<template>
  <div>
    <div class="home-view d-flex align-items-center">
      <div class="container">
        <div>
          <form class="" @submit.prevent="getStarted">
            <div class="d-flex align-items-center index1" id="quoteInput">
                          
              <b-input-group class="col-lg-12 col-xs-12 p-xs-0 justify-content-center">
                <b-form-input v-model.trim="keyword" class="quote-input" :placeholder=placeholder></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="loading" v-if="msg" type="submit" variant="primary btn-get-quote">
                    <font-awesome-icon class="fontawesome" icon="search"  />
                  </b-button>
                  <b-button :disabled="loading" v-if="!msg" type="submit" variant="primary btn-get-quote">
                    Get a Quote
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </form>
        </div>

        <div v-if="loading" class="col-12">
          <img
              src="../assets/images/loading/loading_truck_128.gif"
              class="d-block mx-auto rounded mt-4"
              alt="Loading"
            >
        </div>
        <div class="row mt-5 search-result">

          <div v-if="error" class="col-12 px-3 pt-2 pb-2" role="alert"><span v-html="error"></span></div>

          <div v-if="noData" class="col-12">No data for your request.</div>

          <template v-else-if="(companies.length || company) && !loading">
            <div class="title-box">
              <button class="btn btn-primary new-company" @click="gotoPersonalInfo()">New Company? Click here</button>
              <div class="header-note mx-auto">
                Select your company.
              </div>
              <div class="table-summary">List of Companies <span v-if="companies.length">{{companies.length}}</span></div>
            </div>
            <div class="table-responsive company-table" id="btna-main">
              <table class="table table-responsive-md table-striped table-bordered table-hover">
                
                <thead class="">
                  <tr>
                    <th>Name</th>
                    <th>US DOT</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody v-if="companies.length">
                  <tr v-for="(companyItem, index) in companies" :key="index">
                    <td>{{ toUpper(companyItem.name)}} <br/> 
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

    <div class="container-fluid back bg-white" id="lt-section">
      <div class="row d-flex pad-50 justify-content-center">
        <div class="col-sm-8 col-md-8 text-center">
          <div class="home_logo_text text-center">LT</div>
          <!-- <img alt="logo" src="/img/logo_txt.png" /> -->

          <p class="below-logo mt-0">Our team can help you save money on your insurance. With an easy to use platform, we also help you run your company better so that you spend more time doing what you love. Login to see for yourself!</p>
          <button class="btn btn-primary" @click="onStartJourney()">Start Your Journey</button>
        </div>
      </div>
    </div>

    <div class="container-fluid bg-grey pt-c-5 pb-5" id="img-text">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xs-8">

          <div class="row justify-content-around homeImage">
            <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8 card-item">
                <div class="d-flex justify-content-center align-items-center flex-column">
                  <div class="bg-dark-grey br-5 mb-4 w-100 p-4">
                    <img
                      src="../assets/images/Insurance.png"
                      height="auto"
                      width="85%"
                      class="d-block mx-auto rounded"
                      alt="Insurance"
                    >
                  </div>
                  <h1 class="mb-3">Insurance</h1>
                  <p
                    class="text-center"
                  >At LuckyTruck, we simplify your insurance management and have a competitive variety of options to find your company the right insurance carrier. We don’t charge extra fees now or ever.</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8 card-item">
              <div class="d-flex justify-content-center align-items-center flex-column">
                <div class="bg-dark-grey br-5 mb-4 w-100 p-4">
                  <img
                    src="../assets/images/Maintenance.png"
                    height="auto"
                    width="85%"
                    class="d-block mx-auto rounded"
                    alt="Insurance"
                  >
                </div>
                <h1>Maintainence</h1>
                <p
                  class="text-center"
                >As you operate and have various maintenance needs, let us know and we’ll try to connect you to people who can manage your needs. We are still adding this service, but feel welcome to ask.</p>
              </div>
            </div>
            
          </div>
          <div class="row justify-content-around homeImage">
            <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8 card-item">
              <div class="d-flex justify-content-center align-items-center flex-column">
                <div class="bg-dark-grey br-5 mb-4 w-100 p-4">
                  <img
                    src="../assets/images/BusinessOperation.png"
                    height="auto"
                    width="85%"
                    class="d-block mx-auto rounded"
                    alt="Insurance"
                  > 
                </div>
                  <h1>Business Operations</h1>
                  <p
                      class="text-center"
                  >To help you manage the dynamic nature of running a trucking business, we make it easier for you to manage your drivers, vehicles, and loads, all in our portal.</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8 card-item">
              <div class="d-flex justify-content-center align-items-center flex-column">
                <div class="bg-dark-grey br-5 mb-4 w-100  p-4">
                  <img
                    src="../assets/images/AuthorityManagement.png"
                    height="auto"
                    width="85%"
                    class="d-block mx-auto rounded"
                    alt="Insurance"
                  >
                </div>
                  <h1>
                    Authority Management</h1>
                  <p
                    class="text-center"
                  >Many new trucking companies receive fines in the first 45 days because they didn’t have the right authority advisory. We have partners that can you help manage your authority.</p>
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
import { toUpper as _toUpper } from '../util.js';

export default {
  name: "HomeView",
   updated() {
    if(this.keyword == '') {
    this.noData = false
    }
  },
  mounted() {
    localStorage.setItem("showModal",false);
    this.msg = isMobile ? true : false;
    console.log("isMobile", this.msg);
    this.$store
      .dispatch("cleanData")
      .then(data => {
        console.log("clean", data);
      })
      .catch(e => console.log("e"));
    if (isMobile) {
      this.placeholder = "DOT # or Company Name";
    }
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
      localcompany: "",
      placeholder: "Search DOT or Name of Business",
      isDotSearch: false,
    };
  },
  methods: {
    gotoPersonalInfo() {
      localStorage.setItem("usdot", "");
      localStorage.setItem("company", "");
      localStorage.setItem("Phone", "");
      localStorage.setItem(["Mailing address"], "{}");
      localStorage.setItem(["Physical address"], "{}");
      this.$router.push({ name: "AccountInfoPersonalInfo" });
    },
    onStartJourney() {
      var options = {
        container: 'body',
        easing: 'ease-in',
        offset: -60,
        force: true,
        cancelable: true,
        onStart: function(element) {
          // scrolling started
        },
        onDone: function(element) {
          // scrolling is done
        },
        onCancel: function() {
          // scrolling has been interrupted
        },
        x: false,
        y: true
      }
      this.$scrollTo("#quoteInput", 1000, options);
    },
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

        console.log(data)

        if (data.status == "OK") {
          if (Array.isArray(data.data)) {
            this.companies = data.data;
            this.noData = !this.companies.length;
          } else {
            this.company = {};
            this.noData = !Object.keys(this.company).length;
          }
        } else {
          this.error = data.message;
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
        
        if (data.status === "OK") {
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
    },
    toUpper(str) {
      return _toUpper(str);
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

  .p-relative {
    position: relative;
  }

  .title-box {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    padding: 10px 20px;
    flex-wrap: wrap;
  }

  .header-note {
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    order: 2;
  }

  .new-company {
    min-width: 200px;
    max-height: 50px;
    order: 1;
  }

  .table-summary {
    order: 3;
    font-size: 18px;
  }

  .company-table table th {
    background: #3a5e9a;
    color: white;
    border: none;
    position: sticky;
    top: 0;
  }

  .company-table table th:first-child {
    border-top-left-radius: 5px;
  }

  .company-table table th:last-child {
    border-top-right-radius: 5px;
  }

  @media only screen and (max-width: 768px) {
    .title-box {
      flex-direction: column;
    }

    .new-company {
      order: 2;
      margin-bottom: 10px;
    }

    .header-note {
      order: 1;
      margin-bottom: 10px;
    }
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



  #btna-main {
    padding: 0 0.5rem;
  }
  
  .search-result {
    border-radius: 6px;
    background-color: white;
  }
}

.logo-text {
  font-weight: bold;
  font-size: 40px;
  color: black;
}

input:focus {
    outline: none;
}

.quote-input {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    max-width: 500px;
}

.btn-get-quote {
    border-bottom-right-radius: 20px; 
    border-top-right-radius: 20px; 
}

.homeImage img{
    width:70% !important;
  }
  .company-table{
    max-height: 400px;
    overflow-y: scroll;
  }
    //  .subscrib-A {
    //  width:100% !important;
    //  border-radius: 20px;
    // //  border-bottom-left-radius: 20px;
    // //  border-top-left-radius: 20px;  
    //  left:32% !important; 
    //  bottom: -44px; 
    //  top:40px
    //  }
</style>
