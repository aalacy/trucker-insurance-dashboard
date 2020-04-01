<template>
  <div class="simple-estimate-wizard container">
    <h1 class="h2">Simple Estimate Wizard</h1>

    <div v-if="!mainInfo" class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-5">
        <form @submit.prevent="submit">
          <!-- imageIdFront -->
          <div class="form-group">
            <label
              :class="{ 'has-error': $v.formData.imageIdFront.$error }"
              for="imageIdFront"
              class="lt-input"
            >
              Select Image ID Front*
            </label>

            <input
              id="imageIdFront"
              type="file"
              hidden
              @change="setImage($event, 'imageIdFront')"
            />

            <div v-if="$v.formData.imageIdFront.$model" class="text-muted">
              {{ $v.formData.imageIdFront.$model.name }}
            </div>

            <div v-if="$v.formData.imageIdFront.$error" class="text-danger">
              File is required
            </div>
          </div>

          <!-- imageIdBack -->
          <div class="form-group">
            <label
              :class="{ 'has-error': $v.formData.imageIdBack.$error }"
              for="imageIdBack"
              class="lt-input"
            >
              Select Image ID Back*
            </label>

            <input
              id="imageIdBack"
              type="file"
              hidden
              @change="setImage($event, 'imageIdBack')"
            />

            <div v-if="$v.formData.imageIdBack.$model" class="text-muted">
              {{ $v.formData.imageIdBack.$model.name }}
            </div>

            <div v-if="$v.formData.imageIdBack.$error" class="text-danger">
              File is required
            </div>
          </div>

          <!-- imageDOT -->
          <div class="form-group">
            <label
              :class="{ 'has-error': $v.formData.imageDOT.$error }"
              for="imageDOT"
              class="lt-input"
            >
              Select Image DOT*
            </label>

            <input
              id="imageDOT"
              type="file"
              hidden
              @change="setImage($event, 'imageDOT')"
            />

            <div v-if="$v.formData.imageDOT.$model" class="text-muted">
              {{ $v.formData.imageDOT.$model.name }}
            </div>

            <div v-if="$v.formData.imageDOT.$error" class="text-danger">
              File is required
            </div>
          </div>

          <!-- imageRegistration -->
          <div class="form-group">
            <label
              :class="{ 'has-error': $v.formData.imageRegistration.$error }"
              for="imageRegistration"
              class="lt-input"
            >
              Select Image Registration*
            </label>

            <input
              id="imageRegistration"
              type="file"
              hidden
              @change="setImage($event, 'imageRegistration')"
            />

            <div v-if="$v.formData.imageRegistration.$model" class="text-muted">
              {{ $v.formData.imageRegistration.$model.name }}
            </div>

            <div
              v-if="$v.formData.imageRegistration.$error"
              class="text-danger"
            >
              File is required
            </div>
          </div>

          <!-- phone -->
          <div class="form-group">
            <input
              v-model="$v.formData.phone.$model"
              :class="{ 'has-error': $v.formData.phone.$error }"
              type="tel"
              class="lt-input"
              placeholder="Phone Number*"
            />

            <div v-if="$v.formData.phone.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- email -->
          <div class="form-group">
            <input
              v-model.lazy="$v.formData.email.$model"
              :class="{ 'has-error': $v.formData.email.$error }"
              type="email"
              class="lt-input"
              placeholder="Email*"
            />

            <div
              v-if="$v.formData.email.$error && !$v.formData.email.required"
              class="text-danger"
            >
              Field is required
            </div>

            <div
              v-if="$v.formData.email.$error && !$v.formData.email.email"
              class="text-danger"
            >
              Invalid email
            </div>
          </div>

          <!-- garagingZip -->
          <div class="form-group">
            <input
              v-model="$v.formData.garagingZip.$model"
              :class="{ 'has-error': $v.formData.garagingZip.$error }"
              type="text"
              class="lt-input"
              placeholder="Garaging Zip*"
            />

            <div v-if="$v.formData.garagingZip.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- cargoType -->
          <div class="form-group">
            <input
              v-model="$v.formData.cargoType.$model"
              :class="{ 'has-error': $v.formData.cargoType.$error }"
              type="text"
              class="lt-input"
              placeholder="Cargo Type*"
            />

            <div v-if="$v.formData.cargoType.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerFirstName -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerFirstName.$model"
              :class="{ 'has-error': $v.formData.ownerFirstName.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner First Name*"
            />

            <div v-if="$v.formData.ownerFirstName.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerLastName -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerLastName.$model"
              :class="{ 'has-error': $v.formData.ownerLastName.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner Last Name*"
            />

            <div v-if="$v.formData.ownerLastName.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerCountry -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerCountry.$model"
              :class="{ 'has-error': $v.formData.ownerCountry.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner Address*"
            />

            <div v-if="$v.formData.ownerCountry.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerState -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerState.$model"
              :class="{ 'has-error': $v.formData.ownerState.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner State*"
            />

            <div v-if="$v.formData.ownerState.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerCity -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerCity.$model"
              :class="{ 'has-error': $v.formData.ownerCity.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner City*"
            />

            <div v-if="$v.formData.ownerCity.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerStreet -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerStreet.$model"
              :class="{ 'has-error': $v.formData.ownerStreet.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner Street*"
            />

            <div v-if="$v.formData.ownerStreet.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerZip -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerZip.$model"
              :class="{ 'has-error': $v.formData.ownerZip.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner ZIP*"
            />

            <div v-if="$v.formData.ownerZip.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- ownerDOB -->
          <div class="form-group">
            <input
              v-model="$v.formData.ownerDOB.$model"
              :class="{ 'has-error': $v.formData.ownerDOB.$error }"
              type="text"
              class="lt-input"
              placeholder="Owner Date of Birthday*"
            />

            <div v-if="$v.formData.ownerDOB.$error" class="text-danger">
              Field is required
            </div>
          </div>

          <!-- yearBusinessStarted -->
          <div class="form-group">
            <input
              v-model="$v.formData.yearBusinessStarted.$model"
              :class="{ 'has-error': $v.formData.yearBusinessStarted.$error }"
              type="text"
              class="lt-input"
              placeholder="Year Business Started*"
            />

            <div
              v-if="$v.formData.yearBusinessStarted.$error"
              class="text-danger"
            >
              Field is required
            </div>
          </div>

          <!-- electronicDeviceProvider -->
          <div class="form-group">
            <input
              v-model="$v.formData.electronicDeviceProvider.$model"
              :class="{
                'has-error': $v.formData.electronicDeviceProvider.$error
              }"
              type="text"
              class="lt-input"
              placeholder="Electronic Device Provider*"
            />

            <div
              v-if="$v.formData.electronicDeviceProvider.$error"
              class="text-danger"
            >
              Field is required
            </div>
          </div>

          <!-- currentInsuranceProvider -->
          <div class="form-group">
            <input
              v-model="$v.formData.currentInsuranceProvider.$model"
              :class="{
                'has-error': $v.formData.currentInsuranceProvider.$error
              }"
              type="text"
              class="lt-input"
              placeholder="Current Insurance Provider*"
            />

            <div
              v-if="$v.formData.currentInsuranceProvider.$error"
              class="text-danger"
            >
              Field is required
            </div>
          </div>

          <div v-if="error" class="form-group">
            <div class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </div>

          <!-- submit -->
          <div class="text-center">
            <button
              :disabled="loading"
              type="submit"
              class="lt-button lt-button-main"
            >
              {{ loading ? 'Loading...' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <document-preview-main v-if="mainInfo" :document="mainInfo" />

    <div v-if="loadingDoc">
      <h3>Processing...</h3>
    </div>

    <div v-if="errorDoc" class="form-group my-2">
      <div class="alert alert-danger" role="alert">
        <div>{{ errorDoc }}</div>
        <div class="text-center">
          <button class="btn btn-light" @click="docTryAgain">Try Again</button>
        </div>
      </div>
    </div>

    <document-preview-dot v-if="dotData" :dot-data="dotData" />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { API } from '../api.js';

export default {
  name: 'SimpleEstimateWizard',
  components: {
    DocumentPreviewMain: () =>
      import(/* webpackChunkName: "DocumentPreviewMain" */
      '../components/DocumentPreviewMain.vue'),
    DocumentPreviewDot: () =>
      import(/* webpackChunkName: "DocumentPreviewDot" */
      '../components/DocumentPreviewDot.vue')
  },
  data() {
    return {
      formData: {
        imageIdFront: null,
        imageIdBack: null,
        imageDOT: null,
        imageRegistration: null,
        phone: process.env.VUE_APP_WIZARD_PHONE || null,
        email: process.env.VUE_APP_WIZARD_EMAIL || null,
        garagingZip: process.env.VUE_APP_WIZARD_GARAGING_ZIP || null,
        cargoType: process.env.VUE_APP_WIZARD_CARGO_TYPE || null,
        ownerFirstName: process.env.VUE_APP_WIZARD_OWNER_FIRST_NAME || null,
        ownerLastName: process.env.VUE_APP_WIZARD_OWNER_LAST_NAME || null,
        ownerCountry: process.env.VUE_APP_WIZARD_OWNER_COUNTRY || null,
        ownerState: process.env.VUE_APP_WIZARD_OWNER_STATE || null,
        ownerCity: process.env.VUE_APP_WIZARD_OWNER_CITY || null,
        ownerStreet: process.env.VUE_APP_WIZARD_OWNER_STREET || null,
        ownerZip: process.env.VUE_APP_WIZARD_OWNER_ZIP || null,
        ownerDOB: process.env.VUE_APP_WIZARD_OWNER_DOB || null,
        yearBusinessStarted:
          process.env.VUE_APP_WIZARD_YEAR_BUSINESS_STARTED || null,
        electronicDeviceProvider:
          process.env.VUE_APP_WIZARD_ELECTRONIC_DEVICE_PROVIDER || null,
        currentInsuranceProvider:
          process.env.VUE_APP_WIZARD_CURRENT_INSURANCE_PROVIDER || null
      },
      mainInfo: null,
      dotData: null,
      getDocInfoTimeout: null,
      resultDOT: null,
      loading: false,
      error: null,
      loadingDoc: false,
      errorDoc: null
    };
  },
  // vuelidate
  validations: {
    formData: {
      imageIdFront: { required },
      imageIdBack: { required },
      imageDOT: { required },
      imageRegistration: { required },
      phone: { required },
      email: { required, email },
      garagingZip: { required },
      cargoType: { required },
      ownerFirstName: { required },
      ownerLastName: { required },
      ownerCountry: { required },
      ownerState: { required },
      ownerCity: { required },
      ownerStreet: { required },
      ownerZip: { required },
      ownerDOB: { required },
      yearBusinessStarted: { required },
      electronicDeviceProvider: { required },
      currentInsuranceProvider: { required }
    }
  },
  computed: {
    imgPrefix() {
      return `${process.env.VUE_APP_BACKEND_URL}/tmp/`;
    }
  },
  beforeDestroy() {
    clearTimeout(this.getDocInfoTimeout);
  },
  methods: {
    setImage(event, fieldName) {
      let { files } = event.target;

      if (!files.length) {
        this.$v.formData[fieldName].$model = null;
        return;
      }

      this.$v.formData[fieldName].$model = files[0];
    },
    docTryAgain() {
      if (this.resultDOT === false) {
        this.errorDoc = null;
        this.mainInfo = null;
      } else {
        this.getDocInfo();
      }
    },
    async submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.log('form invalid');
        return;
      }

      console.log('submit');

      try {
        this.error = null;
        this.loading = true;

        let data = await API.formData('documents/upload', {
          ...this.formData
        });

        console.log(data);
        if (data.status === 'OK') {
          this.mainInfo = data.data;
          this.getDocInfo();
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async getDocInfo() {
      console.log('getDocInfo');
      this.loadingDoc = true;
      this.errorDoc = null;

      try {
        let data = await API.post('documents/admin/item', {
          _id: this.mainInfo._id
        });

        console.log(data);
        if (data.status === 'OK') {
          if (
            data.data.resultDOT === false ||
            data.data.resultDOT === 'false'
          ) {
            this.loadingDoc = false;
            this.resultDOT = false;
            this.errorDoc = 'Could not parse DOT document.';
            return;
          }

          if (data.data.resultDOTSaferData) {
            console.log('done');
            this.loadingDoc = false;
            this.dotData = data.data.resultDOTSaferData;
          } else {
            console.log('no DOT data');
            this.getDocInfoTimeout = setTimeout(this.getDocInfo, 1000);
          }
        }
      } catch (error) {
        this.errorDoc = error.message;
        this.loadingDoc = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }

// test
</style>
