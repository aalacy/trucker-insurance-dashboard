import { API } from "../../api.js";

export const NicoMixin = {
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
	      Q18: true,
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
	        if (nico_questions && nico_questions.Q1) {
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
