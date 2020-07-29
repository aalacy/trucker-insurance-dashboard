<template>
  <div>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
          
				  <b-form-row class='mb-2'>
				  	<b-col cols="12" md="6">
              <div class="question-block">
              	<span class="question">Will lessor be added as additional insured?</span>
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  :sync="true"
                  class="mb-0"
                  v-model="form.Q60"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q60" class='mb-2'>
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, give me name and address of lessor of each vehicle"
                label-for="Q61"
              >
                <b-form-textarea 
                  type="number"
                  id="Q61"
                  rows="2"
                  v-model="$v.form.Q61.$model"
                  :state="validateState('Q61')"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
				  </b-form-row>
				  <b-form-row class="mb-2">
				  	<b-col cols="12">
              <b-form-group
                class="mb-0"
                label="Number of vehicles owned:"
              >
              	<b-form-row class="mb-2">
				  				<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q62_pick_ups.$model"
		                  :state="validateState('Q62_pick_ups')"
		                  placeholder="Pick-ups"
		                ></b-form-input>
			            </b-col>
			            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q62_trucks.$model"
		                  :state="validateState('Q62_trucks')"
		                  placeholder="Trucks"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q62_tractors.$model"
		                  :state="validateState('Q62_tractors')"
		                  placeholder="Tractors"
		                ></b-form-input>
		            </b-col>
			        </b-form-row>
			        <b-form-row>
					  	<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q62_semi_trailers.$model"
		                  :state="validateState('Q62_semi_trailers')"
		                  placeholder="Semi-Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q62_trailers.$model"
		                  :state="validateState('Q62_trailers')"
		                  placeholder="Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q62_pup_trailers.$model"
		                  :state="validateState('Q62_pup_trailers')"
		                  placeholder="Pup-Trailers"
		                ></b-form-input>
		            </b-col>
		        	</b-form-row>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
		  			<b-col cols="12">
              <b-form-group
                class="mb-0"
                label="Number of vehicles leased:"
              >
              	<b-form-row class="mb-2">
				  				<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q63_pick_ups.$model"
		                  :state="validateState('Q63_pick_ups')"
		                  placeholder="Pick-ups"
		                ></b-form-input>
		            	</b-col>
		            	<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q63_trucks.$model"
		                  :state="validateState('Q63_trucks')"
		                  placeholder="Trucks"
		                ></b-form-input>
			            </b-col>
			            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q63_tractors.$model"
		                  :state="validateState('Q63_tractors')"
		                  placeholder="Tractors"
		                ></b-form-input>
			            </b-col>
				        </b-form-row>
				        <b-form-row>
						  	<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q63_semi_trailers.$model"
		                  :state="validateState('Q63_semi_trailers')"
		                  placeholder="Semi-Trailers"
		                ></b-form-input>
			            </b-col>
			            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q63_trailers.$model"
		                  :state="validateState('Q63_trailers')"
		                  placeholder="Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="$v.form.Q63_pup_trailers.$model"
		                  :state="validateState('Q63_pup_trailers')"
		                  placeholder="Pup-Trailers"
		                ></b-form-input>
		            </b-col>
		        </b-form-row>
              </b-form-group>
            </b-col>
          </b-form-row>
				  <b-card
				    header="PHYSICAL DAMAGE COVERAGE"
				    header-text-variant="black"
				    header-bg-variant="white"
				    header-tag="header"
				    class="mb-3"
				    style="border-radius: 0.25rem !important;"
				  >
				    <b-card-text>
				    	<b-form-row class="mb-2">
				    		<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Date Published"
		                label-for="Q65"
		              >
		                <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q65.$model" :state="validateState('Q65')" class="mb-2"></b-form-datepicker>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Cost When Purchased"
		                label-for="Q66"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q66"
		                  v-model="$v.form.Q66.$model"
		                  :state="validateState('Q66')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
				    	</b-form-row>
				    	<b-form-row class="mb-2">
				    		<b-col cols="12" md="4">
		              <b-form-group
		                class="mb-0"
		                label="Current Stated Value"
		                label-for="Q67"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q67"
		                  v-model="$v.form.Q67.$model"
		                  :state="validateState('Q67')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="8">
		              <b-form-group
		                class="mb-0"
		                label="Value of Permanently Attached Special Equipment"
		                label-for="Q68"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q68"
		                  v-model="$v.form.Q68.$model"
		                  :state="validateState('Q68')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
				    	</b-form-row>
				    	<b-form-row class="mb-2">
				    		<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Total Stated Amount to be Insured"
		                label-for="Q69"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q69"
		                  v-model="$v.form.Q69.$model"
		                  :state="validateState('Q69')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Comprehensive or Spec. C of Loss?"
		                label-for="Q70"
		              >
		                <b-form-select v-model="$v.form.Q70.$model" :state="validateState('Q70')" :options="Q70Q71Options"></b-form-select>
		              </b-form-group>
		            </b-col>
				    	</b-form-row>
				    	<b-form-row class="mb-2">
				    		<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Collision"
		                label-for="Q72"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q72"
		                  v-model="$v.form.Q72.$model"
		                  :state="validateState('Q72')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Cargo Limit of Insurance"
		                label-for="Q73"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q73"
		                  v-model="$v.form.Q73.$model"
		                  :state="validateState('Q73')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
				    	</b-form-row>
				    </b-card-text>
				  </b-card>
          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      	</div>
      	<div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="button"
                class="lt-button lt-button-default btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title">Questions</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Questions</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
  	</form>
  </div>
</template>

<script>
import { ifMinMaxLength } from "../../util.js";
import { NicoMixin } from "./NicoMixin.js";
import { validationMixin } from "vuelidate";
import { required, requiredIf, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "NicoQuestions3",

  mixins: [validationMixin, NicoMixin],

  props: {
    prevForm: {
      type: String,
      required: true
    },
    nextForm: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  },

  validations: {
    form: {
      Q61: {
      	required: requiredIf( function() {
          return this.form.Q60
        }),
      },
      Q62_pick_ups: {
      	required
      },
      Q62_trucks: {
      	required
      },
      Q62_tractors: {
      	required
      },
      Q62_semi_trailers: {
      	required
      },
      Q62_trailers: {
      	required
      },
      Q62_pup_trailers: {
      	required
      },
      Q63_pick_ups: {
      	required
      },
      Q63_trucks: {
      	required
      },
      Q63_tractors: {
      	required
      },
      Q63_semi_trailers: {
      	required
      },
      Q63_trailers: {
      	required
      },
      Q63_pup_trailers: {
      	required
      },
      Q65: {
      	required
      },
      Q66: {
      	required
      },
      Q67: {
      	required
      },
      Q68: {
      	required
      },
      Q69: {
      	required
      },
      Q70: {
      	required
      },
      Q72: {
      	required
      },
      Q73: {
      	required
      },
    }
  }
}
</script>