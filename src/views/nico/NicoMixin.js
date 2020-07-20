import { API } from "../../api.js";

export const NicoMixin = {
	

	updated () {
	  this.$emit("update-progress", this.progress);
	},

	created() {
		this.$emit("update-hint", "Please carefully read through these questions and mark any that apply to your business.");
	},

	mounted() {
		this.loadCompany();
	},

	methods: {
	  validateState(name) {
	    const { $dirty, $error } = this.$v.form[name];
	    return $dirty ? !$error : null;
	  },
		goPrevForm() {
		  this.$emit("go-to-form", this.prevForm);
		},
		goNextForm() {
		  this.$emit("go-to-form", this.nextForm);
		},
		async loadCompany() {
	    this.loading = true
	    this.error = null
	    this.uuid = localStorage.getItem('uuid')
	    try {
	      let res = await API.get("company/current?uuid=" + this.uuid);
	      if (res && res.status === "OK" && res.data.company) {
	      	let { company: { nico_questions } } = res.data;
	        if (nico_questions) {
	          if (typeof nico_questions == 'string') {
	              nico_questions = JSON.parse(nico_questions)
	          } 
	          this.form = nico_questions
	      	} 
	      } 
	    } catch (err) {
	      console.error(err.response)
	      this.error = err.message
	    } finally {
	      this.loading = false
	    }
	  },
	  async updateCompany() {
	    this.$v.form.$touch();
	    if (this.$v.form.$anyError) {
	      return;
	    }
	    this.loading = true;
	    this.error = null;
	    try {
	      const data = {
	        nico_questions: {
	          ...this.form
	        },
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
	  },

	  onStateClick({ state, addTag }) {
	    addTag(state)
	    this.stateSearch = ''
	  }
	}
}
