<template>
  <div class="thank-you-form container-fluid mob-2">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Thank You!</h4>

        <p class="font-weight-bold">
          A rep will call you within 24hrs to discuss. You will receive your
          first few quotes within 24 hrs, some insurance companies take longer
          than others, we will make sure to present quotes to you as they come
          in.
        </p>
      </div>

      <div class="card-footer">
        <form @submit.prevent="download">
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>

          <button
            :disabled="loading"
            type="submit"
            class="lt-button lt-button-main btn-block"
          >
            {{ loading ? 'Loading...' : 'Download PDF' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from '../api.js';

export default {
  name: 'AccountInfoThankYou',
  props: {
    progress: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit('update-progress', this.progress);
    this.loadCompany();
  },
  methods: {
    download() {
      window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf`);
      // window.open(`localhost:3000/api/company/pdf`);
    },
    // async download() {
    //   this.loading = true;
    //   this.error = null;

    //   try {
    //     let data = await API.get('company/pdf', null, {
    //       responseType: 'blob'
    //     });

    //     if (data.status === 'ERROR') {
    //       this.error = data.messages[0] || data.data;
    //     } else {
    //       let blob = new Blob([data], { type: 'application/pdf' });
    //       let url = window.URL.createObjectURL(blob);
    //       window.open(url);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     this.error = err.message;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get('company/current');

        if (data.status === 'ERROR') {
          // this.$router.replace({ name: 'Home' });
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
// div {
//   outline: 1px solid red;
// }
</style>
