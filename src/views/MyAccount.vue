<template>
  <div class="container-fluid account-info">
    <div class="row">
      <div class="col p-0">
        <my-account-progress  />
      </div>
    </div>

    <div class="row main-wrapper">
      <div class="col sidebar d-none-mob">
        <navbar />
        
      </div>

      <div class="d-none-block">
        <navbar />
        
      </div>

      <div class="col row mob-hint forms">
        <div class="col-xs-12 col-sm-12 col-lg-8   col-md-12 pt-5 pb-5">
          <router-view
            @update-hint="updateHint"
            
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
export default {
  name: 'MyAccount',
  components: {
   
    'navbar':Navbar,
    FormHint: () => import('../components/FormHint.vue'),
    MyAccountProgress: () =>
      import('../components/MyAccountProgress.vue')
  },
  data() {
    return {
      // progress: Number(localStorage.getItem('accountInfoProgress')) || 0,
      hint: ''
    };
  },

  methods: {
  //   updateProgress(progress) {
  //     this.progress = progress;
  //     localStorage.setItem('accountInfoProgress', progress);
  //   },
    updateHint(hint = '') {
      this.hint = hint;
    },
  //   goToForm(routeName) {
  //     this.$router.push({ name: routeName });
  //     window.scrollTo(0, 0);
  //   }
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
