<template>
  <div>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Additional Questions</h4>
          <div class="mb-4 h4 font-weight-light">Please clearly read each of these questions and be sure to answer accurately.</div>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Do you have agreements with other carriers for the interchange of equipment or transportation of loads?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q126_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q126_0" class="mb-2">
            <div class="ml-3 mb-2">If yes, attach a copy of current agreements and complete the following:</div>
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="(a) With whom has such agreement(s) been made?"
              >
                <b-form-input 
                  id="Q127"
                  v-model="$v.form.Q126.$model"
                  :state="validateState('Q126')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <div class="question-block">
                <span class="question">(b) Do the parties names in (a) carry automobile liability insurance?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q127"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col class="mb-3" v-if="form.Q127" cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, name of insurance company and limits of liability (Bodily Injury & Property Damage)"
              >
                <b-form-textarea 
                  id="Q128"
                  rows="2"
                  v-model="$v.form.Q128.$model"
                  :state="validateState('Q128')"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="(c) Under whose permit does each of the parties to the agreement(s) operate?"
              >
                <b-form-textarea 
                  id="Q129"
                  rows="2"
                  v-model="form.Q129"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <div class="question-block">
                <span class="question">(d) Is there a hold harmless in the agreement(s)?</span>  
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q130"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Do you barter, hire or lease any vehicles?</span>
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q131_0"
                  :font-size="15"
                />
              </div>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.Q131_0" class="mb-2">
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, explain"
              >
                <b-form-textarea 
                  id="Q131"
                  rows="2"
                  max-rows="5"
                  v-model="$v.form.Q131.$model"
                  :state="validateState('Q131')"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="12">
              <div class="question-block">
                <span class="question">Will premium financed?</span>
                <toggle-button 
                  :labels="{checked: 'Yes', unchecked: 'No'}" 
                  :width="70" 
                  :height="30"
                  class="mb-0" 
                  :sync="true"
                  v-model="form.Q132"
                  :font-size="15"
                />
              </div>
            </b-col>
            <b-col v-if="form.Q132" cols="12">
              <b-form-group
                class="mb-0"
                label="If yes, with whom"
              >
                <b-form-textarea 
                  id="Q133"
                  rows="2"
                  v-model="$v.form.Q133.$model"
                  :state="validateState('Q133')"
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
                <div class="prev-title next-title">Sign & Complete</div>
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
  name: "NicoQuestions6",

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
      Q126: {
        required: requiredIf( function() {
          return this.form.Q126_0
        }),
      },
      Q128: {
        required: requiredIf( function() {
          return this.form.Q126_0 && this.form.Q127
        }),
      },
      Q131: {
        required: requiredIf( function() {
          return this.form.Q131_0
        }),
      },
      Q133: {
        required: requiredIf( function() {
          return this.form.Q133_0
        }),
      }
    }
  }
}
</script>