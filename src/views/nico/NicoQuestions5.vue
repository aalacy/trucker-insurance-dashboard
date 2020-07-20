<template>
  <div>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
          <b-row class="mb-2">
            <b-col cols="12" md="4">
              <b-form-group
                class="mb-0"
                label="Select Type of Coverage Desired:"
              >
                <b-form-select v-model="form.Q104" :options="Q104Options"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="8">
              <b-form-group
                class="mb-0"
                label="Additional Coverage Options (additional premium may apply):"
              >
                <b-form-select v-model="form.Q105" :options="Q105Options"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="font-weight-bold">FILING INFORMATION</div>
          <b-row class="mb-2 align-items-center">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Is an FHWA filing required?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q107"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col v-if="form.Q107" cols="12" md="6">
              <b-form-group
                class="mb-0"
                label="If yes, MC number"
                label-for="Q108"
              >
                <b-form-input 
                  id="Q108"
                  v-model="$v.form.Q108.$model"
                  :state="validateState('Q108')"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-3 align-items-center">
            <b-col cols="12" md="6">
              <b-form-group
                class="mb-0"
                label="Common? Contract? Broker?"
              >
                <b-form-select v-model="form.Q109" :options="Q109Options"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Do you require FHWA cargo filing?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q110"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If you hold a Brokers license, identify name filed with FHWA, FHWA docket no. and receipts from brokerage operations"
                label-for="Q111"
              >
                <b-form-textarea 
                  id="Q111"
                  rows="2"
                  v-model="form.Q111"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If you are interstate regulated carrier, identify your registration or base state"
                label-for="Q112"
              >
                <b-form-textarea 
                  id="Q112"
                  rows="2"
                  v-model="form.Q112"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2 align-items-center">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Is an intrastate filing needed?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q113"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col v-if="form.Q113" cols="12" md="6">
              <b-form-group
                class="mb-0"
                label="If yes, show state and permit number"
                label-for="Q114"
              >
                <b-form-input 
                  id="Q114"
                  v-model="$v.form.Q114.$model"
                  :state="validateState('Q114')"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="List states for which insured requires CARGO FILINGS (check name on permits)"
                label-for="Q115"
              >
                <b-form-textarea 
                  id="Q115"
                  rows="2"
                  v-model="form.Q115"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="Show exact name and address in which permits are issued"
                label-for="Q116"
              >
                <b-form-textarea 
                  id="Q116"
                  rows="2"
                  v-model="form.Q116"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2 align-items-center">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Is MCS 90 endorsement needed?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q117"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Is our policy to cover all vehicles owned, operated or under lease to applicant?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q118"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-row v-if="form.Q118" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, explain"
                label-for="Q119"
              >
                <b-form-textarea 
                  id="Q119"
                  rows="2"
                  max-rows="5"
                  v-model="$v.form.Q119.$model"
                  :state="validateState('Q119')"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2 align-items-center">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Are oversize, overweight commodities hauled?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q120"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group
                class="mb-0"
                label=" If filing required, show states"
                label-for="Q121"
              >
                <b-form-input 
                  id="Q121"
                  v-model="form.Q121"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Are escort vehicles towed on return trips?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q122"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Does your authority allow for transportation of hazardous commodities?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q123"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Do you allow others to haul hazardous commodities under your authority?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q124"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-card
            header="Questions 44 - 51"
            header-text-variant="black"
            header-bg-variant="white"
            header-tag="header"
            class="mb-3"
            style="border-radius: 0.25rem !important;"
          >
            <b-card-text>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Have you ever changed your operating name?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_44_1"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Do you operate under any other name?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_44_2"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Do you operate as a subsidiary of another company?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_45"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Do you own or manage any other transportation operations that are not covered?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_46"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Do you lease your authority?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_47_1"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Do you appoint agents or hire independent contractors to operate on your behalf?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_47_2"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Have you purchased, sold or applied for authority over the past 3 years?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_48"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Have you ever lost or had authority withdrawn, or have you been/are under probation by any regulatory authority (FHWA, PUC, etc.)?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_49"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-col cols="12">
                  <div class="question-block">
                    <span class="question">Is evidence/certificate(s) of coverage required?</span>  
                    <toggle-button 
                      :labels="{checked: 'Yes', unchecked: 'No'}" 
                      :width="70" 
                      :height="30"
                      class="mb-0" 
                      :sync="true"
                      v-model="form.Q124_50"
                      :font-size="15"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="isQ44_Q50" class="mb-2">
                <b-col cols="12">
                  <b-form-group
                    class="mb-0"
                    label='Please explain any "yes" answer to quetions 44 through 50'
                    label-for="Q125"
                  >
                    <b-form-textarea 
                      id="Q125"
                      rows="2"
                      max-rows="8"
                      v-model="$v.form.Q125.$model"
                      :state="validateState('Q125')"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
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
  name: "NicoQuestions5",

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

  computed: {
    isQ44_Q50() {
      return this.form.Q124_44_1 ||
            this.form.Q124_44_2 ||
            this.form.Q124_45 ||
            this.form.Q124_46 ||
            this.form.Q124_47_1 ||
            this.form.Q124_47_2 ||
            this.form.Q124_48 ||
            this.form.Q124_49 ||
            this.form.Q124_50
    }
  },

  validations: {
    form: {
      Q108: {
        required: requiredIf( function() {
          return this.form.Q107
        }),
      },
      Q114: {
        required: requiredIf( function() {
          return this.form.Q113
        }),
      },
      Q119: {
        required: requiredIf( function() {
          return this.form.Q118
        }),
      },
      Q125: {
        required: requiredIf( function() {
          return this.isQ44_Q50
        }),
      },
    }
  }
}
</script>