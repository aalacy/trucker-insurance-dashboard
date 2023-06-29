<template>
  <div>
      <div class="home-view d-flex align-items-center">
        <div class="container">
          <div class="card min-350">
            <div class="card-body">
              <div class="title-block">
                <h4 class="card-title form-sub-title mb-0">{{ titles[step] }} <span class="h5"><b-badge pill v-if="status" :variant="status">{{ badge }}</b-badge></span></h4>
              <BaseTimer @move-next="moveNext" />
          </div>
              <div class="h2 control-block">
                <!-- Clear the timer to restart the OCR -->
              <b-button :disabled="!loading" variant="primary" @click="clearTimer" size="sm" class="mb-2 mr-1">
                  <span class="text-white">Refresh&nbsp;<b-icon  icon="arrow-repeat" variant="primary"></b-icon></span>
              </b-button>

              <!-- Skip DOT OCR and move to the next step (VIN OCR) -->
              <b-button variant="primary" @click="back" size="sm" class="mb-2 mr-1">
                <span class="text-white">Back&nbsp;<b-icon  icon="skip-backward" variant="primary"></b-icon></span>
              </b-button>
                <!-- Upload picture with DOT number -->
              <b-button :disabled="loading || !formData[step]"  variant="primary" @click="uploadFile" size="sm" class="mb-2 mr-1">
                <b-spinner variant="light" v-if="loading" small></b-spinner>
                <span v-if="loading" class="sr-only">Loading...</span>
                  <span class="text-white" v-else>Scan&nbsp;<b-icon  icon="upc-scan" variant="primary"></b-icon></span>
              </b-button>
              <b-button variant="primary" @click="skip" size="sm" class="mb-2">
                <span class="text-white">Skip&nbsp;<b-icon  icon="skip-forward" variant="primary"></b-icon></span>
              </b-button>
            </div>
            <div class="form-group">
                    <label
                      :disabled="loading"
                      :class="{ 'has-error': formErrors[step] }"
                      for="imageDOT"
                      class="lt-input"
                    >{{ btnLabels[step] }}</label>

                    <input
                      id="imageDOT"
                      :disabled="loading"
                      :class="{ 'has-error': formErrors[step] }"
                      type="file"
                      class="lt-input"
                      accept="image/*;capture=camera"
                      hidden
                      @change="setImage($event, step)"
                    >

                    <div v-if="formErrors[step]" class="text-danger">{{ formErrors[step] }}</div>

                    <div class="data-success" v-if="status == 'success'">{{ value }}</div>
                    <div class="data-danger" v-if="status == 'danger'">{{ message }}</div>

                    <div v-if="preview[step]" class="preview">
                      <img id="image" :src="preview[step]" alt class="preview-image">
                    </div>
                  </div>
            </div>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import { BIcon } from 'bootstrap-vue'
