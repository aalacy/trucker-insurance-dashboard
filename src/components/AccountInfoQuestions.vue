<template>
  <div class="account-info-questions-form container-fluid mob-2">
    <form @submit.prevent="updateCompany">
      <div class="card mb-5">
        <div class="card-body">
          <h4 class="card-title form-sub-title">Additional Underwriting Questions</h4>

          <div v-for="{ text, key, required } in questions" :key="key" class="mb-2">
            <div>{{ text }}</div>

            <div>
              <textarea v-model="formData[key]" class="answer" :required="required"></textarea>
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
import {mapState} from "vuex";
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
    modelLogin: ModalLogin
  },
 mounted(){
    if(localStorage.getItem("token")){
      this.$store.dispatch('loadData',localStorage.getItem("uuid"))
     let a = this.$store.state.getData.data[9]
     let b = JSON.parse(a.val)
     this.formData.question1 = b.question1;
     this.formData.question2 = b.question2;
     console.log("b",b)
     this.save = false
   }else{
     this.save = true
   }
 },
 computed:{
...mapState([
    'data'
  ])
} ,

  data() {
    return {
      showmodel: false,
      save:true,
      questions: [
        { key: "question1", text: "Question 1", required: true },
        { key: "question2", text: "Question 2", required: true }
      ],
      formData: {
        question1: "",
        question2: ""
      },
      rules: {
        question1: [required],
        question2: [required]
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
    async show() {
      this.loading = true;
      this.error = null;

      try {
        let data = await API.post("company/save", {
          key: "questions",
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });

        if (data.status === "OK") {
          if (this.showmodel) {
            this.showmodel = false;
          } else {
            this.showmodel = true;
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

      try {
        let data = await API.post("company/save", {
          key: "questions",
          val: this.formData,
          userId:localStorage.getItem("userId"),
          uuid:localStorage.getItem("uuid")
        });

        if (data.status === "OK") {
          this.goNextForm();
        } else if (data.status === "ERROR") {
          this.error = data.messages[0] || data.data;
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
