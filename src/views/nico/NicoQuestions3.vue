<template>
  <div>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
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
                  v-model="form.Q50"
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
		                  v-model="form.Q52_daily"
		                  placeholder="daily"
		                ></b-form-input>
		            	</b-col>
		            	<b-col cols="12" md="6">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q52_weekly"
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
              	<b-form-select v-model="form.Q53" :options="driverPayBasis"></b-form-select>
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
          <b-card
				    header="SCHEDULE OF AUTOS/VEHICLES"
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
		                label="Gross Vehicle Weight"
		                label-for="Q55"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q55"
		                  v-model="form.Q55"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Total # of Rear Axles"
		                label-for="Q56"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q56"
		                  v-model="form.Q56"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
				    	</b-form-row>
				    	<b-form-row class="mb-2">
				    		<b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Principal Garaging Location (City & State)"
		                label-for="Q57"
		              >
		                <b-form-input 
		                  id="Q57"
		                  v-model="form.Q57"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Annual Mileage Per Vehicle"
		                label-for="Q58"
		              >
		                <b-form-input 
		                  type="number"
		                  id="Q58"
		                  v-model="form.Q58"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
				    	</b-form-row>
				    	<b-form-row class="mb-2">
				    		<b-col cols="12">
			              <b-form-group
			                class="mb-0"
			                label="(A) Anti-lock Brakes? (B) Air Bags?"
			              >
			              	<b-form-select v-model="form.Q59" :options="Q59Options"></b-form-select>
				          </b-form-group>
				      	</b-col>
		  		  	</b-form-row>
				    </b-card-text>
				  </b-card>
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
		                  v-model="form.Q62_pick_ups"
		                  placeholder="Pick-ups"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q62_trucks"
		                  placeholder="Trucks"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q62_tractors"
		                  placeholder="Trucks"
		                ></b-form-input>
		            </b-col>
			        </b-form-row>
			        <b-form-row>
					  	<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q62_semi_trailers"
		                  placeholder="Semi-Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q62_trailers"
		                  placeholder="Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q62_pup_trailers"
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
		                  v-model="form.Q63_pick_ups"
		                  placeholder="Pick-ups"
		                ></b-form-input>
		            	</b-col>
		            	<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q63_trucks"
		                  placeholder="Trucks"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q63_tractors"
		                  placeholder="Trucks"
		                ></b-form-input>
		            </b-col>
			        </b-form-row>
			        <b-form-row>
					  	<b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q63_semi_trailers"
		                  placeholder="Semi-Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q63_trailers"
		                  placeholder="Trailers"
		                ></b-form-input>
		            </b-col>
		            <b-col cols="12" md="4">
		                <b-form-input 
		                  type="number"
		                  v-model="form.Q63_pup_trailers"
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
		                <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q65" class="mb-2"></b-form-datepicker>
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
		                  v-model="form.Q66"
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
		                  v-model="form.Q67"
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
		                  v-model="form.Q68"
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
		                  v-model="form.Q69"
		                ></b-form-input>
		              </b-form-group>
		            </b-col>
		            <b-col cols="12" md="6">
		              <b-form-group
		                class="mb-0"
		                label="Physical Damage Deductible"
		                label-for="Q70"
		              >
		                <b-form-select v-model="form.Q70" :options="Q70Q71Options"></b-form-select>
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
		                  v-model="form.Q72"
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
		                  v-model="form.Q73"
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
    	Q49: {
        required: requiredIf( function() {
          return this.form.Q49_0
        }),
      },
      Q53_explain: {
      	required: requiredIf( function() {
          return this.form.Q53 == 'Other'
        }),
      },
      Q61: {
      	required: requiredIf( function() {
          return this.form.Q60
        }),
      },
    }
  }
}
</script>