<template>
  <div class="cargo-hauled-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="mb-4">
        <img src="https://picsum.photos/g/100/100" alt style="width:50px;" class="d-inline mr-2">
        <h4 class="card-title d-inline form-sub-title">Cargo Group</h4>
      </div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title mb-3">Cargo Hauled</h4>
          <div
            v-for="(item, index) in selectedCargoGroups"
            :key="index"
            class="col-12 text-center mb-2 p-1"
          >
            <div class="font-weight-bold ft-clr">{{ item.value }}</div>

            <div class="container">
              <div class="row cargo-group-page">
                <div
                  v-for="(subItem, subIndex) in item.cargoHauled"
                  :key="subIndex"
                  class="col-3 text-center mb-2 p-1 pointer haul-type"
                  @click="selectHaulType(item.value, subItem.value)"
                >
                  <div class="p-1">
                    <img src="https://picsum.photos/g/100/100" alt>
                  </div>

                  <div
                    class="name"
                    :class="{
                      selected:
                        cargoHauledMap[item.value] &&
                        cargoHauledMap[item.value][subItem.value]
                    }"
                  >{{ subItem.value }}</div>
                </div>
              </div>
            </div>

            <div v-if="formErrors.haulType" class="text-danger">{{ formErrors.haulType }}</div>

            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
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
                <div class="next-title text-center d-inline pl-3 mob-2">Cargo Group</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main px-4 btn-block btn-border-radius-rb mob-2"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div
                  class="next-title text-center d-inline pl-3 text-white mob-2"
                >Vehicles & Trailers</div>
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
import { mapState } from "vuex";
import { validateField, validateForm, minLength } from "../validators.js";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";

export default {
  name: "AccountInfoCargoHauled",
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
  components: {
    modelLogin: ModalLogin
  },
  data() {
    return {
      showmodel: false,
      save:true,
      cargoGroup: [],
      formData: {
        haulType: {}
      },
      rules: {
        haulType: [val => minLength(val, 1, "Please select Haul Type")]
      },
      formErrors: {},
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState("cargo", ["cargoGroups"]),
    selectedCargoGroups() {
      return this.cargoGroups.filter(
        group => this.cargoGroup.indexOf(group.value) > -1
        
      );
    // console.log("this.cargoGroup",this.cargoGroup)
    },
    cargoHauledMap() {
      let map = {};

      for (let cargoGroupValue in this.formData.haulType) {
        map[cargoGroupValue] = {};

        let haulTypes = this.formData.haulType[cargoGroupValue];
        haulTypes.forEach(haulType => {
          map[cargoGroupValue][haulType] = true;
        });
      }

      return map;
    },
    ...mapState([
    'data'
  ])
    
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
 mounted(){
    if(localStorage.getItem("token")){
     this.save = false
     this.$store.dispatch('loadData',localStorage.getItem("uuid"))
     let a = this.$store.state.getData.data[2]
    // let b = JSON.parse(a.val).haulType
    console.log("aaa",JSON.parse(a.val))
    // let c =[]
    for(let i =0;i<this.cargoGroups.length;i++)
    {
      for (let j=0;j<this.cargoGroups[i].cargoHauled.length;j++)
      {
        console.log("aaass",this.cargoGroups[i].cargoHauled[j].value);
      }
      
    }
    //  let filteredKeywords = c.filter((word)=> b.includes(word));
    // console.log("filteredKeywords",filteredKeywords);
    // for(var i=0;i<filteredKeywords.length;i++){
    // this.selectCargoGroup(filteredKeywords[i])
    // console.log("aaass",this.cargoGroups[0].cargoHauled[0].value)
    
// for(var i=0;i<)
   }else{
     
     this.save = true
   }
 },
  methods: {
    async show() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "cargoHauled",
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });
        console.log("show", this.formData);
        console.log("data.sattus", data);
        if (data.status === "OK") {
          if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
          }
        } else if (data.status === "ERROR") {
          // this.showmodel = true;
          this.error = data.messages[0] || data.data;
          console.log("error", data);
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
    selectHaulType(cargoGroupValue, haulTypeValue) {
    
      if (!this.formData.haulType[cargoGroupValue]) {
        this.$set(this.formData.haulType, cargoGroupValue, []);
      }

      let haulTypeIndex = this.formData.haulType[cargoGroupValue].indexOf(
        haulTypeValue
      );
       console.log("cargoGroupValue",cargoGroupValue)
       console.log("haulTypeValue",haulTypeValue)
      if (haulTypeIndex > -1) {
        this.formData.haulType[cargoGroupValue].splice(haulTypeIndex, 1);

        if (!this.formData.haulType[cargoGroupValue].length) {
          this.$delete(this.formData.haulType, cargoGroupValue);
        }
      } else {
        this.formData.haulType[cargoGroupValue].push(haulTypeValue);
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
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.get("company/current");
        console.log("data", data);
        if (data.status === "OK") {
          let { cargoGroup: cargoGroupTab, cargoHauled } = data.data.a;
          let { cargoGroup } = cargoGroupTab;
          let groupData = data.data.a.cargoGroup
          this.cargoGroup = groupData.cargoGroup;

          if (cargoHauled) {
            this.formData = {
              ...this.formData,
              ...cargoHauled
            };
          }
        } else if (data.status === "ERROR") {
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
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "cargoHauled",
          val: this.formData,
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

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }
.ft-clr {
  padding: 10px;
  color: #5e98f9;
  border: #5e98f9 solid 1px;
  border-radius: 10px;
}
.cargo-hauled-form {
  .haul-type {
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
</style>