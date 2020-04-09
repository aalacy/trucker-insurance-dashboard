<template>
  <div class="vehicles-and-trailers-form-item container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Vehicle(s) & Trailer(s)</h4>

          <template>
            <div
              class="driver-form-item mob-2"
              v-for="(singleVehicle, index) in vehiclesData"
              :key="'vehicle' + index"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div class="col">
                  <div class="h5 mb-0">Vehicle #{{ index + 1 }}</div>
                </div>
                <button
                  type="button"
                  class="lt-button lift mx-2"
                  @click="removeVehiclesData(index)"
                  title="Remove Vehicle"
                >
                  <font-awesome-icon class="fontawesome minus" icon="minus" />
                </button>
              </div>

              <div class="form-group col-lg-10 col-sm-12">
                <b-input-group>
                  <input v-model.trim="vehiclesData[index].VIN" class="lt-input" :class="{ 'has-error': !validations.vehiclesData[index].VIN.is_valid }" autocomplete="off" @change="validateFieldCustom('VIN', index)" placeholder="Enter VIN number"></input>
                  <b-input-group-append>
                    <b-button :disabled="loading" type="button" @click="getVinData('vehicle', index)" variant="primary">
                      <font-awesome-icon class="fontawesome" icon="search"  />
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
                <div
                  class="text-danger pb-2"
                  v-show="!validations.vehiclesData[index].VIN.is_valid"
                >{{ validations.vehiclesData[index].VIN.text }}</div>
              </div> 

              <div class="form-group col-lg-5 col-sm-8">
                <input
                  v-model="vehiclesData[index].year"
                  type="text"
                  class="lt-input"
                  placeholder="Year"
                  :class="{ 'has-error': !validations.vehiclesData[index].year.is_valid }"
                  @change="validateFieldCustom('year', index)"
                >

                <div
                  class="text-danger"
                  v-show="!validations.vehiclesData[index].year.is_valid"
                >{{ validations.vehiclesData[index].year.text }}</div>
              </div>

              <div class="form-group col-lg-5 col-sm-8">
                <input
                  v-model="vehiclesData[index].make"
                  type="text"
                  class="lt-input"
                  placeholder="Make"
                  :class="{ 'has-error': !validations.vehiclesData[index].make.is_valid }"
                  @change="validateFieldCustom('make', index)"
                >

                <div
                  class="text-danger"
                  v-show="!validations.vehiclesData[index].make.is_valid"
                >{{ validations.vehiclesData[index].make.text }}</div>
              </div>

              <div class="form-group col-lg-5 col-sm-8 mb-4">
                <input
                  v-model="vehiclesData[index].model"
                  type="text"
                  class="lt-input"
                  placeholder="Model"
                  :class="{ 'has-error': !validations.vehiclesData[index].model.is_valid }"
                  @change="validateFieldCustom('model', index)"
                >

                <div
                  class="text-danger"
                  v-show="!validations.vehiclesData[index].model.is_valid"
                >{{ validations.vehiclesData[index].model.text }}</div>
              </div>

              <div class="form-group border-top col-lg-10 col-sm-12 pt-4">
                  <!-- <div class="border-bottom p-1">
                    <span>Select Vehicle Type</span>
                  </div>
