<template>
  <div class="vehicles-and-trailers-form-item container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Vehicle(s) & Trailer(s)</h4>

          <template
            v-for="(vehicle, index) in $v.form.vehicles.$each.$iter"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b class="mb-0">Vehicle #{{ Number(index) + 1 }}</b>
              <button
                v-if="$v.form.vehicles.length > 1"
                type="button"
                class="lt-button lift mx-2"
                @click="removeVehiclesData(index)"
                title="Remove Vehicle"
              >
                <font-awesome-icon class="fontawesome minus" icon="minus" />
              </button>
            </div>

            <b-row>
              <b-col cols="12">
                <b-form-group
                  label="VIN"
                >
                  <b-input-group>
                    <b-form-input 
                      v-model="vehicle.VIN.$model"
                      :state="validateVehicleState(index, 'VIN')"
                      :aria-describedby="`VIN${index}`"
                    />
                    <b-input-group-append>
                      <b-button :disabled="loading" type="button" @click="getVinData('vehicle', index)" variant="primary">
                        <font-awesome-icon class="fontawesome" icon="search"  />
                      </b-button>
                    </b-input-group-append>
                    <b-form-invalid-feedback :id="`VIN${index}`">{{ errrorMessageVehicle(index, 'VIN')}}</b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Year"
                >
                  <b-form-input 
                    type="number"
                    v-model="vehicle.year.$model"
                    :state="validateVehicleState(index, 'year')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'year')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Make"
                >
                  <b-form-input 
                    v-model="vehicle.make.$model"
                    :state="validateVehicleState(index, 'make')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'make')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Model"
                >
                  <b-form-input 
                    v-model="vehicle.model.$model"
                    :state="validateVehicleState(index, 'model')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'model')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Garaging Zip"
                >
                  <b-form-input 
                    v-model="vehicle.zipCode.$model"
                    :state="validateVehicleState(index, 'zipCode')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'zipCode')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Select Vehicle Type"
                >
                  <b-form-select 
                    v-model="vehicle.vehicleType.$model"
                    :state="validateVehicleState(index, 'vehicleType')"
                    :options="otherVehicleType">
                  </b-form-select>
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'vehicleType')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-row class="mb-2">
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Gross Vehicle Weight"
                >
                  <b-form-input 
                    type="number"
                    v-model="vehicle.grossVehicleWeight.$model"
                    :state="validateVehicleState(index, 'grossVehicleWeight')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'grossVehicleWeight')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Total # of Rear Axles"
                >
                  <b-form-input 
                    type="number"
                    v-model="vehicle.totalRearAxles.$model"
                    :state="validateVehicleState(index, 'totalRearAxles')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'totalRearAxles')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row class="mb-2">
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Principal Garaging Location (City & State)"
                >
                  <b-form-input 
                    v-model="vehicle.garagingLocation.$model"
                    :state="validateVehicleState(index, 'garagingLocation')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'garagingLocation')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Annual Mileage Per Vehicle"
                >
                  <b-form-input 
                    type="number"
                    v-model="vehicle.annualMileagePerVehicle.$model"
                    :state="validateVehicleState(index, 'annualMileagePerVehicle')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'annualMileagePerVehicle')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row class="mb-2">
              <b-col cols="12">
                  <b-form-group
                    class="mb-0"
                    label="(A) Anti-lock Brakes? (B) Air Bags?"
                  >
                    <b-form-select 
                      v-model="vehicle.antilockBrakersOrAirBags.$model" 
                      :options="antilockBrakersOrAirBagsptions">
                    </b-form-select>
                    <!-- <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'antilockBrakersOrAirBags')}}</b-form-invalid-feedback> -->
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-row class="align-items-center">
              <b-col cols="12" md="4">
                <b-form-group
                  label="Radius of Travel (in miles)"
                  :description="radiusOfTravel(vehicle.radiusOfTravelVehicle.$model)"
                >
                  <b-form-input 
                    type="range"
                    min="0"
                    :max="550"
                    step="50"
                    v-model="vehicle.radiusOfTravelVehicle.$model"
                    :state="validateVehicleState(index, 'radiusOfTravelVehicle')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'radiusOfTravelVehicle')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="8">
                <div class="question-block">
                  <span class="question">Are you looking for Comprehesive & Collision Coverage?</span>
                  <toggle-button 
                    :labels="{checked: 'Yes', unchecked: 'No'}" 
                    :width="70" 
                    :height="30" 
                    :sync="true"
                    class="mb-0"
                    v-model="vehicle.coverage.$model"
                    @change="cleanDataOnYes(vehicle, 'coverage', 'currentValue', 'deductible')"
                    :font-size="15"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row v-if="vehicle.coverage.$model">
              <b-col cols="12" md="6">
                <b-form-group
                  label="Current value of the vehicle or trailer"
                >
                  <b-form-input 
                    type="number"
                    v-model="vehicle.currentValue.$model"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'currentValue')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Deductible"
                >
                  <b-form-select 
                    v-model="vehicle.deductible.$model"
                    :options="deductibles">
                  </b-form-select>
                  <b-form-invalid-feedback>{{ errrorMessageVehicle(index, 'deductible')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </template>

          <template
            v-for="(trailer, index) in $v.form.trailers.$each.$iter"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b class="mb-0">Trailer #{{ Number(index) + 1 }}</b>
              <button
                type="button"
                class="lt-button lift mx-2"
                @click="removeTrailersData(index)"
                title="Remove Trailer"
              >
                <font-awesome-icon class="fontawesome minus" icon="minus" />
              </button>
            </div>

            <b-row>
              <b-col cols="12">
                <b-form-group
                  label="VIN"
                >
                  <b-input-group>
                    <b-form-input 
                      v-model="trailer.VIN.$model"
                      :state="validateTrailerState(index, 'VIN')"
                      :aria-describedby="`VIN${index}`"
                    />
                    <b-input-group-append>
                      <b-button :disabled="loading" type="button" @click="getVinData('vehicle', index)" variant="primary">
                        <font-awesome-icon class="fontawesome" icon="search"  />
                      </b-button>
                    </b-input-group-append>
                    <b-form-invalid-feedback :id="`VIN${index}`">{{ errrorMessageTrailer(index, 'VIN')}}</b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Year"
                >
                  <b-form-input 
                    type="number"
                    v-model="trailer.year.$model"
                    :state="validateTrailerState(index, 'year')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'year')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Make"
                >
                  <b-form-input 
                    v-model="trailer.make.$model"
                    :state="validateTrailerState(index, 'make')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'make')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Model"
                >
                  <b-form-input 
                    v-model="trailer.model.$model"
                    :state="validateTrailerState(index, 'model')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'model')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Garaging Zip"
                >
                  <b-form-input 
                    v-model="trailer.zipCode.$model"
                    :state="validateTrailerState(index, 'zipCode')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'zipCode')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Select Trailer Type"
                >
                  <b-form-select 
                    v-model="trailer.vehicleType.$model"
                    :state="validateTrailerState(index, 'vehicleType')"
                    :options="otherTrailerType">
                  </b-form-select>
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'vehicleType')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-row class="mb-2">
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Gross Trailer Weight"
                >
                  <b-form-input 
                    type="number"
                    v-model="trailer.grossVehicleWeight.$model"
                    :state="validateTrailerState(index, 'grossVehicleWeight')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'grossVehicleWeight')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Total # of Rear Axles"
                >
                  <b-form-input 
                    type="number"
                    v-model="trailer.totalRearAxles.$model"
                    :state="validateTrailerState(index, 'totalRearAxles')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'totalRearAxles')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row class="mb-2">
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Principal Garaging Location (City & State)"
                >
                  <b-form-input 
                    v-model="trailer.garagingLocation.$model"
                    :state="validateTrailerState(index, 'garagingLocation')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'garagingLocation')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  class="mb-0"
                  label="Annual Mileage Per Trailer"
                >
                  <b-form-input 
                    type="number"
                    v-model="trailer.annualMileagePerVehicle.$model"
                    :state="validateTrailerState(index, 'annualMileagePerVehicle')"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'annualMileagePerVehicle')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row class="mb-2">
              <b-col cols="12">
                  <b-form-group
                    class="mb-0"
                    label="(A) Anti-lock Brakes? (B) Air Bags?"
                  >
                    <b-form-select 
                      v-model="trailer.antilockBrakersOrAirBags.$model" 
                      :state="validateTrailerState(index, 'antilockBrakersOrAirBags')" 
                      :options="antilockBrakersOrAirBagsptions">
                    </b-form-select>
                    <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'antilockBrakersOrAirBags')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-row class="align-items-center">
              <b-col cols="12" md="4">
                <b-form-group
                  label="Radius of Travel (in miles)"
                  :description="radiusOfTravel(trailer.radiusOfTravelVehicle.$model)"
                >
                  <b-form-input 
                    type="range"
                    min="0"
                    :max="550"
                    step="50"
                    v-model="trailer.radiusOfTravelVehicle.$model"
                    :state="validateTrailerState(index, 'radiusOfTravelVehicle')"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'radiusOfTravelVehicle')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="8">
                <div class="question-block">
                  <span class="question">Are you looking for Comprehesive & Collision Coverage?</span>
                  <toggle-button 
                    :labels="{checked: 'Yes', unchecked: 'No'}" 
                    :width="70" 
                    :height="30" 
                    :sync="true"
                    class="mb-0"
                    v-model="trailer.coverage.$model"
                    @change="cleanDataOnYes(trailer, 'coverage', 'currentValue', 'deductible')"
                    :font-size="15"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row v-if="trailer.coverage.$model">
              <b-col cols="12" md="6">
                <b-form-group
                  label="Current value of the vehicle or trailer"
                >
                  <b-form-input 
                    type="number"
                    v-model="trailer.currentValue.$model"
                  />
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'currentValue')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Deductible"
                >
                  <b-form-select 
                    v-model="trailer.deductible.$model"
                    :options="deductibles">
                  </b-form-select>
                  <b-form-invalid-feedback>{{ errrorMessageTrailer(index, 'deductible')}}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </template>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
             <hr>
          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another vehicle or trailer</div>
          </div>
          <div class="row mb-4">
            <div class=" col">
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
                <b-dropdown-item-button v-for="item in type" :key="item" @click="addMoreItem(item)">{{item}}</b-dropdown-item-button>
              </b-dropdown>
            </div>
            <div class=" alert alert-danger d-flex col-12"
              v-if="noFormfilled"
            >Please add at least one Vehicle/Trailer</div>
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

      </div>
    </form>

    <!-- fab for VIN on mobile -->
    <b-button v-if="showVINFab" pill variant="primary" class="ocr-fab" @click="fillVIN">
      <b-icon  icon="upc-scan" variant="primary"></b-icon>
    </b-button>
  </div>
