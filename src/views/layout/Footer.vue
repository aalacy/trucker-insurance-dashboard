<template>
 	<footer class="app-footer lt-fixed px-4 flex-column">
      <div class="d-flex flex-row width-100">
        <form class="form-footer">
          <div class="form-group row d-flex flex-column align-items-center">
            
            <h3 class="col-sm-12 col-lg-8 col-md-12 col-12 text-center text-white font-weight-bold mb-4">Subscribe to the Newsletter:</h3>
            <b-input-group class="col-lg-12 col-xs-12 p-xs-0 justify-content-center">
              <b-form-input id="inputEmail" type="email" autocomplete="off" class="news-input" placeholder="Enter Email Address"></b-form-input>
              <b-input-group-append>
                <b-button type="submit" variant="primary btn-news">
                  Subscribe
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </form>
      </div>
      <div class="container">
        <div class="flex-mob bottom-section mb-2">
          <div class="footer-contacts text-center">
            <div class="row">
              <div class="col-12 col-md-4 mb-3">
                <img
                  src="../../assets/images/loading/loading_truck_128.gif"
                  class="d-block mx-auto rounded mb-3"
                  alt="Loading"
                  style="width: 100px; height: auto"
                >
                <div class="footer-social-networks">
                  <a href="https://twitter.com/LuckyTruck3" target="_blank">
                    <font-awesome-icon class="fontawesome" :icon="['fab', 'twitter']" />
                  </a>
                  <a href="https://www.linkedin.com/company/luckytruck" target="_blank">
                   <font-awesome-icon class="fontawesome" :icon="['fab', 'linkedin-in']"  />
                  </a>
                  <a href="https://www.facebook.com/LuckyTruck-104402324469770/" target="_blank">
                    <font-awesome-icon class="fontawesome" :icon="['fab', 'facebook-f']"  />
                  </a>
                </div>
              </div>
              <div class="col-12 col-md-4 general-info mb-1">
                <ul>
                  <li>
                      <a href="mailto:support@luckytruck.co">support@luckytruck.co</a>
                  </li>
                  <li>
                      <a href="tel:15135062400">1 - 513 - 506 - 2400</a>
                  </li>
                  <li>
                    8am - 8pm ET
                  </li>
                  <li>
                    LuckyTruck, Inc.
                  </li>
                </ul>
              </div>
              <div class="col-12 col-md-4 auth-links mb-3">
                <div class="lists">
                    <router-link
                      @click.native="loginHide"
                      :to="{ name: 'LogIn', query }"
                      class="text-white"
                      active-class="font-weight-bold"
                    >Login</router-link>
                    <router-link
                      @click.native="loginHide"
                      :to="{ name: 'SignUp', query }"
                      class="text-white"
                    >Signup</router-link>
                    <a
                      href='https://blog.luckytruck.co'
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-white"
                    >Blog</a>
                    <a
                      class="text-white"
                      href="https://luckytruck.co/backend/PRIVACY_POLICY_FOR_LuckyTruck.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >PRIVACY POLICY</a>
                    <a
                      class="text-white"
                      href="https://luckytruck.co/backend/TERMS_OF_SERVICE_FOR_LuckyTruck.co.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >TERMS OF USE</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-company mb-3">
        <div class="px-3 py-1">National Producer Number: 18975319</div>
        <div class="px-3 py-1">&copy;2020 LuckyTruck, Inc.</div>
      </div>
      <a class="footer-bbb" href="https://www.bbb.org/us/oh/cincinnati/profile/trucking/luckytruck-0292-90026519/#sealclick" target="_blank" rel="nofollow"><img src="https://seal-cincinnati.bbb.org/seals/gray-seal-200-42-whitetxt-bbb-90026519.png" style="border: 0;" alt="LuckyTruck BBB Business Review" /></a>
    </footer>
</template>

<script>
	export default {
		name: 'Footer',

    methods: {
      query () {
        return {
          next: this.$router.history.current.name == 'LogIn' || this.$router.history.current.name == 'SignUp' ? this.$router.history.current.query.next : this.$router.history.current.name,
          sf: this.$router.history.current.query.sf
        }
      },
    }
	}
</script>

<style lang="scss">
  footer {
    position: relative;
    .news-input {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      max-width: 500px;
    }

    .btn-news {
      border-bottom-right-radius: 20px; 
      border-top-right-radius: 20px; 
    }
  }

  .footer-bbb {
    position: absolute;
    bottom: 25px;
    left: 20px;
  }

  .lists a {
    display: block;
    padding: .5rem 0;
  }

  .footer-social-networks {
    display: flex;
    justify-content: space-around;
    font-size: 1.15rem;
    max-width: 180px;
    margin: 0 auto;

    a svg path {
      fill: #e1e1e1;
    }
  }

  .bottom-company {
    text-align: center;
  }

  @media only screen and (max-width: 425px) {
    .footer-bbb {
      margin-top: 20px;
      position: relative;
      display: flex;
      justify-content: center;
    }

    .auth-links {
      order: 1;
    }

    .general-info {
      order: 3;
    }
  }
</style>