<template>
  <div class>
    <form class="custom_form" @submit.prevent="updateCompany">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Business Information</h4>
          <div class="col-md-6 col-lg-12 row">
              <h6 class="">Mailing Address</h6>
            </div>
          <div class="row">
            
            <div class="col">
              <div class="form-group">
                <input
                  v-model="formData.address"
                  :class="{ 'has-error': formErrors.address }"
                  type="text"
                  class="lt-input"
                  placeholder="Street Address*"
                  required
                  @change="validateField('address')"
                  @focus="onFocus('address')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.address" class="text-danger">{{ formErrors.address }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <input
                  v-model="formData.city"
                  :class="{ 'has-error': formErrors.city }"
                  type="text"
                  class="lt-input"
                  placeholder="City*"
                  required
                  @change="validateField('city')"
                  @focus="onFocus('city')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.city" class="text-danger">{{ formErrors.city }}</div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.state"
                  :class="{ 'has-error': formErrors.state }"
                  type="text"
                  class="lt-input"
                  placeholder="State*"
                  required
                  @change="validateField('state')"
                  @focus="onFocus('state')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.state" class="text-danger">{{ formErrors.state }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.zip"
                  :class="{ 'has-error': formErrors.zip }"
                  type="text"
                  class="lt-input"
                  placeholder="Zip Code*"
                  required
                  minlength="5"
                  @change="validateField('zip')"
                  @focus="onFocus('zip')"
                  @blur="onBlur"
                >
                {{data}}
                <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip }}</div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6 ">
              <!-- :readonly="submitted || status" -->
              <div class="form-group">
                <input
                  v-model="formData.dotNumber"
                  :class="{ 'has-error': formErrors.dotNumber }"
                  type="text"
                  class="lt-input" 
                  placeholder="USDOT"
                  @focus="onFocus('USDOT')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.dotNumber" class="text-danger">{{ formErrors.dotNumber }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <input
                  v-model="formData.name"
                  :class="{ 'has-error': formErrors.name }"
                  type="text"
                  class="lt-input"
                  placeholder="Company name"
                  @focus="onFocus('Company name')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.name" class="text-danger">{{ formErrors.name }}</div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <input
                  v-model="formData.phoneNumber"
                  :class="{ 'has-error': formErrors.phoneNumber }"
                  type="text"
                  class="lt-input"
                  placeholder="Phone no"
                  @focus="onFocus('Phone number')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.phoneNumber" class="text-danger">{{ formErrors.phoneNumber }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <GmapMap
                v-if="markers.length > 0"
                :center="markers[0].position"
                :zoom="5"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
                <gmap-polyline v-if="paths.length > 0" :path="paths">
                </gmap-polyline>
                <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                </gmap-info-window>
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="toggleInfoWindow(m,index)"
                />
                <div slot="visible">
                  <div class="distance-label">
                    <b>Distance</b>: {{distance}} mile
                  </div>
                </div>
              </GmapMap>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <b-form-checkbox v-model="checked" v-on:change="changeData()">Is Garaging address the same location?</b-form-checkbox>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-12 py-2">
              <h6 class="pt-2">Garaging Address</h6>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <input
                  v-model="formData.address1"
                  :class="{ 'has-error': formErrors.address1 }"
                  type="text"
                  class="lt-input"
                  placeholder="Garaging Address*"
                  required
                  @change="validateField('address1')"
                  @focus="onFocus('address1')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.address1" class="text-danger">{{ formErrors.address1 }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.city1"
                  :class="{ 'has-error': formErrors.city1 }"
                  type="text"
                  class="lt-input"
                  placeholder="City*"
                  required
                  @change="validateField('city1')"
                  @focus="onFocus('city1')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.city1" class="text-danger">{{ formErrors.city1 }}</div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.state1"
                  :class="{ 'has-error': formErrors.state1 }"
                  type="text"
                  class="lt-input"
                  placeholder="State*"
                  required
                  @change="validateField('state1')"
                  @focus="onFocus('state1')"
                  @blur="onBlur"
                >
                <div v-if="formErrors.city1" class="text-danger">{{ formErrors.state1 }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                <input
                  v-model="formData.zip1"
                  :class="{ 'has-error': formErrors.zip1 }"
                  type="text"
                  class="lt-input"
                  placeholder="Zip Code*"
                  required
                  minlength="5"
                  @change="validateField('zip1')"
                  @focus="onFocus('zip1')"
                  @blur="onBlur"
                >

                <div v-if="formErrors.zip" class="text-danger">{{ formErrors.zip1 }}</div>
              </div>
            </div>
          </div>
          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <div class="card-footer">
          <div class="form-buttons next-wrapper">
            <div class="col-6 p-0">
              <button
                disabled
                type="button"
                class="lt-button lt-button-default btn-block btn-border-radius-lb"
                @click="goPrevForm"
              >
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title"></div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label next-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Business Structure</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- fab for VIN on mobile -->
    <b-button v-if="showUSDOTFab" pill variant="primary" class="ocr-fab" @click="fillUSDOT">
      <b-icon  icon="upc-scan" variant="primary"></b-icon>
    </b-button>
  </div>
</template>

<script>
import { validateField, validateForm, required } from "../validators.js";
import { API } from "../api.js";
import { mapState, mutations } from "vuex";
import { isMobile } from "mobile-device-detect";

export default {
  name: "AccountInfoPersonalInfo",

  components: {
  },
  props: {
    nextForm: {
      type: String,
      required: true
    },
    prevForm:{
      type:String,
    },
    progress: {
      type: Number,
      required: true
    }
  },
  async mounted() {
    this.$emit("update-hint", "Please be sure that the mailing address is where you want to receive physical documents. The garage address is where you keep your truck.");
    
    this.mobile = isMobile ? true : false;
    this.uuid = localStorage.getItem('uuid');
    this.save = true;
    this.formData.dotNumber = localStorage.getItem("usdot") || '';
    this.$emit('update-us-dot', localStorage.getItem("usdot") || '')
    this.$emit("update-progress", this.progress);
  },
  beforeMount() {
  },
  computed: {
    ...mapState(["data"]),
    ...mapState('auth', { existingDots: state => state.existingDots }),

    showUSDOTFab () {
      return localStorage.getItem('imageDOT') && this.mobile && !this.submitted
    },
    checked: {
      get () {
        return this.formData.address && this.formData.address == this.formData.address1 && this.formData.city == this.formData.city1 && this.formData.state == this.formData.state1 && this.formData.zip == this.formData.zip1
      },
      set (newValue) {
        console.log(newValue)
      }
    },
  },

  data() {
    return {
      showmodel: false,
      save: true,
      mobile:false,
      uuid: "",
      dotId: "",
      status: false,
      userData: "",
      formData: {
        address: "",
        city: "",
        state: "",
        zip: "",
        dotNumber: "",
        name: "",
        phoneNumber: "",
        address1: "",
        city1: "",
        state1: "",
        zip1: "",
        lat: "",
        lng: ""
      },
      rules: {
        // firstName: [required],
        // lastName: [required],
        address: [required],
        city: [required],
        state: [required],
        zip: [required],
        address1: [required],
        city1: [required],
        state1: [required],
        zip1: [required]
      },
      formErrors: {},
      hints: {
        address: "Please enter Mailing Address",
        state: "Please enter State of Mailing Address",
        city: "Please enter State of Mailing Address",
        zip: "Please enter Zipcode of Mailing Address",
        address1: "Please enter Garaging Address",
        city1: "Please enter State of Garaging Address",
        state1: "Please enter State of Garaging Address",
        zip1: "Please enter Zipcode of Garaging Address"
      },
      loading: false,
      error: null,
      markers: [],
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
          //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      paths: [],
      distance: "",
      submitted: true,
    };
  },
  async created() {
    
    this.dotId = this.$router.history.current.query.dotId
    if (this.dotId) {
      this.createCompany()
    } else {
      this.loadCompany();
    }
  },
  updated() {
  },
  methods: {
    fillUSDOT () {
      const usdot = localStorage.getItem('imageDOT')
      if (usdot && !this.submitted) {
        this.formData.dotNumber = usdot
      }
    },
    async createCompany(row) {
      this.loading = true;
      try {
        let data = await API.post("company/create", {
          usdot: this.dotId,
        });
        localStorage.setItem('uuid', data.uuid);
        this.uuid = data.uuid;
        
        if (data.status === "OK") {
          await this.parseData(data.data)
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
    async parseAddress (_mailingAddress, _physicalAddress) {
      try {
        if (_mailingAddress) {
          let MailingAddress = _mailingAddress
          if (_mailingAddress && _mailingAddress.constructor !== Object) {
            MailingAddress = JSON.parse(_mailingAddress)
          }
          this.formData.address = MailingAddress.address
          this.formData.state = MailingAddress.state
          this.formData.city = MailingAddress.city
          this.formData.zip = MailingAddress.zip.split('-')[0].replace(",", "");

          await this.getMapData(MailingAddress, "Mailing Address");
        }
      } catch(e){ console.log(e)}

      try {
        if (_physicalAddress) {
          let PhysicalAddress = _physicalAddress
          if (_physicalAddress && _physicalAddress.constructor !== Object) {
            PhysicalAddress = JSON.parse(_physicalAddress)
          }
          this.formData.address1 = PhysicalAddress.address;
          this.formData.state1 = PhysicalAddress.state;
          this.formData.city1 = PhysicalAddress.city;
          this.formData.zip1 = PhysicalAddress.zip;

          await this.getMapData(PhysicalAddress, "Physical Address");
        }
      } catch(e){ console.log(e)}

      if (this.markers.length > 1) {
        this.calcCrow()
      }
    },
    calcCrow: function() {
      const marker1 = this.markers[0].position;
      const marker2 = this.markers[1].position
      let lat1 = marker1.lat, lon1 = marker1.lng, 
          lat2 = marker2.lat, lon2 = marker2.lng;
      var Radius = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      this.distance = (Radius * c * 0.62137).toFixed(2); // mile
    },

    // Converts numeric degrees to radians
    toRad: function(Value) {
      return Value * Math.PI / 180;
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    async getMapData(addr, infoText) {
      let _addr = `${addr.address}+${addr.city},+${addr.state}+${addr.zip}`
      
      const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${_addr}&key=AIzaSyBAsXZ3BoGXNuEAo72cRzpgn0ug1JFSTXE`)
          .then(res => res.json()) 
          .then(json => json);
      if (data.results && data.results.length > 0) {
        const geo = data.results[0].geometry.location;
        this.markers.push({
          position: {
            lat: geo.lat,
            lng: geo.lng,
          },
          infoText
        })
        this.paths.push({
          lat: geo.lat,
          lng: geo.lng,
        })
      }
    },
    changeData() {
      if (!this.checked) {
        this.formData.address1 = this.formData.address;
        this.formData.city1 = this.formData.city;
        this.formData.state1 = this.formData.state;
        this.formData.zip1 = this.formData.zip;
      } else {
        this.formData.address1 = "";
        this.formData.city1 = "";
        this.formData.state1 = "";
        this.formData.zip1 = "";
      }
    },
    
    onFocus(fieldName) {
      this.$emit("update-hint", this.hints[fieldName]);
    },
    onBlur() {
      this.$emit("update-hint", "Please be sure that the mailing address is where you want to receive physical documents. The garage address is where you keep your truck.");
    },
    goNextForm() {
      this.$emit("go-to-form", this.nextForm);
    },
    goPrevForm() {
      this.$emit("go-to-form", this.prevForm);
    },
    validateField(fieldName) {
      validateField(fieldName, this.formData, this.rules, this.formErrors);
    },
    validateForm() {
      this.formErrors = {};
      return validateForm(this.formData, this.rules, this.formErrors);
    },
    async parseData (data) {
      let { company } = data;
      if (company) {
        let { mailingAddress, garagingAddress, dotNumber, name, phoneNumber } = company;
        this.formData.dotNumber = dotNumber || ''
        this.formData.name = name
        this.formData.phoneNumber = phoneNumber
        this.$emit('update-us-dot', this.formData.dotNumber)
        await this.parseAddress(mailingAddress, garagingAddress)
      }
    },

    async loadCompany() {
      this.loading = false;
      this.error = null;
      this.uuid = localStorage.getItem('uuid');
      const userId = localStorage.getItem('userId')
      try {
        let res = await API.get("company/current?uuid=" + this.uuid + "&userId=" + userId);
  
        if (res && res.status === "OK") {
          this.uuid = res.data.uuid;
          this.submitted = res.submitted
          this.status = true
          await this.parseData(res.data)
        } else if (res && res.status === "ERROR") {
          // this.$router.replace({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatAddress(fullAddress) {
      let splitAddress = fullAddress.split(" ");
      splitAddress.reverse();
      let cnt = 0,
        val = [],
        index = 0;
        while (cnt != 4 && splitAddress.length > index) {
          if (splitAddress[index].trim() != "") {
            if (cnt < 2) {
              val[cnt++] = splitAddress[index];
            } else {
              val[cnt] = "";
            do {
              val[cnt] = splitAddress[index] + " " + val[cnt];
            } while (
              splitAddress[index++].trim() != "" &&
              splitAddress.length > index
            );
            cnt++;
          }
        }
        index++;
      }
      return val;
    },
    async updateCompany() {
      let formIsValid = this.validateForm();
      if (!formIsValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      let emailAddress = "";
      try {
        emailAddress = JSON.parse(localStorage.getItem('token')).email;
      } catch (e) {
      }
      try {
        const { name, dotNumber, phoneNumber } = this.formData;
        const user_id = localStorage.getItem('userId')
        let data = {
          name,
          user_id,
          dotNumber,
          phoneNumber,
          mailingAddress: JSON.stringify( {
            address: this.formData.address,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip,
          }),
          garagingAddress: JSON.stringify({
            address: this.formData.address1,
            city: this.formData.city1,
            state: this.formData.state1,
            zip: this.formData.zip1,
          }),
          emailAddress,
          uuid: this.uuid
        };
        let res = await API.post("company/save", { data});
  
        if (res.status === "OK") {
          localStorage.setItem('uuid', res.data);
          this.goNextForm();
        } else if (res.status === "ERROR") {
          
          this.error = res.messages[0] || res.data;
        }

      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.color-bg{
  color:#6f6f6f
}

.st-padding {
  padding-left: 10px;
  font-weight: bold;
}

.distance-label {
  bottom: 0; 
  left: 0; 
  padding: 0.25rem 1rem; 
  background-color: #efefef; 
  color: #5e98f9; 
  position: absolute; 
  z-index: 100;

  b {
    color: #5e98f9;
  }
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
