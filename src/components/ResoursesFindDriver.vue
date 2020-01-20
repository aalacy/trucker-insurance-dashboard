<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body cert-block">
        <h4 class="card-title form-sub-title mb-4">Find a Driver</h4>

        <div v-if="loading">Loading...</div>
        <div v-if="status">
			<div class="block-title mb-2">Driver Criteria</div>
			<b-form-input v-model="text" placeholder="Enter terms separated by comma"></b-form-input>
			<button type="button" class="lt-button lt-button-main mt-3">
	          Search for Drivers
	        </button>
        </div>
        <div v-else>
          <span>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a
              href="tel:15135062400"
              style="font-weight:bold; white-space:nowrap;"
            >1-513-506-2400</a>
          </span>
        </div>

        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  	name: 'ResoursesFindDriver',

  	data() {
	    return {
	      loading: false,
	      error: null,
	      policyId: "",
	      status: true
	    };
	  },
	  methods: {
	    openInNewWindow() {
	      window.open(this.quotes[0].document);
	    }
	  },
	  mounted() {

	  },
	  created() {
	    this.$emit("update-hint", "Helpful hints about current section that will guide the user through the steps, and onto the next section of the form, coinciding with the input field that is active.");
	  }
	};
</script>

<style lang="scss" scoped>
	
</style>
