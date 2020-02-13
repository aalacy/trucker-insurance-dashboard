<template>
  <div class="upload-documents container py-2" id="input-width">
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
                  
                  <img :src="preview.imageIdFront" alt="image front" class="preview-image">
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
          <div class="d-flex row  justify-content-center">
          <div class="text-right m-1">
            <button
              :disabled="loading"
              type="submit"
              class="btn btn-primary"
            >Upload</button>
          </div>
          <div class="text-right m-1">
            <button
              :disabled="loading"
              type="button"
              @click="goNextForm"
              class="btn btn-primary"
            >Skip</button>
          </div>
      </div>
        </form>
      </div>
    </div>
    <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
      <span class="save-hover">Save & Continue</span>
    </div>
    <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
      <span class="save-hover">Save Changes</span>
    </div>
    <div class v-if="showmodel">
      <modelLogin/>
    </div>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import { API } from "../api.js";
import axios from "axios";
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
    modelLogin: ModalLogin,
  },
  mounted() {
    // if (localStorage.getItem("token")) {
      // this.save = false;
      // setTimeout(() => {
      //   this.$store.dispatch("loadData", this.userData).then(() => {
      //     let len = this.$store.state.getData.data;
      //     for (let i = 0; i <= len.length; i++) {
          
      //       if (this.$store.state.getData.data[i].key === "imageDOT") {
      //         this.fnCall = true;
      //         let a = this.$store.state.getData.data[i];
      //         let b = JSON.parse(a.val);
      //         var url = "";
      //         this.previewFile(b[0].filename, "imageDOT");
      //         this.getBase64Image(
      //           "http://3.13.68.92:3000/company/" + b[0].filename,
      //           base64image => {
                
      //             url = base64image;
                
      //             this.previewFile(url, "imageDOT");
      //           }
      //         );
      //       }
      //       if (this.$store.state.getData.data[i].key === "imageRegistration") {
      //         this.fnCall = true;
      //         let a = this.$store.state.getData.data[i];
      //         let b = JSON.parse(a.val);
      //         var url = "";
      //         this.previewFile(b[0].filename, "imageRegistration");
      //         this.getBase64Image(
      //           "http://3.13.68.92:3000/company/" + b[0].filename,
      //           base64image => {
      //             //
      //             url = base64image;
      //             //
      //             this.previewFile(url, "imageRegistration");
      //           }
      //         );
      //       }
      //       if (this.$store.state.getData.data[i].key === "imageIdFront") {
      //         this.fnCall = true;
      //         let a = this.$store.state.getData.data[i];
      //         let b = JSON.parse(a.val);
      //         var url = "";
      //         this.previewFile(b[0].filename, "imageIdFront");
      //         this.getBase64Image(
      //           "http://3.13.68.92:3000/company/" + b[0].filename,
      //           base64image => {
      //             //
      //             url = base64image;
      //             //
      //             this.previewFile(url, "imageIdFront");
      //           }
      //         );
      //       }
      //       if (this.$store.state.getData.data[i].key === "imageIdBack") {
      //         this.fnCall = true;
      //         let a = this.$store.state.getData.data[i];
      //         let b = JSON.parse(a.val);
      //         var url = "";
      //         this.previewFile(b[0].filename, "imageIdBack");
      //         this.getBase64Image(
      //           "http://3.13.68.92:3000/company/" + b[0].filename,
      //           base64image => {
      //             //
      //             url = base64image;
      //             //
      //             this.previewFile(url, "imageIdBack");
      //           }
      //         );
      //       }
      //     }
      //   });
      // }, 1000);
    // } else {
    //   this.save = true;
    //   setTimeout(() => {
    //     this.$store.dispatch("loadData", this.uuid).then(() => {
    //       // this.fnCall = true;
    //       let len = this.$store.state.getData.data;
    //       for (let i = 0; i <= len.length; i++) {
          
    //         if (this.$store.state.getData.data[i].key === "imageDOT") {
    //           this.fnCall = true;
    //           let a = this.$store.state.getData.data[i];
    //           let b = JSON.parse(a.val);
    //           var url = "";
    //           this.previewFile(b[0].filename, "imageDOT");
    //           this.getBase64Image(
    //             "http://3.13.68.92:3000/company/" + b[0].filename,
    //             base64image => {
    //               //
    //               url = base64image;
    //               //
    //               this.previewFile(url, "imageDOT");
    //             }
    //           );
    //         }
    //         if (this.$store.state.getData.data[i].key === "imageRegistration") {
    //           this.fnCall = true;
    //           let a = this.$store.state.getData.data[i];
    //           let b = JSON.parse(a.val);
    //           var url = "";
    //           this.previewFile(b[0].filename, "imageRegistration");
    //           this.getBase64Image(
    //             "http://3.13.68.92:3000/company/" + b[0].filename,
    //             base64image => {
    //               //
    //               url = base64image;
    //               //
    //               this.previewFile(url, "imageRegistration");
    //             }
    //           );
    //         }
    //         if (this.$store.state.getData.data[i].key === "imageIdFront") {
    //           this.fnCall = true;
    //           let a = this.$store.state.getData.data[i];
    //           let b = JSON.parse(a.val);
    //           var url = "";
    //           this.previewFile(b[0].filename, "imageIdFront");
    //           this.getBase64Image(
    //             "http://3.13.68.92:3000/company/" + b[0].filename,
    //             base64image => {
    //               //
    //               url = base64image;
    //               //
    //               this.previewFile(url, "imageIdFront");
    //             }
    //           );
    //         }
    //         if (this.$store.state.getData.data[i].key === "imageIdBack") {
    //           this.fnCall = true;
    //           let a = this.$store.state.getData.data[i];
    //           let b = JSON.parse(a.val);
    //           var url = "";
    //           this.previewFile(b[0].filename, "imageIdBack");
    //           this.getBase64Image(
    //             "http://3.13.68.92:3000/company/" + b[0].filename,
    //             base64image => {
    //               //
    //               url = base64image;
    //               //
    //               this.previewFile(url, "imageIdBack");
    //             }
    //           );
    //         }
    //       }
    //     });
    //   }, 1000);
    // }
  
  },
  data() {
    return {
      uuid: "",
      fnCall:false,
      final_uuid:"",
      userData:"",
      msg: isMobile
        ? "Welcome to Your Vue.js mobile App!"
        : "Welcome to Your Vue.js App",
      showmodel: false,
      save: true,
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
  updated() {
    if (localStorage.getItem("showModal") == "true") {
      this.showmodel = true;
    } else {
      this.showmodel = false;
    }
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },
  methods: {
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    getBase64Image(imgUrl, callback) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        callback(dataURL);
      };

      // set attributes and src
      img.setAttribute("crossOrigin", "anonymous"); //
      img.src = imgUrl;
    },
    async loadCompany() {
      try {
        let res = await API.get("company/current");
        if (res.status === "OK") {
          // let data = data.data;
          this.uuid = res.data.uuid;
        }
      } catch {}
    },
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
      
        this.show();
        if (willDelete) {
          this.$router.push({ name: "AccountInfoUploadDocuments" });
        } else {
          swal(
            "Thank You!",
            "Your changes has been accepted! You will get new Updated Quote",
            {
              icon: "success"
            }
          );
        }
      });
    },
    async show() {
      this.loading = true;
      this.error = null;
      var temp_uuid;
      if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
      
      } else {
        temp_uuid = this.uuid;
      
      }
      try {
        let data = await API.formData("company/upload", temp_uuid);
        if (data.status === "OK") {
          if (!localStorage.getItem("token")) {
            if (this.showmodel) {
              this.showmodel = false;
            } else {
              this.showmodel = true;
            }
          }
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        // this.showmodel = true;

        console.error(err);
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
      }
    },
    setImage(event, fieldName) {
      
      let { files } = event.target;

      let image = files[0] || null;

      this.formData[fieldName] = image;
    
      this.previewFile(image, fieldName);
    },

    previewFile(file, fieldName) {
      //
      let reader = new FileReader();
      //
      reader.onload = () => {
        this.preview[fieldName] = reader.result;
      };
  
      if (file && !this.fnCall) {
        //
        reader.readAsDataURL(file);
      } else {
        this.preview[fieldName] = null;
      }

      if(file && this.fnCall){
        this.preview[fieldName] = file;
      } else {
        this.preview[fieldName] = null;
      }
    },
    
    async uploadDocuments() {
      try {
        let data = await API.formData("company/upload", this.formData);
        if(localStorage.getItem('token')){
          this.final_uuid = this.userData;
        }else{
          this.final_uuid = this.uuid;
        }
        if (data.status === "OK") {
          this.goNextForm();
          // this.$router.push({ name: this.nextForm });
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
    padding-top: 10px;
    text-align: center;

    .preview-image {
      max-height: 100%;
    }
  }
}
</style>
<style>
#input-width .lt-input {
  font-size: 12px;
  text-align: center;
}
</style>

