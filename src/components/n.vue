<template>
<div>
   <div class="p-2 ml-1">
      <div class="emergency row p-0">
        <div class=""> NEED HELP?</div>
        <div class="col-lg-12 col-md-6 ml-4">Speak now with a licenece insurance agent</div>
        <button type="submit" class="bt-call col-lg-8 col-md-6">Request a call</button>
        <div class="row">
        <div class="col-lg-12 d-flex justify-content-center">or call us 24/7?</div>
        <div class="pl-5   row">
          <font-awesome-icon
                  icon= 'phone-alt' 
                  size="1x"
                  class="mr-4 color-fb d-flex justify-content-center"
                />
                <div>+1 (XXX) XXX-XXXX</div>
      </div>
      </div>
      </div>
            <!-- <button type="button" id="sidebarCollapse" class="btn ico-btn" @click="showNav">
              <img src="../assets/images/hame.png" height="100" width="100" class="d-block mx-auto" >
               <i class="fas fa-home" aria-hidden="true"></i> 
                   
            </button> -->

        </div>
  <div class="containera" :class="{'show': showSidebar}">
   
    <transition-group name="fade" class="sidebar-menu">
   
      <div v-for="(item, index) in items" :key="index" class="menu-item navigation-links">
                
        <router-link
          :to="item.to"
          tag="div"
          class="title-wrapper"
          :class="{
          'has-sub-items': item.subItems,
          active: $route.name.indexOf(item.to.name) === 0
        }"
        >
     
          <a class="title link">{{ item.title }}</a>

          <!-- <div
            v-if="$route.name.indexOf(item.to.name) === 0"
            class="triangle"
            :class="{ 'has-sub-items': item.subItems }"
          ></div> -->
        </router-link>

        <router-link
          v-for="(subItem, subIndex) in item.subItems"
          :key="subIndex"
          :to="subItem.to"
          tag="div"
          exact
          class="sub-item"
        >
          <a class="link">{{ subItem.title }}</a>
        </router-link>
      </div>
    </transition-group>
  </div>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu",
  methods: {
    //  toggleSlim() {
    //   this.collapsed = !this.collapsed;
    // },
    showNav() {
      if (this.showSidebar) {
        this.showLink = false;
        setTimeout(() => {
          this.showSidebar = false;
        }, 500);
      } else {
        this.showSidebar = true;
        setTimeout(() => {
          this.showLink = true;
        }, 500);
      }
    }
  },
  data() {
    return {
      showSidebar: true,
      showLink: false,
      items: [
        
        {
          title: "Account Info",
          to: { name: "AccountInfo" }
        },
        {
            title:"Your Quote Progress",
            to:{name:"AccountInfo"},
            subItems:[
              {title:"Upload Documents", to:{name:"AccountInfoUploadDocuments"}},
              {title:"Perosnal Info", to:{name:"AccountInfoPersonalInfo"}},
              {title:"Business Structure",to:{name:"AccountInfoBusinessStructure"}},
              {title:"Cargo Group",to:{name:"AccountInfoCargoGroup"}},
              {title:"Cargo Hauled",to:{name:"AccountInfoCargoHauled"}},
              {title:"ELD Provider",to:{name:"AccountInfoEldProvider"}},
              {title:"Drivers",to:{name:"AccountInfoDrivers"}},
              {title:"Owner",to:{name:"AccountInfoOwners"}},
              {title:"Questions",to:{name:"AccountInfoQuestions"}},
              {title:"Upload Document",to:{name:"AccountInfoDocumentUpload"}}
            ]
        },
        {
          title: "Quotes",
          to: { name: "Quotes" },
          subItems: [
            { title: "See All Quotes", to: { name: "QuotesAllQuotes" } },
            {
              title: "Request New Quote",
              to: { name: "QuotesRequestNewQuote" }
            }
          ]
        },
        {
          title: "Policies",
          to: { name: "Policies" },
          subItems: [
            { title: "Review Policies", to: { name: "PoliciesReview" } },
            { title: "+ / - Drivers", to: { name: "PoliciesDrivers" } },
            {
              title: "+ / - Vehicles & Trailers",
              to: { name: "PoliciesVehiclesAndTrailers" }
            },
            { title: "Other Coverages", to: { name: "PoliciesOtherCoverages" } }
          ]
        },
        {
          title: "Certificates",
          to: { name: "Certificates" },
          subItems: [
            { title: "Past Certificates", to: { name: "CertificatesPast" } },
            {
              title: "Request New Certificate",
              to: { name: "CertificatesRequestNewCertificate" }
            }
          ]
        },
        {
          title: "Billing",
          to: { name: "Billing" },
          subItems: [
            {
              title: "Payment Information",
              to: { name: "BillingPaymentInformation" }
            },
            {
              title: "Payment Schedule",
              to: { name: "BillingPaymentSchedule" }
            },
            { title: "Payment History", to: { name: "BillingPaymentHistory" } },
            { title: "Make a Payment", to: { name: "BillingMakePayment" } }
          ]
        },
        {
          title: "Resources",
          to: { name: "Resourses" },
          subItems: [
            { title: "ELD Providers", to: { name: "ResoursesEldProviders" } },
            {
              title: "Risk Management",
              to: { name: "ResoursesRiskManagement" }
            },
            {
              title: "Buy a New Truck/Trailer",
              to: { name: "ResoursesBuyNewTruckTrailer" }
            },
            { title: "Find a Driver", to: { name: "ResoursesFindDriver" } },
            { title: "Freight Board", to: { name: "ResoursesFreightBoard" } }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }

.emergency{
background-color: hsl(0, 0%, 89%);
// height: 200px;
width: 280px;
border-radius: 5px;
justify-content: center;
align-items: center;
// display: flex;

}
.bt-call{
  border-radius: 12px;
  color: #f7f7f7;
  background-color: #1c4894;
  height: 38px;
}

.controla {
    position: absolute;
    z-index: 1;
    top: 1%;
}

 .ico-btn ,.ico-btn span{ 
      background-color: #5e98f9;
      color: #fff;
    
    }
     .ico-btn {
       width: 50px;
         padding: 10px;
    }
.containera {
  // position: absolute;
  top: 165px;
  left: 0;
  width: 0px;

  max-height: 100%;
  // background-color: rgba($color: #81b121, $alpha: 0.8);
  // border: solid #fff;
  border-width: 0 1px 0 0;
  
  // transition: all 0.5s ease-in-out;
  // overflow-y: auto;
 

  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-bottom: 10px;
    position: absolute;
    z-index: 1;
    top: 0;
    background-color: #5e98f9;
    i {
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      color: #fff;
    }
    
  }
  &.show {
    width: 280px;
    .control > i {
      color: #fff;
      transform: rotateZ(-180deg);
    }
    .navigation-icons {
      color: #fff;
    }
  }
  .sidebar-menu {
    .menu-item {
      background-color: #484f59;
      border-top: 2px solid #6d717a;

      .title-wrapper {
        position: relative;
        padding: 1rem 4rem;

        &.has-sub-items {
          padding-bottom: 0.5rem;
        }

        &.active {
          background-color: $color_blue;
        }

        .title {
          font-weight: 800;
          font-size: 1.1rem;
        }

        .triangle {
          position: absolute;
          top: 20px;
          right: -10px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 0 10px 10px;
          border-color: transparent transparent transparent $color_blue;

          &.has-sub-items {
            top: 15px;
          }
        }
      }

      .sub-item {
        padding: 0.25rem 0.25rem 0.25rem 3.5rem;
        font-size: 1rem;

        &.router-link-exact-active {
          .link {
            font-weight: 600;
          }
        }
      }
    }
    #sidebar.active {
    margin-left: -280px;
}

    .link {
      color: white;
    }
  }
  
}
</style>
