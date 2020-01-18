<template>
  	<div class="vehicles-and-trailers container-fluid">
	    <div class="card mb-5">
	      	<div class="card-body coverage-block">
	        	<h4 class="card-title form-sub-title mb-4">Payment Information</h4>
	        	<div v-if="loading">Loading...</div>
		        <div class="" v-if="status">
		        	<div class="block-divider">
			        	<div class="block-title mb-3">
			        		Payment Method
			        	</div>
			        	<div class="d-flex">
			        		<img src="/img/sidebar/visa.png" alt="visa" class="mr-3">
			        		<div class="block-subtitle">
			        			Card ending in ...8367
			        		</div>
			        	</div>
			        </div>
			        <div class="">
			        	<div class="block-title">
			        		Signed Authorization Form
			        	</div>
			        	<div>
			        	</div>
			        </div>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: 'BillingPaymentInformation',

  data() {
  	return {
  		status: true,
  		loading: false,
		error: null
	};
  },
  created() {
    this.$emit('update-hint', 'Helpful hints about current section that will guide the user through the steps,  onto the next section of the form, coinciding with the input field that is active.');
  }
};
</script>

<style lang="scss" scoped></style>
