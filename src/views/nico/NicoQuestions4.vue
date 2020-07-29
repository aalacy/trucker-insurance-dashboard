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
                description="maximum 250 characters"
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
                    <b-form-datepicker 
                      reset-button 
                      locale="en-US"
                      placeholder="Choose a date"
                      v-model="$v.form.Q78.$model"
                      class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Expiration Date"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q79.$model" class="mb-2"></b-form-datepicker>
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
                      v-model="$v.form.Q80.$model"
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
                      v-model="$v.form.Q81.$model"
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
                      v-model="$v.form.Q82.$model"
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
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q83.$model" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="To"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q84.$model" class="mb-2"></b-form-datepicker>
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
                description="maximum 250 characters"
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
                description="maximum 250 characters"
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
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q94.$model" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Expiration Date"
                  >
                    <b-form-datepicker reset-button locale="en-US" placeholder="Choose a date" v-model="$v.form.Q95.$model" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Company & Policy Number"
                    label-for="Q96"
                  >
                    <b-form-input 
                      id="Q96"
                      v-model="$v.form.Q96.$model"
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
                      v-model="$v.form.Q97.$model"
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
                      v-model="$v.form.Q98.$model"
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
                      v-model="$v.form.Q99.$model"
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
                      v-model="$v.form.Q100.$model"
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
                      v-model="$v.form.Q101.$model"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    class="mb-0"
                    label="Average Value "
                    label-for="Q102"
                  >
                    <b-form-input 
                      id="Q102"
                      type="number"
                      v-model="$v.form.Q102.$model"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md=6>
                  <b-form-group
                    class="mb-0"
                    label="Deductible"
                  >
                    <b-form-select v-model="$v.form.Q103.$model" :options="Q103Options"></b-form-select>
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
                      v-model="$v.form.Q103_other.$model"
                      :state="validateState('Q103_other')"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <span>If applicant hauls double wide mobile homes, Limit of Insurance must be equal to the value of both sides comined to satisfy co-insurance. Amount of insurance on each truck should equal maximum load carried.</span>
              </b-form-row>
            </b-card-text>
          </b-card>
          <b-form-row class="mb-2">
            <b-col cols="12" md="5">
              <b-form-group
                class="mb-0"
                label="Select Type of Coverage Desired:"
              >
                <b-form-select v-model="$v.form.Q104.$model" :state="validateState('Q104')" :options="Q104Options"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="7">
              <b-form-group
                class="mb-0"
                label="Additional Coverage Options (additional premium may apply):"
              >
                <b-form-select v-model="$v.form.Q105.$model" :options="Q105Options"></b-form-select>
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

  validations: {
    form: {
      Q75: {
        required: requiredIf( function() {
          return this.form.Q74
        }),
        ifMinMaxLength: ifMinMaxLength('Q74')
      },
      Q78: {
      },
      Q79: {
      },
      Q80: {
      },
      Q81: {
      },
      Q82: {
      },
      Q83: {
      },
      Q84: {
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
      Q94: {
      },
      Q95: {
      },
      Q96: {
      },
      Q97: {
      },
      Q98: {
      },
      Q99: {
      },
      Q100: {
      },
      Q101: {
      },
      Q102: {
      },
      Q103: {
      },
      Q103_other: {
        required: requiredIf( function() {
          return this.form.Q103 == 'Other'
        }),
      },
      Q104: {
        required
      },
      Q105: {
      },
    }
  }
}
</script>