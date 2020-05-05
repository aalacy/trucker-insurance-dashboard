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
          >{{ loading ? 'Processing...' : 'Download PDF' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { API } from "../api.js";
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
    downloadPDF (data, name) {
      const blob = new Blob([data], { type: "application/pdf;charset=utf-8;" })
      var link = document.createElement("a");

      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", name);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    async download() {
      // this.loading = true
      // const nicoPdf = await API.get(`company/nico?uuid=` + this.uuid)
      // this.downloadPDF(nicoPdf, "Nico.pdf")
      // const oldPdf = await API.get(`company/pdf?uuid=` + this.uuid);
      // this.downloadPDF(oldPdf, "App.pdf")
      // this.loading = false
      window.open(`${process.env.VUE_APP_BACKEND_URL}/company/nico?uuid=` + this.uuid, "nico_window")
      setTimeout(() => window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf?uuid=` + this.uuid, "app_window"), 1000);
      
    }
  }
};
</script>

<style lang="scss" scoped></style>
