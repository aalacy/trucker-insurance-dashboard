<template>
<div :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard']">
  <div class="wrap">
  	<Sidebar 
		:items="items"
  	/>
    <Header />
    <span v-touch:swipe="handleSwipe" class="app-main">
      	<transition name="router-animation">
      		<div>
	       		<div class="main-wrapper">
	   			 	<div class="row w-100 forms p-4">
				        <div class="col-xs-12 col-sm-12 col-lg-8   col-md-12">
				          <router-view
			             	@update-progress="updateProgress"
				            @update-hint="updateHint"
				            @go-to-form="goToForm"
				          />
				        </div>

				        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 hint-wrapper">
				          <form-hint v-show="hint" :hint="hint" />
				        </div>
			      	</div>
	       		</div>	
	       	</div>
	    </transition>
      <Footer />
    </span>
  </div>
</div>
</template>

<script>
	import { mapState, mutations, mapActions } from "vuex";

	export default {
		name: 'Layout',

		data() {
		    return {
		      hint: '',
		      items: [
		        {
		          header: "Account Info",
		          link: { name: "QuotesAccountInfo" },
		          icon: '/img/sidebar/account-info.png'
		        },
		        {
		          header: "Quotes",
		          link: { name: "Quotes" },
		          icon: '/img/sidebar/quotes.png',
		          subItems: [
		            { 
	            	header: "See All Quotes", 
		              link: { name: "QuotesAllQuotes" }
		            },
		            {
		              header: "Request New Quote",
		              link: { name: "QuotesRequestNewQuote" }
		            }
		          ]
		        },
		        {
		          header: "Policies",
		          link: { name: "Policies" },
		          icon: '/img/sidebar/policies.png',
		          subItems: [
		            { header: "Review Policies", link: { name: "PoliciesReview" } },
		            { header: "+ / - Drivers", link: { name: "PoliciesDrivers" }  },
		            {
		              header: "Vehicles & Trailers",
		              link: { name: "PoliciesVehiclesAndTrailers" }, 
		              icon: '' 
		            },
		            { header: "Other Coverages", link: { name: "PoliciesOtherCoverages" }  }
		          ]
		        },
		        {
		          header: "Certificates",
		          link: { name: "Certificates" },
		          icon: '/img/sidebar/certificates.png',
		          subItems: [
		            { header: "Past Certificates", link: { name: "CertificatesPast" } },
		            {
		              header: "Request New Certificate",
		              link: { name: "CertificatesRequestNewCertificate" }
		            }
		          ]
		        },
		        {
		          header: "Billing",
		          link: { name: "Billing" },
		          icon: '/img/sidebar/billing.png',
		          subItems: [
		            {
		              header: "Payment Information",
		              link: { name: "BillingPaymentInformation" }
		            },
		            {
		              header: "Payment Schedule",
		              link: { name: "BillingPaymentSchedule" }
		            },
		            { header: "Payment History", link: { name: "BillingPaymentHistory" } },
		            { header: "Make a Payment", link: { name: "BillingMakePayment" } }
		          ]
		        },
		        {
		          header: "Resources",
		          link: { name: "Resourses" },
		          icon: '/img/sidebar/resources.png',
		          subItems: [
		            { header: "ELD Providers", link: { name: "ResoursesEldProviders" } },
		            {
		              header: "Risk Management",
		              link: { name: "ResoursesRiskManagement" }
		            },
		            {
		              header: "Buy a New Truck/Trailer",
		              link: { name: "ResoursesBuyNewTruckTrailer" }
		            },
		            { header: "Find a Driver", link: { name: "ResoursesFindDriver" } },
		            { header: "Freight Board", link: { name: "ResoursesFreightBoard" } },
		            { header: "Digital Accountant", link: { name: "ResoursesDigitalAccountant" }}
		          ]
		        }
		      ]
		  	}
		},

		components: { 
	      Header: () => import('./Header'),
	      Footer: () => import('./Footer'),
	      Sidebar: () => import('./Sidebar/Sidebar'),
	      FormHint: () => import('../../components/FormHint.vue'),
	    },

		methods: {
			...mapActions('layout', ['setSidebarStatic', 'switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar'],
			),

			updateProgress(progress) {
		      this.progress = progress;
		      localStorage.setItem('accountInfoProgress', progress);
		    },

		     updateHint(hint = '') {
		      this.hint = hint;
		    },
		    goToForm(routeName) {
		      this.$router.push({ name: routeName });
		      window.scrollTo(0, 0);
		    },
		    updateUSDot(value) {
		      this.US_DOT_or_company_name = value;
		      localStorage.setItem('usdot', value)
		    },

			handleWindowResize() {
			  const width = window.innerWidth;

			  if (width <= 768 && this.sidebarStatic) {
			    this.toggleSidebar();
			    this.changeSidebarActive(null);
			  }
			},

			updateHint(hint = '') {
		      	this.hint = hint;
		    },
		},

		computed: {
			...mapState('layout', ["sidebarClose", "sidebarStatic"]),
		},

		created() {
			const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

			if (staticSidebar) {
			  this.setSidebarStatic(true);
			} else if (!this.sidebarClose) {
			  setTimeout(() => {
			    this.switchSidebar(true);
			    this.changeSidebarActive(null);
			  }, 2500);
			}

			this.handleWindowResize();
			window.addEventListener('resize', this.handleWindowResize);
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.handleWindowResize);
		},
	}
</script>

<style lang="scss" scoped>
	.root {
	  height: 100%;
	  position: relative;
	  left: 0;
	  transition: left $sidebar-transition-time ease-in-out;
	}

	.wrap {
	  position: relative;
	  min-height: 100%;
	  display: flex;
	  margin-left: 50px;
	  flex-direction: column;
	  left: $sidebar-width-open - $sidebar-width-closed;
	  right: 0;
	  transition: left $sidebar-transition-time ease-in-out, margin-left $sidebar-transition-time ease-in-out;

	  @media (max-width: 425px) {
	    margin-left: 0;
	    left: $sidebar-width-open;
	  }
	}

	.sidebarClose div.wrap {
	  left: 0;
	}

	.sidebarStatic .wrap {
	  //transition: none;
	  left: 0;
	  margin-left: $sidebar-width-open;
	}

	.app-main {
	  position: relative;
	  display: flex;
	  flex-direction: column;
	  flex-grow: 1;
	  padding: $content-padding $content-padding ($content-padding + 20px);
	  background-color: $body-bg;

	  // hammers disallows text selection, allowing it for large screens
	  @media (min-width: 425px) {
	    user-select: auto !important;
	  }
	}

	.main-wrapper {
	    flex-wrap: nowrap;
	    position: relative;
	}

</style>

<style>
	.portal-fontawesome.linkedin path {
	    fill: #007bff;
  	}
</style>