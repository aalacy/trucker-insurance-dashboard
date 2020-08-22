<template>
  <div class="cargo-hauled-form container-fluid mob-2">
    
    <form @submit.prevent="updateCompany">
      <div class="mb-4">
        <img src="https://picsum.photos/g/100/100" alt style="width:50px;" class="d-inline mr-2">
        <h4 class="card-title d-inline form-sub-title">Cargo Hauled</h4>
      </div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Cargo Hauled</h4>
          <div
            v-for="(item, index) in selectedCargoGroups"
            :key="index"
            class="col-12 text-center mb-2 p-1"
          >
            <div class="font-weight-bold ft-clr">{{ item.value }}</div>

            <div class="container">
              <div class="row cargo-group-page mt-3">
                <div
                  v-for="(subItem, subIndex) in item.cargoHauled"
                  :key="subIndex"
                  class="col-3 text-center mb-2 p-1 pointer"
                  v-b-tooltip.hover.top="haulingPercent(item.value, subItem.value)"
                  @click="showPercentModal(item.value, subItem.value)"
                  :class="{
                      selected:
                          formData.haulType[item.value] &&
                        formData.haulType[item.value][subItem.value]
                    }"
                >
                  <div class="haul-type">
                    <div class="haul-type-wrapper">
                      <img 
                        :src="subItem.img"
                        
                        alt="haul type">
                    </div>
                    <div
                      class="name"
                      :class="{
                        selected:
                          formData.haulType[item.value] &&
                          formData.haulType[item.value][subItem.value]
                      }"
                    >{{ subItem.value }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="formErrors.haulType" class="text-danger">{{ formErrors.haulType }}</div>

            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          </div>
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
                <div class="prev-title">Cargo Group</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Vehicles & Trailers</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <b-modal
      id="modal-hauling"
      ref="modal"
      v-model="percentModal"
      title="Previous Physical Damage Coverage"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.prevent="handleSubmit">
        <b-form-group
          label="% of Hauling"
        >
          <b-input-group append="%">
            <b-form-input 
              type="number"
              v-model="$v.form1.percent.$model"
            >
            </b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          class="mt-3"
          label="Maximum Value"
        >
          <b-form-input 
            type="number"
            v-model="$v.form1.maxValue.$model"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          class="mt-3"
          label="Average Value"
        >
          <b-form-input 
            type="number"
            v-model="$v.form1.avgValue.$model"
          >
          </b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validateField, validateForm, minLength } from "../validators.js";
import { validationMixin } from "vuelidate";
import { required, minValue, maxValue } from "vuelidate/lib/validators";
import { API } from "../api.js";
import axios from "axios";

