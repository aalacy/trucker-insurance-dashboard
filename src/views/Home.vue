<template>
  <div>
    <div class="home-view d-flex align-items-center">
      <div class="container">
        <div>
          <form class="" @submit.prevent="getStarted">
            <div class="d-flex align-items-center index1" id="quoteInput">
                          
              <b-input-group class="col-lg-12 col-xs-12 p-xs-0 justify-content-center">
                <b-form-input 
                  id="keyword"
                  v-model="keyword"
                  type="number"
                  autocomplete="off"
                  class="quote-input"
                  :placeholder=placeholder
                  trim
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                ></b-form-input>
                
                <b-input-group-append>
                  <b-button :disabled="loading" v-if="msg" type="submit" variant="primary btn-get-quote">
                    <font-awesome-icon class="fontawesome" siz="3x" icon="search" />
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

          <div v-if="error" class="col-12 px-3 pt-2 pb-2" role="alert">
            <div class="title-box">
              <button class="btn btn-primary new-company" @click="gotoPersonalInfo()">New Company? Click here</button>
              <div class="header-note mx-auto">
                Select your company.
              </div>
              <div class="table-summary">List of Companies 0</div>
            </div>
            <div v-html="error" style="padding: 10px 20px;"></div>
          </div>

          <div v-if="noData" class="col-12">No data for your request.</div>

          <template v-else-if="(companies.length || company) && !loading && !error">
            <div class="title-box">
              <button class="btn btn-primary new-company" @click="gotoPersonalInfo()">New Company? Click here</button>
              <div class="header-note mx-auto">
                Select your company.
              </div>
              <div class="table-summary">List of Companies <span v-if="companies.length">{{companies.length}}</span></div>
            </div>
            <div class="company-table m-3">
              <b-table 
                :items="items"
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
                <template v-slot:cell(actions)="row" class="confirmContainer">
                  <button @click="createCompany(row)" class="btn btn-primary btn-sm">
                    Confirm
                  </button>
                </template>
              </b-table>
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

    <div class="container-fluid service-section pb-5">
      <div class="row justify-content-around">
        <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8">
          <div class="service-main">
            <div class="service">
              <div class="service-logo">
                <img
                  src="/img/home/INSURED-TRUCK.png"
                  height="auto"
                  width="85%"
                  alt="Insurance"
                >
              </div>
              <h4>Insurance</h4>
              <p
              >
                At LuckyTruck, we simplify your insurance management and have a competitive variety of options to find your company the right insurance carrier.
              </p>
              <router-link
                :to="{ name: 'Insurance' }"
                class="btn btn-primary"
                >View More</router-link>
            </div>
            <div class="shadowOne"></div>
            <div class="shadowTwo"></div>
          </div>
        </div>
        <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8">
          <div class="service-main">
            <div class="service">
              <div class="service-logo">
                <img
                  src="/img/home/Repairing-Truck.png"
                  alt="Insurance"
                >
              </div>
              <h4>Maintenance</h4>
              <p
              >
                As you operate and have various maintenance needs, let us know and we’ll try to connect you to people who can manage your needs. We are still adding this service, but feel welcome to ask.
              </p>
              <router-link
                :to="{ name: 'Maintenance' }"
                class="btn btn-primary"
                >View More</router-link>
            </div>
            <div class="shadowOne"></div>
            <div class="shadowTwo"></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-around ">
        <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8">
          <div class="service-main">
            <div class="service">
              <div class="service-logo">
                <img
                  src="/img/home/business-operation.png"
                  alt="Insurance"
                >
              </div>
              <h4>Business Operations</h4>
              <p
              >
                To help you manage the dynamic nature of running a trucking business, we make it easier for you to manage your drivers, vehicles, and loads, all in our portal.
              </p>
              <router-link
                :to="{ name: 'Operations' }"
                class="btn btn-primary"
                >View More</router-link>
            </div>
            <div class="shadowOne"></div>
            <div class="shadowTwo"></div>
          </div>
        </div>
        <div class="col-lg-4 col-md-5 col-sm-6 col-xs-8">
          <div class="service-main">
            <div class="service">
              <div class="service-logo">
                <img
                  src="/img/home/Hand-Stamping.png"
                  alt="Insurance"
                >
              </div>
              <h4>Authority Management</h4>
              <p
              >
                Many new trucking companies receive fines in the first 45 days because they didn’t have the right authority advisory. We have partners that can you help manage your authority.
              </p>
              <router-link
                :to="{ name: 'Authority' }"
                class="btn btn-primary"
                >View More</router-link>
            </div>
            <div class="shadowOne"></div>
            <div class="shadowTwo"></div>
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
    this.$store
      .dispatch("cleanData")
      .then(data => {
        console.log("clean", data);
      })
      .catch(e => console.log("e"));
    if (isMobile) {
      this.placeholder = "DOT # or Leave blank";
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
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
      placeholder: "Search by DOT or Leave blank if you're a new Company",
      isDotSearch: false,
      coords: {},
      fields: [ 
        { key: 'name', label: 'Name' },
        { key: 'usdot', label: 'US DOT' },
        { key: 'location', label: 'Location' },
        { key: 'actions', label: '' },
      ],
    };
  },
  computed: {
    items (){
      let data = []
      if (this.companies.length) {
        this.companies.map(company => {
          data.push({
            name: company.name,
            usdot: company.usdot,
            location: company.location
          })
        })
      } else if (this.company) {
        data.push({
          name: this.company['DBA Name'],
          usdot: this.company['USDOT Number'],
          location: this.company['Physical Address']
        })
      }

      return data
    },

    validateKeyword () {
      console.log(this.keyword)
      if(!isNaN(this.keyword)) {
        return true
      }
      return false
    },
  },
  methods: {
    query () {
      return {
        next: this.$router.history.current.name == 'LogIn' || this.$router.history.current.name == 'SignUp' ? this.$router.history.current.query.next : this.$router.history.current.name,
        sf: this.$router.history.current.query.sf
      }
    },
    showPosition(position) {
      this.coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    },
    gotoPersonalInfo() {
      localStorage.setItem("usdot", "");
      localStorage.setItem("company", "");
      localStorage.setItem("Phone", "");
      localStorage.setItem('uuid', '');
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
      this.$scrollTo(".app-navbar", 400, options);
    },
    async getStarted() {
      if (!this.keyword) {
        this.gotoPersonalInfo()
      }

      // get client coord

      this.loading = true;
      this.error = null;
      this.companies = [];
      this.company = null;
      this.noData = false;
      const userId = JSON.parse(localStorage.getItem('userId')) || ''
      const dotId = localStorage.getItem('usdot')

      try {
        let data = await API.get("company/search", {
          keyword: this.keyword,
          coords: this.coords,
          userId,
          dotId
        });

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
    async createCompany(row) {
      this.localUsdot = row.item.usdot;
      this.localcompany = row.item.name;
      localStorage.setItem("usdot", this.localUsdot);
      localStorage.setItem("company", this.localcompany);
      this.loading = true;

      try {
        let data = await API.post("company/create", {
          usdot: this.localUsdot,
        });
        localStorage.setItem('uuid', data.uuid);
        
        if (data.status === "OK") {
            this.$router.push({ name: "AccountInfoPersonalInfo" });
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

//  @media only screen and (max-width: 768px) {
//    background: url("../assets/images/bg_home_medium.png") center center no-repeat
//    transparent;
//    background-size: cover;
//  }

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

  .company-table-header {
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

.company-table{
  max-height: 400px;
  overflow-y: scroll;
  width: 100%;
  border-radius: 5px
}

.service-section {
  background: #007bff;

  .service-main {
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-align: center;
    position: relative;
    height: 460px;

    a {
      opacity: 0;
      transition: all .8s;
      transform: translateY(10px);
    }
  
    .service {
      background: #fff;
      padding: 30px;
      border-radius: 10px;
      position: absolute;
      bottom: 0;
      z-index: 1;
      box-shadow: 0 0 20px -15px #030380;
      transition: all .8s;

      .service-logo {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        margin: -90px auto 0;
        background: #fff;
        border: 18px solid #007bff;

        img {
          width: 75px;
          margin-top: 8px;
          transition: all .8s;
        }
      }

      h4 {
        height: 35px;
        width: 80%;
        background: #fff;
        margin: 50px auto;
        position: relative;

        &::after {
          content: '';
          width: 40px;
          height: 30px;
          position: absolute;
          right: -5px;
          top: -5px;
          background: linear-gradient(to right, #fff, #007bff);
          z-index: -1;
        }

        &::before {
          content: '';
          width: 40px;
          height: 30px;
          position: absolute;
          left: -5px;
          bottom: -5px;
          background: linear-gradient(to right, #007bff, #fff);
          z-index: -1;
        }
      }
    }

    .shadowOne {
      height: 200px;
      width: 80%;
      background: #fff;
      position: absolute;
      border-radius: 10px;
      bottom: 0;
      left: 10%;
      box-shadow: 0 0 20px -15px #030380;
      transition: all .8s;
    }

    .shadowTwo {
      height: 200px;
      width: 64%;
      background: #fff;
      position: absolute;
      border-radius: 10px;
      bottom: 0;
      left: 18%;
      transition: all .8s;
    }

    &:hover {
      .service { 
        transform: translateY(-50px);
      }
      img {
        transform: rotateY(-180deg);
      }
      .shadowOne {
        transform: translateY(-25px);
      }
      a {
        opacity: 1;
        transform: translateY(-5px);
      }
    }
  }
}


</style>

<style lang="scss">
@media (max-width: 575.98px) {
  table {
    overflow-x: hidden;
  }

  .table td::before {
    width: 90px !important;
  }

  .table th, .table td {
    padding: 0.45rem;
  }

  .table tr.company-table-body td:last-child div {
    width: 100% !important;
    display: flex !important;
    justify-content: flex-end;
  }
}
</style>