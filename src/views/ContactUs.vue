<template>
  <div class="log-in-view d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <form class="login-form login-new" @submit.prevent="send" ref="formContainer">
            <div class="form-title">
              <div class="title log-in-text">Contact Us</div>
              <div class="form-group">
                <router-link
                  :to="{ name: 'Home' }"
                  tag="button"
                  type="button"
                  class="lt-button lt-button-close"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                class="lt-input lt-input-border"
                placeholder=""
                required
              >
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                v-model="formData.message"
                placeholder="Write a message"
                class="lt-input lt-input-border lt-textarea"
                rows="3"
                max-rows="6"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="attachments">Attachments</label>
              <vueFileAgent
                ref="vueFileAgent"
                :theme="'list'"
                :multiple="true"
                :deletable="true"
                :meta="true"
                :accept="'.pdf,.doc,.docx'"
                :maxSize="'10MB'"
                :maxFiles="5"
                :helpText="'Choose pdf or doc files'"
                :errorText="{
                  type: 'Invalid file type. Only pdf or doc Allowed',
                  size: 'Files should not exceed 10MB in size',
                }"
                @select="filesSelected($event)"
                @delete="fileDeleted($event)"
                v-model="fileRecords"
              ></VueFileAgent>
            </div>
            <div class="text-center mt-4">
              <button
                :disabled="loading"
                type="submit"
                class="lt-button lt-button-main go-button"
              >SEND</button>
            </div>
          </form>
    	</div>
      </div>
	</div>
  </div>
</template>
<script>
  import axios from "axios";
  import { API } from "../api.js";

	export default {
		name: 'ContactUs',

		data: () => ({
      loading: false,
      error: "",
      formErrors: {},
      formData: {
        subject: "",
        message: "",
        files: []
      },
      fileRecords: [],
      uploadUrl: `${process.env.VUE_APP_BACKEND_URL}/users/upload`,
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      fileRecordsForUpload: [],
      formErrors: {},
		}),

		methods: {
      async send () {
        try {
          const res = await this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
          const keys = []
          res.forEach(item => {
            keys.push(item.data.my_key)
          })
          const data = {
            subject: this.formData.subject,
            message: this.formData.message,
            attachments: keys.join(';')
          }
          res = await API.post('users/contactus', { contact: data })
          if (res.status == 'Ok') {
            this.$swal( "", "Thank you for contacting us. We will get back to you within 12-24 hours.", "success")
          }
        } catch (e) {
          console.log(e)
        }
        this.fileRecordsForUpload = [];
      },

      deleteUploadedFile: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
        console.log('deleteUploadedFile')
      },
      filesSelected: function (fileRecordsNewlySelected) {
        var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      },
      fileDeleted: function (fileRecord) {
        console.log('fileDeleted')
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          // this.deleteUploadedFile(fileRecord);
        }
      },
		},
	}
</script>

<style lang="scss" scoped>
  .log-in-view {
    @include begin-page;
    background: url("../assets/images/bg_home.png") center center no-repeat
      transparent;
    background-size: cover;

    .login-form {
      @include begin-form;

      .go-button {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
  }
</style>


<style lang="scss" scoped>
  .image-upload > input {
    display: none;
  }
  .image-upload {
    display: flex;

    img {
      width: 50px;
      background-color: #c5c1c1;
      padding: 10px;
      border-radius: 6px;
    }

    label {
      text-align: center
    }
  }

  .preview-image {
    color: #5e98f9;
    font-size:13px;
    align-items: baseline;
    word-break: break-all;
    margin: 0px;
    padding: 0px;
    padding-left: 20px; 
    padding-right: 15px;

    &.has-error {
      color: red;
    }
  }
</style>