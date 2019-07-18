<template>
  <div class="driver-form-item container-fluid mob-2">
    <div class="row">
      <div class="col">
        <h2 class="h5">Driver # {{ index + 1 }}</h2>
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
          >

          <div v-if="formErrors.firstName" class="text-danger">{{ formErrors.firstName }}</div>
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
          >

          <div v-if="formErrors.lastName" class="text-danger">{{ formErrors.lastName }}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-4 pt-2">
        <div>Date of Birthday</div>

        <div v-if="formErrors.dateOfBirth" class="text-danger">{{ formErrors.dateOfBirth }}</div>
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
              >

              <div v-if="formErrors.dobM" class="text-danger">{{ formErrors.dobM }}</div>
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
              >

              <div v-if="formErrors.dobD" class="text-danger">{{ formErrors.dobD }}</div>
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
              >

              <div v-if="formErrors.dobY" class="text-danger">{{ formErrors.dobY }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.licenseNumber"
            :class="{ 'has-error': formErrors.licenseNumber }"
            type="text"
            class="lt-input"
            placeholder="License Number"
            required
            @focus="onFocus('licenseNumber')"
            @blur="onBlur"
            @change="validateField('licenseNumber')"
          >

          <div v-if="formErrors.licenseNumber" class="text-danger">{{ formErrors.licenseNumber }}</div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.CDL"
            :class="{ 'has-error': formErrors.CDL }"
            type="text"
            class="lt-input"
            placeholder="CDL(optional)"
            @focus="onFocus('CDL')"
            @blur="onBlur"
            @change="validateField('CDL')"
          >

          <div v-if="formErrors.CDL" class="text-danger">{{ formErrors.CDL }}</div>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 ">
          <!-- <div class="form-group">
            <select
              v-model="formData.state"
              :class="{ 'has-error': formErrors.state }"
              class="lt-input"
              required
              @change="validateField('state')"
              @focus="onFocus('state')"
              @blur="onBlur"
            >
              <option disabled value>State/Province</option>
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

            <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
          </div> -->
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
              >
            
              <div v-if="formErrors.address" class="text-danger">{{ formErrors.address }}</div>
            </div>
         </div> 
          <div class="col-12 col-md-6 ">
            
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
              <option disabled value>State/Province</option>
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

            <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
          </div>
          
      </div>
    </div>
  

    <div class="row">
      <div class="col-12 col-md-4 pt-2">
        <div>Date of Hire</div>

        <div v-if="formErrors.dateOfHire" class="text-danger">{{ formErrors.dateOfHire }}</div>
      </div>

      <div class="col-12 col-md-8">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <input
                v-model="formData.dohM"
                :class="{ 'has-error': formErrors.dohM }"
                type="text"
                class="lt-input"
                placeholder="MM"
                required
                @focus="onFocus('dohM')"
                @blur="onBlur"
                @change="validateField('dohM')"
              >

              <div v-if="formErrors.dohM" class="text-danger">{{ formErrors.dohM }}</div>
            </div>
          </div>
          <span class="mt-1">/</span>
          <div class="col">
            <div class="form-group">
              <input
                v-model="formData.dohD"
                :class="{ 'has-error': formErrors.dohD }"
                type="text"
                class="lt-input"
                placeholder="DD"
                required
                @focus="onFocus('dohD')"
                @blur="onBlur"
                @change="validateField('dohD')"
              >

              <div v-if="formErrors.dohD" class="text-danger">{{ formErrors.dohD }}</div>
            </div>
          </div>
          <span class="mt-1">/</span>
          <div class="col">
            <div class="form-group">
              <input
                v-model="formData.dohY"
                :class="{ 'has-error': formErrors.dohY }"
                type="text"
                class="lt-input"
                placeholder="YYYY"
                required
                @focus="onFocus('dohY')"
                @blur="onBlur"
                @change="validateField('dohY')"
              >

              <div v-if="formErrors.dohY" class="text-danger">{{ formErrors.dohY }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <select
            v-model="formData.yearsOfExperience"
            :class="{ 'has-error': formErrors.yearsOfExperience }"
            type="text"
            class="lt-input"
            placeholder="Years of Experience"
            required
            @focus="onFocus('yearsOfExperience')"
            @blur="onBlur"
            @change="validateField('yearsOfExperience')"
          >
            <option value disabled>Years of Experience</option>

            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45+</option>
          </select>
          <div
            v-if="formErrors.yearsOfExperience"
            class="text-danger"
          >{{ formErrors.yearsOfExperience }}</div>
        </div>
      </div>
      <div class="row ml-3">
        <!-- <div class="col-lg-10">
        <div class="form-group">
          <input
            v-model="formData.CDL"
            :class="{ 'has-error': formErrors.CDL }"
            type="text"
            class="lt-input"
            placeholder="CDL(optional)"       
            @focus="onFocus('CDL')"
            @blur="onBlur"
            @change="validateField('CDL')"
          />

          <div v-if="formErrors.CDL" class="text-danger">
            {{ formErrors.CDL }}
          </div>
        </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import { mapState } from "vuex";
export default {
  name: "AccountInfoDriversItem",
  props: {
    index: {
      type: Number,
      required: true
    },
    driver: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("loadData", localStorage.getItem("uuid"));
      let a = this.$store.state.getData.data[7];
      let b = JSON.parse(a.val)[0];
      this.formData.firstName = b.firstName;
      this.formData.lastName = b.lastName;
      [
        this.formData.dobD,
        this.formData.dobM,
        this.formData.dobY
      ] = b.dateOfBirth.split("/");
      // this.formData.dobM = dobM;
      console.log("f", this.formData.dobM);
      this.formData.address = b.address;
      this.formData.licenseNumber = b.licenseNumber;
      this.formData.state = b.state;
      [
        this.formData.dohD,
        this.formData.dohM,
        this.formData.dohY
      ] = b.dateOfHire.split("/");
      this.formData.yearsOfExperience = b.yearsOfExperience;
      this.formData.CDL = b.CDL;
    }
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        dobM: "",
        dobD: "",
        dobY: "",
        address:"",
        licenseNumber: "",
        state: "",
        dohM: "",
        dohD: "",
        dohY: "",
        yearsOfExperience: "",
        CDL: ""
      },
      rules: {
        firstName: [required],
        lastName: [required],
        dobM: [required],
        dobD: [required],
        dobY: [required],
        licenseNumber: [required],
        state: [required],
        dohM: [required],
        dohD: [required],
        dohY: [required],
        yearsOfExperience: [required]
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
    ...mapState(["data"]),
    dateOfHire() {
      let { dohM: m, dohD: d, dohY: y } = this.formData;

      if (m.length < 2) {
        m = `0${m}`;
      }

      if (d.length < 2) {
        d = `0${d}`;
      }

      return `${m}/${d}/${y}`;
    }
  },
  created() {
    let dobM = "",
      dobD = "",
      dobY = "";
    let dohM = "",
      dohD = "",
      dohY = "";

    if (this.driver.dateOfBirth) {
      [dobM, dobD, dobY] = this.driver.dateOfBirth.split("/");
    }

    if (this.driver.dateOfHire) {
      [dohM, dohD, dohY] = this.driver.dateOfHire.split("/");
    }

    this.formData = {
      ...this.formData,
      ...this.driver,
      dobM,
      dobD,
      dobY,
      dohM,
      dohD,
      dohY
    };
  },
  methods: {
    getFormData() {
      let formData = {
        ...this.formData,
        dateOfBirth: this.dateOfBirth,
        dateOfHire: this.dateOfHire
      };

      delete formData.dobM;
      delete formData.dobD;
      delete formData.dobY;
      delete formData.dohM;
      delete formData.dohD;
      delete formData.dohY;

      return formData;
    },
    removeForm(index) {
      this.$emit("remove-form", index);
    },
    onFocus(fieldName) {
      this.$emit("update-hint", this.hints[fieldName]);
    },
    onBlur() {
      this.$emit("update-hint", "");
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
