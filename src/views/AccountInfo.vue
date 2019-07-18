<template>
  <div class="container-fluid account-info">
    <div class="row">
      <div class="col p-0">
        <account-info-account-progress :progress="progress" />
      </div>
    </div>

    <div class="row main-wrapper">
      <div class="col sidebar d-none-mob">
        <side />
        <!-- <router-link
        :to="{ name: 'side' }"
        class="navbar-brand font-weight-bold lt-link"
        >yaa
        </router-link> -->
      </div>

      <div class="d-none-block">
        <side />
        <!-- <router-link> -->
          <!-- <router-link
        :to="{ name: 'side' }"
        class="navbar-brand font-weight-bold lt-link"
        >
        </router-link> -->
      </div>

      <div class="col row mob-hint forms">
        <div class="col-xs-12 col-sm-12 col-lg-8   col-md-12 pt-5 pb-5">
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
import SidebarMenu from '../components/SidebarMenu.vue'
export default {
  
  name: 'AccountInfo',
  components: {
   
    'side':SidebarMenu,
    FormHint: () => import('../components/FormHint.vue'),
    AccountInfoAccountProgress: () =>
      import('../components/AccountInfoAccountProgress.vue')
  },
  data() {
    return {
      progress: Number(localStorage.getItem('accountInfoProgress')) || 0,
      hint: ''
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
    }
  }
};
</script>

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }

.d-none-block{
  display: none;
}

.mob-hint{
  width: 100%;
}
.account-info {
  .main-wrapper {
    flex-wrap: nowrap;

    .sidebar {
      padding: 0;
      width: 300px;
      min-width: 300px;
      max-width: 300px;
    }

    .forms {
      padding: 0;
      margin: 0;

      .hint-wrapper {
        padding-top: 7rem;
      }
    }
  }
}
</style>