export default {
  name: "AccountInfoCargoHauled",

  mixins: [validationMixin],

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
    form1: {
      percent: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(100)
      },
      avgValue: {
        required,
        minValue: minValue(0),
      },
      maxValue: {
        required,
        minValue: minValue(0),
      }
    }
  },

  data() {
    return {
      save: true,
      uuid:"",
      form1:{
        percent: '',
        avgValue: '',
        maxValue: ''
      },
      curHauling: {
        group: '',
        hauled: ''
      },
      percentModal: false,
      prevCargoGroup: [],
      formData: {
        haulType: {}
      },
      rules: {
        haulType: [val => minLength(val, 1, "Please select Cargo Type")]
      },
      formErrors: {},
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState("cargo", ["cargoGroups"]),

    selectedCargoGroups() {
      return this.cargoGroups.filter(
        group => this.prevCargoGroup.indexOf(group.value) > -1
      );
    },

    ...mapState(["data"])
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },
  mounted() {
  
  },
  methods: {
    selectHaulType(cargoGroupValue, haulTypeValue, data={}) {
      if (!this.formData.haulType[cargoGroupValue]) {
        this.$set(this.formData.haulType, cargoGroupValue, {});
      }

      let hasValue = this.formData.haulType[cargoGroupValue].hasOwnProperty(haulTypeValue)

      if (hasValue) {
        this.$delete(this.formData.haulType[cargoGroupValue], haulTypeValue);

        if (!Object.keys(this.formData.haulType[cargoGroupValue]).length) {
          this.$delete(this.formData.haulType, cargoGroupValue);
        }
      } else {
        this.formData.haulType[cargoGroupValue][haulTypeValue] = data
      }

      this.formErrors = {};
    },
    goPrevForm() {
      this.$emit("update-hint", "");
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("update-hint", "");
      this.$emit("go-to-form", this.nextForm);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
  
        if (res && res.status === "OK" && res.data.company) {
          let { company: { cargoGroup, cargoHauled } } = res.data;
          if (!Array.isArray(cargoGroup)) {
            this.prevCargoGroup = JSON.parse(cargoGroup);
          } else {
            this.prevCargoGroup = cargoGroup;
          }
          if (cargoHauled) {
            if (Object.keys(cargoHauled).length === 0 && cargoHauled.constructor === Object) {
              this.formData.haulType =  {};
            } else {
              if (cargoHauled.constructor !== Object){
                cargoHauled = JSON.parse(cargoHauled)
              } 

              let isNewData = true;
              Object.keys(cargoHauled).map(key => {
                console.log(cargoHauled[key])
                if (Array.isArray(cargoHauled[key])) {
                  isNewData = false
                }
              })
              if (!isNewData) {
                this.formData.haulType = {}
              } else {
                this.formData.haulType = cargoHauled
              }
            }
          }
          this.uuid = res.data.uuid;
        } else if (res && res.status === "ERROR") {
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        console.log('invalid');
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const { haulType } = this.formData;
        const data = {
          cargoHauled: JSON.stringify(haulType),
          uuid: this.uuid
        };
        let res = await API.post("company/save", { data });
        if (res.status === "OK") {
          localStorage.setItem('uuid', res.data);
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
    showPercentModal(group, hauled) {
      this.$v.form1.$reset()
      this.curHauling = {
        group,
        hauled
      } 
      if (this.formData.haulType[group] && this.formData.haulType[group][hauled]) {
        this.selectHaulType(group, hauled)
      } else {
        this.percentModal = true
      }
    },
    resetModal() {
      this.form1 = {
        percent: '',
        avgValue: '',
        maxValue: ''
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      // this.$v.form1.$touch();
      // if (this.$v.form1.$anyError) {
      //   return;
      // }
      
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-hauling')
      })

      this.selectHaulType(this.curHauling.group, this.curHauling.hauled, this.form1)
    },
    validatePercent(name) {
      const { $dirty, $error } = this.$v.form1[name];
      return $dirty ? !$error : null;
    },
    invalidPercent(name) {
      const { required, minValue, maxValue } = this.$v.form1[name]

      let msg = ''
      if (required != undefined && !required) {
        msg = 'This field is required.'
      } 

      if ((minValue != undefined && !minValue) || (maxValue != undefined && !maxValue)) {
        msg = 'The value must be valid.'
      } 

      return msg
    },
    haulingPercent (group, hauled) {
      if (this.formData.haulType[group] && this.formData.haulType[group][hauled] && this.formData.haulType[group][hauled].percent ) {
        return `${this.formData.haulType[group][hauled].percent}%`
      } else {
        return ''
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.ft-clr {
  padding: 10px;
  color: #5e98f9;
  border: #5e98f9 solid 1px;
  border-radius: 10px;
}
.cargo-hauled-form {
  .haul-type {
    .haul-type-wrapper {
      width: 120px;
      height: auto;
      margin: 0 auto;
      background: #edf2f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;

      img {
        padding: 22px;
        border-radius: 8px;
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      min-height: 50px;
      font-size: 12px;
      word-break: break-word;
      font-weight: 700 !important;
      &.selected {
        color: #5e98f9;
      }
    }
  }
}
@media screen and (max-width: 639px) {
  .cargo-group-page .col-3 {
    flex: 0 0 33.333%;
    max-width: 33.333%;
  }
}

@media screen and (max-width: 479px) {
  .cargo-group-page .col-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

</style>