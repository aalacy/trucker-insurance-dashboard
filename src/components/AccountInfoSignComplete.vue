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

            <div class="col-12 col-md-8">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <input
                      disabled
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
                      disabled
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
                      disabled
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
                <h5>
                  <label class="d-flex">Signature</label>
                </h5>
                <!-- 
                <input
                  id="imageSign"
                  :class="{ 'has-error': formErrors.imageSign }"
                  type="file"
                  class="lt-input"
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
                    :options="{penColor:'#5e98f9',dotSize:'0.5'}"
                  />
                  <div class="m-2 d-flex">
                    <!-- <button
                      @click="saveSignature"
                      class="lt-button lt-button-main mr-2"
                      type="button"
                    >Save</button> -->
                    <button
                      @click="clearSignature"
                      class="lt-button"
                      type="button"
                    >Clear</button>
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
                Prev
                <div class="next-title text-center d-inline  pl-3 pad-0 mob-2">Upload Document</div>
                <!-- <div class="next-title text-center d-inline  pl-3 pad-0 mob-2">Underwriting Q<span class="hide-que">ues</span>t<span class="hide-que">ions</span></div> -->
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb color-green"
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
      <div class="d-flex justify-content-center m-4" @click="newQuoteReq" v-else>
        <span class="save-hover">Save Changes</span>
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
      error: null
    };
  },
  updated() {
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
    // this.$emit("update-progress", this.progress);
    // if (this.driver.dateOfSign) {
    //       [dobM, dobD, dobY] = this.driver.dateOfSign.split('/');
    //     }
    // this.formData = {
    //   ...this.formData,
    //   //   ...this.driver,
    //   dobM,
    //   dobD,
    //   dobY
    // };
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
        this.$store.dispatch("loadData", this.userData).then(res => {
          let len = this.$store.state.getData.data;
          
          
          for (let i = 0; i <= len.length; i++) {
            if (this.$store.state.getData.data[i].key == "imageSign") {
              let a = this.$store.state.getData.data[i];
              let b = JSON.parse(a.val);
              var url = "";
              this.getBase64Image(
                "http://3.13.68.92:3000/company/" + b[0].filename,
                base64image => {
                  
                  url = base64image;
                  
                  this.previewFile(url, "imageSign");
                }
              );
            }
          }
        });
      }, 1000);
    } else {
      this.save = true;
      setTimeout(() => {
        this.$store.dispatch("loadData", this.uuid).then(res => {
          let len = this.$store.state.getData.data;
    
    
          for (let i = 0; i <= len.length; i++) {
            if (this.$store.state.getData.data[i].key == "imageSign") {
              let a = this.$store.state.getData.data[i];
              let b = JSON.parse(a.val);

              var url = "";
              this.previewFile(b[0].filename, "imageSign");
              this.getBase64Image(
                "http://3.13.68.92:3000/company/" + b[0].filename,
                base64image => {
                  
                  url = base64image;
                  
                  this.previewFile(url, "imageSign");
                }
              );
            }
          }
        });
      }, 1000);
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

    }
      var a = this.base64toBlob(data.split(",")[1], "jpeg");
      this.formData.imageSign = a;
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
      try {
        let data = await API.get("company/current");
        if (data.status === "OK") {
          // let data = data.data;
          this.uuid = data.data.b;
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
      if (localStorage.getItem("token")) {
        this.final_uuid = this.userData;
  
      } else {
        this.final_uuid = this.uuid;
  
      }
      
      // this.saveSignature;
      try {
        let data = await API.formData("company/upload", this.formData);
  
  
        if (data.status === "OK") {
          this.goNextForm;
          
          this.$router.push({ name: this.nextForm });
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
        axios
          .post(
            "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid=" +
              this.uuid +
              "&user_id=" +
              localStorage.getItem("userId")
          )
          .then(res => {
      
          });
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

