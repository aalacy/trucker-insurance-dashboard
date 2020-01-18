<template>
  	<div class="vehicles-and-trailers container-fluid">
	    <div class="card mb-5">
	      	<div class="card-body coverage-block">
	        	<h4 class="card-title form-sub-title mb-4">Optional Coverages</h4>
	        	<div v-if="loading">Loading...</div>
		        <div class="pr-4" v-if="status">
		           	<div class="d-flex w-100 block-divider">
			            <div class="optional-block mr-auto">
			              	<div class="block-title mb-3">
			              		{{motorTruckCargo.title}}
			              	</div>
			              	<div class="block-subtitle">
			              		<span>Deductible:</span>&nbsp
			                	<strong>{{motorTruckCargo.deductible}}</strong>
			              	</div>
			              	<div class="block-subtitle">
			              		<span>Refridgeration Breakdown:</span>&nbsp
			                	<strong>{{motorTruckCargo.refridgeration }}</strong>
			              	</div>
			            </div>
			            <button class="lt-button lt-button-main">Edit</button>
		          	</div>

		          	<div class="d-flex w-100 block-divider">
			            <div class="optional-block mr-auto">
			              	<div class="block-title mb-3">
			              		{{trailerInterchange.title}}
			              	</div>
			              	<div class="block-subtitle">
			              		<span>Value of unowned trailers:</span>&nbsp
			                	<strong>{{trailerInterchange.valeOfUnowned}}</strong>
			              	</div>
			              	<div class="block-subtitle">
			              		<span>Number of unowned trailers:</span>&nbsp
			                	<strong>{{trailerInterchange.numberOfUnowned }}</strong>
			              	</div>
			            </div>
			            <button class="lt-button lt-button-main">Edit</button>
		          	</div>

		          	<div class="d-flex w-100 block-divider">
			            <div class="optional-block mr-auto">
			              	<div class="block-title mb-3">
			              		{{generalLiability.title}}
			              	</div>
			              	<div class="block-subtitle">
			              		<span>Limit:</span>&nbsp
			                	<strong>{{generalLiability.limit}}</strong>
			              	</div>
			            </div>
			            <button class="lt-button lt-button-main">Edit</button>
		          	</div>
		          	<div class="w-100 block-divider">
		          		<div class="block-title mb-3 d-flex">
		          			<div class="mr-auto">Additional Insured</div>
		          			<div class="block-subtitle">
					            <strong class="mr-3">Add</strong>
					            <button class="btn btn-light border">+</button>
				          	</div>
		          		</div>
		          		<div v-for="item in additionalInsured" :key="item.id" class="additional-block">
			          		<div class="image-wrapper">
			          			<img :src="item.img" alt class="image">
			          		</div>
			          		<div>
			          			<div class="block-subtitle">
			          				{{item.name}}
			          			</div>
			          			<div class="block-subtitle">
			          				{{item.address}}
			          			</div>
			          			<div class="block-subtitle">
			          				{{item.city}}, {{item.city}} {{item.zip}}
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
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: 'PoliciesOtherCoverages',

  data() {
    return {
		accept: false,
		buttonHide: false,
		status: true,
		motorTruckCargo: {
			title: "Motor Truck Cargo",
			deductible: "$1,000",
			refridgeration : "Yes"
	    },
	    trailerInterchange: {
          title: "Trailer Interchange",
          valeOfUnowned: "$12,000",
          numberOfUnowned : "4"
        },
        generalLiability: {
        	title: "General Liability",
        	limits: "10"
        },
        additionalInsured: [
        	{
        		id: 1,
        		img: "https://picsum.photos/200",
        		name: 'John Smith',
        		address: '123 Elm St.',
        		city: 'New York',
        		state: 'NY',
        		zip: '10001'
        	}
        ],
		loading: false,
		error: null
	};
  },
  created() {
    this.$emit('update-hint', 'Helpful hints about current section that will guide the user through the steps,  onto the next section of the form, coinciding with the input field that is active.');
  }
};
</script>

<style lang="scss" scoped>
	.coverage-block {
		padding: 34px;
	}
	
	.optional-block {
		display: flex;
		flex-direction: column;
	}

	.image-wrapper {
	    height: 100px;
	    width: 100px;
	    min-width: 100px;
	    max-width: 100px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    margin-right: 1rem;

	    .image {
	      border-radius: 15px;
	    }
  	}

  	.additional-block {
  		display: flex;
  	}
</style>
