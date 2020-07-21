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
                <b-form-select v-model="$v.form.Q104.$model" :state="validateState('Q104')" :options="Q104Options"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="8">
              <b-form-group
                class="mb-0"
                label="Additional Coverage Options (additional premium may apply):"
              >
                <b-form-select v-model="$v.form.Q105.$model" :state="validateState('Q105')" :options="Q105Options"></b-form-select>
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
                <b-form-select v-model="$v.form.Q109.$model" :state="validateState('Q109')" :options="Q109Options"></b-form-select>
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
                  v-model="$v.form.Q111.$model"
                  :state="validateState('Q111')"
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
                  v-model="$v.form.Q112.$model"
                  :state="validateState('Q112')"
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
                  v-model="$v.form.Q115.$model"
                  :state="validateState('Q115')"
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
                  v-model="$v.form.Q116.$model"
                  :state="validateState('Q116')"
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
                  v-model="$v.form.Q121.$model"
                  :state="validateState('Q121')"
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
      Q104: {
        required
      },
      Q105: {
        required
      },
      Q108: {
        required: requiredIf( function() {
          return this.form.Q107
        }),
      },
      Q109: {
        required
      },
      Q111: {
        required,
        maxLength: maxLength(100)
      },
      Q112: {
        required,
        maxLength: maxLength(100)
      },
      Q114: {
        required: requiredIf( function() {
          return this.form.Q113
        }),
      },
      Q115: {
        required,
        maxLength: maxLength(100)
      },
      Q116: {
        required,
        maxLength: maxLength(100)
      },
      Q119: {
        required: requiredIf( function() {
          return this.form.Q118
        }),
      },
      Q121: {
        required,
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