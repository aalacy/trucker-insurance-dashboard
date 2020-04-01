<template>
  	<div class="vehicles-and-trailers container-fluid">
	    <div class="card mb-5">
	      	<div class="card-body coverage-block">
	        	<h4 class="card-title form-sub-title mb-4">Payment History</h4>
	        	<div v-if="loading">Loading...</div>
		        <div class="" v-if="status">
		        	<div v-for="item in payments" :key="item.id" class="block-divider d-flex">
			            <div class="policy-image-wrapper px-1">
			              <img :src="item.img" alt class="policy-image">
			            </div>

			            <div class="policy-info px-3">
			              <div class="block-title">{{ item.title }}</div>

			              <div class="block-subtitle">
			                Date Paid:
			                <strong>{{ item.paidDate }}</strong>
			              </div>

			              <div class="block-subtitle">
			                Amount Paid:
			                <strong>$ {{ item.paidAmount }}</strong>
			              </div>
			          	</div>
			      	</div>
    	       </div>
	        </div>
	    </div>
	</div>
</div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: 'BillingPaymentHistory',
  data() {
    return {
      payments: [
        {
          id: 1,
          title: "ForAgentsOnly",
          paidDate: "May 24, 2019",
          img: "https://picsum.photos/200",
          paidAmount: "$1,000",
        },
        {
          id: 2,
          title: "StateFarm",
          paidDate: "May 24, 2019",
          img: "https://picsum.photos/200",
          paidAmount: "$1,200",
        }
      ],
      status: true,
      loading: false,
      error: null,
      policyId: ""
    };
  },
	created() {
		this.$emit("update-hint", "Helpful hints about current section that will guide the user through the steps, and onto the next section of the form, coinciding with the input field that is active.");
	}
};
</script>

<style lang="scss" scoped>
	.policy-image-wrapper {
	    height: 100px;
	    width: 100px;
	    min-width: 100px;
	    max-width: 100px;
	    display: flex;
	    align-items: center;
	    justify-content: center;

	    .policy-image {
	      border-radius: 15px;
	    }
	}
</style>
