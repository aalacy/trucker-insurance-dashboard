<template>
  <div class="owner-form-item container-fluid mob-2">
    <div class="row">
      <div class="col">
        <h2 class="h5">Owner #{{ index + 1 }}</h2>
      </div>

      <button
        type="button"
        class="lt-button mx-2 mb-3"
        @click="removeForm(index)"
        title="Remove Owner"
      >
        <h3>-</h3>
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

    <div class="row" id="text-date">
      <div class="col-12 col-md-6 pt-2">
        <div>Date of Birth</div>

        <div v-if="formErrors.dateOfBirth" class="text-danger">{{ formErrors.dateOfBirth }}</div>
      </div>

      <div class="col-12 col-md-6">
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
      <div class="col-6">
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
            class="lt-input"
            placeholder="Zip"
            required
            @focus="onFocus('zip')"
            @blur="onBlur"
            @change="validateField('zip')"
          >

          <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip }}</div>
        </div>
      </div>
    </div>
    <div class="classHide">{{switchValue()}}</div>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import { mapState } from "vuex";
import axios from "axios";
import { API } from "../api.js";
import { setTimeout } from "timers";
export default {
  name: "AccountInfoOwnersItem",
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
    drivers: {
      type: Array,
      required: false
    },
    id: {
      type: Boolean,
      required: false
    },
    selectedDriver: {
      required: false
    }
  },
  mounted() {
    

    if (localStorage.getItem("token")) {
      this.save = false;
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
          for (let i = 0; i <= len.length; i++) {
            if (this.$store.state.getData.data[i].key == "owners") {
              let a = this.$store.state.getData.data[i];
              
              let b = JSON.parse(a.val).owners[0];
              
              this.formData.firstName = b.firstName;
              this.formData.lastName = b.lastName;
              [
                this.formData.dobD,
                this.formData.dobM,
                this.formData.dobY
              ] = b.dateOfBirth.split("/");
              this.formData.address = b.address;
              this.formData.state = b.state;
              this.formData.city = b.city;
              this.formData.zip = b.zip;
            }
          }
        });
      }, 1000);
    } else {
      setTimeout(() => {
        this.$store.dispatch("loadData", this.uuid).then(() => {
          let len = this.$store.state.getData.data;
          for (let i = 0; i <= len.length; i++) {
            if (this.$store.state.getData.data[i].key == "owners") {
              let a = this.$store.state.getData.data[i];
              
              let b = JSON.parse(a.val).owners[0];
              
              this.formData.firstName = b.firstName;
              this.formData.lastName = b.lastName;
              [
                this.formData.dobD,
                this.formData.dobM,
                this.formData.dobY
              ] = b.dateOfBirth.split("/");
              this.formData.address = b.address;
              this.formData.state = b.state;
              this.formData.city = b.city;
              this.formData.zip = b.zip;
            }
          }
        });
      }, 1000);
    }
  },
  data() {
    return {
      uuid: "",
      userData: "",
      formData: {
        firstName: "",
        lastName: "",
        dobM: "",
        dobD: "",
        dobY: "",
        address: "",
        city: "",
        zip: "",
        state: ""
      },
      rules: {
        firstName: [required],
        lastName: [required],
        dobM: [required],
        dobD: [required],
        dobY: [required],
        address: [required],
        city: [required],
        zip: [required],
        state: [required]
      },
      editedDrivers: {
        firstName: "",
        lastName: "",
        dobM: "",
        dobD: "",
        dobY: "",
        address: "",
        city: "",
        zip: "",
        state: ""
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

    ...mapState(["data"])
  },

  created() {
    let dobM = "",
      dobD = "",
      dobY = "";

    if (this.owner.dateOfBirth) {
      [dobM, dobD, dobY] = this.owner.dateOfBirth.split("/");
    }

    this.formData = {
      ...this.formData,
      ...this.owner,
      dobM,
      dobD,
      dobY
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
        dateOfBirth: this.dateOfBirth
      };

      delete formData.dobM;
      delete formData.dobD;
      delete formData.dobY;

      return formData;
    },

    switchValue() {
      if(!this.index>0){
          if (this.selectedDriver.dateOfBirth != undefined) {
        this.editedDrivers.firstName = this.selectedDriver.firstName;
        this.editedDrivers.lastName = this.selectedDriver.lastName;
        this.editedDrivers.address = this.selectedDriver.address;
        this.editedDrivers.city = this.selectedDriver.city;
        this.editedDrivers.state = this.selectedDriver.state;
        this.editedDrivers.zip = this.selectedDriver.zip;
        [
          this.editedDrivers.dobD,
          this.editedDrivers.dobM,
          this.editedDrivers.dobY
        ] = this.selectedDriver.dateOfBirth.split("/");
      }
      return (this.formData = this.editedDrivers);
      }
      
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

<style lang="scss" scoped>
.classHide {
  display: none;
}
</style>