</template>

<script>
import { API } from "../api.js";
import { mapState } from "vuex";
import { isMobile } from "mobile-device-detect";
import { validationMixin } from "vuelidate";
import { required, requiredIf, minLength, maxLength, minValue, maxValue } from "vuelidate/lib/validators";

export default {
  name: "AccountInfoVehiclesAndTrailers",
  mixins: [validationMixin],

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
      noFormfilled:false,
      msg: false,
      hints: {
        VIN:
          "Please enter the full VIN for vehicles. Don’t have it? Feel welcome to press save and come back or call us at 646-933-0419”"
      },
      deductibles: [
        { text: "$ 500", value: "500" },
        { text: "$ 1000", value: "1000" },
        { text: "$ 2500", value: "2500" },
        { text: "$ 5000", value: "5000" }
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
        "Pickup or Tractor Truck",
        "Straight Truck",
        "Box Truck"
      ],
      otherTrailerType: [
        "Flatbed",
        "Dry Van or Enclosed",
        "Refrigerated",
        "Lowboy",
        "Step Deck",
        "Extendable Flatbed",
        "Stretch Single Drop Deck",
        "Removable Gooseneck",
        "Specialty",
        "Extended Double Drop",
        "Stretch RGN",
        "Conestoga",
        "Power-Only",
        "Multi-Car"
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
      uuid: "",
      form: {
        vehicles: [],
        trailers: []
      },
      defaultData: {
        VIN: "",
        year: "",
        make: "",
        vehicleType: "",
        vehicleImage: "",
        model: "",
        zipCode: "",
        grossVehicleWeight: "",
        totalRearAxles: "",
        garagingLocation: "",
        annualMileagePerVehicle: "",
        antilockBrakersOrAirBags: "",
        radiusOfTravelVehicle: 50,
        coverage: false,
        currentValue: "",
        deductible: ""
      },
      loading: false,
      error: null,
      type: ["Vehicle", "Trailer"],
      antilockBrakersOrAirBagsptions: [
        { value: '', text: 'Please select an option' },
        { value: 'A', text: 'Anti-lock Brakes' },
        { value: 'B', text: 'Air Bags' },
        { value: 'Both', text: 'Both' },
      ],
    };
  },

  validations() {
    return {
      form: {
        vehicles: {
          $each: {
            VIN: {
              required
            },
            year: {
              required
            },
            make: {
              required
            },
            model: {
              required
            },
            vehicleType: {
              required
            },
            zipCode: {
              required
            },
            grossVehicleWeight: {
              required
            },
            totalRearAxles: {
              required
            },
            garagingLocation: {
              required
            },
            annualMileagePerVehicle: {
              required
            },
            antilockBrakersOrAirBags: {
            },
            radiusOfTravelVehicle: {
              required
            },
            coverage: {
              required
            },
            currentValue: {
            },
            deductible: {
            },
          }
        },
        trailers: {
          $each: {
            VIN: {
              required
            },
            year: {
              required
            },
            make: {
              required
            },
            model: {
              required
            },
            vehicleType: {
              required
            },
            zipCode: {
              required
            },
            grossVehicleWeight: {
              required
            },
            totalRearAxles: {
              required
            },
            garagingLocation: {
              required
            },
            annualMileagePerVehicle: {
              required
            },
            antilockBrakersOrAirBags: {
              required
            },
            radiusOfTravelVehicle: {
              required
            },
            coverage: {
              required
            },
            currentValue: {
            },
            deductible: {
            },
          }
        }
      }
    }
  },

  mounted() {
    this.msg = isMobile ? true : false;
  },

  computed: {
    showVINFab () {
      return localStorage.getItem('imageVIN') && this.msg
    },
    
    dropdownSize () {
      return  window.innerWidth <= 768 ? 'md' : 'lg'
    }
  },
  
  created() {
    this.$emit("update-progress", this.progress);
    this.loadCompany();
  },

  methods: {
    fillVIN () {
      const VIN = localStorage.getItem('imageVIN')
      if (VIN) {
        if (this.vehiclesData.length) {
          this.vehiclesData[0].VIN = VIN
        }
      }
    },
    radiusOfTravel(val) {
      return val > 500 ? '500+': val.toString()
    },
    validateVehicleState(index, name) {
      const { $dirty, $error } = this.$v.form.vehicles.$each.$iter[index][name];
      return $dirty ? !$error : null;
    },
    validateTrailerState(index, name) {
      const { $dirty, $error } = this.$v.form.trailers.$each.$iter[index][name];
      return $dirty ? !$error : null;
    },
    errorMessage (required, minLength, maxLength) {
      let msg = ''
      if (required != undefined && !required) {
        msg = 'This field is required.'
      } 

      if ((minLength != undefined && !minLength) || (maxLength != undefined && !maxLength)) {
        msg = 'The length must be correct'
      } 
      return msg
    },
    errrorMessageVehicle(index, name) {
      const { required, minLength, maxLength } = this.$v.form.vehicles.$each.$iter[index][name]

      return this.errorMessage(required, minLength, maxLength)
    },
    errrorMessageTrailer(index, name) {
      const { required, minLength, maxLength } = this.$v.form.trailers.$each.$iter[index][name]

      return this.errorMessage(required, minLength, maxLength)
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
    addVehicleData() {
      this.form.vehicles.push(Object.assign({}, this.defaultData));
    },
    addTrailerData(data) {
      this.form.trailers.push(Object.assign({}, this.defaultData));
    },
    cleanDataOnYes(obj, v, v1, v2) {
      if (obj[v].$model) {
        obj[v1].$model = ''
        obj[v2].$model = ''
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
          this.form.vehicles.splice(key, 1);
        } 
      });
    },
    removeTrailersData(key) {
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
          this.form.trailers.splice(key, 1);
        } 
      });
    },
    async getVinData(vehicleType, index) {
      console.log(vehicleType, index)
      let vinToUse = false;
      if (vehicleType == "vehicle") {
        vinToUse = this.form.vehicles[index].VIN;
      } else if (vehicleType == "trailer") {
        vinToUse = this.form.trailers[index].VIN;
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
          this.form.vehicles[index].make = data.data.make;
          this.form.vehicles[index].model = data.data.model;
          this.form.vehicles[index].year = data.data.year;
          this.form.vehicles[index].vehicleType = data.data.vehicleType
        } else if (vehicleType == "trailer") {
          if (this.trailerTypes.indexOf(data.data.vehicleType) > -1) {
            data.data.trailerType = data.data.vehicleType;
          } else {
            delete data.data.vehicleType;
          }

          this.form.trailers[index].make = data.data.make;
          this.form.trailers[index].model = data.data.model;
          this.form.trailers[index].year = data.data.year;
        }
      } catch (err) {
        console.error("err", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    addMoreItem(item) {
      if (item == 'Vehicle') {
        this.addVehicleData();
      } else if (item == 'Trailer') {
        this.addTrailerData();
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
       
        if (res && res.status === "OK" && res.data.company) {
          this.uuid = res.data.uuid;
          let { vehicleInformationList } = res.data.company;
          if (vehicleInformationList) {
            if (vehicleInformationList.constructor !== Object) {
              vehicleInformationList = JSON.parse(vehicleInformationList);
            } else {
              vehicleInformationList = vehicleInformationList;
            }
            if (vehicleInformationList.vehicle.length > 0 && vehicleInformationList.vehicle[0].grossVehicleWeight != undefined) {
              this.form.vehicles = vehicleInformationList.vehicle
            } else {
              this.addVehicleData();
            }

            if (vehicleInformationList.trailer.length > 0 && vehicleInformationList.trailer[0].grossVehicleWeight != undefined) {
              this.form.trailers = vehicleInformationList.trailer
            } else {
              // this.addTrailerData();
            }
          } else {
            this.addVehicleData();
          }
        } else if (res && res.status === "ERROR") {
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
      this.$v.form.$touch();
      console.log(this.$v.form)
      if (this.$v.form.$anyError) {
        return;
      }
      
      if((this.form.vehicles.length == 0) && (this.form.trailers.length == 0)){
        this.noFormfilled = true;
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const vehicleInformationList = {
          vehicle: this.form.vehicles,
          trailer: this.form.trailers
        }

        const data = {
          vehicleInformationList: JSON.stringify(vehicleInformationList),
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

.fontawesome.minus path {
  fill: black;
}

.ocr-fab {
  position: fixed;
  left: 5%;
  z-index: 9999;
  bottom: 5%;
  overflow: initial;
  box-sizing: border-box;
  opacity: .7;

  svg {
    fill: white;
  }
}
</style>
