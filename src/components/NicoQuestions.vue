<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-4">Additional Questions</h4>
          <div v-for="(ques, i) in questions" class="question-block" :key="ques + updated">
        	<span class="question">{{ques}}</span>  
        	<toggle-button 
        		:labels="{checked: 'Yes', unchecked: 'No'}" 
        		:width="70" 
        		:height="30" 
        		v-model="formData.nico_questions[ques]"
        		:font-size="15"
        	/>
          </div>
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
                <div class="prev-title">{{ prevLabel }}</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">{{ nextLabel }}</div>
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
import { API } from "../api.js";
import axios from "axios";
import SidebarMenu from '../components/SidebarMenu.vue'
export default {
  name: "AccountInfoAdditionalQuestions",

  props: {
    prevForm: {
      type: String,
      required: true
    },
    nextForm: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
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
    	loaded: false,
    	updated: 0,
    	error: '',
    	answers: [],
    	formData: {
	    	nico_questions: {}
    	}
    }
  },

  computed: {
  	name () {
  		return this.$router.history.current.name.replace('Nico', '')
  	},
  	nextLabel () {
  		if (this.nextForm == 'AccountInfoSignComplete') {
  			return 'Sign & Complete'
  		} else {
  			return this.nextForm.replace('Nico', '')
  		}
  	},
  	prevLabel () {
  		if (this.prevForm == 'AccountInfoDocumentUpload') {
  			return 'Document Upload'
  		} else {
  			return this.prevForm.replace('Nico', '')
  		}
  	}
  },

  updated () {
    this.$emit("update-progress", this.progress);
    !this.loaded && this.loadCompany();
  },
  created() {
  	this.$emit("update-hint", "Please carefully read through these questions and mark any that apply to your business.");
  },
  mounted() {
  	this.loadCompany();
  },
  methods: {
  	goPrevForm() {
	  this.$emit("go-to-form", this.prevForm);
	  this.loaded = false
	  this.updated = 0
	},
	goNextForm() {
	  this.$emit("go-to-form", this.nextForm);
	  this.loaded = false
	  this.updated = 0
	},
	async loadCompany() {
      this.loading = true;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      this.loaded = true
      this.formData.nico_questions = {}
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
        if (res && res.status === "OK" && res.data.company) {
        	let { company: { nico_questions } } = res.data;
	        if (nico_questions) {
	            if (Object.keys(nico_questions).length === 0 && nico_questions.constructor === Object) {
	            } else {
	            }
	                nico_questions = JSON.parse(nico_questions)
              this.buildFormData(nico_questions)
          	} else {
		  		this.buildFormData({})
          	}
        } else {
	  		this.buildFormData({})
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    buildFormData (nico_questions) {
    	this.formData.nico_questions = nico_questions
    	this.questions.map((ques, i) => {
    		if (nico_questions[ques] == undefined) {
	    		this.formData.nico_questions[ques] = true
    		} else {
	    		this.formData.nico_questions[ques] = nico_questions[ques]
    		}
    	})
    	console.log(this.formData.nico_questions)
    	this.updated += 1
    },
    buildPostData () {
    	this.questions.map((ques, i) => {
    		this.formData.nico_questions[ques] = this.answers[i] || false
    	})
    },
    async updateCompany() {
      this.loading = true;
      this.error = null;
      try {
        const { nico_questions } = this.formData;
        const data = {
          nico_questions,
          uuid: this.uuid
        };
        let res = await API.post("company/save", { data });

        if (res.status === "OK") {
          this.goNextForm();
        } else if (res.status === "ERROR") {
          this.error = res.messages[0] || res.data;
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question-block {
	margin-bottom: 1.25rem;
	display: flex;
	align-items: center;

	.question {
		margin-right: 1.5rem;
		font-size: 20px;
		font-weight: 500;
	}
}
</style>
