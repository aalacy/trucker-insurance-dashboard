<template>
	<div class="policies-review container-fluid">
	    <div class="card mb-5">
	      	<div class="card-body cert-block">
	      		<form class="custom_form" @submit.prevent="requestCertificate">
			        <h4 class="card-title form-sub-title mb-4">Certificates</h4>
		      		<div v-if="loading" class="col-12 mb-2">
			          	<img
			              src="../assets/images/loading/loading_truck_128.gif"
			              class="d-block mx-auto rounded"
			              alt="Loading"
			            >
			        </div>
			  		<div class="row">
			            <div class="col-12 col-lg-5">
			              <div class="form-group">
			                <input
			                 	v-model="certData.firstName"
			                  	type="text"
			                  	class="lt-input"
			                  	placeholder="First name"
			                  	:class="{ 'has-error': formErrors.firstName }"
			                  	@change="validateField('lastName')"
		                  		@focus="onFocus('lastName')"
		                 	 	@blur="onBlur"
		                 	 	required
			                >
			                <div v-if="formErrors.firstName" class="text-danger">{{ formErrors.firstName }}</div>
			              </div>
			            </div>

			          	<div class="col-12 col-lg-5">
			                <div class="form-group">
			                  <input
			                    v-model="certData.lastName"
			                    :class="{ 'has-error': formErrors.lastName }"
			                    type="text"
			                    class="lt-input"
			                    placeholder="Last name"
			                    required
			                    @change="validateField('lastName')"
			                  	@focus="onFocus('lastName')"
		                 	 	@blur="onBlur"
			                  >

			                  <div v-if="formErrors.lastName" class="text-danger">{{ formErrors.lastName }}</div>
			                </div>
		              	</div>
		            </div>
		            <div class="row">
			            <div class="col">
			              <div class="form-group">
			                <input
			                  v-model="certData.address"
			                  :class="{ 'has-error': formErrors.address }"
			                  type="text"
			                  class="lt-input"
			                  placeholder="Street Address*"
			                  required
			                  @change="validateField('address')"
			                  @focus="onFocus('address')"
			                  @blur="onBlur"
			                >
			                <div v-if="formErrors.address" class="text-danger">{{ formErrors.address }}</div>
			              </div>
			            </div>
			          </div>

			          <div class="row">
			            <div class="col-12 col-md-6 col-lg-6 ">
			              <div class="form-group">
			                <input
			                  v-model="certData.city"
			                  :class="{ 'has-error': formErrors.city }"
			                  type="text"
			                  class="lt-input"
			                  placeholder="City*"
			                  required
			                  @change="validateField('city')"
			                  @focus="onFocus('city')"
			                  @blur="onBlur"
			                >

			                <div v-if="formErrors.city" class="text-danger">{{ formErrors.city }}</div>
			              </div>
			            </div>

			            <div class="col-12 col-md-6 col-lg-6 ">
			              <div class="form-group">
			                <input
			                  v-model="certData.state"
			                  :class="{ 'has-error': formErrors.state }"
			                  type="text"
			                  class="lt-input"
			                  placeholder="State/Province"
			                  required
			                  @change="validateField('state')"
			                  @focus="onFocus('state')"
			                  @blur="onBlur"
			                >

			                <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
			              </div>
			            </div>
		          	</div>

		          	<div class="row">
			            <div class="col-12 col-md-6 col-lg-6 ">
			              <div class="form-group">
			                <input
			                  v-model="certData.zip"
			                  :class="{ 'has-error': formErrors.zip }"
			                  type="text"
			                  class="lt-input"
			                  placeholder="Zip Code*"
			                  required
			                  minlength="5"
			                  @change="validateField('zip')"
			                  @focus="onFocus('zip')"
			                  @blur="onBlur"
			                >
			                <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip }}</div>
			              </div>
			            </div>
		          	</div>
		          	<div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
		          	<div class="row mt-3">
		          		<div class="col-12 col-md-6 col-lg-6 ">
			              	<div class="form-group">
				          		<button
					                :disabled="loading"
            						type="submit"
					                class="lt-button lt-button-main mt-3 mb-3"
					              >Request a Certificate</button>
				          	</div>	
			         	</div>
		          	</div>
	          	</form>
	        </div>
	    </div>
	</div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import axios from "axios";
import { API } from "../api.js";
import { mapState, mutations } from "vuex";
export default {
  	name: 'CertificatesRequestNewCertificate',

  	mounted() {
    	this.$emit("update-hint", "Please be sure that the mailing address is where you want to receive physical documents. The garage address is where you keep your truck.");
	},

  	data() {
	  	return {
	  		certData: {
	  			firstName: "",
	  			lastName: "",
		        address: "",
		        city: "",
		        state: "",
		        zip: "",
	      	},
	      	rules: {
		        firstName: [required],
		        lastName: [required],
		        address: [required],
		        city: [required],
		        state: [required],
		        zip: [required],
	      	},
	      	formErrors: {},
	      	hints: {
		        firstName: "Please enter your name",
		        lastName: "Please enter your name",
		        address: "Please enter address",
		        state: "Please enter state of address",
		        city: "Please enter city of address",
		        zip: "Please enter zipcode of address",
	      	},
	   		loading: false,
	      	error: null,
	      	dotId: '',
	      	userId: '',
	      	uuid: ''
	  	}
  	},

  	computed: {
  		address () {
  			return `${this.certData.address} ${this.certData.city} ${this.certData.state}, ${this.certData.zip}`
  		}
  	},

  	methods: {
	 	onFocus(fieldName) {
	      this.$emit("update-hint", this.hints[fieldName]);
	    },

	    onBlur() {
	      this.$emit("update-hint", "Please be sure that the mailing address is where you want to receive physical documents. The garage address is where you keep your truck.");
	    },

	    validateField(fieldName) {
	      validateField(fieldName, this.certData, this.rules, this.formErrors);
	    },

	    validateForm() {
	      this.formErrors = {};
	      return validateForm(this.certData, this.rules, this.formErrors);
	    },

	    async requestCertificate () {
	    	this.loading = true
			let res = await API.post("company/coi/new", {
				certData: this.certData,
				userId: this.userId
			});

			this.loading = false;
			if (res.status == 'ok') {
				this.pdf = res.pdf
			} else {
				this.error = res.message
			}
	    },
  	},

  	mounted() {
	    this.dotId = localStorage.getItem('usdot');
	    this.userId = localStorage.getItem('userId');
	    this.uuid = localStorage.getItem('uuid');
	},
};
</script>

<style lang="scss" scoped></style>
