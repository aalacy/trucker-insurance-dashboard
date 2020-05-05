<template>
  <div class="account-info-document-upload-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="form-sub-title">Document Upload</h4>
          <div class="p-1 mb-3">
            <span>Uploading additional documents provides more options and speeds up the quoting process.</span>
          </div>
          <div class="row set-mob">
            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="lossRun">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="lossRun" class="label">Loss Run</label>
                <input
                  id="lossRun"
                  type="file"
                  :class="{ 'has-error': formErrors.lossRun }"
                  @change="onFileChange($event, 'lossRun')"
                >
              </div>
              <div v-if="preview.lossRun.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.lossRun.name}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('lossRun')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="ifta">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="ifta" class="label">IFTA</label>

                <input
                  id="ifta"
                  type="file"
                  :class="{ 'has-error': formErrors.ifta }"
                  @change="onFileChange($event, 'ifta')"
                >
              </div>
              <div v-if="preview.ifta.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.ifta.name}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('ifta')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="contracts">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="contracts" class="label">Contracts & Sample COI's</label>

                <input
                  id="contracts"
                  type="file"
                  :class="{ 'has-error': formErrors.contracts }"
                  @change="onFileChange($event, 'contracts')"
                >
              </div>
              <div v-if="preview.contracts.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.contracts.name}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('contracts')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="declarations">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="declarations" class="label">Declarations</label>

                <input
                  id="declarations"
                  type="file"
                  :class="{ 'has-error': formErrors.declarations }"
                  @change="onFileChange($event, 'declarations')"
                >
              </div>
              <div v-if="preview.declarations.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.declarations.name}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('declarations')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="rentalLeaseAgreement">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="rentalLeaseAgreement" class="label">Rental/Lease Agreements</label>

                <input
                  id="rentalLeaseAgreement"
                  type="file"
                  :class="{ 'has-error': formErrors.rentalLeaseAgreement }"
                  @change="onFileChange($event, 'rentalLeaseAgreement')"
                >
              </div>
              <div v-if="preview.rentalLeaseAgreement.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.rentalLeaseAgreement.name}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('rentalLeaseAgreement')"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="previouslyCompletedApplications">
                  <img src="../assets/images/upload.png">
                </label>
                <label
                  for="previouslyCompletedApplications"
                  class="label"
                >Previously Completed Applications</label>

                <input
                  id="previouslyCompletedApplications"
                  type="file"
                  :class="{
                'has-error': formErrors.previouslyCompletedApplications
              }"
                  @change="onFileChange($event, 'previouslyCompletedApplications')"
                >
              </div>
              <div
                v-if="preview.previouslyCompletedApplications.name"
                class="d-flex justify-content-around align-base"
              >
                <p class="preview-image">{{preview.previouslyCompletedApplications.name}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('previouslyCompletedApplications')"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="insuranceRequirements">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="insuranceRequirements" class="label">Insurance Requirements</label>

                <input
                  id="insuranceRequirements"
                  type="file"
                  :class="{ 'has-error': formErrors.insuranceRequirements }"
                  @change="onFileChange($event, 'insuranceRequirements')"
                >
              </div>
              <div v-if="preview.insuranceRequirements.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.insuranceRequirements.name}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('insuranceRequirements')"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

          <div class="form-group col-sm-6 col-lg-3 col-md-4">
              <div class="image-upload">
                <label for="other">
                  <img src="../assets/images/upload.png">
                </label>
                <label for="other" class="label">Other</label>

                <input
                  id="other"
                  type="file"
                  :class="{ 'has-error': formErrors.other }"
                  @change="onFileChange($event, 'other')"
                >
              </div>
              <div v-if="preview.other.name" class="d-flex justify-content-around align-base">
                <p class="preview-image">{{preview.other.name}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('other')"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
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
                <div class="prev-title">Additional Comments</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Sign & Complete</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showmodel">
        <modelLogin/>
      </div>
    </form>
  </div>
</template>

<script>
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import axios from "axios";
import { setTimeout } from "timers";
export default {
  components: {
    modelLogin: ModalLogin,
  },
  name: "AccountInfoDocumentUpload",
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
      uuid: "",
      userData: "",
      final_uuid: "",
      showmodel: false,
      save: true,
      formData: {
        lossRun: {name: "", content: ""},
        ifta: {name: "", content: ""},
        contracts: {name: "", content: ""},
        declarations: {name: "", content: ""},
        rentalLeaseAgreement: {name: "", content: ""},
        previouslyCompletedApplications: {name: "", content: ""},
        insuranceRequirements: {name: "", content: ""},
        other: {name: "", content: ""},
      },
      preview: {
        lossRun: {name: "", content: ""},
        ifta: {name: "", content: ""},
        contracts: {name: "", content: ""},
        declarations: {name: "", content: ""},
        rentalLeaseAgreement: {name: "", content: ""},
        previouslyCompletedApplications: {name: "", content: ""},
        insuranceRequirements: {name: "", content: ""},
        other: {name: "", content: ""}
      },
      formErrors: {},
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },
  updated() {
    if (localStorage.getItem("showModal") == "true") {
      this.showmodel = true;
    } else {
      this.showmodel = false;
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
    } else {
      this.save = true;
    }
  },
  methods: {
    removeDoc(fieldName) {
      
      switch (fieldName) {
        case "lossRun":
          
          this.formData.lossRun = {};
          
          this.preview.lossRun = {};
          break;
        case "ifta":
          this.formData.ifta = {};
          this.preview.ifta = {};
          break;
        case "contracts":
          this.formData.contracts = {};
          this.preview.contracts = {};
          break;
        case "declarations":
          this.formData.declarations = {};
          this.preview.declarations = {};
          break;
        case "rentalLeaseAgreement":
          this.formData.rentalLeaseAgreement = {};
          this.preview.rentalLeaseAgreement = {};
          break;
        case "previouslyCompletedApplications":
          this.formData.previouslyCompletedApplications = {};
          this.preview.previouslyCompletedApplications = {};
          break;
        case "insuranceRequirements":
          this.formData.insuranceRequirements = {};
          this.preview.insuranceRequirements = {};
          break;
        case "other":
          this.formData.other = {};
          this.preview.other = {};
          break;
      }
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    onFileChange(event, fieldName) {
      let file = event.target.files[0] || null;
      this.formData[fieldName] = file;
      
      this.previewFile(file, fieldName);
    },
    previewFile(file, fieldName) {
      let reader = new FileReader();
      let tempObj = this.preview[fieldName];
      reader.onloadend = (evt) => {
        tempObj.content = evt.target.result;
        this.preview[fieldName] = Object.assign({}, tempObj);
      };

      if (file) {
        reader.readAsDataURL(file);
        tempObj.name = file.name;
      } else {
        // 
        tempObj.name = "";
      }

      this.preview[fieldName] = Object.assign({}, tempObj);
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
        this.uuid = res.data.uuid;
        
        if (res.status === "ERROR") {
          // this.$router.replace({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateCompany() {
      this.loading = true;
      this.error = null;
      
      try {
        const attachmentList = []
        const self = this;
        Object.keys(this.preview).forEach(function(key) {
          attachmentList.push({
            name: self.preview[key].name,
            content: self.preview[key].content
          })
        });
        const data = {
          attachmentList,
          uuid: this.uuid
        };
        let res = await API.post("company/save", { data });
        if (res.status === "OK") {
          localStorage.setItem('uuid', res.data);
          this.goNextForm();
        } else if (res.status === "ERROR") {
          this.error = res.messages[0] || res.data;
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
.btn-close1 {
  margin-top: -6;
}
.set-mob .form-group {
  text-align: center;
}
.image-upload > input {
  display: none;
}
.image-upload img {
  width: 60px;
  background-color: #c5c1c1;
  padding: 10px;
  border-radius: 6px;
}
.account-info-document-upload-form {
  .label {
    display: block;
  }
  @media screen and (max-width: 639px) {
    .set-mob .form-group {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
  }

  @media screen and (max-width: 479px) {
    .set-mob .form-group {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
}
.preview-image {
  color: #5e98f9;
  font-size:13px;
  align-items: baseline;
  word-break: break-all;
  margin: 0px;
  padding: 0px;
  padding-left: 20px; 
  padding-right:5px;
}
.align-base{
  align-items: baseline;
}

.align-base button{
  padding:0px;
}
</style>

