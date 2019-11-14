<template>
  <div class="account-info-questions-form container-fluid mob-2">
            

    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Additional Comments</h4>

          <div v-for="{ text, key } in questions" :key="key" class="mb-2">
            <div>{{ text }}</div>
               <div class="m-1 pb-2">
           <span>If you have any additional comments or concerns regarding your quotation, please list them here. 
</span>
           </div>

            <div>
              <textarea v-model="formData[key]" class="answer"></textarea>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
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
                <div class="next-title text-center d-inline pl-3 mob-2">Owners</div>
              </button>
            </div>

            <div class="col-6 p-0">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main px-4 mob-2 btn-block btn-border-radius-rb"
              >
                {{ loading ? 'Loading...' : 'Next' }}
                <div class="next-title text-center d-inline pl-3 mob-2 text-white">Document Upload</div>
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
      axios
      .get(
        "http://3.13.68.92/luckytrucker_admin/api/CompanyController/getuuidbyuserid?user_id=" +
          localStorage.getItem("userId")
      )
      .then(coins => {
        this.userData = coins.data.uuid;
      });
      setTimeout(()=>{
 this.$store
        .dispatch("loadData", this.userData)
        .then(() => {
          let len = this.$store.state.getData.data;
          for(let i=0;i<=len.length;i++){
            if(this.$store.state.getData.data[i].key=="questions"){
          let a = this.$store.state.getData.data[i];
          let b = JSON.parse(a.val);
                   

          this.formData.question1 = b.question1;
            }
          }
          
          //  this.formData.question2 = b.question2;
        });
      },1000)
  
     
    } else {
      this.save = true;
      setTimeout(()=>{
         this.$store
        .dispatch("loadData",this.uuid)
        .then(() => {
          let len = this.$store.state.getData.data;
          for(let i=0;i<=len.length;i++){
            if(this.$store.state.getData.data[i].key=="questions"){
          let a = this.$store.state.getData.data[i];
          let b = JSON.parse(a.val);
                   

          this.formData.question1 = b.question1;
            }
          }
          
          //  this.formData.question2 = b.question2;
        });
    
      },1000)
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
      questions: [
        { key: "question1", text: "", required: true }
        // { key: "question2", text: "Question 2", required: true }
      ],
      formData: {
        question1: ""
        // question2: ""
      },
      rules: {
        question1: [required]
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

      try {
        let data = await API.get("company/current");

        if (data.status === "OK") {
          let { questions } = data.data;
          this.uuid = data.data.b;
          if (questions) {
            this.formData = {
              ...this.formData,
              ...questions
            };
          }
        } else if (data.status === "ERROR") {
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
          if(localStorage.getItem('token')){
        
          this.final_uuid = this.userData;
         
      }else{
        this.final_uuid = this.uuid;
       
      }
      try {
        let data = await API.post("company/save", {
          key: "questions",
          val: this.formData,
          user_id: localStorage.getItem("userId"),
          uuid: this.final_uuid,
        });

        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
        }
             axios.post(
          "http://3.13.68.92/luckytrucker_admin/api/CompanyController/postUserIdByUuid?uuid="+ this.final_uuid+"&user_id="+localStorage.getItem("userId")
        )
        .then(res => {
         
        })
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
