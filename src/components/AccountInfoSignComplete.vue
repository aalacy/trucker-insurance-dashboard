<template>
  <div class="container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Sign and Complete</h4>
          <div class="row">
            <div class="col-12 col-md-4 pt-2">
              <div>Date of Sign</div>

              <div v-if="formErrors.dateOfSign" class="text-danger">{{ formErrors.dateOfSign }}</div>
            </div>

            <div class="col-12 col-md-8">
              <div class="row">
               
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

            <div class="card-body">
              <div class="form-group">
                <label
                  :class="{ 'has-error': formErrors.imageIdFront }"
                  for="imageIdFront"
                  class="lt-input d-flex align-items-center pl-5"
                >Signature</label>

                <input
                  id="imageIdFront"
                  :class="{ 'has-error': formErrors.imageIdFront }"
                  type="file"
                  class="lt-input"
                  hidden
                  @change="setImage($event, 'imageIdFront')"
                >

                <div
                  v-if="formErrors.imageIdFront"
                  class="text-danger"
                >{{ formErrors.imageIdFront }}</div>

                <div v-if="preview.imageIdFront" class="preview">
                  <img :src="preview.imageIdFront" alt class="preview-image mt-3">
                </div>
              </div>
            </div>
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
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">Underwriting Questions</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb color-green"
                @click="goNextForm"
              >
                {{ loading ? 'Loading...' : 'Complete!' }}
                <!-- <div class="next-title text-center d-inline pl-3 mob-2 text-white"></div> -->
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
      </div>
      <div v-if="showmodel">
        <modelLogin/>
      </div>
    </form>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import ModalLogin from "./ModalLogin.vue";

export default {
  name: "AccountInfoSignComplete",
  components: {
    modelLogin: ModalLogin
  },
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
  data() {
    return {
      showmodel: false,
      save:true,
      formData: {
        dobM: "",
        dobD: "",
        dobY: "",
        imageIdFront: null
      },
      preview: {
        imageIdFront: null
      },
      rules: {
        dobM: [required],
        dobD: [required],
        dobY: [required]
        // sign: [required]
      },
      formErrors: {},
      hints: {},
      loading: false,
      error: null
    };
  },
     updated(){
if(localStorage.getItem("showModal") == "true")
     {
       this.showmodel = true;
     }
     else{
       this.showmodel = false;
     }
 },
  created() {
    let dobM = "",
      imageSign = "",
      dobD = "",
      dobY = "";
    // this.$emit("update-progress", this.progress);
    // if (this.driver.dateOfSign) {
    //       [dobM, dobD, dobY] = this.driver.dateOfSign.split('/');
    //     }
    this.formData = {
      ...this.formData,
      //   ...this.driver,
      dobM,
      dobD,
      dobY
    };
  },
 mounted(){
   var currentDate = new Date();
     var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    [this.formData.dobD, this.formData.dobM, this.formData.dobY] = currentDateWithFormat.split('/');
//     var startdate = moment();
// startdate = startdate.subtract(1, "days");
// startdate = startdate.format("DD-MM-YYYY");
// var startdate = moment().subtract(1, "days").format("DD-MM-YYYY");

    if(localStorage.getItem("token")){
     this.save = false
   }else{
     this.save = true
   }
 },
  methods: {
    show() {
      if (this.showmodel) {
        this.showmodel = false;
      } else {
        this.showmodel = true;
      }
    },
    setImage(event, fieldName) {
      let { files } = event.target;

      let image = files[0] || null;

      this.formData[fieldName] = image;
      this.previewFile(image, fieldName);

      // this.validateField(fieldName);
    },
    previewFile(file, fieldName) {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.preview[fieldName] = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.preview[fieldName] = null;
      }
    },
    clearFiles() {
      this.$refs["file-input"].reset();
    },
    async updateCompany() {},
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
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
  },
  computed: {
    dateOfSign() {
      let { dobM: m, dobD: d, dobY: y } = this.formData;

      if (m.length < 2) {
        m = `0${m}`;
      }

      if (d.length < 2) {
        d = `0${d}`;
      }

      return `${m}/${d}/${y}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.image-upload > input {
  display: none;
}

.preview {
  height: 200px;
  text-align: center;
}
.preview-image {
  max-height: 100%;
}

.color-green {
  background-color: #73c185;
  border-color: #73c185;
}
</style>

