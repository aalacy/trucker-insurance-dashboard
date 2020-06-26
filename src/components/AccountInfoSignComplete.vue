<template>
  <div class="container-fluid mob-2" id="card-pad">
    <form @submit.prevent="saveSignature">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Sign and Complete</h4>
          <div class="row">
            <div class="col-12 col-md-4 pt-2">
              <div>Date of Sign</div>

              <div v-if="formErrors.dateOfSign" class="text-danger">{{ formErrors.dateOfSign }}</div>
            </div>

            <div class="col-12">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <input
                      disabled
                      v-model="formData.dobD"
                      :class="{ 'has-error': formErrors.dobD }"
                      type="text"
                      class="form-control"
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
                      disabled
                      v-model="formData.dobM"
                      :class="{ 'has-error': formErrors.dobM }"
                      type="text"
                      class="form-control"
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
                      disabled
                      v-model="formData.dobY"
                      :class="{ 'has-error': formErrors.dobY }"
                      type="text"
                      class="form-control"
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

            <div class="col-12 mt-4">
              <div class="form-group">
                <h5>
                  <label class="d-flex">Signature</label>
                </h5>
                <!-- 
                <input
                  id="imageSign"
                  :class="{ 'has-error': formErrors.imageSign }"
                  type="file"
                  class="form-control"
                  hidden
                  @change="setImage($event, 'imageSign')"
                >-->
                <div v-if="preview.imageSign" class="preview" >
                  <img :src="preview.imageSign" alt class="preview-image mt-3">
                  <button @click="editSignature" class="lt-button m-2" type="button">Edit</button>
                </div>
                <div class="" v-else>
                  <VueSignaturePad
                    width="100%"
                    saveType="image/jpeg"
                    height="180px"
                    ref="signaturePad"
                    id="signature"
                    :options="{backgroundColor: '#ffffff', penColor:'#000',dotSize:'0.5'}"
                  />
                  <div class="mt-3 d-flex">
                    <!-- <button
                      @click="saveSignature"
                      class="lt-button lt-button-main mr-2"
                      type="button"
                    >Save</button> -->
                    <button
                      @click="clearSignature"
                      class="btn btn-outline-dark"
                      type="button"
                    >Clear</button>
                  </div>
                  <div v-if="!loggedIn" class="row mt-3">
                    <div class="col">
                      By creating your account, you agree to Embroker's <a href="https://luckytruck.co/backend/TERMS_OF_SERVICE_FOR_LuckyTruck.co.pdf" rel="noopener noreferrer" target="_blank">Terms and Conditions</a> and <a href="https://luckytruck.co/backend/PRIVACY_POLICY_FOR_LuckyTruck.pdf" rel="noopener noreferrer" target="_blank">Privacy Policy</a>
                    </div>
                    <div class="col-auto">
                      <router-link
                        @click.native="loginHide"
                        :to="{ name: 'SignUp', query: {next: this.$router.history.current.name} }"
                        class="btn btn-primary rounded-pill"
                        active-class="font-weight-bold"
                      >Create an Account</router-link>
                    </div>
                  </div>
                </div>
                <div v-if="formErrors.imageSign" class="text-danger">{{ formErrors.imageSign }}</div>
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
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title">Upload Document</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Complete</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    <!--   <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
      </div>
      <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
        <span class="save-hover">Save Changes</span>
      </div> -->
      <div v-if="showmodel">
        <modelLogin/>
      </div>
    </form>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import ModalLogin from "./ModalLogin.vue";
import axios from "axios";
import { API } from "../api.js";
import { mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "AccountInfoSignComplete",
  components: {
    modelLogin: ModalLogin,
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
  computed: {
    ...mapState(["data"])
  },
  data() {
    return {
      uuid: "",
      userData: "",
      final_uuid: "",
      showmodel: false,
      save: true,
      formData: {
        dobM: "",
        dobD: "",
        dobY: "",
        imageSign: ""
      },
      preview: {
        imageSign: null
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
      error: null,
      loggedIn: false
    };
  },
  updated() {
    this.$emit("update-progress", this.progress);
    
    if (localStorage.getItem("showModal") == "true") {
      this.showmodel = true;
    } else {
      this.showmodel = false;
    }
  },
  created() {
    let dobM = "",
      imageSign = "",
      dobD = "",
      dobY = "";
    this.loadCompany();
  },
  mounted() {
    var currentDate = new Date();
    var currentDateWithFormat = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    [
      this.formData.dobD,
      this.formData.dobM,
      this.formData.dobY
    ] = currentDateWithFormat.split("/");

    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },
  methods: {
    editSignature() {
      this.preview.imageSign = false;
    },
   clearSignature() {
      this.$refs.signaturePad.clearSignature();
    },
    saveSignature() {

      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if(isEmpty){
        return swal({
          title: "Warning",
          text: "Please sign a signature",
          icon: "warning",
        });
      }
      // var a = this.base64toBlob(data.split(",")[1], "jpeg");
      this.formData.imageSign = data;
      this.updateCompany();
      
    },
    base64toBlob(base64Data, contentType) {
      contentType = contentType || "";
      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return new Blob(byteArrays, { type: contentType });
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
      this.loading = true;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
        if (res && res.status === "OK") {
          // let data = data.data;
          this.uuid = res.data.uuid;
        }
      } 
      catch {}
      finally {
        this.loading = false;
      }
    },
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
  
        if (willDelete) {
          this.show();
          this.$router.push({ name: "AccountInfoSignComplete" });
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

    show() {
      if (!localStorage.getItem("token")) {
        if (this.showmodel) {
          this.showmodel = false;
        } else {
          this.showmodel = true;
        }
      }
    },
    setImage(event, fieldName) {
      let { files } = event.target;
      
      //
      //
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
        this.preview[fieldName] = file;
        // reader.readAsDataURL(file);
      } else {
        this.preview[fieldName] = null;
      }
    },
    clearFiles() {
      this.$refs["file-input"].reset();
    },
    async updateCompany() {
      // if(this.$refs.signaturePad.isEmpty()){
      //   
      // }
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }
      this.loading = true;
      this.error = null;
      this.final_uuid = this.uuid;
      
      try {
        const data = {
          signSignature: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid,
        };
        let res = await API.post("company/save", { data });

        if (res.status === "OK") {
          localStorage.setItem('uuid', res.data);
          this.goNextForm();
        } else if (res.status === "ERROR") {
          this.formErrors.imageSign = res.messages;
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

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
#signature {
  border: solid 2px black;
  border-radius: 5px;
  // background-image: linear-gradient(white, white);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
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

