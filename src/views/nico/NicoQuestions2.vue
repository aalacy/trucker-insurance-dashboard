<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
		  		<b-form-row class="mb-2">
            <b-col cols="12" md="8">
              <div class="question-block">
                <span class="question">Do you hire any vehicles?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q27"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q27" class="mb-2">
            <div class="font-weight-bold">Complete Hired and Non-Owned Supplemental Questionnaire if coverage is desired.</div>
          </b-form-row>
          <b-card
          	v-if="form.Q27"
				    header="LIABILITY COVERAGE"
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
		                label="Combined Single Limit BI & PD"
		                label-for="Q30"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q30"
		                  v-model="$v.form.Q30.$model"
		                  :state="validateState('Q30')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
				  			<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Bodily Injury"
		                label-for="Q30"
		              >
		              	<b-form-row id="Q30">
		              		<b-col>
				                <b-form-input 
				                  type="number"
				                  placeholder="Per Person"
				                  v-model="$v.form.Q31_1.$model"
				                  :state="validateState('Q31_1')"
				                ></b-form-input>
				            </b-col>
				            <b-col>
				                <b-form-input 
				                  type="number"
				                  placeholder="Per Accident"
				                  v-model="$v.form.Q31_2.$model"
				                  :state="validateState('Q31_2')"
				                ></b-form-input>
				            </b-col>
		              	</b-form-row>
		              </b-form-group>
		            </b-col>
						  </b-form-row>
						  <b-form-row class="mb-2">
						  	<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Property Damage (Per Person)"
		                label-for="Q32"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q32"
		                  v-model="$v.form.Q32.$model"
		                  :state="validateState('Q32')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Medical Payments"
		                label-for="Q33"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q33"
		                  v-model="$v.form.Q33.$model"
		                  :state="validateState('Q33')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		          </b-form-row>
		          <b-form-row>
		          	<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Personal Injury Protection"
		                label-for="Q34"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q34"
		                  v-model="$v.form.Q34.$model"
		                  :state="validateState('Q34')"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		          </b-form-row>
			    </b-card-text>
				</b-card>
			    <b-card
			    	v-if="form.Q27"
				    header="UNINSURED MOTORIST COVERAGE"
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
			                label="Single Limit"
			                label-for="Q36"
			              >
			                <b-form-input 
			                  type="number"
			                  id="Q36"
			                  v-model="$v.form.Q36.$model"
			                  :state="validateState('Q36')"
			                ></b-form-input>
			              </b-form-group>
			            </b-col>
			            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Bodily Injury"
		                label-for="Q37"
		              >
		              	<b-form-row id="Q37">
		              		<b-col>
				                <b-form-input 
				                  type="number"
				                  placeholder="Per Person"
				                  v-model="$v.form.Q37_1.$model"
				                  :state="validateState('Q37_1')"
				                ></b-form-input>
				            </b-col>
				            <b-col>
				                <b-form-input 
				                  type="number"
				                  placeholder="Per Accident"
				                  v-model="$v.form.Q37_2.$model"
				                  :state="validateState('Q37_2')"
				                ></b-form-input>
				            </b-col>
		              	</b-form-row>
		              </b-form-group>
		            </b-col>
			        </b-form-row>
			    </b-card-text>
				</b-card>
				<b-card
					v-if="form.Q27"
				    header="Driver Information"
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
			                label="DL Year's Licensed (In Class Type)"
			                label-for="Q38"
			              >
			                <b-form-input 
			                  type="number"
			                  id="Q38"
			                  v-model="$v.form.Q38.$model"
			                  :state="validateState('Q38')"
			                ></b-form-input>
			              </b-form-group>
			            </b-col>
			    				<b-col cols="12" md="6">
			              <b-form-group
			                class="mb-0"
			                label="Type of Unit (Bus, Van, Truck, Tractor, etc.)"
			                label-for="Q39"
			              >
			                <b-form-input 
			                  id="Q39"
			                  v-model="$v.form.Q39.$model"
			                  :state="validateState('Q39')"
			                ></b-form-input>
			              </b-form-group>
			            </b-col>
					    	</b-form-row>
					    	<b-form-row>
					    		<b-col cols="12" md="6">
			              <b-form-group
			                class="mb-0"
			                label="Number of Years Driving"
			                label-for="Q40"
			              >
			                <b-form-input 
			                  type="number"
			                  id="Q40"
			                  v-model="$v.form.Q40.$model"
			                  :state="validateState('Q40')"
			                ></b-form-input>
			              </b-form-group>
			            </b-col>
			    	</b-form-row>
			    </b-card-text>
				</b-card>
				<b-card
					v-if="form.Q27"
			    header="Driver Information (Continued)"
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
                label="Previous Commercial Driving Experience - years"
                label-for="Q41"
              >
                <b-form-input 
                  type="number"
                  id="Q41"
                  v-model="$v.form.Q41.$model"
                  :state="validateState('Q41')"
                ></b-form-input>
              </b-form-group>
            </b-col>
		    	</b-form-row>
		    	<b-form-row class="mb-2">
		    		<b-col cols="12">
	              <b-form-group
	                class="mb-0"
	                label="Accidents and Minor Moving Traffic Violations in Past 5 Years"
	                label-for="Q42"
	              >
	              	<b-form-row id="Q41">
	              		<b-col cols="12" md="6">
			                <b-form-input 
			                  type="number"
			                  placeholder="No. of Accidents"
			                  v-model="$v.form.Q42.$model"
			                  :state="validateState('Q42')"
			                ></b-form-input>
				            </b-col>
				            <b-col cols="12" md="6">
				                <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q43.$model" :state="validateState('Q43')" class="mb-2"></b-form-datepicker>
				            </b-col>
			            </b-form-row>
			            <b-form-row id="Q41">
		              		<b-col cols="12" md="6">
				                <b-form-input 
				                  type="number"
				                  placeholder="No. of Violations"
				                  v-model="$v.form.Q44.$model"
				                  :state="validateState('Q44')"
				                ></b-form-input>
				            </b-col>
				            <b-col cols="12" md="6">
				                <b-form-datepicker reset-button locale="en-US" v-model="$v.form.Q45.$model" :state="validateState('Q45')" placeholder="Choose a date" class="mb-2"></b-form-datepicker>
				            </b-col>
			            </b-form-row>
	              </b-form-group>
            </b-col>
		    	</b-form-row>
		    	<b-form-row class="mb-2">
		    		<b-col cols="12">
              <b-form-group
                class="mb-0"
                label="Major Convictions"
                description="maximum 100 characters"
                label-for="Q46"
              >
              	<b-form-row >
              		<b-col cols="12" md="6">
		                <b-form-textarea 
		                  id="Q46"
		                  placeholder="Describe Conviction"
		                  v-model="$v.form.Q46.$model"
		                  rows="2"
		                  max-rows="7"
		                  :state="validateState('Q46')"
		                ></b-form-textarea>
			            </b-col>
			            <b-col cols="12" md="6">
			                <b-form-datepicker locale="en-US" placeholder="Choose a date" v-model="$v.form.Q47.$model" reset-button :state="validateState('Q47')" class="mb-2"></b-form-datepicker>
			            </b-col>
		            </b-form-row>
		          </b-form-group>
		      	</b-col>
	      	</b-form-row>
	      	<b-form-row class="mb-2">
	    			<b-col cols="12">
              <b-form-group
                class="mb-0"
                label="(E) Employee? (IC) Independent Contractor? (O/O) Owner/Operator? (F) Franchisee?"
              >
              	<b-form-select v-model="$v.form.Q48.$model" :state="validateState('Q48')" :options="driverInfoList"></b-form-select>
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
  name: "NicoQuestions2",
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
    	Q30: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q31_1: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q31_2: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q32: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q33: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q34: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q36: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q37_1: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q37_2: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q38: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q39: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q40: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q41: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q42: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q43: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q44: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q45: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q46: {
      	required: requiredIf( function() {
          return this.form.Q27
        }),
        ifMinMaxLength: ifMinMaxLength('Q27', 0, 100)
      },
      Q47: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
      Q48: {
        required: requiredIf( function() {
          return this.form.Q27
        }),
      },
    }
  }
}
</script>
