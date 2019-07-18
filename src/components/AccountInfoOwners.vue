<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Owner(s)</h4>

          <div class="d-flex">
            <div class="pr-3">Are one of the drivers the owner?</div>

            <div class="flex-grow-1">
              <label>
                <input v-model="formData.driverIsOwner" type="checkbox" /> Yes
              </label>
            </div>
          </div>

          <div v-if="formData.driverIsOwner" class="col-12 col-md-6">
            <select v-model="formData.driverOwnerIndex" class="lt-input">
              <option value="" disabled>
                Select Driver
              </option>

              <option
                v-for="(item, index) in drivers"
                :key="index"
                :value="index"
              >
                {{ item.firstName }} {{ item.lastName }}
              </option>
            </select>
          </div>

          <hr />

          <account-info-owners-item
            v-for="(item, index) in formData.owners"
            ref="ownerForm"
            :key="item._uuid"
            :index="index"
            :owner="item"
            :drivers="drivers"
            :id="formData.driverIsOwner"
            class="mb-5"  
            @update-hint="updateHint"
            @remove-form="removeForm"
          />

          <hr />

          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">
              Add another owner
            </div>
        
            <div class="col-auto text-right">
              <button type="button" class="lt-button px-3" @click="addForm">
                +
              </button>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
        </div>

        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="button"
                class="lt-button lt-button-default px-4 btn-block btn-border-radius-lb mob-2" 
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">
                  Drivers
                </div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main px-4 btn-block btn-border-radius-rb mob-2"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white mob-2">
                  Underwriting Questions
                </div>
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
import uuidv4 from 'uuid/v4';
import { API } from '../api.js';
import ModalLogin from "./ModalLogin.vue"
export default {
  name: 'AccountInfoOwners',
  components: {
    AccountInfoOwnersItem: () => import('./AccountInfoOwnersItem.vue'),
        "modelLogin":ModalLogin
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
       showmodel:false,
      save:true,
      formData: {
        driverIsOwner: false,
        driverOwnerIndex: -1,
        owners: []
      },
      drivers: [],
      loading: false,
      error: null,
      
    };
  },
  computed: {
    noOwners() {
      return (
        this.formData.driverOwnerIndex === -1 && !this.formData.owners.length
      );
    }
  },
  watch: {
    'formData.driverIsOwner'(driverIsOwner) {
      if (!driverIsOwner) {
        this.formData.driverOwnerIndex = -1;
      }
    },
    noOwners(noOwners) {
      this.error = noOwners ? 'Please add at least one owner' : null;
    }
  },
 mounted(){
    if(localStorage.getItem("token")){
     this.save = false
   }else{
     
     this.save = true
   }
 },
  created() {
    this.$emit('update-progress', this.progress);
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
 },
  methods: {
    async show() {
      if (
        this.formData.driverIsOwner &&
        this.formData.driverOwnerIndex === -1
      ) {
        this.formData.driverIsOwner = false;
      }

      this.setDataFromForms();

      if (this.noOwners) {
        return;
      }

      let allFormAreValid = this.$refs.ownerForm
        ? this.$refs.ownerForm.every(formRef => formRef.validateForm())
        : true;

      if (!allFormAreValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post('company/save', {
          key: 'owners',
          val: {
            ...this.formData,
            owners: this.formData.owners.map(o => {
              let owner = { ...o };
              delete owner._uuid;
              return owner;
            })
          },
            userId:localStorage.getItem("userId"),
            uuid:localStorage.getItem("uuid")
        });

        if (data.status === "OK") {
          if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
          }
        } else if (data.status === "ERROR") {
          this.showmodel = true;
          this.error = data.messages[0] || data.data;
        }
      } catch (err) {
        console.error(err);
        // this.showmodel = true;
        this.error = err.message;
      } finally {
        // this.showmodel = true;
        this.loading = false;
      }
    },
    addForm() {

      // console.log(" _uuid: uuidv4()", uuidv4())
      this.formData.owners.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.formData.owners.splice(index, 1);
    },
    updateHint(hint) {
      this.$emit('update-hint', hint);
    },
    goPrevForm() {
      this.$emit('go-to-form', this.prevForm);
    },
    goNextForm() {
      this.$emit('go-to-form', this.nextForm);
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get('company/current');

        if (data.status === 'OK') {
          let { drivers, owners: ownersTab } = data.data.a;
            console.log("sssss",data.data.a)
          if (drivers) {
            this.drivers = drivers;
          }

          if (ownersTab) {
            let { owners } = ownersTab;

            this.formData = {
              ...this.formData,
              ...ownersTab,
              owners: owners.map(o => ({ ...o, _uuid: uuidv4() }))
            };
          } else {
            this.addForm();
          }
        } else if (data.status === 'ERROR') {
          // this.$router.replace({ name: 'Home' });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    setDataFromForms() {
      let owners = [];

      if (this.$refs.ownerForm) {
        this.$refs.ownerForm.forEach(formRef => {
          let formData = formRef.getFormData();
          owners.push(formData);
        });
      }

      this.formData.owners = owners;
    },
    async updateCompany() {
      if (
        this.formData.driverIsOwner &&
        this.formData.driverOwnerIndex === -1
      ) {
        this.formData.driverIsOwner = false;
      }

      this.setDataFromForms();

      if (this.noOwners) {
        return;
      }

      let allFormAreValid = this.$refs.ownerForm
        ? this.$refs.ownerForm.every(formRef => formRef.validateForm())
        : true;

      if (!allFormAreValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post('company/save', {
          key: 'owners',
          val: {
            ...this.formData,
            owners: this.formData.owners.map(o => {
              let owner = { ...o };
              delete owner._uuid;
              return owner;
            })
          },
            userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });

        if (data.status === 'OK') {
          this.goNextForm();
        } else if (data.status === 'ERROR') {
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

<style lang="scss" scoped></style>

