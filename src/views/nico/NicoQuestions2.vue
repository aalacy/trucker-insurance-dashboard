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
				<b-form-row class="mb-2 align-items-center">
          <b-col cols="12" md="6">
            <div class="question-block">
              <span class="question">Are drivers covered by workers compensation?</span>  
              <toggle-button 
                :labels="{checked: 'Yes', unchecked: 'No'}" 
                :width="70" 
                :height="30" 
                class="mb-0"
                :sync="true"
                v-model="form.Q49_0"
                :font-size="15"
              />
            </div>
          </b-col>
	  			<b-col v-if="form.Q49_0" cols="12" md="6">
            <b-form-group
              class="mb-0"
              label="If yes, name of carrier?"
              label-for="Q49"
            >
              <b-form-input 
                id="Q49"
                v-model="$v.form.Q49.$model"
                :state="validateState('Q49')"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row class="mb-2 align-items-center">
	  			<b-col cols="12" md="6">
            <b-form-group
              class="mb-0"
              label="Minimum years driving experience required?"
              label-for="Q50"
            >
              <b-form-input 
                type="number"
                id="Q50"
                v-model="$v.form.Q50.$model"
                :state="validateState('Q50')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <div class="question-block">
              <span class="question">Are vehicles owner-driven only?</span>  
              <toggle-button 
                :labels="{checked: 'Yes', unchecked: 'No'}" 
                :width="70" 
                :height="30" 
                :sync="true"
                class="mb-0"
                v-model="form.Q51"
                :font-size="15"
              />
            </div>
          </b-col>
        </b-form-row>
        <b-form-row class="mb-2">
          <b-col cols="12" md="6">
            <div class="question-block">
              <span class="question">Are drivers ever allowed to take vehicles home at night?</span>  
              <toggle-button 
                :labels="{checked: 'Yes', unchecked: 'No'}" 
                :width="70" 
                :height="30" 
                :sync="true"
                class="mb-0"
                v-model="form.Q51_22_1"
                :font-size="15"
              />
            </div>
          </b-col>
          <b-col v-if="form.Q51_22_1" cols="12" md="6">
            <div class="question-block">
              <span class="question">If yes, will family members drive?</span>  
              <toggle-button 
                :labels="{checked: 'Yes', unchecked: 'No'}" 
                :width="70" 
                :height="30" 
                :sync="true"
                class="mb-0"
                v-model="form.Q51_22_2"
                :font-size="15"
              />
            </div>
          </b-col>
      	</b-form-row>
        <b-form-row class="mb-2 align-items-center">
        	<b-col cols="12" md="6">
            <div class="question-block">
              <span class="question">Do you order MVRs on all drivers prior to hiring?</span>  
              <toggle-button 
                :labels="{checked: 'Yes', unchecked: 'No'}" 
                :width="70" 
                :height="30" 
                :sync="true"
                class="mb-0"
                v-model="form.Q52_0"
                :font-size="15"
              />
            </div>
          </b-col>
	  			<b-col cols="12" md="6">
            <b-form-group
              class="mb-0"
              label="Drivers maximum driving hours: Daily? Weekly?"
            >
            	<b-form-row>
			  				<b-col cols="12" md="6">
	                <b-form-input 
	                  type="number"
	                  v-model="$v.form.Q52_daily.$model"
	                  :state="validateState('Q52_daily')"
	                  placeholder="daily"
	                ></b-form-input>
	            	</b-col>
	            	<b-col cols="12" md="6">
	                <b-form-input 
	                  type="number"
	                  v-model="$v.form.Q52_weekly.$model"
	                  :state="validateState('Q52_weekly')"
	                  placeholder="weekly"
	                ></b-form-input>
	            	</b-col>
	        		</b-form-row>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row class="mb-2">
        	<b-col cols="12">
            <div class="question-block">
              <span class="question">Do you agree to report all newly hired operators?</span>  
              <toggle-button 
                :labels="{checked: 'Yes', unchecked: 'No'}" 
                :width="70" 
                :height="30" 
                :sync="true"
                class="mb-0"
                v-model="form.Q52_24"
                :font-size="15"
              />
            </div>
          </b-col>
        </b-form-row>
        <b-form-row class="mb-3">
					<b-col cols="12" md="6">
            <b-form-group
              class="mb-0"
              label="What is the basis for driver(s) pay?"
            >
            	<b-form-select v-model="$v.form.Q53.$model" :state="validateState('Q53')" :options="driverPayBasis"></b-form-select>
	          </b-form-group>
	      	</b-col>
  		  </b-form-row>
  		  <b-form-row v-if="form.Q53=='Other'" class="mb-2">
		  		<b-col cols="12">
            <b-form-group
              class="mb-0"
              label="Other, Explain"
              label-for="Q53_explain"
            >
              <b-form-textarea 
                id="Q53_explain"
                rows='2'
                max-rows="5"
                v-model="$v.form.Q53_explain.$model"
                :state="validateState('Q53_explain')"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-form-row>
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

  validations() {
  	return {
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
	      drivers: {
	        required: requiredIf( function() {
	          return this.form.Q27
	        }),
	        $each: {
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
	          }
		      }
	      },
	      driversContinue: {
	        required: requiredIf( function() {
	          return this.form.Q27
	        }),
	        $each: {
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
	      },
	      Q49: {
	        required: requiredIf( function() {
	          return this.form.Q49_0
	        }),
	      },
	      Q50: {
	      	required
	      },
	      Q52_daily: {
	      	required
	      },
	      Q52_weekly: {
	      	required
	      },
	      Q53: {
	      	required
	      },
	      Q53_explain: {
	      	required: requiredIf( function() {
	          return this.form.Q53 == 'Other'
	        }),
	      },
	    }
  	}
  }
}
</script>
