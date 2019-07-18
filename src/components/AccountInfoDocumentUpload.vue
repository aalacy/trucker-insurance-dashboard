<template>
  <div class="account-info-document-upload-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Document Upload</h4>
         <div class="row set-mob" >
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
                <div class="next-title text-center d-inline pl-3 mob-2">Underwriting Questions</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
                 @click="goNextForm"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 mob-2 text-white">Sign & Complete</div>
              </button>
            </div>
          </div>
          
        </div>
       
      </div>
        <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
            <span class="save-hover">Save & Continue </span>
            </div>
            <div v-if="showmodel">
              <modelLogin/>
            </div>

    </form>
  </div>
</template>

<script>
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue"
export default {
   components:{
    "modelLogin":ModalLogin
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
       showmodel:false,
        save:true,
      formData: {
        lossRun: null,
        ifta: null,
        contracts: null,
        declarations: null,
        rentalLeaseAgreement: null,
        previouslyCompletedApplications: null,
        insuranceRequirements: null,
        
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
    updated(){
if(localStorage.getItem("showModal") == "true")
     {
       this.showmodel = true;
     }
     else{
       this.showmodel = false;
     }
 },mounted(){
    if(localStorage.getItem("token")){
     this.save = false
   }else{
     this.save = true
   }
 },
  methods: {
       async show() {
       this.loading = true;
      this.error = null;

      try {
        let data = await API.formData("company/upload", this.formData);
        if (data.status === "OK") {
          if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
          }
        } else if (data.status === "ERROR") {
          // this.showmodel = true;
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
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    onFileChange(event, fieldName) {
      let file = event.target.files[0] || null;
      this.formData[fieldName] = file;
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");

        if (data.status === "ERROR") {
          this.$router.replace({ name: "Home" });
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

        if (data.status === "OK") {
          this.goNextForm();
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
.set-mob .form-group{
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
   .set-mob .form-group{
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
  }

   @media screen and (max-width: 479px) {
 .set-mob .form-group{
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
}
</style>
