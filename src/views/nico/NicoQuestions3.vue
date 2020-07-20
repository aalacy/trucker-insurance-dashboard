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

  data() {
	  return {
	  	loading: false,
	  	error: '',
	  	driverPayBasis: [
	  		{ value: '', text: 'Please select an option' },
	  		{ value: 'Hourly', text: 'Hourly' },
	  		{ value: 'Trip', text: 'Trip' },
	  		{ value: 'Mileage', text: 'Mileage' },
	  		{ value: 'Other', text: 'Other' },
    	],
    	Q59Options: [
    	 	{ value: '', text: 'Please select an option' },
    		{ value: 'A', text: 'Anti-lock Brakes?' },
    		{ value: 'B', text: 'Air Bags?' },
    		{ value: 'Both', text: 'Both?' },
    	],
    	Q70Q71Options: [
    		{ value: '', text: 'Please select an option' },
    		{ value: 'Comprehensive', text: 'Comprehensive' },
    		{ value: 'Spec. C of Loss', text: 'Spec. C of Loss' },
    	],
    	Q103Options: [
    		{ value: '', text: 'Please select an option' },
    		{ value: '$500', text: '$500' },
    		{ value: '$1,000', text: '$1,000' },
    		{ value: '$2,500', text: '$2,500' },
    		{ value: 'Other', text: 'Other' },
      ],
      Q104Options: [
      	{ value: '', text: 'Please select an option' },
      	{ value: 'Named Perils', text: 'Named Perils' },
      	{ value: 'Broad Form', text: 'Broad Form' },
      ],
      Q105Options: [
      	{ value: '', text: 'Please select an option' },
      	{ value: 'Additional Insured Endorsement (Lessee)', text: 'Additional Insured Endorsement (Lessee)' },
      	{ value: 'Loading and Unloading Coverage', text: 'Loading and Unloading Coverage' },
      	{ value: 'Earned Freight Coverage', text: 'Earned Freight Coverage' },
      	{ value: 'Refrigeration Breakdown Coverage', text: 'Refrigeration Breakdown Coverage' },
      	{ value: 'Hired Car Cargo Coverage', text: 'Hired Car Cargo Coverage' },
      	{ value: 'Exclude Theft Coverage', text: 'Exclude Theft Coverage' },
      ],
      Q109Options: [
      	{ value: '', text: 'Please select an option' },
      	{ value: 'Common', text: 'Common' },
      	{ value: 'Contract', text: 'Contract' },
      	{ value: 'Broker', text: 'Broker' },
      ],
	    states: [
	      'AL',
	      'AK',
	      'AZ',
	      'AR',
	      'CA',
	      'CO',
	      'CT',
	      'DE',
	      'FL',
	      'GA',
	      'HI',
	      'ID',
	      'IL',
	      'IN',
	      'IA',
	      'KS',
	      'KY',
	      'LA',
	      'ME',
	      'MD',
	      'MA',
	      'MI',
	      'MN',
	      'MS',
	      'MO',
	      'MT',
	      'NE',
	      'NV',
	      'NH',
	      'NJ',
	      'NM',
	      'NY',
	      'NC',
	      'ND',
	      'OH',
	      'OK',
	      'OR',
	      'PA',
	      'RI',
	      'SC',
	      'SD',
	      'TN',
	      'TX',
	      'UT',
	      'VT',
	      'VA',
	      'WA',
	      'WV',
	      'WI',
	      'WY',
	    ],
	    stateSearch: '',
	    driverInfoList: [
	    	{ value: '', text: 'Please select an option' },
    		{ value: 'E', text: 'Employee?' },
    		{ value: 'IC', text: 'Independent Contractor?' },
    		{ value: 'O/O', text: 'Owner/Operator?' },
    		{ value: 'F', text: 'Franchisee?' },
    	],
	  	form: {
	    	policyEffectiveDate: '',
	      policyExpirationDate: '',
	      contactName: '',
	      phoneNumber: '',
	      Q5: true,
	      Q6_policyNumber: '',
	      Q6_policyNumberEffectiveDate: '',
	      Q7: '',
	      yearsExperience: '',
	      Q9: true,
	      Q10: true,
	      Q11_0: true,
	      Q11: '',
	      Q12: true,
	      Q13_0: true,
	      Q13: '',
	      Q14: '',
	      Q15: '',
	      Q16: '',
	      Q17: true,
	      Q18: '',
	      Q19: [],
	      Q20_0: true,
	      Q20: '',
	      Q21: true,
	      Q22: '',
	      Q23_0: true,
	      Q23_1: true,
	      Q23: '',
	      Q24_0: true,
	      Q24: '',
	      Q25_0: true,
	      Q25: '',
	      Q25_17_1: true,
	      Q25_17_2: true,
	      Q26_0: true,
	      Q26: null,
	      Q27: true,
	      Q30: '',
	      Q31_1: '',
	      Q31_2: '',
	      Q32: '',
	      Q33: '',
	      Q34: '',
	      Q36: '',
	      Q37_1: '',
	      Q37_2: '',
	      Q38: '',
	      Q39: '',
	      Q40: '',
	      Q41: '',
	      Q42: '',
	      Q43: '',
	      Q44: '',
	      Q45: '',
	      Q46: '',
	      Q47: '',
	      Q48: '',
	      Q49_0: true,
	      Q49: '',
	      Q50: '',
	      Q51: true,
	      Q51_22_1: true,
	      Q51_22_2: true,
	      Q52_0: true,
	      Q52_daily: '',
	      Q52_weekly: '',
	      Q52_24: true,
	      Q53: '',
	      Q53_explain: '',
	      Q55: '',
	      Q56: '',
	      Q57: '',
	      Q58: '',
	      Q60: true,
	      Q61: '',
	      Q62_pick_ups: '',
	      Q62_trucks: '',
	      Q62_tractors: '',
	      Q62_semi_trailers: '',
	      Q62_trailers: '',
	      Q62_pup_trailers: '',
	      Q63_pick_ups: '',
	      Q63_trucks: '',
	      Q63_tractors: '',
	      Q63_semi_trailers: '',
	      Q63_trailers: '',
	      Q63_pup_trailers: '',
	      Q65: '',
	      Q66: '',
	      Q67: '',
	      Q68: '',
	      Q69: '',
	      Q70: '',
	      Q71: '',
	      Q72: '',
	      Q73: '',
	      Q74: true,
	      Q75: '',
	      Q76: '',
	      Q78: '',
	      Q79: '',
	      Q80: '',
	      Q81: '',
	      Q82: '',
	      Q83: '',
	      Q84: '',
	      Q85: true,
	      Q86: true,
	      Q87: true,
	      Q88: true,
	      Q89: true,
	      Q90: '',
	      Q91: true,
	      Q92: '',
	      Q93: '',
	      Q94: '',
	      Q95: '',
	      Q96: '',
	      Q97: '',
	      Q98: '',
	      Q99: '',
	      Q100: '',
	      Q101: '',
	      Q102: '',
	      Q103: '',
	      Q103_other: '',
	      Q104: true,
	      Q105: '',
	      Q107: true,
	      Q108: '',
	      Q109: '',
	      Q110: true,
	      Q111: '',
	      Q112: '',
	      Q113: true,
	      Q114: '',
	      Q115: '',
	      Q116: '',
	      Q117: '',
	      Q118: true,
	      Q119: '',
	      Q120: true,
	      Q121: '',
	      Q122: true,
	      Q123: true,
	      Q124: true,
	      Q124_44_1: true,
	      Q124_44_2: true,
	      Q124_45: true,
	      Q124_46: true,
	      Q124_47_1: true,
	      Q124_47_2: true,
	      Q124_48: true,
	      Q124_49: true,
	      Q124_50: true,
	      Q125: '',
	      Q126_0: true,
	      Q126: '',
	      Q127: true,
	      Q128: '',
	      Q129: '',
	      Q130: true,
	      Q131_0: true,
	      Q131: '',
	      Q132: true,
	      Q133: '',
	  	}
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