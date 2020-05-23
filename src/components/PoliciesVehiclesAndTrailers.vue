<template>
  <div class="vehicles-and-trailers container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <div class="d-flex">
          <h4 class="card-title form-sub-title flex-grow-1 mb-4">
            Vehicles & Trailers
          </h4>

          <div class="block-subtitle">
            <strong class="mr-3">Add a Vehicle/Trailer</strong>
            <button class="btn btn-light border"><strong>+</strong></button>
          </div>
        </div>

        <div v-if="loading">Loading...</div>
        <div class="d-flex flex-wrap" v-if="status">
           	<div v-for="item in vehicles" :key="item.id" class="col-6 mb-4 d-flex align-items-start flex-wrap">
	            <div class="vehicle-image-wrapper px-1">
	              <img :src="item.img" alt class="vehicle-image">
	            </div>

	            <div class="vehicle-info px-3">
	              	<div class="vehicle-title block-title mb-2">
	                	{{item.name}}
	              	</div>
		            <button class="lt-button lt-button-main" v-b-modal.confirm-modal>Remove</button>
		           
	            </div>
          	</div>
           <div v-if="buttonHide">
          	<div v-if="accept">
            <router-link
              :to="{ name: '' }"
              class="lt-button pad-10 lt-button-main viewvehicle m-2"
              active-class="font-weight-bold"
              @click.native="savevehicle"
            >Accept</router-link>
            <router-link
              :to="{ name: '' }"
              class="lt-button pad-10 lt-button-main viewquote m-2"
              active-class="font-weight-bold"
              @click.native="request"
            >Request a new quote</router-link>

            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          </div>
          <div v-else>
            <span>Quotation has been accepted.</span>
          </div>
        </div>
        </div>
        <div v-else>
          <span>
            Your application is complete, we should have an update for you soon. If you have any further questions about this, feel to call us at
            <a href="tel:15135062400" style="font-weight:bold; white-space:nowrap;">1-513-506-2400</a>
          </span>
        </div>
       
      </div>
    </div>
   	<b-modal id="confirm-modal"  hide-footer hide-header>
   		<div class="px-4">
		    <p class="my-4 modal-title">Are you sure you want to remove:</p>
		    <div class="d-flex mb-3">
			    <div class="vehicle-image-wrapper px-1">
		          	<img src="/img/sidebar/quote-1.png" alt class="vehicle-image">
		        </div>

		        <div class="vehicle-info px-3">
		          	<div class="vehicle-title vehicle-title2 mb-2">
		            	Vehicle 1
		          	</div>
		      	</div>
	      	</div>
	      	<input type="text" name="signature" class="form-control mb-3">

	      	<div class="d-flex justify-content-end">
	      		<button class="lt-button lt-button-grey mr-3" @click="$bvModal.hide('confirm-modal')">Cancel</button>
	      		<button class="lt-button lt-button-main">Remove</button>
	      	</div>
      	</div>
  	</b-modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import axios from "axios";

  export default {
    name: 'PoliciesVehiclesAndTrailers',

    data() {
      return {
        accept: false,
        buttonHide: false,
        status: true,
        vehicles: [
          {
            id: 1,
            name: "Vehicle 1",
            img: "/img/sidebar/quote-1.png"
          },
          {
            id: 2,
            name: "Vehicle 2",
            img: "/img/sidebar/quote-2.png"
          },
          {
            id: 3,
            name: "Vehicle 3",
            img: "/img/sidebar/quote-1.png"
          },
          {
            id: 4,
            name: "Vehicle 4",
            img: "/img/sidebar/quote-2.png"
          }
        ],
        loading: false,
        error: null
      };
    },
    
    created() {
      this.$emit('update-hint', 'Please be sure that all vehicles currently operating under your authority are added to your current policy. Please use this section to add or subtract vehicles.');
    },

    computed: {
      ...mapState(["auth"]),
    }
  };
</script>


<style lang="scss" scoped>
  .vehicle-image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .vehicle-image {
      border-radius: 15px;
    }
  }

  .vehicle-info {
    .vehicle-title {
      color: #5e98f9;
    }

    .vehicle-subtitle {
      font-size: 0.8rem;
    }
  }
  .clr {
    color: #007bff;
    cursor: pointer;
  }

  .modal-title {
  	font-weight: 700;
  }
</style>

