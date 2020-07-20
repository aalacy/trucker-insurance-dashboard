<template>
  <div>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
          <b-form-row class="mb-2">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Any Loss Payees?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :sync="true"
                  :height="30" 
                  v-model="form.Q74"
                  class="mb-0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q74" class="mb-3">
    		  	<b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, give me name and address of mortgagee/loss of each vehicle?"
                label-for="Q75"
                description="250 - 500 characters"
              >
                <b-form-textarea 
                  id="Q75"
                  rows="2"
                  max-rows="7"
                  v-model="$v.form.Q75.$model"
                  :state="validateState('Q75')"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-card
            header="LOSS EXPERIENCE"
            header-text-variant="black"
            header-bg-variant="white"
            header-tag="header"
            class="mb-3"
            style="border-radius: 0.25rem !important;"
          >
            <b-card-text>
              <div class="text-uppercase">Policy Term</div>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Effective Date"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q78" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Expiration Date"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q79" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Insurance Company Name"
                    label-for="Q80"
                  >
                    <b-form-input 
                      id="Q80"
                      v-model="form.Q80"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="No. of Motor Powered Vehicles"
                    label-for="Q81"
                  >
                    <b-form-input 
                      id="Q81"
                      type="number"
                      v-model="form.Q81"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="No. of Accidents"
                    label-for="Q82"
                  >
                    <b-form-input 
                      id="Q82"
                      type="number"
                      v-model="form.Q82"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <div class="text-uppercase">Policy Term</div>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="From"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q83" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="To"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q84" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <div class="text-uppercase">Policy Term</div>
              <b-form-row class="mb-2">
                <b-col cols="12" md="3">
                  <div class="question-block">
                    <span class="question">BI</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0"
                      :sync="true" 
                      v-model="form.Q85"
                      :font-size="15"
                    />
                  </div>
                </b-col>
                <b-col cols="12" md="3">
                  <div class="question-block">
                    <span class="question">PD</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q86"
                      :font-size="15"
                    />
                  </div>
                </b-col>
                <b-col cols="12" md="3">
                  <div class="question-block">
                    <span class="question">Comp/Coll</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q87"
                      :font-size="15"
                    />
                  </div>
                </b-col>
                <b-col cols="12" md="3">
                  <div class="question-block">
                    <span class="question">Other</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q88"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-form-row>
            </b-card-text>
          </b-card>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Is any applicant aware of any facts or past incidents, circumstances or situations which could give rise to a claim under the insurance coverage sought in this application?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q89"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q89" class="mb-0">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, provide complete details"
                label-for="Q90"
                description="250 - 500 characters"
              >
                <b-form-textarea 
                  id="Q90"
                  v-model="$v.form.Q90.$model"
                  :state="validateState('Q90')"
                  rows="2"
                  max-rows="7"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Have you ever been declined, cancelled or non-renewed for this kind of insurance?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q91"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q91" class="mb-3">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, date and why"
                label-for="Q92"
                description="250 - 500 characters"
              >
                <b-form-textarea 
                  id="Q92"
                  v-model="$v.form.Q92.$model"
                  :state="validateState('Q92')"
                  rows="2"
                  max-rows="7"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-card
            header="CARGO INFORMATION"
            header-text-variant="black"
            header-bg-variant="white"
            header-tag="header"
            class="mb-3"
            style="border-radius: 0.25rem !important;"
          >
            <div class="mb-2">
              PREVIOUS CARGO CARRIER AND LOSS EXPERIENCE (list for the past three years with most recent carrier first)
            </div>
            <b-card-text>
              <div class="text-uppercase">Policy Term</div>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Effective Date"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q94" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Expiration Date"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="form.Q95" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Company & Policy Number"
                    label-for="Q80"
                  >
                    <b-form-input 
                      id="Q80"
                      v-model="form.Q96"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Premium"
                    label-for="Q97"
                  >
                    <b-form-input 
                      id="Q97"
                      type="number"
                      v-model="form.Q97"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="No. of Claims"
                    label-for="Q98"
                  >
                    <b-form-input 
                      id="Q98"
                      type="number"
                      v-model="form.Q98"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Clause of Loss"
                    label-for="Q99"
                  >
                    <b-form-input 
                      id="Q99"
                      v-model="form.Q99"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Amount Paid"
                    label-for="Q100"
                  >
                    <b-form-input 
                      id="Q100"
                      type="number"
                      v-model="form.Q100"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Maximum Value"
                    label-for="Q101"
                  >
                    <b-form-input 
                      id="Q101"
                      type="number"
                      v-model="form.Q101"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="4">
                  <b-form-group
                    class="mb-0"
                    label="Average Value "
                    label-for="Q102"
                  >
                    <b-form-input 
                      id="Q102"
                      type="number"
                      v-model="form.Q102"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md=4>
                  <b-form-group
                    class="mb-0"
                    label="Deductible"
                  >
                    <b-form-select v-model="form.Q103" :options="Q103Options"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col v-if="form.Q103=='Other'" cols="12" md="4">
                  <b-form-group
                    class="mb-0"
                    label="Other"
                    label-for="Q103_other"
                  >
                    <b-form-input 
                      id="Q103_other"
                      type="number"
                      v-model="form.Q103_other"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <span>If applicant hauls double wide mobile homes, Limit of Insurance must be equal to the value of both sides comined to satisfy co-insurance. Amount of insurance on each truck should equal maximum load carried.</span>
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
  name: "NicoQuestions4",

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
      Q75: {
        required: requiredIf( function() {
          return this.form.Q74
        }),
        ifMinMaxLength: ifMinMaxLength('Q74')
      },
      Q90: {
        required: requiredIf( function() {
          return this.form.Q89
        }),
        ifMinMaxLength: ifMinMaxLength('Q89')
      },
      Q92: {
        required: requiredIf( function() {
          return this.form.Q91
        }),
        ifMinMaxLength: ifMinMaxLength('Q91')
      },
    }
  }
}
</script>