<template>
  <div class="quotes-request-new-quote container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="form-sub-title">
          Request a New Quote
        </h4>

        <div v-if="loading">
          Loading...
        </div>

        <div class="row">
          <div class="col">
            <router-link
              :to="{ name: 'AccountInfoThankYou' }"
              class="btn btn-primary lt-btn"
              active-class="font-weight-bold"
            >Information Is Same</router-link>
          </div>
          <div class="col">
            <router-link
              :to="{ name: 'AccountInfoPersonalInfo' }"
              class="btn btn-secondary lt-btn"
              active-class="font-weight-bold"
            >Information Is Different</router-link>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotesRequestNewQuote',
  data() {
    return {
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit('update-hint', "Please enter your certificate information here. If a certificate isn't generated right away, one from our team will manually generate it for you.");
  }
};
</script>

<style lang="scss" scoped></style>
