<template>
  <div class="account-info-questions-form container-fluid mob-2">
            

    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Additional Comments</h4>

             <div class="m-1 pb-2">
         <span>If you have any additional comments or concerns regarding your quotation, please list them here. 
</span>
         </div>

          <div>
            <textarea v-model="formData.comments" class="answer"></textarea>
          </div>

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
                <font-awesome-icon class="fontawesome ctrl-arrow-left" :icon="['fas', 'sort-down']" size="2x"/>
                <span class="ctrl-label">Previous</span>
                <div class="prev-title">Owners</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main btn-block btn-border-radius-rb"
              >
                 <span class="ctrl-label ml-3 text-white">{{ loading ? 'Loading...' : 'Next' }}</span>
                <div class="prev-title next-title">Document Upload</div>
                <font-awesome-icon class="fontawesome ctrl-arrow-right" :icon="['fas', 'sort-down']" size="2x"/>
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
import { required } from "../validators.js";
import { API } from "../api.js";
import ModalLogin from "./ModalLogin.vue";
import { mapState } from "vuex";
import axios from "axios";
import { setTimeout } from 'timers';

export default {
  name: "AccountInfoQuestions",
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
    modelLogin: ModalLogin,

  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.save = false;
      
    } else {
      this.save = true;
    } 
     
  },
  computed: {
    ...mapState(["data"])
  },

  data() {
    return {
      showmodel: false,
      save: true,
      final_uuid:"",
      userData:"",
      formData: {
        comments: ""
        // question2: ""
      },
      rules: {
        comments: [required]
        // question2: [required]
      },
      loading: false,
      error: null
    };
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
    newQuoteReq() {
      swal({
        title: "Are you sure?",
        text: "Do you want to continue editing?",
        icon: "warning",
        buttons: ["No", "Yes"]
      }).then(willDelete => {
       
        this.show();
        if (willDelete) {
          
          this.$router.push({ name: "AccountInfoQuestions" });
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
      this.loading = true;
      this.error = null;
      var temp_uuid;
       if (localStorage.getItem("token")) {
        temp_uuid = this.userData;
       
      } else {
        temp_uuid = this.uuid;
       
      }
      
      try {
        let data = await API.post("company/save", {
          key: "questions",
          val: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: temp_uuid
        });

        if (data.status === "OK") {
          if(!localStorage.getItem("token")){
              if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
          }
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

        if (res.status === "OK") {
          let { company } = res.data;
          this.uuid = res.data.uuid;
          if (company) {
            this.formData.comments = company.comments;
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
      this.loading = true;
      this.error = null;
      this.final_uuid = this.uuid;
      try {
        const { comments } = this.formData;
        const data = {
          comments,
          user_id: localStorage.getItem("userId"),
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

<style lang="scss" scoped>
.account-info-questions-form {
  .answer {
    border: 1px solid #b3aaaa;
    width: 100%;
    height: 80px;
    border-radius: 10px;
    margin-top: 10px;
  }
}
</style>
