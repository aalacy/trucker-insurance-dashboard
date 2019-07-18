<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Drivers</h4>

          <account-info-drivers-item
            v-for="(item, index) in drivers"
            ref="driverForm"
            :key="item._uuid"
            :index="index"
            :driver="item"
            class="mb-5"
            @update-hint="updateHint"
            @remove-form="removeForm"
          />

          <hr>

          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another driver</div>

            <div class="col-auto text-right">
              <button type="button" class="lt-button px-3" @click="addForm">+</button>
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
                class="lt-button lt-button-default mob-2 px-4 btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">ELD Provider</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main mob-2 px-4 btn-block btn-border-radius-rb"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white mob-2">Owners</div>
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
import uuidv4 from "uuid/v4";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";

export default {
  name: "AccountInfoDrivers",

  components: {
    AccountInfoDriversItem: () => import("./AccountInfoDriversItem.vue"),
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
      drivers: [],
      loading: false,
      error: null,
      save:true
    };
  },
 mounted(){
    if(localStorage.getItem("token")){
     this.save = false
   }else{
     this.save = true
   }
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
  methods: {
    async show() {
      this.setDataFromForms();

      let driverForms = this.$refs.driverForm;
      if (!driverForms.length) {
        return;
      }

      let allFormAreValid = driverForms.every(formRef =>
        formRef.validateForm()
      );

      if (!allFormAreValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "drivers",
          val: this.drivers.map(d => {
            let driver = { ...d };
            delete driver._uuid;
            return driver;
          }),
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
      this.drivers.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.drivers.splice(index, 1);

      if (!this.drivers.length) {
        this.error = "Please add at least one driver";
      }
    },
    updateHint(hint) {
      this.$emit("update-hint", hint);
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");

        if (data.status === "OK") {
          let { drivers } = data.data;

          if (drivers && drivers.length) {
            this.drivers = drivers.map(d => ({ ...d, _uuid: uuidv4() }));
          } else {
            this.addForm();
          }
        } else if (data.status === "ERROR") {
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
      let drivers = [];

      this.$refs.driverForm.forEach(formRef => {
        let formData = formRef.getFormData();
        drivers.push(formData);
      });

      this.drivers = drivers;
    },
    async updateCompany() {
      this.setDataFromForms();

      let driverForms = this.$refs.driverForm;
      if (!driverForms.length) {
        return;
      }

      let allFormAreValid = driverForms.every(formRef =>
        formRef.validateForm()
      );

      if (!allFormAreValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "drivers",
          val: this.drivers.map(d => {
            let driver = { ...d };
            delete driver._uuid;
            return driver;
          }),
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });

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

<style lang="scss" scoped></style>
