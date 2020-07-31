<!-- Q1 - Q18 (Q26) -->
<template>
  <div class>
    <b-form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
          <p>
            <div> COLUMBIA INSURANCE COMPANY </div>
            <div>  NATIONAL INDEMNITY COMPANY </div>
            <div>  NATIONAL FIRE & MARINE INSURANCE COMPANY </div>
            <div>  NATIONAL LIABILITY & FIRE INSURANCE COMPANY </div>
            <div>  NATIONAL INDEMNITY COMPANY OF THE SOUTH </div>
            <div>  NATIONAL INDEMNITY COMPANY OF MID-AMERICA </div>
          </p>
          <b-form-row class="mb-2">
            <b-col cols="12" md="6">
              <label for="policyEffectiveDate-datepicker">Policy Effective Date</label>
              <b-form-datepicker 
                reset-button 
                id="policyEffectiveDate-datepicker" 
                :state="validateState('policyEffectiveDate')" 
                locale="en-US"
                placeholder="Choose a date" 
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                v-model="$v.form.policyEffectiveDate.$model" 
                class="mb-2"></b-form-datepicker>
            </b-col>
            <b-col cols="12" md="6">
              <label for="policyExpirationDate-datepicker">Policy Expiration Date</label>
              <b-form-datepicker 
                reset-button 
                :state="validateState('policyExpirationDate')" 
                locale="en-US" 
                placeholder="Choose a date" 
                v-model="$v.form.policyExpirationDate.$model" 
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                class="mb-2"></b-form-datepicker>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="6">
              <label>Contact Name</label>
              <b-form-input v-model="$v.form.contactName.$model" :state="validateState('contactName')" placeholder="Contact Name"></b-form-input>
            </b-col>
            <b-col cols="12" md="6">
              <label>Phone Number</label>
              <b-form-input v-model="$v.form.phoneNumber.$model" :state="validateState('phoneNumber')" placeholder="Phone Number"></b-form-input>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Have you had insurance with one of the companies listed at the top of this page?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q5"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q5" class="mb-2">
            <b-col cols="12" md="6">
              <b-form-group
                class="mb-0"
                label="If yes, Policy Number(s)"
              >
                <b-form-input 
                  v-model="$v.form.Q6_policyNumber.$model" 
                  :state="validateState('Q6_policyNumber')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group
                class="mb-0"
                label="Effective Date(s)"
              >
                <b-form-datepicker 
                  locale="en-US" 
                  reset-button
                  placeholder="Choose a date" 
                  v-model="$v.form.Q6_policyNumberEffectiveDate.$model" 
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  :state="validateState('Q6_policyNumberEffectiveDate')" 
                  class="mb-2">
                </b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <div class="mb-2 font-weight-bold">DESCRIPTION OF OPERATIONS</div>
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="Describe Business"
                label-for="describeBusiness"
                description="maximum 250 characters"
              >
                <b-form-textarea 
                  id="describeBusiness"
                  v-model="$v.form.Q7.$model"
                  :state="validateState('Q7')"
                  rows="2"
                  max-rows="7"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-row class="mb-2">
            <b-col cols="12" md="6">
              <div class="question-block">
                <div class="question" style="min-width: 120px;">Years experience?</div>
                <b-form-input 
                  type="number" 
                  v-model="$v.form.yearsExperience.$model"
                  :state="validateState('yearsExperience')"
                  >
                </b-form-input>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">New Venture?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q9"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">If you are a low truck operation, Do you do Repossessions?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q10"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Is this your primary business?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q11_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="!form.Q11_0" class="align-items-center mb-3">
            <b-col cols="12" md="9">
              <b-form-group
                class="mb-0"
                label="If not, please explain"
                label-for="Q11"
                description="maximum 250 characters"
              >
                <b-form-textarea 
                  id="Q11"
                  v-model="$v.form.Q11.$model"
                  rows="2"
                  max-rows="7"
                  :state="validateState('Q11')"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <div class="question-block">
                <span class="question">Seasonal?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q12"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Have you ever filed for bankruptcy?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q13_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q13_0" class="mb-3">
            <b-col cols="12" md="4">
              <b-form-group
                class="mb-0"
                label="If yes, when"
                label-for="Q13"
              >
                <b-form-datepicker 
                  locale="en-US" 
                  id="Q13" 
                  reset-button
                  placeholder="Choose a date" 
                  v-model="$v.form.Q13.$model" 
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  :state="validateState('Q13')"
                  class="mb-2">
                </b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="8">
              <b-form-group
                class="mb-0"
                label="If yes, explain"
                label-for="Q14"
                description="maximum 250 characters"
              >
                <b-form-textarea 
                  id="Q14"
                  v-model="$v.form.Q14.$model" 
                  :state="validateState('Q14')"
                  rows="2"
                  max-rows="7"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="align-items-center mb-3">
            <b-col cols="12" md="4">
              <b-form-group
                class="mb-0"
                label="Gross receipts last year"
                label-for="Q15"
              >
                <b-form-input 
                  id="Q15"
                  type="number"
                  v-model="$v.form.Q15.$model"
                  :state="validateState('Q15')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="4">
              <b-form-group
                class="mb-0"
                label="Estimate for coming year"
                label-for="Q16"
              >
                <b-form-input 
                  id="Q16"
                  type="number"
                  v-model="$v.form.Q16.$model"
                  :state="validateState('Q16')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="4">
              <div class="question-block">
                <span class="question">Business for sale?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q17"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="8">
              <div class="question-block">
                <span class="question">Do you operate in more than one state?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q18"
                  @change="changeQ18"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q18" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, list states"
                label-for="Q19"
              >
                <b-form-tags 
                  v-model="$v.form.Q19.$model" 
                  no-outer-focus class="mb-2"
                >
                  <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                      <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="success"
                        >{{ tag }}</b-form-tag>
                      </li>
                    </ul>

                    <b-dropdown boundary size="sm" variant="outline-secondary" block menu-class="w-100">
                      <template v-slot:button-content>
                        <b-icon icon="tag-fill"></b-icon> Choose states
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <div class="d-flex">
                          <b-button @click="selectContinentalStates" class="mr-2" variant="primary" size="sm">Continental</b-button>
                          <b-form-group
                            label-for="tag-search-input"
                            label="Search states"
                            label-cols-md="auto"
                            class="mb-0 w-100"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                          >
                            <b-form-input
                              v-model="stateSearch"
                              id="tag-search-input"
                              type="search"
                              size="sm"
                              autocomplete="off"
                             ></b-form-input>
                          </b-form-group>
                        </div>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-group id="dropdown-group-2" header="" style="max-height: 200px; overflow-y: auto;">
                        <b-dropdown-item-button
                          v-for="state in availableStates"
                          :key="state"
                          @click="onStateClick({ state, addTag })"
                        >
                          {{ state }}
                        </b-dropdown-item-button>
                      </b-dropdown-group>
                      <b-dropdown-text v-if="availableStates.length === 0">
                        There are no states available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="8">
              <div class="question-block">
                <span class="question">Do you haul for hire?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q20_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="Show 3 Largest Cities entered"
                label-for="Q20"
              >
                <b-form-input 
                  id="Q20"
                  v-model="$v.form.Q20.$model"
                  :state="validateState('Q20')"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="8">
              <div class="question-block">
                <span class="question">Do you operate over a regular route?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q21"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q21" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, list cities operated between — longest distance"
                label-for="Q22"
              >
                <b-form-input 
                  id="Q22"
                  v-model="$v.form.Q22.$model"
                  :state="validateState('Q22')"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Are you a common carrier?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q23_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2 align-items-center">
            <b-col cols="12" md="5">
              <div class="question-block">
                <span class="question">Are you a contract hauler?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q23_1"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col v-if="form.Q23_1"  cols="12" md="7">
              <b-form-group
                class="mb-0"
                label="If yes, for whom"
                label-for="Q23"
                description="maximum 250 characters"
              >
                <b-form-textarea 
                  id="Q23"
                  v-model="$v.form.Q23.$model"
                  :state="validateState('Q23')"
                  rows="2"
                  max-rows="7"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Do you haul any hazardous or extra hazardous substances or materials as defined by EPA?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q24_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q24_0" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, provide the complete listing identifying all materials(s) and/or chemical content"
                label-for="Q24"
              >
                <b-form-textarea 
                  id="Q24"
                  v-model="$v.form.Q24.$model"
                  :state="validateState('Q24')"
                  rows="2"
                  max-rows="7"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Do you haul your own cargo exclusively?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q25_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="!form.Q25_0" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If not, who owns it?"
                label-for="Q25"
              >
                <b-form-textarea 
                  id="Q25"
                  v-model="$v.form.Q25.$model"
                  rows="2"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Do you pull double trailer?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q25_17_1"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Triple trailer?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q25_17_2"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12" md="6">
              <div class="question-block">
                <span class="question">Do you rent or lease your vehicles to others?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30" 
                  class="mb-0"
                  :sync="true"
                  v-model="form.Q26_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q26_0" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, attach copy of rental or lease agreement form uses."
                label-for="Q26"
              >
                <b-form-file
                  id="Q26"
                  :state="validateState('Q26')"
                  @change="onFileChange($event)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
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
                <div class="prev-title">Document Upload</div>
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
  	</b-form>
  </div>
