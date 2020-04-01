<template>
  <div class="thank-you-form container-fluid mob-2">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Thank You!</h4>

        <p
          class="font-weight-bold"
        >After we process your information, we should be able to get you the first few quotes within 24 hours but some of them may take some time, due to the insurance company being used. A representative will call you to discuss options as soon as they are able.</p>
      </div>

      <div class="card-footer">
        <form @submit.prevent="download">
          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

          <button
            :disabled="loading"
            type="submit"
            class="btn btn-primary btn-block"
          >{{ loading ? 'Loading...' : 'Download PDF' }}</button>
        </form>
      </div>
    </div>
    <!-- </div> -->
    <div v-if="showmodel">
      <div id="modal-template ">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper col-12 col-sm-10 col-md-8 col-lg-5">
              <div class="modal-container bor-rad">
                <form class="login-form" @submit.prevent>
                  <div class="form-title">
                    <div class="title log-in-text">Register</div>
                    <div class="form-group cross-arrow-relative">
                      <button type="button" class="btn ico-btna btn-reset" @click="dosomething">
                        <font-awesome-icon icon="times" size="2x" class="d-flex ml-5 cross-arrow"/>
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      v-model="email"
                      type="email"
                      class="lt-input lt-input-border"
                      placeholder="Email Address"
                    >
                  </div>

                  <div class="d-flex align-items-center">
                    <div class="text-right flex-grow-1">
                      <button
                        type="submit"
                        @click="getRegister"
                        class="lt-button lt-button-main go-button"
                      >Done</button>
                    </div>
                  </div>
                  <div class="pt-4 save-hover">
                <router-link :to="{ name: 'LogIn' }">
                    <span>Already registered? Login</span>
              </router-link>
               </div>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../api.js";
import axios from "axios";
import { setTimeout } from 'timers';
export default {
  name: "AccountInfoThankYou",
  props: {
    progress: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      apires: "",
      loading: false,
      error: null,
      uuid: "",
      email: "",
      showmodel: false
    };
  },
  created() {
    this.$emit("update-progress", this.progress);
    // this.loadCompany();
  },

  methods: {
    async getRegister() {
      let data = await API.post("company/pdf",{email:this.email,uuid:this.uuid});
    },
    dosomething() {
      if (this.showmodel) {
        this.showmodel = false;
      } else {
        this.showmodel = true;
      }
    },

    download() {
      if (this.progress >= 10) {
        window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf?uuid=` + this.uuid);
      } else {
        swal("Sorry", "You need to complete 10 steps process first", {
          icon: "warning"
        });
      }
    }
  },

  mounted () {
    const self = this
    setTimeout(function(){ 
      self.$router.push({ name: 'QuotesAllQuotes' });
    }, 3000)
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.cross-arrow {
  text-align: right;
  position: absolute;
  /* z-index: 333px; */
  /* left: 0px; */
  right: 0;
  top: -33px;
}
.cross-arrow-relative {
  position: relative;
}
.modal-container {
  width: 360px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 30px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}
.log-in-text {
  font-size: 1.2rem;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