import { mapState, mapActions } from "vuex";
import { API } from "../../api.js";
import axios from "axios";
import BaseTimer from "../../components/Timer";
import  { BrowserPDF417Reader } from'@zxing/library';

  export default {
    name: 'DOTView',

    data () {
      return {
        default: {
          imageDOT: null,
              imageDL: null,
              imageVIN: null
        },
        formData: {
              imageDOT: null,
              imageDL: null,
              imageVIN: null
            },
            formErrors: {},
            preview: {
              imageDOT: null,
              imageDL: null,
              imageVIN: null
            },
            loading: false,
            error: null,
            btnLabels: {
              imageDOT: 'Select a DOT Image',
              imageDL: 'Select a DL Image',
              imageVIN: 'Select a VIN Image'
            }, 
            titles: {
          imageDOT: 'DOT Scanner',
              imageDL: 'DL Scanner',
              imageVIN: 'VIN Scanner'
            },
            status: '',
            value: '2334455',
            message: 'Sorry, A dot number not found. Please try with different image.',
            codeReader: new BrowserPDF417Reader(),
      }
    },

    components: {
        BaseTimer
      },

      computed: {
        ...mapState('ocr', ['step', 'trigger', 'cancel']),

        badge () {
          let badgeString = ''
          if (this.status == 'success') {
            badgeString = 'Success'
          } else if (this.status == 'danger') {
            badgeString = 'Failed'
          }

          return badgeString
        }
    },

    watch: {
      step() {
        this.initialize()
      }
    },

      methods: {
        ...mapActions('ocr', ['setStep', 'setTrigger', 'setCancel']),
        moveNext () {
          this.status = 'danger'
          this.message = 'Timed out. Please try it later.'
          this.setCancel(!this.cancel)
          const self = this
          setTimeout(function () {
            self.skip()
          }, 4000);
        },

        initialize () {
          this.status = ''
          this.clearTimer()
          Object.assign(this.formData, this.default)
          Object.assign(this.formErrors, this.default)
          Object.assign(this.preview, this.default)
        },

        async uploadFile () {
          this.setTrigger(!this.trigger)
          this.loading = true
          this.status = ''

          try {
              let data = undefined
              if (this.step == 'imageDL') {
                data = await API.post('ocr/upload/dl', this.formData)
              } else {
                data = await API.formData("ocr/upload", this.formData)
              }
                this.status = data.status
              if (data && data.status === "success") {
                if (this.step == 'imageDL') {
                  this.value = 'Ok'
                } else {
                    this.value = data.value
                }
                localStorage.setItem(this.step, data.value)
                console.log(data.value)
                const self = this
                setTimeout(function () {
              self.skip()
            }, 4000);
              } else if (data && data.status === "danger") {
                this.message = data.message
                console.log(data.message)
              }
            } catch (err) {
              console.error(err);
              this.error = err.message;
            } finally {
              this.loading = false;
            }
            this.clearTimer()
        },
        clearTimer () {
          this.loading = false
          this.setCancel(!this.cancel)
        },

        setImage(event, fieldName) {
          this.status = ''
      
          let { files } = event.target;

          let image = files[0] || null;

          this.formData[fieldName] = image;
        
          this.previewFile(image, fieldName);
        },

        previewFile(file, fieldName) {
          let reader = new FileReader();
          reader.onload = () => {
            this.preview[fieldName] = reader.result;
            setTimeout(() => this.scanDL(), 500)
          };
      
          if (file && !this.fnCall) {
            //
            reader.readAsDataURL(file);
          } else {
            this.preview[fieldName] = null;
          }

          if(file && this.fnCall){
            this.preview[fieldName] = file;
          } else {
            this.preview[fieldName] = null;
          }
        },

        // run only if the DL scanning step
        scanDL() {
          if (this.step == 'imageDL') {
            this.codeReader
                    .decodeFromImage('image')
                    .then(result => this.formData['imageDL'] = result.text)
                    .catch(error => console.log(error));
          }
        },

        back () {
          if (this.step == 'imageDOT') {
            this.$router.push({ name: 'Home' })
          } else if (this.step == 'imageVIN') {
            this.setStep('imageDOT')
          } else if (this.step == 'imageDL') {
            this.setStep('imageVIN')
          }
        },

        skip () {
          if (this.step == 'imageDOT') {
            this.setStep('imageVIN')
          } else if (this.step == 'imageVIN') {
            this.setStep('imageDL')
          } else if (this.step == 'imageDL') {
            this.setStep('imageDOT')
            this.$router.push({ name: 'Home' })
          }
        }
      }
  }
</script>

<style lang="scss" scoped>
  .home-view {
    @include begin-page;
    background: url("../../assets/images/bg_home.png") center center no-repeat
      transparent;
    background-size: cover;

    .min-350 {
      min-height: 380px;
    }

    .title-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .control-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        svg {
          fill: white;
        }
      }
    }

    .preview {
      border-radius: 4px;
    margin-top: 10px;

      img {
        border-radius: 4px;
      }
    }

    .data-success {
      font-size: 23px;
        letter-spacing: 4px;
      text-align: center;
      font-weight: bold;
      margin: 5px 0;
      color: #28a745;
    }

    .data-danger {
      font-size: 18px;
        letter-spacing: 1px;
      text-align: center;
      font-weight: bold;
      margin: 5px 0;
      color: #dc3545;
    }
  }
</style>