</template>

<script>
import { ifMinMaxLength } from "../../util.js";
import { NicoMixin } from "./NicoMixin.js";
import { validationMixin } from "vuelidate";
import { required, requiredIf, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "NicoQuestions1",
  
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
    name () {
      return this.$router.history.current.name.replace('Nico', '')
    },
    criteria() {
        // Compute the search criteria
        return this.stateSearch.trim().toLowerCase()
    },
    searchDesc() {
      if (this.criteria && this.availableStates.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
    availableStates() {
      const criteria = this.criteria
      // Filter out already selected options
      const states = this.states.filter(opt => this.form.Q19.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return states.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      // Show all options available
      return states
    },
  },

  methods: {
    onFileChange(event) {
      let file = event.target.files[0] || null;
      this.previewFile(file);
    },
    previewFile(file) {
      let reader = new FileReader();
      let tempObj = {};
      reader.onloadend = (evt) => {
        tempObj.content = evt.target.result;
        // this.form.Q26 = tempObj
      };

      if (file) {
        reader.readAsDataURL(file);
        tempObj.name = file.name;
      } else {
        tempObj.name = "";
      }
    },
    changeQ18 () {
      if (!this.form.Q18) {
        this.form.Q19 = []
      }
    },
    selectContinentalStates () {
      this.form.Q19 = this.states.filter(state => state != 'AL' && state != 'HI')
      this.stateSearch = ''
    }
  },

  validations: {
    form: {
      policyEffectiveDate: {
        required,
      },
      policyExpirationDate: {
        required
      },
      contactName: {
        required
      },
      phoneNumber: {
        required
      },
      Q6_policyNumber: {
        required: requiredIf( function() {
          return this.form.Q5
        }) 
      },
      Q6_policyNumberEffectiveDate: {
        required: requiredIf( function() {
          return this.form.Q5
        })
      },
      Q7: {
        required,
        maxLength: maxLength(250)
      },
      yearsExperience: {
        required,
        maxLength: maxLength(10)
      },
      Q11: {
        required: requiredIf( function() {
          return !this.form.Q11_0
        })
      },
      Q13: {
        required: requiredIf( function() {
          return this.form.Q13_0
        }),
      },
      Q14: {
        required: requiredIf( function() {
          return this.form.Q13_0
        }),
        ifMinMaxLength: ifMinMaxLength('Q13_0') 
      },
      Q15: {
        required,
        maxLength: maxLength(10)
      },
      Q16: {
        required,
        maxLength: maxLength(10)
      },
      Q19: {
        required: requiredIf( function() {
          return this.form.Q18
        }),
      },
      Q20: {
        required,
      },
      Q22: {
        required: requiredIf( function() {
          return this.form.Q21
        })
      },
      Q23: {
        required: requiredIf( function() {
          return this.form.Q23_1
        }),
        ifMinMaxLength: ifMinMaxLength('Q23_1')
      },
      Q24: {
        required: requiredIf( function() {
          return this.form.Q24_0
        }),
      },
      Q25: {
      },
      Q26: {
        required: requiredIf( function() {
          return this.form.Q26_0
        }),
      }
    }
  },
}
</script>

