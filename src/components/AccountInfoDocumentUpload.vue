<template>
  <div class="account-info-document-upload-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Document Upload</h4>
          <div class="m-1 pb-2">
            <span>Although these uploads are not mandatory, they help to provide you more options and a faster service, if completed, as many carriers require such data. Please upload all of the relevant documents that you can</span>
          </div>
          <div class="row set-mob">
            <div class="form-group">
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
              <div v-if="preview.lossRun" class="d-flex justify-content-start align-base">
                <p class="preview-image">{{preview.lossRun}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('lossRun')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group">
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
              <div v-if="preview.ifta" class="d-flex justify-content-start align-base">
                <p class="preview-image">{{preview.ifta}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('ifta')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group">
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
              <div v-if="preview.contracts" class="d-flex justify-content-start align-base">
                <p class="preview-image">{{preview.contracts}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('contracts')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group">
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
              <div v-if="preview.declarations" class="d-flex justify-content-start align-base">
                <p class="preview-image">{{preview.declarations}}</p>
                <button type="button" class="btn btn-close1" @click="removeDoc('declarations')">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group">
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
              <div v-if="preview.rentalLeaseAgreement" class="d-flex justify-content-start align-base">
                <p class="preview-image">{{preview.rentalLeaseAgreement}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('rentalLeaseAgreement')"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group">
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
                v-if="preview.previouslyCompletedApplications"
                class="d-flex justify-content-start align-base"
              >
                <p class="preview-image">{{preview.previouslyCompletedApplications}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('previouslyCompletedApplications')"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>

            <div class="form-group">
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
              <div v-if="preview.insuranceRequirements" class="d-flex justify-content-start align-base">
                <p class="preview-image">{{preview.insuranceRequirements}}</p>
                <button
                  type="button"
                  class="btn btn-close1"
                  @click="removeDoc('insuranceRequirements')"
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
                Prev
                <div class="next-title text-center d-inline pl-3  mob-2">Additional Comments</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
                
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 mob-2 text-white">Sign & Complete</div>
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
        lossRun: null,
        ifta: null,
        contracts: null,
        declarations: null,
        rentalLeaseAgreement: null,
        previouslyCompletedApplications: null,
        insuranceRequirements: null
      },
      preview: {
        lossRun: null,
        ifta: null,
        contracts: null,
        declarations: null,
        rentalLeaseAgreement: null,
        previouslyCompletedApplications: null,
        insuranceRequirements: null
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
            if (this.$store.state.getData.data[i].key === "lossRun") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.lossRun = a;
              
            }
            if (this.$store.state.getData.data[i].key === "ifta") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.ifta = a;
              
            }
            if (this.$store.state.getData.data[i].key === "contracts") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.contracts = a;
              
            }
            if (this.$store.state.getData.data[i].key === "declarations") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.declarations = a;
              
            }
            if (
              this.$store.state.getData.data[i].key === "rentalLeaseAgreement"
            ) {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.rentalLeaseAgreement = a;
              
            }
            if (
              this.$store.state.getData.data[i].key ===
              "previouslyCompletedApplications"
            ) {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.previouslyCompletedApplications = a;
              
            }
            if (
              this.$store.state.getData.data[i].key === "insuranceRequirements"
            ) {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.insuranceRequirements = a;
              
            }
          }
        });
      }, 1000);
    } else {
      this.save = true;
      setTimeout(() => {
        this.$store.dispatch("loadData", this.uuid).then(() => {
          let len = this.$store.state.getData.data;
          for (let i = 0; i < len.length; i++) {
            if (this.$store.state.getData.data[i].key === "lossRun") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.lossRun = a;
              
            }
            if (this.$store.state.getData.data[i].key === "ifta") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.ifta = a;
              
            }
            if (this.$store.state.getData.data[i].key === "contracts") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.contracts = a;
              
            }
            if (this.$store.state.getData.data[i].key === "declarations") {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.declarations = a;
              
            }
            if (
              this.$store.state.getData.data[i].key === "rentalLeaseAgreement"
            ) {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.rentalLeaseAgreement = a;
              
            }
            if (
              this.$store.state.getData.data[i].key ===
              "previouslyCompletedApplications"
            ) {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.previouslyCompletedApplications = a;
              
            }
            if (
              this.$store.state.getData.data[i].key === "insuranceRequirements"
            ) {
              let a = JSON.parse(this.$store.state.getData.data[i].val)[0]
                .originalname;
              this.preview.insuranceRequirements = a;
              
            }
          }
        });
      }, 1000);
    }
    
  },
  methods: {
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
        
        this.show();
        if (willDelete) {
          this.$router.push({ name: "AccountInfoDocumentUpload" });
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
    removeDoc(fieldName) {
      
      switch (fieldName) {
        case "lossRun":
          
          this.formData.lossRun = null;
          
          this.preview.lossRun = null;
          break;
        case "ifta":
          this.formData.ifta = null;
          this.preview.ifta = null;
          break;
        case "contracts":
          this.formData.contracts = null;
          this.preview.contracts = null;
          break;
        case "declarations":
          this.formData.declarations = null;
          this.preview.declarations = null;
          break;
        case "rentalLeaseAgreement":
          this.formData.rentalLeaseAgreement = null;
          this.preview.rentalLeaseAgreement = null;
          break;
        case "previouslyCompletedApplications":
          this.formData.previouslyCompletedApplications = null;
          this.preview.previouslyCompletedApplications = null;
          break;
        case "insuranceRequirements":
          this.formData.insuranceRequirements = null;
          this.preview.insuranceRequirements = null;
          break;
      }
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
        // this.showmodel = true;

        console.error(err);
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
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
      reader.onloadend = () => {
        // this.preview[fieldName] = reader.result;
        
      };

      if (file) {
        reader.readAsDataURL(file);
        this.preview[fieldName] = file.name;
        // 
      } else {
        // 
        this.preview[fieldName] = null;
      }
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");
        this.uuid = data.data.b;
        
        if (data.status === "ERROR") {
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
        let data = await API.formData("company/upload", this.formData);
      
        
         if(localStorage.getItem('token')){
        
          this.final_uuid = this.userData;
          
      }else{
        this.final_uuid = this.uuid;
        
      }
        if (data.status === "OK") {
          
          this.goNextForm();
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
        axios
          .post(
            "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid=" +
             this.final_uuid  +
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
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-close1 {
  margin-top: -6;
}
.set-mob .form-group {
  flex: 0 0 20%;
  max-width: 20%;
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

