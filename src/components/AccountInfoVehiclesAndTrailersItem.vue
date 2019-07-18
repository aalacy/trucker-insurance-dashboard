<template>
  <div class="vehicles-and-trailers-form-item container-fluid mob-2">
    <div class="row">
       <!-- <div class="col">
        <h2 class="h5">Trailer #{{ index + 1 }}</h2>
      </div> -->

       <!-- <div class="col text-right">
        <a class="pointer" @click="removeForm(index)">Remove</a>
      </div> -->
         <button type="button" class="lt-button mx-2 mb-3 text-right col" @click="removeForm(index)">
       <h3> - </h3>
      </button>
    </div>

    <div class="row">
      <div class="col-8">
        <div class="form-group">
          <input
            v-model="formData.VIN"
            :class="{ 'has-error': formErrors.VIN }"
            type="text"
            class="lt-input"
            placeholder="VIN #*"
            required
            @focus="onFocus('VIN')"
            @blur="onBlur"
            @change="validateField('VIN')"
          >

          <div v-if="formErrors.VIN" class="text-danger">{{ formErrors.VIN }}</div>
        </div>
      </div>

      <div class="col-4">
        <button
          :disabled="loading"
          type="button"
          class="lt-button lt-button-main get-data"
          @click="getVinData"
        >
          {{ loading ? 'Loading...' : 'Get Data' }}
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <input
            v-model="formData.year"
            :class="{ 'has-error': formErrors.year }"
            type="text"
            class="lt-input"
            placeholder="Year*"
            required
            @focus="onFocus('year')"
            @blur="onBlur"
            @change="validateField('year')"
          >
            <!-- <option value disabled>year</option>
            <option>2004</option>
            <option>2005</option>
          </select> -->

          <div v-if="formErrors.year" class="text-danger">{{ formErrors.year }}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <input
            v-model="formData.make"
            :class="{ 'has-error': formErrors.make }"
            type="text"
            class="lt-input"
            placeholder="Make*"
            required
            @focus="onFocus('make')"
            @blur="onBlur"
            @change="validateField('make')"
          >
            <!-- <option value disabled>Make</option>
            <option>2004</option>
            <option>2005</option> -->
          

          <div v-if="formErrors.make" class="text-danger">{{ formErrors.make }}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <input
            v-model="formData.model"
            :class="{ 'has-error': formErrors.model }"
            type="text"
            class="lt-input"
            placeholder="Model*"
            required
            @focus="onFocus('model')"
            @blur="onBlur"
            @change="validateField('model')" >
            <!-- <option value disabled>Model</option> -->
        
          <div v-if="formErrors.model" class="text-danger">{{ formErrors.model }}</div>
        </div>
      </div>
    </div>

    <div class="row border-top">
      <div class="col-10 pt-4">
        <div class="form-group">
          <div class="border-bottom p-1">
            <span>Select Vehicle and Trailer type</span>
          </div>
          <div v-if="vehicle">
          <div class="containera-hov d-inline">
            <label class="d-block">
              <input type="radio" name="test" value="Tractor" checked v-model="formData.vehicleImage">
              <img
                alt="Tractor"
                src="../assets/images/tracktor.png"     
                style="width:100px;"
                class="d-inline mt-2 image mr-2"
              >
              
              <p>Tractor</p>
            </label>
          </div>
          <div class="containera-hov d-inline">
            <label class="d-block">
              <input type="radio" name="test" value="Box Truck" checked v-model="formData.vehicleImage">
              <img
                src="../assets/images/boxtruck.png"
                
                style="width:100px;"
                class="d-inline mt-2 image mr-2"
              >
              <span>Box Truck</span>
            </label>
          </div>

          <div class="containera-hov d-inline">
            <label class="d-block">
              <input type="radio" name="test" value="Dump Truck" checked v-model="formData.vehicleImage">
              <img
                src="../assets/images/dumptruck.png"
                alt
                style="width:100px;"
                class="d-inline mt-2 image mr-2"
              >
              <span>Dump Truck</span>
            </label>
          </div>
          <div class="containera-hov d-inline">
            <label class="d-block">
              <input type="radio" name="test" value="Two Trucks" checked v-model="formData.vehicleImage">
              <img
                src="../assets/images/twotrucks.png"
                alt
                style="width:100px;"
                class="d-inline mt-2 image mr-2"
              >
              <span>Two Trucks</span>
            </label>
          </div>
          <div class="containera-hov d-inline">
            <label class="d-block">
              <input type="radio" name="test" value="Pickup Truck" checked v-model="formData.vehicleImage">
              <img
                src="../assets/images/pickup_truck.png"
                alt
                style="width:100px;"
                class="d-inline mt-2 image mr-2"
              >
              <span>Pickup Truck</span>
            </label>
          </div>
          </div>
          <div v-else> 
          <select
            v-model="formData.vehicleType"
            class="lt-input"
            required
            :class="{ 'has-error': formErrors.vehicleType }"
            @focus="onFocus('vehicleType')"
            @blur="onBlur"
            @change="validateField('vehicleType')"
          >
            <option value disabled>Select Other Vehicle/Trailer type</option>
            <option v-for="item in vehicleTypes" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
          <div v-if="formErrors.vehicleType" class="text-danger">{{ formErrors.vehicleImage }}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <input
            v-model="formData.zipCode"
            :class="{ 'has-error': formErrors.zipCode }"
            type="text"
             
            class="lt-input"
            placeholder="Garaging Zip Code*"
            required
            @focus="onFocus('zipCode')"
            @blur="onBlur"
            @change="validateField('zipCode')"
          >

          <div v-if="formErrors.zipCode" class="text-danger">{{ formErrors.zipCode }}</div>
        </div>
      </div>
    </div>

    <div class="row border-top">
      <div class="col pt-3">
        <div class="form-group">
          <div>
            <label class="d-block">
              <span class="label">Radius of Travel (in miles)</span>

              <input
                v-model="radiusOfTravel"
                :class="{ 'has-error': formErrors.radiusOfTravel }"
                type="range"
                min="0"
                :max="radiuses.length - 1"
                step="1"
                class="form-control-range lt-input"
                placeholder="Radius of Travel*"
                required
                @focus="onFocus('radiusOfTravel')"
                @blur="onBlur"
                @change="validateField('radiusOfTravel')"
              >
            </label>
          </div>

          <div class="text-center">
            <strong>{{ formData.radiusOfTravel }}</strong>
          </div>

          <div v-if="formErrors.radiusOfTravel" class="text-danger">{{ formErrors.radiusOfTravel }}</div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col font-weight-bold">Are you looking for Comprehesive & Collision Coverage?</div>

      <div class="col text-right">
        <div class="row">
          <div class="col-6">
            <button
              type="button"
              class="lt-button px-3"
              :class="{ 'lt-button-main': formData.coverage }"
              @click="formData.coverage = true"
            >Yes</button>
          </div>

          <div class="col-6">
            <button
              type="button"
              class="lt-button px-3"
              :class="{ 'lt-button-main': !formData.coverage }"
              @click="formData.coverage = false"
            >No</button>
          </div>
        </div>
      </div>
    </div>

    <template v-if="formData.coverage">
      <div class="row mb-3">
        <div class="col font-weight-bold">Current value of the vehicle/trailer</div>

        <div class="col text-right">
          <input
            v-model.trim="currentValueOfTransport"
            :class="{ 'has-error': formErrors.currentValue }"
            type="text"
            class="lt-input"
            placeholder="$"
            required
            @focus="onFocus('currentValue')"
            @blur="onBlur"
            @change="validateField('currentValue')"
          >

          <div v-if="formErrors.currentValue" class="text-danger">{{ formErrors.currentValue }}</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col font-weight-bold">Deductible</div>

        <div class="col text-right">
          <select
            v-model="formData.deductible"
            :class="{ 'has-error': formErrors.deductible }"
            class="lt-input"
            required
            @change="validateField('deductible')"
            @focus="onFocus('deductible')"
            @blur="onBlur"
          >
            <option disabled value>Deductible*</option>
            <option
              v-for="item in deductibles"
              :key="item.value"
              :value="item.value"
            >{{ item.name }}</option>
          </select>

          <div v-if="formErrors.deductible" class="text-danger">{{ formErrors.deductible }}</div>
        </div>
        
      </div>
    </template>
    
    
  </div>
  
