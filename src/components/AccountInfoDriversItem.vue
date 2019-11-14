<template>
  <div class="driver-form-item container-fluid mob-2">
    <div class="row">
      <div class="col">
        <h2 class="h5">Driver # {{ index + 1 }}</h2>
      </div>

      <button
        type="button"
        class="lt-button mx-2 mb-3"
        @click="removeForm(index)"
        title="Remove Driver"
      >
        <h3>-</h3>
      </button>
    </div>

    <div class="row">
      <div class="col-12 col-lg-5">
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
      <div class="col-4 col-lg-2">
        <div class="form-group">
          <input>

          <div v-if="formErrors.middleName" class="text-danger">{{ formErrors.middleName }}</div>
        </div>
      </div>

      <div class="col-12 col-lg-5">
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
      <div class="col-12 col-md-6 pt-2">
        <div>Date of Birth</div>

        <div v-if="formErrors.dateOfBirth" class="text-danger">{{ formErrors.dateOfBirth }}</div>
      </div>

      <div class="col-12 col-md-6" id="text-date">
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
      <div class="col-12 col-md-6">
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
      <div class="col-12 col-md-6">
        <div class="form-group">
          <input
            v-model="formData.city"
            :class="{ 'has-error': formErrors.city }"
            type="text"
            class="lt-input"
            placeholder="City"
            required
            @focus="onFocus('city')"
            @blur="onBlur"
            @change="validateField('city')"
          >

          <div v-if="formErrors.city" class="text-danger">{{ formErrors.city }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.state"
            :class="{ 'has-error': formErrors.state }"
            type="text"
            class="lt-input"
            placeholder="State"
            required
            @focus="onFocus('state')"
            @blur="onBlur"
            @change="validateField('state')"
          >

          <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <input
            v-model="formData.zip"
            :class="{ 'has-error': formErrors.zip }"
            type="text"
            minlength="5"
            class="lt-input hide-scroll"
            placeholder="Zip"
            required
            @focus="onFocus('zip')"
            @blur="minLength('zip')"
            @change="validateField('zip')"
          >

          <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip }}</div>
        </div>
      </div>
    </div>
    <div class="row" id="text-date">
      <div class="col-12 col-md-6 pt-2">
        <div>Date of Hire</div>

        <div v-if="formErrors.dateOfHire" class="text-danger">{{ formErrors.dateOfHire }}</div>
      </div>

      <div class="col-12 col-md-6">
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
            <option value>Years of Experience</option>

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
import {
  validateField,
  validateForm,
  required,
  minLength
} from "../validators.js";
import { mapState } from "vuex";
import { API } from "../api.js";
import axios from "axios";
import { setTimeout } from "timers";
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
      axios
        .get(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getuuidbyuserid?user_id=" +
            localStorage.getItem("userId")
        )
        .then(coins => {
          this.userData = coins.data.uuid;
        });
      setTimeout(() => {
        this.$store.dispatch("loadData", this.userData).then(() => {
          let len = this.$store.state.getData.data;
          
          for (let i = 0; i < len.length; i++) {
            if (this.$store.state.getData.data[i].key == "drivers") {
              let a = this.$store.state.getData.data[i];
              
              let b = JSON.parse(a.val)[0];
              this.formData.firstName = b.firstName;
              
              this.formData.lastName = b.lastName;
              this.formData.middleName = b.middleName;
              [
                this.formData.dobD,
                this.formData.dobM,
                this.formData.dobY
              ] = b.dateOfBirth.split("/");
              // this.formData.dobM = dobM;
              
              this.formData.address = b.address;
              this.formData.licenseNumber = b.licenseNumber;
              this.formData.state = b.state;
              this.formData.city = b.city;
              this.formData.zip = b.zip;
              [
                this.formData.dohD,
                this.formData.dohM,
                this.formData.dohY
              ] = b.dateOfHire.split("/");
              this.formData.yearsOfExperience = b.yearsOfExperience;
              this.formData.CDL = b.CDL;
            }
          }
        });
      }, 1000);
    } else {
      setTimeout(() => {
        this.$store.dispatch("loadData", this.uuid).then(() => {
          let len = this.$store.state.getData.data;
          for (let i = 0; i < len.length; i++) {
            if (this.$store.state.getData.data[i].key == "drivers") {
              let a = this.$store.state.getData.data[i];
              let b = JSON.parse(a.val)[0];
              this.formData.firstName = b.firstName;
              this.formData.middleName = b.middleName;
              this.formData.lastName = b.lastName;
              [
                this.formData.dobD,
                this.formData.dobM,
                this.formData.dobY
              ] = b.dateOfBirth.split("/");
              // this.formData.dobM = dobM;
              
              this.formData.address = b.address;
              this.formData.licenseNumber = b.licenseNumber;
              this.formData.state = b.state;
              this.formData.city = b.city;
              this.formData.zip = b.zip;
              [
                this.formData.dohD,
                this.formData.dohM,
                this.formData.dohY
              ] = b.dateOfHire.split("/");
              this.formData.yearsOfExperience = b.yearsOfExperience;
              this.formData.CDL = b.CDL;
            }
          }
        });
      }, 1000);
    }
  },
  data() {
    return {
      uuid: "",
      value: 5,
      error1: "Zip number Invalid! Must be minmum of 5 digits",
      formData: {
        firstName: "",
        lastName: "",
        middleName: "",
        dobM: "",
        dobD: "",
        dobY: "",
        address: "",
        city: "",
        zip: "",
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
        middleName: [required],
        city: [required],
        zip: [required],
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
      userData: "",
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
    this.loadCompany();
  },
  methods: {
    async loadCompany() {
      try {
        let data = await API.get("company/current");
        if (data.status === "OK") {
          // let data = data.data;
          this.uuid = data.data.b;
        }
      } catch {}
    },
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
    minLength(fieldName, value, errorMessage) {
      return minLength(fieldName, this.value, this.errorzip);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    }
  }
};
</script>

<style>
select {
  position: relative;
  -webkit-appearance: none;
  background: url("../assets/images/arrow-dropdown.png") no-repeat 96% center;
  -moz-appearance: none;
}
</style>


