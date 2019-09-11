<template>
  <div class="drivers-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Drivers</h4>

          <!-- <account-info-drivers-item
            v-for="(item, index) in drivers"
            ref="driverForm"
            :key="item._uuid"
            :index="index"
            :driver="item"
            class="mb-5"
            @update-hint="updateHint"
            @remove-form="removeForm"
          />-->

          <hr>

          <template>
            
            <div
              class="owner-form-item container-fluid mob-2"
              v-for="(singleDriver, index) in driversData"
              :key="index"
            >
            
              <div class="row">
                <div class="col">
                  <h2 class="h5">Driver #{{ index + 1 }}</h2>
                </div>

                <button
                  v-show="index > 0"
                  type="button"
                  class="lt-button mx-2 mb-3"
                  @click="removeDriverData(index)"
                  title="Remove Driver"
                >
                  <h3>-</h3>
                </button>
              </div>

              <div class="row">
                <div class="col-12 col-lg-5">
                  <div class="form-group">
                    <input
                      v-model="driversData[index].firstName"
                      type="text"
                      class="lt-input"
                      placeholder="First name"
                      
                    >

                    <div
                      class="text-danger"
                      v-show="!validations.driversData[index].firstName.is_valid"
                    >{{ validations.driversData[index].firstName.text }}</div>
                  </div>
                </div>
                  <div class="col-4 col-lg-2">
                    <div class="form-group">
                      <input
                      v-model="driversData[index].middleName"
                      type="text"
                      class="lt-input"
                      placeholder="M."
                    >

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].middleName.is_valid"
                      >{{ validations.driversData[index].middleName.text }}</div>
                   </div>
                  </div>

                  <div class="col-12 col-lg-5">
                    <div class="form-group">
                      <input
                        v-model="driversData[index].lastName"
                        type="text"
                        class="lt-input"
                        placeholder="Last name"
                      >

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].lastName.is_valid"
                      >{{ validations.driversData[index].lastName.text }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="row" id="text-date">
                  <div class="col-12 col-md-6 pt-2">
                    <div>Date of Birth</div>
                  </div>

                  <div class="col-12 col-md-6" id="text-date">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                       
                          <input
                            v-model="driversData[index].dobM"
                            type="text"
                            class="lt-input"
                            placeholder="MM"
                          >
                          <!-- required -->
                          <!-- @focus="onFocus('dobM')"
                          @blur="onBlur"
                          @change="validateField('dobM')"-->

                          <div
                            class="text-danger"
                            v-show="!validations.driversData[index].dobM.is_valid"
                          >{{ validations.driversData[index].dobM.text }}</div>
                        </div>
                      </div>
                      <span class="mt-1">/</span>
                      <div class="col">
                        <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobD }" -->
                          <input
                            v-model="driversData[index].dobD"
                            type="text"
                            class="lt-input"
                            placeholder="DD"
                          >
                          <!-- required -->
                          <!-- @focus="onFocus('dobD')"
                          @blur="onBlur"
                          @change="validateField('dobD')"-->

                          <div
                            class="text-danger"
                            v-show="!validations.driversData[index].dobD.is_valid"
                          >{{ validations.driversData[index].dobD.text }}</div>
                        </div>
                      </div>
                      <span class="mt-1">/</span>
                      <div class="col">
                        <div class="form-group">
                          <!-- :class="{ 'has-error': formErrors.dobY }" -->
                          <input
                            v-model="driversData[index].dobY"
                            type="text"
                            class="lt-input"
                            placeholder="YYYY"
                          >
                          <!-- required -->
                          <!-- @focus="onFocus('dobY')"
                          @blur="onBlur"
                          @change="validateField('dobY')"-->

                          <div
                            class="text-danger"
                            v-show="!validations.driversData[index].dobY.is_valid"
                          >{{ validations.driversData[index].dobY.text }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <input
                        v-model="driversData[index].licenseNumber"
                        type="text"
                        class="lt-input"
                        placeholder="License Number"
                      >

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].licenseNumber.is_valid"
                      >{{ validations.driversData[index].licenseNumber.text }}</div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="form-group">
                      <input
                        v-model="driversData[index].CDL"
                        type="text"
                        class="lt-input"
                        placeholder="CDL(Optional)"
                      >

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].CDL.is_valid"
                      >{{ validations.driversData[index].CDL.text }}</div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.address }" -->
                      <input
                        v-model="driversData[index].address"
                        type="text"
                        class="lt-input"
                        placeholder="Address"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('address')"
                      @blur="onBlur"
                      @change="validateField('address')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].address.is_valid"
                      >{{ validations.driversData[index].address.text }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.city }" -->
                      <input
                        v-model="driversData[index].city"
                        type="text"
                        class="lt-input"
                        placeholder="City"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('city')"
                      @blur="onBlur"
                      @change="validateField('city')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].city.is_valid"
                      >{{ validations.driversData[index].city.text }}</div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.state }" -->
                      <input
                        v-model="driversData[index].state"
                        type="text"
                        class="lt-input"
                        placeholder="State"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('state')"
                      @blur="onBlur"
                      @change="validateField('state')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].state.is_valid"
                      >{{ validations.driversData[index].state.text }}</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <!-- :class="{ 'has-error': formErrors.zip }" -->
                      <input
                        v-model="driversData[index].zip"
                        type="text"
                        class="lt-input"
                        minlength="5"
                        placeholder="Zip"
                      >
                      <!-- required -->
                      <!-- @focus="onFocus('zip')"
                      @blur="onBlur"
                      @change="validateField('zip')"-->

                      <div
                        class="text-danger"
                        v-show="!validations.driversData[index].zip.is_valid"
                      >{{ validations.driversData[index].zip.text }}</div>
                    </div>
                  </div>
              
              </div>
              <div class="row" id="text-date">
                <div class="col-12 col-md-6 pt-2">
                  <div>Date of Hire</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData[index].dohM"
                          type="text"
                          class="lt-input"
                          placeholder="MM"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData[index].dohM.is_valid"
                        >{{ validations.driversData[index].dohM.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData[index].dohD"
                          type="text"
                          class="lt-input"
                          placeholder="DD"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData[index].dohD.is_valid"
                        >{{ validations.driversData[index].dohD.text }}</div>
                      </div>
                    </div>
                    <span class="mt-1">/</span>
                    <div class="col">
                      <div class="form-group">
                        <input
                          v-model="driversData[index].dohY"
                          type="text"
                          class="lt-input"
                          placeholder="YYYY"
                        >
                        <div
                          class="text-danger"
                          v-show="!validations.driversData[index].dohY.is_valid"
                        >{{ validations.driversData[index].dohY.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>
             
              <!-- <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <select
                      v-model="driversData[index].yearsOfExperience"
                      type="text"
                      class="lt-input"
                      placeholder="Years of Experience"
                    >
                      <option value>Years of Experience</option>

                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
                      <option>32</option>
                      <option>33</option>
                      <option>34</option>
                      <option>35</option>
                      <option>36</option>
                      <option>37</option>
                      <option>38</option>
                      <option>39</option>
                      <option>40</option>
                      <option>41</option>
                      <option>42</option>
                      <option>43</option>
                      <option>44</option>
                      <option>45+</option>
                    </select>
                    <div
                      class="text-danger"
                      v-show="!validations.driversData[index].zip.is_valid"
                    >{{ validations.driversData[index].zip.text }}</div>
                  </div>
                </div>
              </div> -->
            </div>
            </div>
          </template>

          <div class="row align-items-center mb-3">
            <div class="col font-weight-bold">Add another driver</div>

            <div class="col-auto text-right">
              <button
                type="button"
                class="lt-button px-3"
                @click="addDriverData"
                title="Add Driver"
              >+</button>
            </div>
          </div>

          <!-- <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div> -->
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
import uuidv4 from "uuid/v4";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import axios from "axios";
import headerAssistant from "./header.vue";

export default {
  name: "AccountInfoDrivers",
  components: {
    AccountInfoDriversItem: () => import("./AccountInfoDriversItem.vue"),
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
      final_uuid: "",
      uuid: "",
      loading: false,
      error: null,
      save: true,
      showmodel: false,
      formData: {
        drivers: []
      },
      driversData: [],
      validations: {
        driversData: [],
        oneOwner: {
          is_valid: true,
          text: ""
        },
        website: {
          is_valid: true,
          text: ""
        }
      }
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
    } else {
      this.save = true;
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
    addDriverDataValidation(count) {
      // console.log("this.validations.driversData.length",this.validations.driversData.length)
      let driverDatavalidationsLength = this.validations.driversData.length;
      for (let index = 0; index < count; index++) {
        this.validations.driversData[driverDatavalidationsLength + index] = {
          firstName: {
            is_valid: true,
            text: ""
          },
          middleName: {
            is_valid: true,
            text: ""
          },
          lastName: {
            is_valid: true,
            text: ""
          },
          dobM: {
            is_valid: true,
            text: ""
          },
          dobD: {
            is_valid: true,
            text: ""
          },
          dobY: {
            is_valid: true,
            text: ""
          },
          dohM: {
            is_valid: true,
            text: ""
          },
          dohD: {
            is_valid: true,
            text: ""
          },
          dohY: {
            is_valid: true,
            text: ""
          },
          address: {
            is_valid: true,
            text: ""
          },
          city: {
            is_valid: true,
            text: ""
          },
          state: {
            is_valid: true,
            text: ""
          },
          zip: {
            is_valid: true,
            text: ""
          },
          licenseNumber: {
            is_valid: true,
            text: ""
          },
          // yearsOfExperience: {
          //   is_valid: true,
          //   text: ""
          // },
          CDL: {
            is_valid: true,
            text: ""
          }
        };
      }
    },
    addDriverData(data) {
      // console.log("this.driversData",data)
      if (data == undefined || data.firstName   == undefined ) {
        // console.log("this.driversData aa",this.driversData)
       this.driversData.push({
          firstName: '',
          middleName: '',
          lastName: '',
          dobM: '',
          dobD: '',
          dobY: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          dohM: '',
          dohD: '',
          dohY: '',
          licenseNumber: '',
          CDL: ''
        });
        // console.log("this.driversData bb",this.driversData)
        this.addDriverDataValidation(1);
      } else {
        console.log("push",data)
        this.driversData.push(data);
      }
      
    },
    removeDriverData(key) {
      this.driversData.splice(key, 1);
      this.validations.driversData.splice(key, 1);
    },
    validateNewDriverData() {
      let validNewDriverForm = true;
      
      for (var index in this.driversData) {
        if (this.driversData.hasOwnProperty(index)) {
          if (this.driversData[index].firstName.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].firstName.is_valid = false;
            this.validations.driversData[index].firstName.text =
              "Please enter firstname!";
          } else {
            this.validations.driversData[index].firstName.is_valid = true;
            this.validations.driversData[index].firstName.text = "";
          }

          if (this.driversData[index].lastName.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].lastName.is_valid = false;
            this.validations.driversData[index].lastName.text =
              "Please enter lastname!";
          } else {
            this.validations.driversData[index].lastName.is_valid = true;
            this.validations.driversData[index].lastName.text = "";
          }

          if (this.driversData[index].dobM.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dobM.is_valid = false;
            this.validations.driversData[index].dobM.text =
              "Please enter month!";
          } else {
            this.validations.driversData[index].dobM.is_valid = true;
            this.validations.driversData[index].dobM.text = "";
          }

          if (this.driversData[index].dobD.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dobD.is_valid = false;
            this.validations.driversData[index].dobD.text =
              "Please enter date!";
          } else {
            this.validations.driversData[index].dobD.is_valid = true;
            this.validations.driversData[index].dobD.text = "";
          }

          // if (this.driversData[index].dobY.trim() == "") {
          //   validNewDriverForm = false;
          //   this.validations.driversData[index].dobY.is_valid = false;
          //   this.validations.driversData[index].dobY.text =
          //     "Please enter year!";
          // } else {
          //   this.validations.driversData[index].dobY.is_valid = true;
          //   this.validations.driversData[index].dobY.text = "";
          // }

          if (this.driversData[index].dohM.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dohM.is_valid = false;
            this.validations.driversData[index].dohM.text =
              "Please enter month!";
          } else {
            this.validations.driversData[index].dohM.is_valid = true;
            this.validations.driversData[index].dohM.text = "";
          }

          if (this.driversData[index].dohD.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dohD.is_valid = false;
            this.validations.driversData[index].dohD.text =
              "Please enter date!";
          } else {
            this.validations.driversData[index].dohD.is_valid = true;
            this.validations.driversData[index].dohD.text = "";
          }

          if (this.driversData[index].dohY.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].dohY.is_valid = false;
            this.validations.driversData[index].dohY.text =
              "Please enter year!";
          } else {
            this.validations.driversData[index].dohY.is_valid = true;
            this.validations.driversData[index].dohY.text = "";
          }

          if (this.driversData[index].address.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].address.is_valid = false;
            this.validations.driversData[index].address.text =
              "Please enter an address!";
          } else {
            this.validations.driversData[index].address.is_valid = true;
            this.validations.driversData[index].address.text = "";
          }

          if (this.driversData[index].city.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].city.is_valid = false;
            this.validations.driversData[index].city.text =
              "Please enter city!";
          } else {
            this.validations.driversData[index].city.is_valid = true;
            this.validations.driversData[index].city.text = "";
          }

          if (this.driversData[index].state.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].state.is_valid = false;
            this.validations.driversData[index].state.text =
              "Please enter state!";
          } else {
            this.validations.driversData[index].state.is_valid = true;
            this.validations.driversData[index].state.text = "";
          }

          if (this.driversData[index].zip.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].zip.is_valid = false;
            this.validations.driversData[index].zip.text = "Please enter zip!";
          } else {
            this.validations.driversData[index].zip.is_valid = true;
            this.validations.driversData[index].zip.text = "";
          }

          if (this.driversData[index].licenseNumber.trim() == "") {
            validNewDriverForm = false;
            this.validations.driversData[index].licenseNumber.is_valid = false;
            this.validations.driversData[index].licenseNumber.text =
              "Please enter licenseNumber!";
          } else {
            this.validations.driversData[index].licenseNumber.is_valid = true;
            this.validations.driversData[index].licenseNumber.text = "";
          }
          if (this.driversData[index].CDL.trim() == "") {
            validNewDriverForm = true;

        this.validations.driversData[index].CDL.is_valid = true;
            this.validations.driversData[index].CDL.text = "";

            // this.validations.driversData[index].CDL.is_valid = false;
            // this.validations.driversData[index].CDL.text = "Please enter CDL!";
          } else {
            // this.validations.driversData[index].CDL.is_valid = true;
            // this.validations.driversData[index].CDL.text = "";
          }
        }
      }
      return validNewDriverForm;
    },
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
          this.$router.push({ name: "AccountInfoDrivers" });
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
      var temp_uuid;
      this.loading = true;
      this.error = null;

      if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
        console.log("temp_uuid login after", temp_uuid);
      } else {
        temp_uuid = this.uuid;
        console.log("temp_uuid no login after", temp_uuid);
      }
      try {
        let data = await API.post("company/save", {
          key: "drivers",
          val: this.drivers.map(d => {
            let driver = { ...d };
            delete driver._uuid;
            return driver;
          }),
          user_id: localStorage.getItem("userId"),
          uuid: temp_uuid
        });

        if (data.status === "OK") {
          if (!localStorage.getItem("token")) {
            if (this.showmodel) {
              this.showmodel = false;
            } else {
              this.showmodel = true;
            }
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

      // if (!this.drivers.length) {
      //   this.error = "Please add at least one driver";
      // }
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
        this.uuid = data.data.b;
        if (data.status === "OK") {
          let { drivers } = data.data.a;
          console.log("drivers",drivers.drivers.length)
          if (drivers.drivers && drivers.drivers.length) {
            this.drivers = drivers.drivers.map(d => ({ ...d, _uuid: uuidv4() }));

            if(drivers.drivers.length>0){
              this.driversData = drivers.drivers;
              console.log("hi ",this.driversData)
              this.addDriverDataValidation(drivers.drivers.length)
            }else{
              this.addDriverData();
            }
          } else {
            // this.addForm();
             this.addDriverData();
          }
        } else if (data.status === "ERROR") {
           
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
           this.addDriverData();
      } finally {
        this.loading = false;
           
      }
    },
    // setDataFromForms() {
    //   let drivers = [];

    //   this.$refs.driverForm.forEach(formRef => {
    //     let formData = formRef.getFormData();
    //     drivers.push(formData);
    //   });

    //   this.drivers = drivers;
    // },
    async updateCompany() {
      // this.setDataFromForms();

      // let driverForms = this.$refs.driverForm;
      if (!this.driversData.length) {
        return;
      }

      // let allFormAreValid = driverForms.every(formRef =>
      //   formRef.validateForm()
      // );

      // if (!allFormAreValid) {
      //   return;
      // }
      let allFormAreValid = this.validateNewDriverData();
      if (!allFormAreValid) {
        console.log("FORM IS INVALID");
        return;
      } else {
        console.log("FORM IS VALID");
      }

      this.loading = true;
      this.error = null;
      if (localStorage.getItem("token")) {
        this.final_uuid = this.userData;
        console.log("this.final_uuid login after", this.final_uuid);
      } else {
        this.final_uuid = this.uuid;
        console.log("this.final_uuid no login after", this.final_uuid);
      } 
      try {
        let data = await API.post("company/save", {
          key: "drivers",
          val: {
            ...this.formData,
            
          drivers:this.driversData.map(d => {
            let driver = { ...d };
            delete driver._uuid;
            return driver;
          }),
          },
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
              this.final_uuid +
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
select {
  position: relative;
  -webkit-appearance: none;
  background: url("../assets/images/arrow-dropdown.png") no-repeat 96% center;
  -moz-appearance: none;
}
</style>