</template>

<script>
import {
  validateField,
  validateForm,
  required,
  requiredWith
} from "../validators.js";
import { API } from "../api.js";
import {mapState} from "vuex"


export default {
  name: "AccountInfoVehiclesAndTrailersItem",
  props: {
    vehicleOrTrailer:{
      type:String,
      required:true
    },
    index: {
      type: Number,
      required: true
    },
    vehicle: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
  },

  beforeMount(){

  console.log("this.vehicle",this.vehicleOrTrailer)
  if(this.vehicleOrTrailer == "Vehicle"){
    this.vehicle = true
  }
  else{
    this.vehicle = false
  }
  },
  mounted(){
console.log("this.vehicle",this.vehicleOrTrailer)
if(localStorage.getItem("token")){
    this.$store.dispatch('loadData',localStorage.getItem("uuid"))
     let a = this.$store.state.getData.data[5]
     let b = JSON.parse(a.val)[0]
     console.log("bbb",b)
    //  for(var i=0;i<b.length;i++){
    // this.formData.VIN = b[i].VIN;
    // this.formData.make=b[i].make;
    // this.formData.year=b[i].year;
    // this.formData.zipCode=b[i].zipCode;
    // this.formData.model=b[i].model;
    // this.formData.vehicleImage=b[i].vehicleImage;
    // this.formData.vehicleType=b[i].vehicleType;
    // this.formData.radiusOfTravel=b[i].radiusOfTravel;
    //  }

    this.formData.VIN = b.VIN;
    this.formData.make=b.make;
    this.formData.year=b.year;
    this.formData.zipCode=b.zipCode;
    this.formData.model=b.model;
    this.formData.vehicleImage=b.vehicleImage;
    this.formData.vehicleType=b.vehicleType;
    this.formData.radiusOfTravel=b.radiusOfTravel;
       
    // console.log("ba",b)
   
}
else{
  
    }  },
  data() {
    return {
      formData: {
        VIN: "",
        year: "",
        make: "",
        model: "",
        vehicleType: "",
        vehicleImage:"",
        zipCode: "",
        radiusOfTravel: 50,
        coverage: false,
        currentValue: "",
        deductible: "",
        
      },vehicle:false,
      rules: {
        VIN: [required],
        year: [required],
        make: [required],
        model: [required],
        vehicleType: [required],
        zipCode: [required],
        currentValue: [val => requiredWith(val, this.formData.coverage)],
        deductible: [val => requiredWith(val, this.formData.coverage)]
      },
      formErrors: {},
      hints: {
        VIN: "Some hint"
      },
      deductibles: [
        { name: "$ 500", value: "500" },
        { name: "$ 1000", value: "1000" },
        { name: "$ 2500", value: "2500" },
        { name: "$ 5000", value: "5000" }
      ],
      vehicleTypes: [
        "Auto Hauler",
        "Bottom Dump Trailer",
        "Bulk Commodity Trailer",
        "Concession Trailer",
        "Dry Freight Trailer",
        "Dump Body Trailer / Transfer Box",
        "Flatbed Trailer",
        "Gooseneck Trailer",
        "Horse Trailer",
        "Livestock Trailer",
        "Logging Trailer",
        "Low-Boy Trailer",
        "Pole Trailer",
        "Refrigerated Dry Freight Trailer",
        "Tank Trailer",
        "Tilt Trailer",
        "Travel Trailer",
        "Utility Trailer",
        "Bus",
        "Car",
        "Cargo Van",
        "Hearse",
        "Limousine",
        "Mini Van",
        "Motor Home",
        "PASSENGER CAR",
        "Sport Utility Vehicle",
        "Emergency Vehicle",
        "Military Vehicle"
      ],
      radiuses: [0, 100, 200, 300, 500, 1000, "Unlimited"],
      loading: false,
      error: null
    };
  },
  computed: {
    currentValueOfTransport: {
      get() {
        return `$ ${this.formData.currentValue}`;
      },
      set(val) {
        let price = val
          // replace dollars and spaces to empty string
          .replace(/[$\s]/g, "")
          // replace all commas to dots
          .replace(/,/g, ".");
        this.formData.currentValue = price;
      },
      ...mapState([
    'data'
  ])
    },

    radiusOfTravel: {
      get() {
        let index = this.radiuses.findIndex(
          radius => radius == this.formData.radiusOfTravel
        );

        return index > -1 ? index : 1;
      },
      set(index) {
        this.formData.radiusOfTravel = this.radiuses[index];
      }
    }
  },
  watch: {
    "formData.coverage"(val) {
      if (!val) {
        this.formData.currentValue = "";
        this.formData.deductible = "";
      }
    }
  },
  created() {
    this.formData = {
      ...this.formData,
      ...this.vehicle
    };

    if (!this.formData.VIN) {
      this.formData.VIN = process.env.VUE_APP_TEST_VIN || "";
    }
  },
updated(){
console.log("oo",this.formData.vehicleImage)
},
  methods: {
    getFormData() {
      return this.formData;
    },
    removeForm(index) {
      this.$emit("remove-form", index);
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
    },
    async getVinData() {
      if (!this.formData.VIN) {
        console.log("VIN EMPTY")
        return;
      }

      this.loading = true;

      try {
        let data = await API.get("company/vin", {
          vin: this.formData.VIN
        });

        this.formData = {
          ...this.formData,
          ...data.data
        };
        
     console.log("data vin",data.data)
     this.formData.year = data.data.year;
     this.formData.make = data.data.make;
     this.formData.model = data.data.model;
    this.formData.vehicleType = data.data.vehicleType;
    console.log("this.formData.vehicleType",this.formData.vehicleType)
    // console.log("this.v",this.vehicleTypes)
    // console.log("data.data.vehicleType",data.data.vehicleType)
    // var type = this.vehicleTypes.filter(v => v == data.data.vehicleType)

    // console.log("type",type)
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
.vehicles-and-trailers-form-item {
  .label {
    font-size: 1.2rem;
  }

  .get-data {
    font-weight: 300;
    font-size: 1.3rem;
  }
  .containera-hov {
    position: relative;
    width: 50%;
  }

  .image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: 0.5s ease;
    backface-visibility: hidden;
  }

  .middle {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    background-color: #5e98f9;
  }

  .containera-hov:hover .image {
    opacity: 0.8;
    cursor: pointer;
  }

  .containera-hov:hover .middle {
    opacity: 1;
  }

  .text {
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    padding: 16px 32px;
  }
  [type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* IMAGE STYLES */
  [type="radio"] + img {
    cursor: pointer;
  }

  /* CHECKED STYLES */
  [type="radio"]:checked + img {
    outline: 2px solid #5e98f9;
  }
}
</style>
