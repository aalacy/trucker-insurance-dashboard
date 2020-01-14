<template>
  <div class="thank-you-form container-fluid mob-2">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title form-sub-title">Thank You!</h4>

        <p
          class="font-weight-bold"
        >A rep will call you within 24 hrs to discuss. You will receive your first few quotes within 24 hrs, some insurance companies take longer than others, we will make sure to present quotes to you as they come in.</p>
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
    this.loadCompany();
  },

  methods: {
    async getRegister() {
      // window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf`);
      
      
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
        window.open(`${process.env.VUE_APP_BACKEND_URL}/company/pdf`);
      } else {
        swal("Sorry", "You need to complete 10 steps process first", {
          icon: "warning"
        });
      }
    },
    async loadCompany() {
      this.loading = true;
      this.error = null;

      try {
        let res = await API.get("company/current");
        this.loading = false;
        this.uuid = res.data.uuid;
        if (res.status === "ERROR") {
          // this.$router.replace({ name: 'Home' });
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
