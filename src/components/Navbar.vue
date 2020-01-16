<template>
  <div class="pat-abst">
    <div class="">
      <button type="button" class="btn ico-btna" @click="showHelp">
         <font-awesome-icon
          icon="question"
          size="2x"
          class="mr-4 color-fb ques d-flex justify-content-center"
      />
      </button>
      <button type="button" class="btn ico-btn" @click="showNav">
        <img src="../assets/images/hame.png" height="100" width="100" class="d-block mx-auto">
      </button>
      <div class="containeraa" :class="{'show': showLabel}">
        <transition-group name="fade" class="sidebar-menu text-center emergencya">
          <div v-for="(item, indexa) in itemsa" :key="indexa" class="menu-item p-2   navigation-links">
            <div>Need Help?</div>
            <div class="">Speak now with a licensed insurance agent</div>
<a href="tel:15135062400" class="bt-call ">Click to Talk</a>         
   <div class=" justify-content-center">
or call us 24/7?
              <div class="d-flex align-items-center  justify-content-center"><font-awesome-icon
                icon="phone-alt"
                size="1x"
                class=" color-fb d-flex  justify-content-center"
              /> <a href="tel:15135062400">1-513-506-2400</a></div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="pos-rel">
      <div class="containera " :class="{'show': showSidebar}">
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
              <img
                :src="item.icon"
                class=""
                alt="Account info"
              >
              <a class="title link">{{ item.title }}</a>

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
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";

export default {
  name: "SidebarMenu",
  methods: {
    showHelp() {
      if (this.showLabel) {
        this.showLabelLink = false;
        setTimeout(() => {
          this.showLabel = false;
        }, 500);
      } else {
        this.showLabel = true;
        setTimeout(() => {
          this.showLabelLink = true;
        }, 500);
      }
    },
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
      // msg:false,
      showSidebar: isMobile
        ? false
        : true,
      showLink: false,
      showLabel:  isMobile
        ? false
        : true,
      showLabelLink: false,
      itemsa:
      [
        {
          
        }
      ],

      items: [
        {
          title: "Account Info",
          to: { name: "NewAccountInfo" },
          icon: '/img/sidebar/account-info.png'
        },
        {
          title: "Quotes",
          to: { name: "Quotes" },
          icon: '/img/sidebar/quotes.png',
          subItems: [
            { title: "See All Quotes", 
              to: { name: "QuotesAllQuotes" }
            },
            {
              title: "Request New Quote",
              to: { name: "QuotesRequestNewQuote" }
            }
          ]
        },
        {
          title: "Policies",
          to: { name: "Policies" },
          icon: '/img/sidebar/policies.png',
          subItems: [
            { title: "Review Policies", to: { name: "PoliciesReview" } },
            { title: "+ / - Drivers", to: { name: "PoliciesDrivers" }  },
            {
              title: "+ / - Vehicles & Trailers",
              to: { name: "PoliciesVehiclesAndTrailers" }, 
              icon: '' 
            },
            { title: "Other Coverages", to: { name: "PoliciesOtherCoverages" }  }
          ]
        },
        {
          title: "Certificates",
          to: { name: "Certificates" },
          icon: '/img/sidebar/certificates.png',
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
          icon: '/img/sidebar/billing.png',
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
          icon: '/img/sidebar/resources.png',
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

.emergencya {
  background-color: #e3e3e3;
  //  height: 200px;
 
  // display: flex;
  text-align: center;
}
.pos-rel{
  position: relative;
}
.emergency {
  background-color: hsl(0, 0%, 89%);
  //  height: 200px;
  width: 280px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  // display: flex;
  text-align: center;
}
.bt-call {
  border-radius: 12px;
    color: #f7f7f7;
    background-color: #1c4894;
    height: 38px;
    display: block;
    max-width: 148px;
    line-height: 38px;
    margin: 0 auto;
}

.controla {
  position: absolute;
  z-index: 1;
  top: 1%;
}
.ques path   {
    fill: #fff;
}
.ico-btn,
.ico-btn span ,.ico-btna,
.ico-btna span{
  background-color: #5e98f9;
  color: #fff;
}
.ico-btn {
  width: 40px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 20px;
}
.ico-btna {
  width: 37px;
  padding: 9px;
  font-size: 11px;
  color: #fff;
  position: absolute;
  left: 0px;
  z-index: 1; 
}

.containera {
  // position: absolute;
  top: 165px;
  left: 0;
  width: 0px;
  max-height: 100%;
  // background-color: rgba($color: #81b121, $alpha: 0.8);
  border: solid #fff;
  border-width: 0 1px 0 0;
  transition: all 0.5s ease-in-out;
  overflow-y: auto;

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
        padding: 1rem 2rem;
        display: flex;
        // justify-content: center;
        align-items: center;

        &.has-sub-items {
          padding-bottom: 0.5rem;
        }

        &.active {
          background-color: $color_blue;
         
        }

        .title {
          font-weight: 800;
          font-size: 1.1rem;
          margin-left: 20px;
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
             text-decoration: underline
          }
        }
      }
    }
    #sidebar.active {
      margin-left: -280px;
    }

    .link {
      color: white;
      margin-left: 30px;
    }
  }
}
.containeraa {
  // position: absolute;
  top: 165px;
  left: 0;
  width: 0px;
    padding-top: 20px;
    height: 207px;
      background-color: #e3e3e3;
    
     /* border: solid #fff; */
  border-width: 0 1px 0 0;
  transition: all 0.5s ease-in-out;
  overflow-y: auto;
  position: relative;
  top: 0px;

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
      

      .title-wrapper {
        position: relative;
        padding: 1rem 2rem;
        display: flex;
        // justify-content: center;

        &.has-sub-items {
          padding-bottom: 0.5rem;
        }

        &.active {
          background-color: $color_blue;
        }

        .title {
          font-weight: 800;
          font-size: 1.1rem;
          margin-left: 20px;
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
