
<template>
  <div class="container-fluid account-info">
    <div class="row">
      <div class="col p-0">
        <account-info-account-progress :progress="progress" />
      </div>
    </div>

    <div class="row main-wrapper">
      <button type="button" class="btn ico-btn" @click="showNav" :class="{'show': !showSidebar}">
        <img src="../assets/images/hame.png" height="100" width="100" class="d-block mx-auto">
      </button>
      <div class="col sidebar side-bg" :class="{'show': showSidebar}">
        <side @showNav="showNav"/>
      </div>
      <div class="col row mob-hint forms">
        <div class="col-xs-12 col-sm-12 col-lg-8 col-md-12 form-wrapper">
          <router-view
            @update-progress="updateProgress"
            @update-hint="updateHint"
            @go-to-form="goToForm"
            @update-us-dot="updateUSDot"
          />
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 hint-wrapper">
          <form-hint v-show="hint" :hint="hint" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SidebarMenu from '../components/SidebarMenu.vue'
import { isMobile } from "mobile-device-detect";
export default {
  name: 'AccountInfo',
  components: {
    'side': SidebarMenu,
    FormHint: () => import('../components/FormHint.vue'),
    AccountInfoAccountProgress: () =>
      import('../components/AccountInfoAccountProgress.vue')
  },
  data() {
    return {
      progress: Number(localStorage.getItem('accountInfoProgress')) || 0,
      hint: '',
      showSidebar: window.innerWidth <= 768 ? false : true,
    };
  },
  methods: {
    updateProgress(progress) {
      this.progress = progress;
      localStorage.setItem('accountInfoProgress', progress);
    },
    updateHint(hint = '') {
      this.hint = hint;
    },
    goToForm(routeName) {
      this.$router.push({ name: routeName });
      window.scrollTo(0, 0);
    },
    updateUSDot(value) {
      this.US_DOT_or_company_name = value;
    },
    showNav() {
      this.showSidebar = !this.showSidebar;
    }
  }
};
</script>

<style lang="scss" scoped>
.mob-hint{
  width: 100%;
}
.account-info {
  .main-wrapper {
    flex-wrap: nowrap;
    position: relative;
    min-height: 550px;

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
      top: 9px;
      z-index: 12;
      opacity: 0;
      transition: all 1.5s ease;

      &.show {
        opacity: 1;
      }
    }

    .sidebar {
      padding: 0;
      max-width: 250px;
      position: absolute;
      height: 100%;
      left: -250px;
      transition: all .35s ease;
      z-index: 5;

      &.show {
        left: 0;
      }
    }

    .forms {
      padding: 0;
      margin-left: 250px;
      margin-right: 20px;

      .form-wrapper {
        order: 1;
        padding-top: 1.25rem;
        padding-bottom: 1.2rem;
      }

      .hint-wrapper {
        padding-top: 1rem;
        order: 2;
      }

      @media (max-width: 768px) {
        & {
          margin: 0 auto;
        }

        & .form-wrapper {
          order: 2;
          margin-top: 10px;
        }

        & .hint-wrapper { 
          order: 1;
        }
      }

    }
  }
}
</style>