-->
                 <!--  <div class="containera-hov d-inline">
                    <label class="d-block">
                      <input
                        type="radio"
                        @change="onSelectImage(index)"
                        name="test"
                        value="Tractor"
                        v-model="vehiclesData[index].vehicleImage"
                      >
                      <img
                        alt="Tractor"
                        src="../assets/images/tracktor.png"
                        style="width:100px;"
                        class="d-inline mt-2 image mr-2"
                      >

                      <span>Tractor</span>
                    </label>
                  </div>
                  <div class="containera-hov d-inline">
                    <label class="d-block">
                      <input
                        type="radio"
                        @change="onSelectImage(index)"
                        name="test"
                        value="Box Truck"
                        checked
                        v-model="vehiclesData[index].vehicleImage"
                      >
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
                      <input
                        type="radio"
                        @change="onSelectImage(index)"
                        name="test"
                        value="Dump Truck"
                        checked
                        v-model="vehiclesData[index].vehicleImage"
                      >
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
                      <input
                        type="radio"
                        @change="onSelectImage(index)"
                        name="test"
                        value="Tow Trucks"
                        checked
                        v-model="vehiclesData[index].vehicleImage"
                      >
                      <img
                        src="../assets/images/twotrucks.png"
                        alt
                        style="width:100px;"
                        class="d-inline mt-2 image mr-2"
                      >
                      <span>Tow Trucks</span>
                    </label>
                  </div>
                  <div class="containera-hov d-inline">
                    <label class="d-block">
                      <input
                        type="radio"
                        @change="onSelectImage(index)"
                        name="test"
                        value="Pickup Truck"
                        checked
                        v-model="vehiclesData[index].vehicleImage"
                      >
                      <img
                        src="../assets/images/pickup_truck.png"
                        alt
                        style="width:100px;"
                        class="d-inline mt-2 image mr-2"
                      >
                      <span>Pickup Truck</span>
                    </label>
                  </div>

                  <div class="p-3">
                    <span>Select Vehicle Type</span>
                    <h5><span class=""><strong>OR</strong></span></h5>

                  </div> -->
                  <select
                    v-model="vehiclesData[index].vehicleType"
                    class="lt-input"
                    @change="onSelectDropDown(index)"
                  >
                    <option value>Select Vehicle type</option>
                    <option
                      v-for="item in otherVehicleType"
                      :key="item"
                      :value="item"
                    >{{ item }}</option>
                  </select>
                <div
                  class="text-danger"
                  v-show="!validations.vehiclesData[index].vehicleType.is_valid"
                >{{ validations.vehiclesData[index].vehicleType.text }}</div>
              </div>
              
              <div class="form-group col-lg-5 col-md-6 col-sm-8 mb-4">
                <input
                  v-model="vehiclesData[index].zipCode"
                  type="text"
                  class="lt-input"
                  minlength="5"
                  placeholder="Garaging Zip"
                  :class="{ 'has-error': !validations.vehiclesData[index].zipCode.is_valid }"
                  @change="validateFieldCustom('zipCode', index)"
                >

                <div
                  class="text-danger"
                  v-show="!validations.vehiclesData[index].zipCode.is_valid"
                >{{ validations.vehiclesData[index].zipCode.text }}</div>
              </div>

              <div class="col-12">
                <div class="label mb-4 border-top pt-4"><b>Radius of Travel</b> (in miles)</div>
                <div class="col-12">
                  <div class="form-group">
                    <input
                      v-model="vehiclesData[index].radiusOfTravelVehicle"
                      type="range"
                      min="0"
                      :max="550"
                      step="50"
                      class="lt-input"
                      placeholder="Radius of Travel*"
                    >
                    <div class="text-center">
                      <strong>{{ vehiclesData[index].radiusOfTravelVehicle > 500 ? "500+":vehiclesData[index].radiusOfTravelVehicle }}</strong>
                    </div>
                  </div>
                  <div
                    class="text-danger"
                    v-show="!validations.vehiclesData[index].radiusOfTravelVehicle.is_valid"
                  >{{ validations.vehiclesData[index].radiusOfTravelVehicle.text }}</div>
                  <div class="row mb-3">
                    <div
                      class="col-lg-6 col-sm-12"
                    >Are you looking for Comprehesive & Collision Coverage?</div>

                    <div class="col-lg-6 col-sm-12 mt-sm-1">
                      <b-form-group>
                        <b-form-radio-group
                          v-model="vehiclesData[index].coverage"
                          :options="options"
                          button-variant="outline-primary"
                          buttons
                        ></b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>
                  <template v-if="vehiclesData[index].coverage">
                    <div class="row mb-3">
                      <div class="col-lg-6 col-sm-12">Current value of the vehicle or trailer</div>

                      <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                        <input
                          :value="vehiclesData[index].currentValue"
                          type="text"
                          class="lt-input"
                          placeholder="$"
                          @change="changeCurrentValue(vehiclesData[index],$event)"
                        >
                        <!-- <div class="text-danger" v-show="!validations.vehiclesData[index].radiusOfTravel.is_valid">{{ validations.vehiclesData[index].radiusOfTravel.text }}</div>-->
                      </div>
                    </div>

                    <div class="row mb-5">
                      <div class="col-lg-6 col-sm-12">Deductible</div>

                      <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                        <select v-model="vehiclesData[index].deductible" class="lt-input" required>
                          <option disabled value>Deductible*</option>
                          <option
                            v-for="item in deductibles"
                            :key="item.value"
                            :value="item.value"
                          >{{ item.name }}</option>
                        </select>

                        <div
                          class="text-danger"
                          v-show="!validations.vehiclesData[index].deductible.is_valid"
                        >{{ validations.vehiclesData[index].deductible.text }}</div>
                      </div>
                    </div>
                  </template>
                </div> 
              </div>
            </div>
          </template>
          <template>
            <div
              class="driver-form-item mob-2"
              v-for="(singleTrailer, index) in trailersData"
              :key="'trailer' + index"
            >
              <div class="d-flex justify-content-between align-items-center">
                  <h2 class="h5 mb-0">Trailer #{{ index + 1 }}</h2>
                <!-- v-show="index > 0" -->
                <button
                  
                  type="button"
                  class="lt-button mx-2 mb-3"
                  @click="removeTrailersData(index)"
                  title="Remove Trailer"
                >
                  <h3>-</h3>
                </button>
              </div>

                <div class="form-group col-lg-10 col-sm-12">
                  <b-input-group>
                    <input v-model.trim="trailersData[index].VIN" class="lt-input"  autocomplete="off" placeholder="Enter VIN number"></input>
                    <b-input-group-append>
                      <b-button :disabled="loading" type="button" @click="getVinData('trailer', index)" variant="primary">
                        <font-awesome-icon class="fontawesome" icon="search"  />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div> 

                <div class="col-lg-5 col-sm-12">
                  <div class="form-group">
                    <input
                      v-model="trailersData[index].year"
                      type="text"
                      class="lt-input"
                      placeholder="Year"
                      :class="{ 'has-error': !validations.trailersData[index].year.is_valid }"
                      @change="validateTrailerField('year', index)"
                    >

                    <div
                      class="text-danger"
                      v-show="!validations.trailersData[index].year.is_valid"
                    >{{ validations.trailersData[index].year.text }}</div>
                  </div>
                </div>

                <div class="col-lg-5 col-sm-12">
                  <div class="form-group">
                    <input
                      v-model="trailersData[index].make"
                      type="text"
                      class="lt-input"
                      placeholder="Make"
                      :class="{ 'has-error': !validations.trailersData[index].make.is_valid }"
                      @change="validateTrailerField('make', index)"
                    >

                    <div
                      class="text-danger"
                      v-show="!validations.trailersData[index].make.is_valid"
                    >{{ validations.trailersData[index].make.text }}</div>
                  </div>
                </div>

                <div class="col-lg-5 col-sm-12">
                  <div class="form-group">
                    <input
                      v-model="trailersData[index].model"
                      type="text"
                      class="lt-input"
                      placeholder="Model"
                      :class="{ 'has-error': !validations.trailersData[index].model.is_valid }"
                      @change="validateTrailerField('model', index)"
                    >

                    <div
                      class="text-danger"
                      v-show="!validations.trailersData[index].model.is_valid"
                    >{{ validations.trailersData[index].model.text }}</div>
                  </div>
                </div>

                <div class="form-group col-lg-10 col-sm-12 border-top pt-4">
                  <select 
                   v-model="trailersData[index].trailerType"
                   class="lt-input" 
                   @change="validateTrailerField('trailerType', index)" >
                    <option value disabled>Select Trailer type</option>
                    <option v-for="item in trailerTypes" :key="item" :value="item">{{ item }}</option>
                  </select>
                  <div
                    class="text-danger"
                    v-show="!validations.trailersData[index].trailerType.is_valid"
                  >{{ validations.trailersData[index].trailerType.text }}</div>
                </div>

                <div class="form-group col-lg-5 col-sm-8">
                  <input
                    v-model="trailersData[index].zipCode"
                    type="text"
                    class="lt-input"
                    minlength="5"
                    placeholder="Garaging Zip"
                    :class="{ 'has-error': !validations.trailersData[index].zipCode.is_valid }"
                    @change="validateTrailerField('zipCode', index)"
                  >

                  <div
                    class="text-danger"
                    v-show="!validations.trailersData[index].zipCode.is_valid"
                  >{{ validations.trailersData[index].zipCode.text }}</div>
                </div>

                <div class="col pt-3 form-group">
                  <div>
                    <label class="d-block">
                      <span class="label">Radius of Travel (in miles)</span>

                      <input
                        v-model="trailersData[index].radiusOfTravelTrailer"
                        type="range"
                        min="0"
                        :max="550"
                        step="50"
                        class="lt-input-range lt-input"
                        placeholder="Radius of Travel*"
                        @change="validateTrailerField('radiusOfTravelTrailer', index)"
                      >
                    </label>
                  </div>
                    <div class="text-center">
                      <strong>{{ trailersData[index].radiusOfTravelTrailer > 500 ? "500+":trailersData[index].radiusOfTravelTrailer}}</strong>
                  </div>
                  <div
                    class="text-danger"
                    v-show="!validations.trailersData[index].radiusOfTravelTrailer.is_valid"
                  >{{ validations.trailersData[index].radiusOfTravelTrailer.text }}</div>
                </div>

              <div class="form-group">
                <div
                  class="col-lg-6 col-sm-12 font-weight-bold"
                >Are you looking for Comprehesive & Collision Coverage?</div>

                <div class="col-lg-6 col-sm-12 mt-sm-1">
                  <b-form-group>
                    <b-form-radio-group
                      v-model="trailersData[index].coverage"
                      :options="options"
                      button-variant="outline-primary"
                      buttons
                    ></b-form-radio-group>
                  </b-form-group>
                </div>
                <!-- </div> -->
              </div>
              <template v-if="trailersData[index].coverage">
                <div class="form-group mb-3">
                  <div class="col-lg-6 col-sm-12 font-weight-bold">Current value of the vehicle or trailer</div>

                  <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <input
                      :value="trailersData[index].currentValue"
                      type="text"
                      class="lt-input"
                      placeholder="$"
                      @change="changeCurrentValue(trailersData[index],$event)"
                    >

                    <!-- <div class="text-danger" v-show="!validations.trailersData[index].radiusOfTravel.is_valid">{{ validations.trailersData[index].radiusOfTravel.text }}</div>-->
                  </div>
                </div>

                <div class="form-group mb-3">
                  <div class="col-lg-6 col-sm-12 font-weight-bold">Deductible</div>

                  <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <select v-model="trailersData[index].deductible" class="lt-input" required>
                      <option disabled value>Deductible*</option>
                      <option
                        v-for="item in deductibles"
                        :key="item.value"
                        :value="item.value"
                      >{{ item.name }}</option>
                    </select>

                    <div
                      class="text-danger"
                      v-show="!validations.trailersData[index].deductible.is_valid"
                    >{{ validations.trailersData[index].deductible.text }}</div>
                  </div>
                </div>
              </template>
            </div>
          </template>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
             <hr>
          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another vehicle or trailer</div>
          </div>
          <div class="row mb-4">
            <div class=" col">
              <!-- <b-form-select v-model="selected" @change="onChange()"" :options="options"></b-form-select> -->
            <!--   <select @click="onChange($event)" class="lt-input">
                <option value>Vehicle or Trailer</option>
                <option v-for="item in type" :key="item" :value="item">{{ item }}</option>
              </select> -->
               <b-dropdown
                block 
                split
                split-variant="outline-primary"
                variant="primary"
                text="Vehicle or Trailer"
                class="m-2"
                :size="dropdownSize"
                menu-class="w-100"
              >
                <b-dropdown-item-button v-for="item in type" :key="item" @click="onChange(item)">{{item}}</b-dropdown-item-button>
              </b-dropdown>
            </div>
            <div class=" alert alert-danger d-flex col-12"
              v-if="noFormfilled"
            >Please add atleast one Vehicle/Trailer</div>
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
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title">Cargo Hauled</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">ELD Provider</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>

        <div v-if="showmodel">
          <modelLogin/>
        </div>
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
import Vue from "vue";

