<template>
  <div class="container">
    <h1 class="h3 mb-4">Documents</h1>

    <div v-if="loading">Loading...</div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="documents.length" class="table-responsive-sm">
      <table class="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Owner</th>
            <th>DOB</th>
            <th>DOT</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="doc in documents" :key="doc._id">
            <td>{{ doc.email }}</td>
            <td>{{ doc.ownerFirstName }} {{ doc.ownerLastName }}</td>
            <td>{{ doc.ownerDOB | date }}</td>
            <td>{{ doc.resultDOT }}</td>
            <td>{{ doc.createdAt | datetime }}</td>
            <th>
              <router-link
                :to="{ name: 'AdminDocumentsItem', params: { docId: doc._id } }"
              >
                <button type="button" class="btn btn-info">
                  Show
                </button>
              </router-link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { API } from '../api.js';

export default {
  name: 'AdminDocuments',
  filters: {
    date(str) {
      return dayjs(str).format('MMM DD, YYYY');
    },
    datetime(str) {
      return dayjs(str).format('MMM DD, YYYY [at] HH:mm');
    }
  },
  data() {
    return {
      documents: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.loadDocuments();
  },
  methods: {
    async loadDocuments() {
      this.loading = true;
      this.error = null;
      this.documents = [];

      try {
        let data = await API.post('documents/admin/list');
        // sort by createdAt. newest above.
        this.documents = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
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
