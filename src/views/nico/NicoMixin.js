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
        { value: 'E', text: 'Employee' },
        { value: 'IC', text: 'Independent Contractor' },
        { value: 'O/O', text: 'Owner/Operator' },
        { value: 'F', text: 'Franchisee' },
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
        Q13_0: false,
        Q13: '',
        Q14: '',
        Q15: '',
        Q16: '',
        Q17: false,
        Q18: true,
        Q19: [],
        Q20_0: true,
        Q20: '',
        Q21: false,
        Q22: '',
        Q23_0: true,
        Q23_1: false,
        Q23: '',
        Q24_0: false,
        Q24: '',
        Q25_0: true,
        Q25: '',
        Q25_17_1: false,
        Q25_17_2: false,
        Q26_0: false,
        Q26: {},
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
        driversContinue: [
        ],
        drivers: [
        ],
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
        Q60: true,
        Q61: '',
        Q62_pick_ups: 0,
        Q62_trucks: 0,
        Q62_tractors: 0,
        Q62_semi_trailers: 0,
        Q62_trailers: 0,
        Q62_pup_trailers: 0,
        Q63_pick_ups: 0,
        Q63_trucks: 0,
        Q63_tractors: 0,
        Q63_semi_trailers: 0,
        Q63_trailers: 0,
        Q63_pup_trailers: 0,
        physicalDamageCovs: [],
        Q74: true,
        Q75: '',
        Q76: '',
        lossExps: [],
        Q89: true,
        Q90: '',
        Q91: true,
        Q92: '',
        Q93: '',
        cargoInfos: [],
        Q101: '',
        Q102: '',
        Q103: '',
        Q103_other: '',
        Q104: '',
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
      },
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
    cleanDataOnYes(v1, v2) {
      if (this.form[v1]) {
        this.form[v2] = ''
      }
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    addPhysicalDamageCov() {
      this.form.physicalDamageCovs.push({
        Q65: '',
        Q66: '',
        Q67: '',
        Q68: '',
        Q69: '',
        Q70: '',
        Q71: '',
        Q72: '',
        Q73: '',
      })
    },
    addLossExp() {
      this.form.lossExps.push({
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
      })
    },
    addCargoInfo () {
      this.form.cargoInfos.push({
        Q94: '',
        Q95: '',
        Q96: '',
        Q97: '',
        Q98: '',
        Q99: '',
        Q100: '',
      })
    },
    async loadCompany() {
      this.loading = true
      this.error = null
      this.uuid = localStorage.getItem('uuid')
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
        if (res && res.status === "OK" && res.data.company) {
          let { company: { nico_questions, driverInformationList, vehicleInformationList } } = res.data;
          if (nico_questions) {
            if (typeof nico_questions == 'string') {
                nico_questions = JSON.parse(nico_questions)
            } 

            console.log(nico_questions.driversContinue, nico_questions.Q5)
            if (nico_questions.Q5 != undefined && nico_questions.driversContinue != undefined) {
              this.form = nico_questions
              // newly add loss Experience blocks as an array
              if (!nico_questions.lossExps) {
                this.form.lossExps = []
              }
              if (this.form.lossExps.length == 0) {
                this.addLossExp()
              }
              // newly add the cargo Information blocks as an array
              if (!nico_questions.cargoInfos) {
                this.form.cargoInfos = []
              }
              if (this.form.cargoInfos.length == 0) {
                this.addCargoInfo()
              }
              // newly add the physical damage coverage block as an array
              if (!nico_questions.physicalDamageCovs) {
                this.form.physicalDamageCovs = []
              }
              if (this.form.physicalDamageCovs.length == 0) {
                this.addPhysicalDamageCov()
                console.log(this.form.physicalDamageCovs)
              }
            }
          } 

          if (driverInformationList) {
              if (!Array.isArray(driverInformationList)) {
                driverInformationList = JSON.parse(driverInformationList);
              }

              if (this.form.driversContinue.length == 0) {
                driverInformationList.map(() => {
                  this.form.driversContinue.push({
                    Q41: '',
                    Q42: '',
                    Q43: '',
                    Q44: '',
                    Q45: '',
                    Q46: '',
                    Q47: '',
                    Q48: '',
                  })
                  this.form.drivers.push({
                    Q38: '',
                    Q39: '',
                    Q40: '',
                  });
                })
              }
          }
        } 
      } catch (err) {
        console.error(err)
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
