<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <h4 class="form-sub-title">Account Info</h4>

        <p
          class="font-weight-bold"
        >After we process your information, we should be able to get you the first few quotes within 24 hours but some of them may take some time, due to the insurance company being used. A representative will call you to discuss options as soon as they are able.</p>
      </div>

      <div class="card-footer">
        <form @submit.prevent="download">
          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

          <button
            :disabled="loading"
            type="submit"
            class="btn btn-primary btn-block"
          >{{ loading ? 'Loading...' : 'Download PDF' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotesAccountInfo',
  data() {
    return {
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit('update-hint', "Please enter your certificate information here. If a certificate isn't generated right away, one from our team will manually generate it for you.");
  },

  mounted () {
    this.uuid = localStorage.getItem('uuid')
  },

  methods: {
    download() {
      window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf?uuid=` + this.uuid);
    }
  }
};
</script>

<style lang="scss" scoped></style>
