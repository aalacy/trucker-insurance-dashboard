
<template>
  <div class="container-fluid account-info">
    <div class="row">
      <div class="col p-0">
        <account-info-account-progress :progress="progress" />
      </div>
    </div>

    <div class="row main-wrapper">
      <button type="button" class="btn ico-btn" @click="showNav">
        <img src="../assets/images/hame.png" height="100" width="100" class="d-block mx-auto">
      </button>
      <div class="col sidebar side-bg" :class="{'show': showSidebar}">
        <side />
      </div>
      <div class="col row mob-hint forms">
        <div class="col-xs-12 col-sm-12 col-lg-8   col-md-12 pt-5">
          <router-view
            @update-progress="updateProgress"
            @update-hint="updateHint"
            @go-to-form="goToForm"
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
import Navbar from '../components/Navbar.vue'
import { isMobile } from "mobile-device-detect";
export default {
  name: 'AccountInfo',
  components: {
    'side':Navbar,
    FormHint: () => import('../components/FormHint.vue'),
    AccountInfoAccountProgress: () =>
      import('../components/AccountInfoAccountProgress.vue')
  },
  data() {
    return {
      progress: Number(localStorage.getItem('accountInfoProgress')) || 0,
      hint: '',
      showSidebar: isMobile ? false : true,
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
    showNav() {
      this.showSidebar = !this.showSidebar;
    }
  }
};
</script>

<style lang="scss" scoped>
.d-none-block{
  display: none;
}

.mob-hint{
  width: 100%;
}
.account-info {
  .main-wrapper {
    flex-wrap: nowrap;
    position: relative;

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
      z-index: 12;
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

      @media (max-width: 768px) {
        margin-left: 0;
        margin-right: 0;
      }

      .hint-wrapper {
        padding-top: 1rem;
      }
    }
  }
}
</style>
