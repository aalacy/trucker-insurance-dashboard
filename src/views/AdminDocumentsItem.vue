<template>
  <div class="container">
    <h1 class="h3 mb-4">
      <router-link :to="{ name: 'AdminDocuments' }" class="text-reset">
        Documents</router-link
      >

      <span v-if="document">
        - {{ document.ownerFirstName }} {{ document.ownerLastName }}</span
      >
    </h1>

    <div v-if="loading">Loading...</div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <document-preview v-if="document" :document="document" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { API } from '../api.js';

export default {
  name: 'AdminDocumentsItem',
  components: {
    DocumentPreview: () =>
      import(/* webpackChunkName: "DocumentPreview" */
      '../components/DocumentPreview.vue')
  },
  filters: {
    date(str) {
      return dayjs(str).format('MMM DD, YYYY');
    },
    datetime(str) {
      return dayjs(str).format('MMM DD, YYYY [at] HH:mm');
    }
  },
  props: {
    docId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      document: null,
      loading: true,
      error: null
    };
  },
  created() {
    this.loadDocument();
  },
  methods: {
    async loadDocument() {
      this.loading = true;
      this.error = null;
      this.document = null;

      try {
        let data = await API.post('documents/admin/item', {
          _id: this.docId
        });

        this.document = data.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
