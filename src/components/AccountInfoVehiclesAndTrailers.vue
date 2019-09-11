<template>
  <div class="vehicles-and-trailers-form container-fluid mob-2">
    

    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Vehicle(s) & Trailer(s)</h4>
          <account-info-vehicles-and-trailers-item
            v-for="(item, index) in vehiclesTrailers"
            ref="vehicleForm"
            :key="item._uuid"
            :index="index"
            :vehicle="item"
            :vehicleOrTrailer="vehicleOrTrailer"
            class="mb-5"
            @update-hint="updateHint"
            @remove-form="removeForm"
          />

          <hr>

          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another vehicle or trailer</div>
          </div>
          <div class="row">
            <div class="d-flex align-itens-between col ">
              <select
                v-model="vehicleOrTrailer"
                :class="{ 'has-error': formErrors.vehicleOrTrailer }"
                class="lt-input">
                <option value>Vehicle or Trailer</option>
                <option v-for="item in type" :key="item" :value="item">{{ item }}</option>
              </select>
              <button type="button" class="lt-button px-3 btn-bg-white" @click="addForm" title="Add Vehcile/Trailer">+</button>
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
                class="lt-button lt-button-default btn-block btn-border-radius-lb mob-2"
                @click="goPrevForm"
              >
                Prev
                <div class="next-title text-center d-inline pl-3 mob-2">Cargo Hauled</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading" 
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb mob-2"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white mob-2">ELD Provider</div>
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
import {
  validateField,
  validateForm,
  required,
  minLength
} from "../validators.js";
import uuidv4 from "uuid/v4";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import { mapState } from "vuex";
import axios from "axios";
import headerAssistant from "./header.vue";

export default {
  name: "AccountInfoVehiclesAndTrailers",
  components: {
    AccountInfoVehiclesAndTrailersItem: () =>
      import(/* webpackChunkName: "AccountInfoVehiclesAndTrailersItem" */
      "./AccountInfoVehiclesAndTrailersItem.vue"),
    modelLogin: ModalLogin,
    headerAssistant: headerAssistant
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
      final_uuid:"",
      uuid:"",
      showmodel: false,
      save: true,
      vehiclesTrailers: [],
      loading: false,
      error: null,
      vehicleOrTrailer: "",
      formErrors: [],
      // vehicleIndex: 0,
      // trailerIndex: 0,
      type: ["Vehicle", "Trailer"]
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
    } else {
      //  let b = JSON.parse(a.val)

      this.save = true;
    }
    this.$store.dispatch("loadData",this.uuid);
    let a = this.$store.state.getData.data;
    console.log("ba", a);
  },
  computed: {
    ...mapState(["data"])
  },
  updated() {
    console.log("vehicletype", this.vehicleOrTrailer);
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
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
        console.log("willbe", willDelete);
        this.show();
        if (willDelete) {
          this.$router.push({ name: "AccountInfoVehiclesAndTrailers" });
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
    addForm() {
      console.log("VICKY", this.trailerIndex);
      console.log("VICKY", this.vehicleOrTrailer);
      if (this.vehicleOrTrailer == "Trailer") {
        //  console.log("this.trailerIndex=+1",this.trailerIndex+=1)
        // this.trailerIndex += 1
      } else {
        //  console.log("this.vehicleIndex+1",this.vehicleIndex+=1)
        // this.vehicleIndex += 1;
      }
      this.vehiclesTrailers.push({ _uuid: uuidv4() });
      this.error = null;
    },
    removeForm(index) {
      this.vehiclesTrailers.splice(index, 1);

      if (!this.vehiclesTrailers.length) {
        this.error = "Please add at least one vehicle / trailer";
      }
    },
    updateHint(hint) {
      this.$emit("update-hint", hint);
    },
    onFocus(fieldName) {
      this.$emit("update-hint", this.hints[fieldName]);
    },
    onBlur() {
      this.$emit("update-hint", "");
    },
    validateField(fieldName) {
      validateField(
        fieldName,
        this.vehicleOrTrailer,
        this.rules,
        this.formErrors
      );
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.vehicleOrTrailer, this.rules, this.formErrors);
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    async show() {
      this.setDataFromForms();

      let vehicleForms = this.$refs.vehicleForm;
      if (!vehicleForms.length) {
        return;
      }

      let allFormAreValid = vehicleForms.every(formRef =>
        formRef.validateForm()
      );
      if (!allFormAreValid) {
        return;
      }
    var temp_uuid;
       if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
        console.log("temp_uuid login after", temp_uuid);
      } else {
        temp_uuid = this.uuid;
        console.log("temp_uuid no login after", temp_uuid);
      }
      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "vehiclesTrailers",
          val: this.vehiclesTrailers.map(v => {
            let vehicle = { ...v };
            delete vehicle._uuid;
            return vehicle;
          }),
          user_id: localStorage.getItem("userId"),
          uuid:temp_uuid
        });

        if (data.status === "OK") {
          if(!localStorage.getItem("token")){
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
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");
        console.log("data vehicletrailer", data);
        this.uuid = data.data.b;
        if (data.status === "OK") {
          let { vehiclesTrailers } = data.data.a;
          if (vehiclesTrailers) {
            // console.log("vehiclesTrailers", uuidv4());
            console.log("vehiclesTrailers", vehiclesTrailers);
            this.vehiclesTrailers = vehiclesTrailers.map(v => ({
              ...v,
              _uuid: uuidv4()
            }));
            console.log("  this.vehiclesTrailers ", this.vehiclesTrailers);
          } else {
            // this.addForm();
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
      let vehiclesTrailers = [];

      this.$refs.vehicleForm.forEach(formRef => {
        let formData = formRef.getFormData();
        vehiclesTrailers.push(formData);
      });

      this.vehiclesTrailers = vehiclesTrailers;
    },
    async updateCompany() {
      this.setDataFromForms();

      let vehicleForms = this.$refs.vehicleForm;
      if (!vehicleForms.length) {
        return;
      }

      let allFormAreValid = vehicleForms.every(formRef =>
        formRef.validateForm()
      );
      if (!allFormAreValid) {
        return;
      }

      this.loading = true;
      this.error = null;
          if(localStorage.getItem('token')){
        
          this.final_uuid = this.userData;
          console.log("this.final_uuid login after",this.final_uuid )
      }else{
        this.final_uuid = this.uuid;
        console.log("this.final_uuid no login after",this.final_uuid )
      }
      try {
        let data = await API.post("company/save", {
          key: "vehiclesTrailers",
          val: this.vehiclesTrailers.map(v => {
            console.log("v", v);
            let vehicle = { ...v };
            delete vehicle._uuid;
            return vehicle;
          }),
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid
        });

        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
        axios
          .post(
            "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid=" +
             this.final_uuid+
              "&user_id=" +
              localStorage.getItem("userId")
          )
          .then(res => {
            console.log("ress post", res);
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
// div {
//   outline: 1px solid red;
// }
// .vehicles-and-trailers-form {
//   // .next-wrapper {
//   //   display: flex;
//   //   justify-content: space-between;

//   //   .next-title {
//   //     font-size: 1.2rem;
//   //   }
//   // }
// }
select{
  position: relative;
  -webkit-appearance: none;
  background: url('../assets/images/arrow-dropdown.png') no-repeat 96% center;
  -moz-appearance: none;
}
.btn-bg-white{
  background: #fff;
}
</style>

