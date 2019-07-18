<template>
  <div class="cargo-group-form">
    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Cargo Group</h4>
          <div class="container">
            <div class="row cargo-group-page">
              <div
                v-for="(item, index) in cargoGroups"
                :key="index"
                class="col-3 text-center pointer mb-2 p-1 cargo-group"
                @click="selectCargoGroup(item.value)"
              >

                <div class="p-1">
                  <img :src="item.src" alt>
                </div>

                <div
                  class="font-weight-bold name"
                  :class="{ selected: cargoGroupMap[item.value] }"
                >{{ item.value }}</div>
              </div>
            </div>
          </div>

          <div v-if="formErrors.cargoGroup" class="text-danger">{{ formErrors.cargoGroup }}</div>

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
                <div class="next-title text-center d-inline pl-3 mob-2">Business Structure</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 text-white">Cargo Hauled</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center m-4" @click="show" v-if="save">
        <span class="save-hover">Save & Continue</span>
      </div>
      <div v-if="showmodel">
        <modalLogin/>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validateField, validateForm, minLength } from "../validators.js";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";



export default {
  name: "AccountInfoCargoGroup",
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
  mounted(){
    if(localStorage.getItem("token")){
     this.save = false
      this.$store.dispatch('loadData',localStorage.getItem("uuid"))
     let a = this.$store.state.getData.data[3]
    let b = JSON.parse(a.val).cargoGroup
     let c =[];
     for(var i=0;i<this.cargoGroups.length;i++){
        c.push(this.cargoGroups[i].value)
     }
    let filteredKeywords = c.filter((word)=> b.includes(word));
    console.log("filteredKeywords",filteredKeywords);
    for(var i=0;i<filteredKeywords.length;i++){
    this.selectCargoGroup(filteredKeywords[i])
    
   }}else{
     this.save = true  
}
 },
  components: {
    modalLogin: ModalLogin
  },
 
  data() {
    return {
      showmodel: false,
      save:true,
      formData: {
        cargoGroup: []
      },
      selectedCargoGroup:[],
      rules: {
        cargoGroup: [val => minLength(val, 1, "Please select Cargo Group")]
      },
      formErrors: {},
      hints: {},
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState("cargo", ["cargoGroups"]),
    cargoGroupMap() {
      let map = {};
      this.formData.cargoGroup.forEach(val => {
        map[val] = true;
        // console.log("val",val)
      });
      // console.log("map",map)
      return map;
    },
    ...mapState([
    'data'
  ])
  },
  created() {
    this.$emit("update-progress", this.progress);
    // this.loadCompany();
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
    selectCargoGroup(cargoGroupValue) {
      // console.log("cargoGroupValue",cargoGroupValue)
      // this.formData.cargoGroup.push(cargoGroupValue)
      // console.log("this.formData.cargoGroup",this.formData.cargoGroup)
      if (this.cargoGroupMap[cargoGroupValue]) {
      
        this.formData.cargoGroup = this.formData.cargoGroup.filter(
          val => val !== cargoGroupValue
        );
        this.$emit("update-hint", "");
      } else {
        this.formData.cargoGroup.push(cargoGroupValue);
        this.$emit("update-hint", this.hints[cargoGroupValue]);
      }

      this.formErrors = {};
    },
    goPrevForm() {
      this.$emit("update-hint", "");
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("update-hint", "");
      this.$emit("go-to-form", this.nextForm);
    },
    validateField(fieldName) {
      validateField(fieldName, this.formData, this.rules, this.formErrors);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    },
    async show() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }
      
      this.loading = true;
      this.error = null;
      try {
        let data = await API.post("company/save", {
          key: "cargoGroup",
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });
         if (data.status === "OK") {
           if(this.showmodel){
          this.showmodel = false;
        }else{
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
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");

        if (data.status === "OK") {
          let { cargoGroup } = data.data;
          if (cargoGroup) {
            this.formData = {
              ...this.formData,
              ...cargoGroup
            };
          }
        } else if (data.status === "ERROR") {
          // this.$router.replace({ name: 'Home' });
          console.log("error", data.status);
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "cargoGroup",
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });
        console.log("this.formData", this.formData);
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
// div {
//   outline: 1px solid red;
// }
.cargo-group-form {
  .cargo-group {
    .pad-none {
      padding-left: 0px;
      padding-right: 0px;
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      min-height: 50px;
      font-size: 12px;
      word-break: break-word;

      &.selected {
        color: #5e98f9;
      }
    }
  }
  @media screen and (max-width: 639px) {
    .cargo-group-page .col-3 {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
  }

  @media screen and (max-width: 479px) {
    .cargo-group-page .col-3 {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  // .next-wrapper {
  //   display: flex;
  //   justify-content: space-between;

  //   .next-title {
  //     font-size: 1.2rem;
  //   }
  // }
}
</style>
