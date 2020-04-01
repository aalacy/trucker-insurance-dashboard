<template>
  <div ref="modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Please confirm this is your company</h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form @submit.prevent="confirm">
          <div class="modal-body">
            <table class="table table-stripped">
              <tr>
                <th>Name</th>
                <td>{{ name }}</td>
              </tr>

              <tr>
                <th>DOT</th>
                <td>{{ dot }}</td>
              </tr>

              <tr>
                <th>Location</th>
                <td>{{ location }}</td>
              </tr>
            </table>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-success">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'ModalConfirmCompany',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    dot: {
      type: String,
      required: true,
      default: ''
    },
    location: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    this.showModal();
  },
  methods: {
    showModal() {
      let modal = $(this.$refs.modal);
      modal.appendTo('body');
      modal.modal('show');
      modal.one('hidden.bs.modal', () => {
        this.$emit('close-modal');
      });
    },
    closeModal() {
      $(this.$refs.modal).modal('hide');
    },
    confirm() {
      this.closeModal();
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="scss" scoped></style>
