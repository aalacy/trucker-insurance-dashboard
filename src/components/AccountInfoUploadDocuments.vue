<template>
  <div class="upload-documents container py-2">
    <div class="card">
      <div class="card-body">
        <h3 class="title">Upload documents</h3>

        <p>
          Please upload the following documents: drivers license, registration,
          and picture of the side of your vehicle to make the process go
          faster.
          <br>Don’t have these documents? No worries, just press skip.
        </p>

        <form @submit.prevent="uploadDocuments">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label
                  :class="{ 'has-error': formErrors.imageIdFront }"
                  for="imageIdFront"
                  class="lt-input"
                >Select Image ID Front</label>

                <input
                  id="imageIdFront"
                  :class="{ 'has-error': formErrors.imageIdFront }"
                  type="file"
                  accept="image/*;capture=camera"
                  class="lt-input"
                  hidden
                  @change="setImage($event, 'imageIdFront')"
                >

                <div
                  v-if="formErrors.imageIdFront"
                  class="text-danger"
                >{{ formErrors.imageIdFront }}</div>

                <div v-if="preview.imageIdFront" class="preview">
                  <img :src="preview.imageIdFront" alt class="preview-image">
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label
                  :class="{ 'has-error': formErrors.imageIdBack }"
                  for="imageIdBack"
                  class="lt-input"
                >Select Image ID Back</label>

                <input
                  id="imageIdBack"
                  :class="{ 'has-error': formErrors.imageIdBack }"
                  type="file"
                  class="lt-input"
                  accept="image/*;capture=camera"
                  hidden
                  @change="setImage($event, 'imageIdBack')"
                >

                <div v-if="formErrors.imageIdBack" class="text-danger">{{ formErrors.imageIdBack }}</div>

                <div v-if="preview.imageIdBack" class="preview">
                  <img :src="preview.imageIdBack" alt class="preview-image">
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label
                  :class="{ 'has-error': formErrors.imageDOT }"
                  for="imageDOT"
                  class="lt-input"
                >Select Image DOT</label>

                <input
                  id="imageDOT"
                  :class="{ 'has-error': formErrors.imageDOT }"
                  type="file"
                  class="lt-input"
                  accept="image/*;capture=camera"
                  hidden
                  @change="setImage($event, 'imageDOT')"
                >

                <div v-if="formErrors.imageDOT" class="text-danger">{{ formErrors.imageDOT }}</div>

                <div v-if="preview.imageDOT" class="preview">
                  <img :src="preview.imageDOT" alt class="preview-image">
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label
                  :class="{ 'has-error': formErrors.imageRegistration }"
                  for="imageRegistration"
                  class="lt-input"
                >Select Image Registration</label>

                <input
                  id="imageRegistration"
                  :class="{ 'has-error': formErrors.imageRegistration }"
                  type="file"
                  accept="image/*;capture=camera"
                  class="lt-input"
                  hidden
                  @change="setImage($event, 'imageRegistration')"
                >

                <div
                  v-if="formErrors.imageRegistration"
                  class="text-danger"
                >{{ formErrors.imageRegistration }}</div>

                <div v-if="preview.imageRegistration" class="preview">
                  <img :src="preview.imageRegistration" alt class="preview-image">
                </div>
              </div>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

          <div class="text-right">
            <button
              :disabled="loading"
              type="submit"
              class="lt-button btn-md lt-button-main"
            >{{ submitBtnText }}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
      <span class="save-hover">Save & Continue</span>
    </div>
    <div class v-if="showmodel">
      <modelLogin/>
    </div>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import { API } from "../api.js";
import { isMobile } from "mobile-device-detect";
import ModalLogin from "./ModalLogin.vue";
export default {
  name: "AccountInfoUploadDocuments",
  mobile: "phone",
  props: {
    nextForm: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  },
  components: {
    modelLogin: ModalLogin
  },
 mounted(){
    if(localStorage.getItem("token")){
     this.save = false
   }else{
     this.save = true
   }
 },
  data() {
    return {
      msg: isMobile
        ? "Welcome to Your Vue.js mobile App!"
        : "Welcome to Your Vue.js App",
      showmodel: false,
      save:true,
      formData: {
        imageIdFront: null,
        imageIdBack: null,
        imageDOT: null,
        imageRegistration: null
      },
      // rules: {},
      formErrors: {},
      preview: {
        imageIdFront: null,
        imageIdBack: null,
        imageDOT: null,
        imageRegistration: null
      },
      loading: false,
      error: null
    };
  },
  computed: {
    submitBtnText() {
      if (this.loading) {
        return "Loading...";
      }

      let {
        imageIdFront,
        imageIdBack,
        imageDOT,
        imageRegistration
      } = this.formData;
      let anyImageSelected =
        imageIdFront || imageIdBack || imageDOT || imageRegistration;
      if (anyImageSelected) {
        return "Upload";
      }

      return "Skip";
    }
  },
 
  created() {
    this.$emit("update-progress", this.progress);
    // this.uploadDocuments()
  },
  methods: {
    // validateField(fieldName) {
    //   validateField(fieldName, this.formData, this.rules, this.formErrors);
    // },
    // validateForm() {
    //   this.formErrors = {};
    //   return validateForm(this.formData, this.rules, this.formErrors);
    // },
    setImage(event, fieldName) {
      let { files } = event.target;

      let image = files[0] || null;

      this.formData[fieldName] = image;
      this.previewFile(image, fieldName);

      // this.validateField(fieldName);
    },
    show() {
      if (this.showmodel) {
        this.showmodel = false;
      } else {
        this.showmodel = true;
      }
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
    async uploadDocuments() {
      // let formIsValid = this.validateForm();
      // if (!formIsValid) {
      //   return;
      // }

      try {
        let data = await API.formData("company/upload", this.formData);

        // console.log(data);

        if (data.status === "OK") {
          console.log("this.nextForm", this.nextForm);
          this.$router.push({ name: this.nextForm });
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-documents {
  .preview {
    height: 200px;
    text-align: center;

    .preview-image {
      max-height: 100%;
    }
  }
}
</style>