export default {
  name: "AccountInfoVehiclesAndTrailers",
  components: {
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
      userData:"",
      vehicle: false,
      noFormfilled:false,
      trailer: false,
      hints: {
        VIN:
          "Please enter the full VIN for vehicles. Don’t have it? Feel welcome to press save and come back or call us at 646-933-0419”"
      },
      deductibles: [
        { name: "$ 500", value: "500" },
        { name: "$ 1000", value: "1000" },
        { name: "$ 2500", value: "2500" },
        { name: "$ 5000", value: "5000" }
      ],
      otherVehicleType: [
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
        "Military Vehicle",
        "Pickup or Tractor Truck"
      ],
      trailerTypes: [
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
        "Utility Trailer"
      ],
      radiuses: [50, 100, 200, 300, 500, "500+"],
      final_uuid: "",
      uuid: "",
      showmodel: false,
      save: true,
      formData: {
        vehiclesTrailers: []
      },
      vehiclesData: [],
      trailersData: [],
      validations: {
        vehiclesData: {},
        trailersData: {}
      },
      oneVehicleTrailer: {
        is_valid: true,
        text: ""
      },
      website: {
        is_valid: true,
        text: ""
      },
      loading: false,
      error: null,
      vehicleOrTrailer: "",
      formErrors: [],
      type: ["Vehicle", "Trailer"],
      options: [
        {text: "Yes", value: true},
        {text: "No", value: false}
      ]
    };
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
        
    } else {
      this.save = true;
    }
    
  },

  computed: {
    radiusOfTravelVehicle: {
      get() {
        
        let index = this.radiuses.findIndex(
          radius => radius == this.vehiclesData.radiusOfTravelVehicle
          
        );
        
        return index > -1 ? index : 1;
      },
      set(index) {
        
        this.vehiclesData.radiusOfTravelVehicle = this.radiuses[index];
        
      }
    },
    radiusOfTravelTrailer: {
      get() {
        let index = this.radiuses.findIndex(
          radius => radius == this.trailersData.radiusOfTravelTrailer
        );

        return index > -1 ? index : 1;
      },
      set(index) {
        this.trailersData.radiusOfTravelTrailer = this.radiuses[index];
      }
    },

    dropdownSize () {
      return  window.innerWidth <= 768 ? 'md' : 'lg'
    }
  },
  
  watch: {
    "vehiclesData.coverage"(val) {
      if (!val) {
        this.vehiclesData.currentValue = "";
        this.vehiclesData.deductible = "";
      }
    },
    "trailersData.coverage"(val) {
      if (!val) {
        this.trailersData.currentValue = "";
        this.trailersData.deductible = "";
      }
    }
    // vehiclesData(v) {
    //   this.$emit('update:vehiclesData', v);
    //  
    // }
  },
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },

  methods: {
    sizeOfObject(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    },
    validateTrailerField(fieldName,index){
       
      if (this.trailersData[index][fieldName].trim() == '') {
        this.validations.trailersData[index][fieldName].is_valid = false;
        this.validations.trailersData[index][fieldName].text = 'Please enter   ' + fieldName + '!';
      } else {
        this.validations.trailersData[index][fieldName].is_valid = true;
      }
    },
    validateFieldCustom(fieldName, index){
        if (this.vehiclesData[index][fieldName].trim() == '') {
        this.validations.vehiclesData[index][fieldName].is_valid = false;
        this.validations.vehiclesData[index][fieldName].text = 'Please enter   ' + fieldName + '!';
      } else {
        this.validations.vehiclesData[index][fieldName].is_valid = true;
      }
    },
    changeCurrentValue(item, $event) {
      if (event.target.value.indexOf("$") == -1) {
        item.currentValue = "$" + event.target.value;
      } else {
        item.currentValue = event.target.value;
      }
    },
    onSelectImage(index) {
      this.vehiclesData[index].vehicleType = "";
      // this.vehiclesData[index].vehicleImage = this.vehiclesData[index].vehicleImage;
    },
    onSelectDropDown(index) {
      // this.vehiclesData[index].vehicleImage = false;
      // this.vehiclesData[index].vehicleType = this.otherVehicleType[index];
    },
    addVehicleDataValidations(counts) {
      let vehicleDataValidationsLength = this.sizeOfObject(this.validations.vehiclesData);
      for (let index = 0; index < counts; index++) {
        this.$set(this.validations.vehiclesData, vehicleDataValidationsLength + index, {
          VIN: {
            is_valid: true,
            text: ""
          },
          make: {
            is_valid: true,
            text: ""
          },
          year: {
            is_valid: true,
            text: ""
          },
          model: {
            is_valid: true,
            text: ""
          },
          // vehicleImage: {
          //   is_valid: true,
          //   text: ""
          // },
          vehicleType: {
            is_valid: true,
            text: ""
          },
          zipCode: {
            is_valid: true,
            text: ""
          },
          radiusOfTravelVehicle: {
            is_valid: true,
            text: ""
          },
          coverage: {
            is_valid: true,
            text: ""
          },
          currentValue: {
            is_valid: true,
            text: ""
          },
          deductible: {
            is_valid: true,
            text: ""
          }
        });
      }
    },
    addTrailersDataValidations(counts) {
      //
      let trailersDataValidationsLength = this.sizeOfObject(this.validations.trailersData);
      for (let index = 0; index < counts; index++) {
        this.$set(this.validations.trailersData,trailersDataValidationsLength + index, {
          VIN: {
            is_valid: true,
            text: ""
          },
          make: {
            is_valid: true,
            text: ""
          },
          year: {
            is_valid: true,
            text: ""
          },
          model: {
            is_valid: true,
            text: ""
          },
          trailerType: {
            is_valid: true,
            text: ""
          },
          zipCode: {
            is_valid: true,
            text: ""
          },
          radiusOfTravelTrailer: {
            is_valid: true,
            text: ""
          },
          coverage: {
            is_valid: true,
            text: ""
          },
          currentValue: {
            is_valid: true,
            text: ""
          },
          deductible: {
            is_valid: true,
            text: ""
          }
        });
      }
    },
    addVehicleData(data) {
     
      if (data == undefined || data.VIN == undefined) {
        
        this.vehiclesData.push({
          VIN: "",
          year: "",
          make: "",
          vehicleType: "",
          vehicleImage: "",
          model: "",
          zipCode: "",
          radiusOfTravelVehicle: 50,
          coverage: false,
          currentValue: "",
          deductible: ""
        });
        this.addVehicleDataValidations(1);
      } else {
        this.vehiclesData.push(data);
      }
    },
    addTrailerData(data) {
     
      if (data == undefined || data.VIN == undefined) {
       
        this.trailersData.push({
          VIN: "",
          year: "",
          make: "",
          trailerType: "",
          model: "",
          zipCode: "",
          radiusOfTravelTrailer: 50,
          coverage: false,
          currentValue: "",
          deductible: ""
        });
        this.addTrailersDataValidations(1);
      } else {
        this.trailersData.push(data);
      }
    },
    removeVehiclesData(key) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((willDelete) => {
        if (willDelete) {
          this.vehiclesData.splice(key, 1);
          Vue.delete(this.validations.vehiclesData,key)
        } 
      });
    },
    removeTrailersData(key) {
      this.trailersData.splice(key, 1);
      // this.validations.trailersData.splice(key, 1);
      Vue.delete( this.validations.trailersData,key)
    },
    validateNewVehicleData() {
      let validNewVehicleForm = true;

      for (var index in this.vehiclesData) {
        if (this.vehiclesData.hasOwnProperty(index)) {
          if (this.vehiclesData[index].VIN.trim() == "") {
            validNewVehicleForm = false;
            this.validations.vehiclesData[index].VIN.is_valid = false;
            this.validations.vehiclesData[index].VIN.text = "Please enter VIN!";
          } else {
            this.validations.vehiclesData[index].VIN.is_valid = true;
            this.validations.vehiclesData[index].VIN.text = "";
          }

          if (this.vehiclesData[index].year.trim() == "") {
            validNewVehicleForm = false;
            this.validations.vehiclesData[index].year.is_valid = false;
            this.validations.vehiclesData[index].year.text =
              "Please enter Year of Vehicle!";
          } else {
            this.validations.vehiclesData[index].year.is_valid = true;
            this.validations.vehiclesData[index].year.text = "";
          }

          if (this.vehiclesData[index].make.trim() == "") {
            validNewVehicleForm = false;
            this.validations.vehiclesData[index].make.is_valid = false;
            this.validations.vehiclesData[index].make.text =
              "Please enter Make of Vehicle!";
          } else {
            this.validations.vehiclesData[index].make.is_valid = true;
            this.validations.vehiclesData[index].make.text = "";
          }

          if (this.vehiclesData[index].model.trim() == "") {
            validNewVehicleForm = false;
            this.validations.vehiclesData[index].model.is_valid = false;
            this.validations.vehiclesData[index].model.text =
              "Please enter Model of Vehicle!";
          } else {
            this.validations.vehiclesData[index].model.is_valid = true;
            this.validations.vehiclesData[index].model.text = "";
          }

          if (this.vehiclesData[index].zipCode.trim() == "") {
            
            validNewVehicleForm = false;
            this.validations.vehiclesData[index].zipCode.is_valid = false;
            this.validations.vehiclesData[index].zipCode.text =
              "Please enter Garaging Zip Code!";
          } else {
            this.validations.vehiclesData[index].zipCode.is_valid = true;
            this.validations.vehiclesData[index].zipCode.text = "";
          }
          if (!this.vehiclesData[index].radiusOfTravelVehicle) {
            
            validNewVehicleForm = false;
            this.validations.vehiclesData[index].radiusOfTravelVehicle.is_valid = false;
            this.validations.vehiclesData[index].radiusOfTravelVehicle.text =
              "Please enter radiusOfTravelVehicle!";
          } else {
            
            this.validations.vehiclesData[index].radiusOfTravelVehicle.is_valid = true;
            this.validations.vehiclesData[index].radiusOfTravelVehicle.text = "";
          }
        }
      }
      return validNewVehicleForm;
    },
    validateNewTrailerData() {
      let validNewTrailerForm = true;

      for (var index in this.trailersData) {
        if (this.trailersData.hasOwnProperty(index)) {
          if (this.trailersData[index].VIN.trim() == "") {
            validNewTrailerForm = false;
            this.validations.trailersData[index].VIN.is_valid = false;
            this.validations.trailersData[index].VIN.text = "Please enter VIN!";
          } else {
            this.validations.trailersData[index].VIN.is_valid = true;
            this.validations.trailersData[index].VIN.text = "";
          }

          if (this.trailersData[index].year.trim() == "") {
            validNewTrailerForm = false;
            this.validations.trailersData[index].year.is_valid = false;
            this.validations.trailersData[index].year.text =
              "Please enter Year of Trailer!";
          } else {
            this.validations.trailersData[index].year.is_valid = true;
            this.validations.trailersData[index].year.text = "";
          }

          if (this.trailersData[index].make.trim() == "") {
            validNewTrailerForm = false;
            this.validations.trailersData[index].make.is_valid = false;
            this.validations.trailersData[index].make.text =
              "Please enter Make of Trailer!";
          } else {
            this.validations.trailersData[index].make.is_valid = true;
            this.validations.trailersData[index].make.text = "";
          }

          if (this.trailersData[index].model.trim() == "") {
            validNewTrailerForm = false;
            this.validations.trailersData[index].model.is_valid = false;
            this.validations.trailersData[index].model.text =
              "Please enter Model of Trialer!";
          } else {
            this.validations.trailersData[index].model.is_valid = true;
            this.validations.trailersData[index].model.text = "";
          }

          if (this.trailersData[index].trailerType.trim() == "") {
            validNewTrailerForm = false;
            this.validations.trailersData[index].trailerType.is_valid = false;
            this.validations.trailersData[index].trailerType.text =
              "Please select Trialer Type!";
          } else {
            this.validations.trailersData[index].trailerType.is_valid = true;
            this.validations.trailersData[index].trailerType.text = "";
          }

          if (this.trailersData[index].zipCode.trim() == "") {
            validNewTrailerForm = false;
            this.validations.trailersData[index].zipCode.is_valid = false;
            this.validations.trailersData[index].zipCode.text =
              "Please enter Garaging Zip Code!";
          } else {
            this.validations.trailersData[index].zipCode.is_valid = true;
            this.validations.trailersData[index].zipCode.text = "";
          }
        }
      }
      return validNewTrailerForm;
    },
    async getVinData(vehicleType, index) {
      let vinToUse = false;
      if (vehicleType == "vehicle") {
        vinToUse = this.vehiclesData[index].VIN;
      } else if (vehicleType == "trailer") {
        vinToUse = this.trailersData[index].VIN;
      }
      if (!vinToUse) {
       
        return;
      }

      this.loading = true;

      try {
        let data = await API.get("company/vin", {
          vin: vinToUse
        });
       

        delete data.data.raw;
        delete data.data.vehicleHistory;

        if (vehicleType == "vehicle") {
          // delete data.data.vehicleType;

          this.vehiclesData[index].make = data.data.make;
          this.vehiclesData[index].model = data.data.model;
          this.vehiclesData[index].year = data.data.year;
          this.vehiclesData[index].vehicleType = data.data.vehicleType
        } else if (vehicleType == "trailer") {
          if (this.trailerTypes.indexOf(data.data.vehicleType) > -1) {
            data.data.trailerType = data.data.vehicleType;
          } else {
            delete data.data.vehicleType;
          }

          this.trailersData[index].make = data.data.make;
          this.trailersData[index].model = data.data.model;
          this.trailersData[index].year = data.data.year;
        }
      } catch (err) {
        console.error("err", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    onChange(item) {
      if (item == 'Vehicle') {
      // if ($event.target.value == "Vehicle") {
        this.vehicle = true;
       
        this.trailer = false;
        this.addVehicleData();
      // } else if ($event.target.value == "Trailer") {
      } else if (item == 'Trailer') {
        this.vehicle = false;
        this.trailer = true;
        this.addTrailerData();
      }
    },
    addForm() {
      if (this.vehicleOrTrailer == "Trailer") {
        // 
        // this.trailerIndex += 1
      } else {
        // 
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
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      try {
        let res = await API.get("company/current?uuid=" + this.uuid);
       
        this.uuid = res.data.uuid;
        if (res.status === "OK" && res.data.company) {
          let { vehicleInformationList } = res.data.company;
          if (vehicleInformationList) {
            if (vehicleInformationList.constructor !== Object) {
              vehicleInformationList = JSON.parse(vehicleInformationList);
            } else {
              vehicleInformationList = vehicleInformationList;
            }
            if (vehicleInformationList.vehicle.length > 0) {
              this.vehiclesData = vehicleInformationList.vehicle.map(v => ({
                ...v,
                _uuid: uuidv4()
              }));
              this.addVehicleDataValidations(
                vehicleInformationList.vehicle.length
              );
            } else {
              // this.addVehicleData();
            }

            if (vehicleInformationList.trailer.length > 0) {
             
             
              this.trailersData = vehicleInformationList.trailer.map(t => ({
                ...t,
                _uuid: uuidv4()
              }));
              this.addTrailersDataValidations(
                vehicleInformationList.trailer.length
              );
            } else {
              // this.addTrailerData();
            }
          }
        } else if (res.status === "ERROR") {
          // this.$router.replace({ name: 'Home' });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateCompany() {
      
      if((this.vehiclesData.length == 0) && (this.trailersData.length == 0)){
        this.noFormfilled = true;
       
        return;
      }
      console.log(this.vehiclesData);
      //
      if(this.vehiclesData){
        let allFormAreValid = this.validateNewVehicleData();
      if (!allFormAreValid) {
       
        return;
      } else {
       
      }
      }
      if(this.trailersData){
        let allFormAreValid = this.validateNewTrailerData();
      if (!allFormAreValid) {
       
        return;
      } else {
       
      }

      }
      
      this.loading = true;
      this.error = null;
      this.final_uuid = this.uuid;
      try {
        const vehicleInformationList = {
          vehicle: this.vehiclesData,
          trailer: this.trailersData
        }

        const data = {
          vehicleInformationList: vehicleInformationList,
          uuid: this.final_uuid
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
<style lang="scss">
	.btn-outline-primary.active {
		span {
			color: white !important;
		}
	}
</style>

<style lang="scss" scoped>
select{
  position: relative;
  -webkit-appearance: none;
  background: url('../assets/images/arrow-dropdown.png') no-repeat 96% center;
  -moz-appearance: none;
}

.form-group {
  margin-bottom: 0.5rem;
}

.driver-form-item {
  margin-right: -15px;
  margin-left: -15px;
}

.vehicles-and-trailers-form-item {
  .label {
    font-size: 1.2rem;
  }

  .get-data {
    font-weight: 300;
        font-size: 17px;
    padding: 8px;
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
    opacity: 1;
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
    border: 2px solid #5e98f9;

  }
  [type="radio"]:checked + img + span {
    // outline: 2px solid #5e98f9;
    color:#5e98f9;
    text-decoration: underline;
  }
}
.btn-bg-white{
  background: #fff;
}

.fontawesome.minus path {
  fill: black;
}
</style>
