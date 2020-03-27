<template>
  <div class="controla">
    <div class="containera">
      <div name="fade" class="sidebar-menu">
        <div class="menu-item sidebar-brand">
          <div class="ml-auto mr-2" @click="showNav">
            <font-awesome-icon class="fontawesome" :icon="['fas', 'times']" />
          </div>
          <b class="pl-2">Pro Version</b>
        </div>
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
            <a class="link" v-if="subItem.direct" href="https://" taget="_blank">{{ subItem.title }}</a>
            <a class="link" v-else="subItem.direct">{{ subItem.title }}</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";

export default {
  name: "SidebarMenu",
  methods: {
    showNav() {
      this.$emit("showNav")
    }
  },
  
  data() {
    return {
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
            { title: "Freight Board", to: { name: "ResoursesFreightBoard" } },
            { title: "Digital Accountant", to: { name: "ResoursesDigitalAccountant" }, direct: true, link: "http://bench.co/partner/luckytruck" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
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
  height: 100%;
  overflow-y: auto;
  padding-right: 20px;
  direction: rtl;
}
.ques path   {
    fill: #fff;
}

.containera {
  max-height: 100%;
  transition: all 0.5s ease-in-out;
 

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
    .sidebar-brand {
      direction: rtl;
      display: flex;
      padding: .5rem;
    }

    .menu-item {
      background-color: #484f59;
      border-top: 2px solid #6d717a;

      .title-wrapper {
        position: relative;
        padding: 0.675rem 1rem 0.675rem 1rem;
        display: flex;
        align-items: center;
         direction:ltr;

        &.active {
          background-color: $color_blue;
        }

        .title {
          font-weight: 800;
          font-size: 1.1rem;
          margin-left: 1rem;
        }

        &.active:after {
          left: 100%;
          display: block;
          position: absolute;
          top: 17px;
          right: 0;
          width: 0;
          height: 0;
          content: "";
          border-style: solid;
          border-width: 8px 0 8px 8px;
          border-color: transparent transparent transparent #5e98f9;
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
        padding: 0.25rem 0.25rem 0.25rem 1.5rem;
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

</style>
