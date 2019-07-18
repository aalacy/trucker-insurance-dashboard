<template>
  <div class="owner-form-item container-fluid mob-2">
    <div class="row">
      <div class="col">
        <h2 class="h5">Owner #{{ index + 1 }}</h2>
      </div>

      <button type="button" class="lt-button mx-2 mb-3" @click="removeForm(index)">
       <h3> - </h3>
      </button>
      
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.firstName"
            :class="{ 'has-error': formErrors.firstName }"
            type="text"
            class="lt-input"
            placeholder="First name"
            required
            @focus="onFocus('firstName')"
            @blur="onBlur"
            @change="validateField('firstName')"
          />

          <div v-if="formErrors.firstName" class="text-danger">
            {{ formErrors.firstName }}
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.lastName"
            :class="{ 'has-error': formErrors.lastName }"
            type="text"
            class="lt-input"
            placeholder="Last name"
            required
            @focus="onFocus('lastName')"
            @blur="onBlur"
            @change="validateField('lastName')"
          />

          <div v-if="formErrors.lastName" class="text-danger">
            {{ formErrors.lastName }}
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-4 pt-2">
        <div>Date of Birthday</div>

        <div v-if="formErrors.dateOfBirth" class="text-danger">
          {{ formErrors.dateOfBirth }}
        </div>
      </div>

      <div class="col-12 col-md-8">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <input
                v-model="formData.dobM"
                :class="{ 'has-error': formErrors.dobM }"
                type="text"
                class="lt-input"
                placeholder="MM"
                required
                @focus="onFocus('dobM')"
                @blur="onBlur"
                @change="validateField('dobM')"
              />

              <div v-if="formErrors.dobM" class="text-danger">
                {{ formErrors.dobM }}
              </div>
            </div>
          </div>
<span class="mt-1">/</span> 
          <div class="col">
            <div class="form-group">
              <input
                v-model="formData.dobD"
                :class="{ 'has-error': formErrors.dobD }"
                type="text"
                class="lt-input"
                placeholder="DD"
                required
                @focus="onFocus('dobD')"
                @blur="onBlur"
                @change="validateField('dobD')"
              />

              <div v-if="formErrors.dobD" class="text-danger">
                {{ formErrors.dobD }}
              </div>
            </div>
          </div>
<span class="mt-1">/</span> 
          <div class="col">
            <div class="form-group">
              <input
                v-model="formData.dobY"
                :class="{ 'has-error': formErrors.dobY }"
                type="text"
                class="lt-input"
                placeholder="YYYY"
                required
                @focus="onFocus('dobY')"
                @blur="onBlur"
                @change="validateField('dobY')"
              />

              <div v-if="formErrors.dobY" class="text-danger">
                {{ formErrors.dobY }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.address"
            :class="{ 'has-error': formErrors.address }"
            type="text"
            class="lt-input"
            placeholder="Address"
            required
            @focus="onFocus('address')"
            @blur="onBlur"
            @change="validateField('address')"
          />

          <div v-if="formErrors.address" class="text-danger">
            {{ formErrors.address }}
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="form-group">
          <select
            v-model="formData.state"
            :class="{ 'has-error': formErrors.state }"
            class="lt-input"
            required
            @change="validateField('state')"
            @focus="onFocus('state')"
            @blur="onBlur"
          >
            <option disabled value="">State/Province</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

          <div v-if="formErrors.state" class="text-danger">
            {{ formErrors.state }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateField, validateForm, required } from '../validators.js';
import {mapState} from "vuex"
export default {
  name: 'AccountInfoOwnersItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    owner: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    drivers:{
       type:Array,
      required:false
    },
    id:{
      type:Boolean,
      required:false
    }
  },
    mounted(){
      console.log("this.drivers",this.drivers)
      // console.log(this.id)
     if(this.id){
      this.formData.firstName = this.drivers[0].firstName;
      this.formData.lastName = this.drivers[0].lastName;
      [this.formData.dobD, this.formData.dobM, this.formData.dobY] =  this.drivers[0].dateOfBirth.split('/');     
      this.formData.address = this.drivers[0].address;
      this.formData.state = this.drivers[0].state;
    }else{
      console.log("no driver is ownr")
      this.formData.firstName = "";
      this.formData.lastName = "";
      this.formData.dobD="";
      this.formData.dobY =  "";
      this.formData.dobM = "";
      this.formData.address = "";
      this.formData.state = "";
    }
     

    if(localStorage.getItem("token")){
    this.$store.dispatch('loadData',localStorage.getItem("uuid"))
     let a = this.$store.state.getData.data[8]
     let b = JSON.parse(a.val).owners[0]
     console.log("b",b)
      this.formData.firstName = b.firstName;
     this.formData.lastName = b.lastName;
     [this.formData.dobD, this.formData.dobM, this.formData.dobY] = b.dateOfBirth.split('/');
     this.formData.address = b.address
     this.formData.state = b.state
  }else{
    
  }
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        dobM: '',
        dobD: '',
        dobY: '',
        address: '',
        state: ''
      },
      rules: {
        firstName: [required],
        lastName: [required],
        dobM: [required],
        dobD: [required],
        dobY: [required],
        address: [required],
        state: [required]
      },
      formErrors: {},
      hints: {},
      loading: false,
      error: null
    };
  },
  computed: {
    dateOfBirth() {
      let { dobM: m, dobD: d, dobY: y } = this.formData;

      if (m.length < 2) {
        m = `0${m}`;
      }

      if (d.length < 2) {
        d = `0${d}`;
      }

      return `${m}/${d}/${y}`;
    },

    ...mapState([
    'data'
  ])
  },

  created() {
    let dobM = '',
      dobD = '',
      dobY = '';

    if (this.owner.dateOfBirth) {
      [dobM, dobD, dobY] = this.owner.dateOfBirth.split('/');
    }

    this.formData = {
      ...this.formData,
      ...this.owner,
      dobM,
      dobD,
      dobY
    };
  },
  methods: {
    getFormData() {
      let formData = {
        ...this.formData,
        dateOfBirth: this.dateOfBirth
      };

      delete formData.dobM;
      delete formData.dobD;
      delete formData.dobY;

      return formData;
    },
    removeForm(index) {
      this.$emit('remove-form', index);
    },
    onFocus(fieldName) {
      this.$emit('update-hint', this.hints[fieldName]);
    },
    onBlur() {
      this.$emit('update-hint', '');
    },
    validateField(fieldName) {
      validateField(fieldName, this.formData, this.rules, this.formErrors);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    }
  }
};
</script>

<style lang="scss" scoped></style>
