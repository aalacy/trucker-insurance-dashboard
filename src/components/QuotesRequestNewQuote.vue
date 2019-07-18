<template>
  <div class="quotes-request-new-quote container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">
          Request a New Quote
        </h4>

        <div v-if="loading">
          Loading...
        </div>

        <!-- TODO -->

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
    this.$emit('update-hint', ' ');
  }
};
</script>

<style lang="scss" scoped></style>
