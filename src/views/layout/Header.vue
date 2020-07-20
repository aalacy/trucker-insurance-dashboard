<template>
  <nav class="app-navbar navbar navbar-expand-lg navbar-light bg-white p-0">
    <router-link v-if="home" :to="{ name: 'Home' }" class="navbar-brand"> 
      <div v-if="mobile" class="nav_logo_text">LT</div> 
      <img class="ml-4" v-else src="../../assets/images/logo.svg" alt="logo" height="46px" width="269px">
    </router-link>
    <a v-else class="nav-link">
      <a class="d-none d-lg-block px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
        <font-awesome-icon class="fontawesome" size="lg" icon="bars" />
      </a>
      <a class="d-lg-none" href="#" @click="switchSidebarMethod">
        <font-awesome-icon class="fontawesome" icon="bars" size="lg"/>
      </a>
    </a>
    <span class="text-right-a m-auto">For assistance, please call us at <a href="tel:15135062400 " style="color:#007bff; font-weight:bold; white-space:nowrap;">1-513-506-2400</a></span>

    <div class="d-flex align-items-center justify-content-end ml-auto" >
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!loggedIn">
            <router-link
              :to="{ name: 'LogIn', query: query() }"
              v-bind:class="linkBtn"
              active-class="font-weight-bold"
            >Login</router-link> <span class="sr-only">(Click to Login)</span>
          </li>
          <li>
            <b-dropdown v-if="loggedIn" variant="primary" class="mr-2" :size="profileSize" right>
              <template v-slot:button-content>
                <b-icon icon="person-circle" style="fill: white;"></b-icon>
              </template>
              <b-dropdown-item-button
              >
                <router-link
                  :to="{ name: 'AccountInfo' }"
                  active-class="font-weight-bold"
                >View Quotes</router-link>
              </b-dropdown-item-button>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button>
                <router-link
                  :to="{ name: 'QuotesAllQuotes' }"
                  active-class="font-weight-bold"
                >My Dashboard</router-link>
              </b-dropdown-item-button>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button>
                <router-link
                  :to="{ name: 'ContactUs'}"
                  active-class="font-weight-bold"
                >Contact Us</router-link>
              </b-dropdown-item-button>
              <!-- <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button>
                <a
                  target="_blank"
                  href="https://blog.luckytruck.co"
                >My Blog</a>
              </b-dropdown-item-button> -->
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button>
                <router-link
                  :to="{ name:'' }"
                  @click.native="logout"
                >Logout</router-link> <span class="sr-only">(Click to Logout)</span>
              </b-dropdown-item-button>
            </b-dropdown>
          </li>
          <li class="nav-item">
            <a
              href='https://blog.luckytruck.co'
              target="_blank"
              class="btn btn-primary"
            >Blog</a> <span class="sr-only">(Click to Blog)</span>
          </li>
        </ul>
      </div>
  </nav>
</template>

<script>
  import { mapState, mutations, mapActions } from "vuex";
  import { API } from "../../api.js";

  export default {
    name: 'Header',

    props: {
      home: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        localtoken: false,
        mobile: false,
      };
    },

    mounted () {
      this.msg = this.mobile = window.innerWidth <= 768 ? true : false;

      this.checkAuth()

      const submitted = localStorage.getItem('submitted')
      this.updateSubmittedStatus(submitted)
    },

    computed: {
      ...mapState('layout', {
        'sidebarClose': state => state.sidebarClose,
        'sidebarStatic': state => state.sidebarStatic
      }),

      ...mapState('auth', {
        'loggedIn': state => state.loggedIn
      }),

      quotes () {
        const curPath = this.$router.history.current.path
        if (!curPath.includes('/account-info/')) {
          return true
        } else {
          return false
        }
      },

      linkBtn () {
       let className = 'btn btn-primary btn-sm lt-btn'
       // if (this.mobile) {
       //  className += ' btn-sm'
       // }
       return className
      },

      profileSize () {
        if (this.mobile) {
          return 'sm'
        }
        return ''
      },
    },

    updated() {
      if (localStorage.getItem("token"))
      {
        this.quote = false;
        this.myacchide = true;
      }
      else {
        this.quote =true;
        this.myacchide = false;
      }
    },

    methods: {
      ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),

      ...mapActions('auth', ['setLoggedIn', 'updateSubmittedStatus']),

      checkAuth () {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        
        if (token && userId) {
          return this.setLoggedIn(true)
        } else {
          return this.setLoggedIn(false)
        }
      },

      switchSidebarMethod() {
        if (!this.sidebarClose) {
          this.switchSidebar(true);
          this.changeSidebarActive(null);
        } else {
          this.switchSidebar(false);
          this.changeSidebarActive(this.$router.history.current.name);
        }
      },
      toggleSidebarMethod() {
        if (this.sidebarStatic) {
          this.toggleSidebar();
          this.changeSidebarActive(null);
        } else {
          this.toggleSidebar();
          this.changeSidebarActive(this.$router.history.current.name);
        }
      },
      query () {
        return {
          next: this.$router.history.current.name == 'LogIn' || this.$router.history.current.name == 'SignUp' ? this.$router.history.current.query.next : this.$router.history.current.name,
          sf: this.$router.history.current.query.sf
        }
      },

      loginHide() {
        this.show=false;
      },
      myacc(){
        this.myacchide = false;
        this.show = true;
        this.$router.push({name:'QuotesAllQuotes'})
      },

      clearLocalStorage () {
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
        localStorage.removeItem("uuid")
        localStorage.removeItem("usdot")
        localStorage.removeItem("accountInfoProgress")
        localStorage.removeItem("submitted")
        localStorage.removeItem('imageVIN')
        localStorage.removeItem('imageDOT')
        localStorage.removeItem('imageDL')
      },

      async logout(){
        this.loading = true;
        this.error = null;
        try {
          if (window.FB) {
            window.FB.logout();
            this.clearLocalStorage()
          }
       
          let data = await API.post("users/logout");
          localStorage.removeItem("token");
          if (data.status === "ok") {
            this.setLoggedIn(false)
            this.quote = false;
            this.show=false;
            this.clearLocalStorage()
            setTimeout(()=>{
              this.myacchide = false;
              if (this.$router.history.current.name !== 'Home') {
                this.$router.push({ name: "Home" });
              }
            }, 500)
              
          }
        } catch (err) {
          console.error("catch", err);
          this.error = err.message;
        } 
      },
    },
  }
</script>

<style scoped>
  .fontawesome path {
    fill: #495057;
  }

  .nav_logo_text {
    font-family: "proxima_novabold";
    font-weight: bolder;
    font-size: 32px;
    color: #5e98f9;
    margin-left: 1rem;
  }

</style>