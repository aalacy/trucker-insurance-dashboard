<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body cert-block">
        <h4 class="card-title form-sub-title mb-4">Safety & Mainternance Tool Tips</h4>

        <div v-if="loading">Loading...</div>
        <div v-if="status">
          <div v-for="item in tooltips" :key="item.id" class="d-flex block-divider">
            <div class="image-wrapper px-1">
              <img :src="item.img" alt class="image">
            </div>

            <div class="pl-4">
              <div class="block-title mb-2">{{ item.name }}</div>
              <div class="block-subtitle mb-2">{{ item.content }}</div>
            </div>
          </div>
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
  	name: 'ResoursesRiskManagement',

  	data() {
	    return {
	      tooltips: [
	        {
	          id: 1,
	          name: "Tool Tip 1",
	          img: "https://picsum.photos/200",
	          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
	        },
	        {
	          id: 2,
	          name: "Tool Tip 2",
	          img: "https://picsum.photos/200",
	          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
	        }
	      ],
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
.cert-block {
  padding: 34px;

  .image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .image {
      border-radius: 15px;
    }
  }

  .policy-info {

    .clr {
      color: #007bff;
      cursor: pointer;
    }
  }
}
</style>
