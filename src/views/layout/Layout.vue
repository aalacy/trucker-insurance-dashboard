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
		        <account-info-account-progress :progress="progress" :US_DOT_or_company_name="US_DOT_or_company_name" />
	       		<div class="main-wrapper p-3">
	   			 	<div class="row forms">
				        <div class="col-xs-12 col-sm-12 col-lg-8 col-md-12 mb-3">
				          <router-view
			             	@update-progress="updateProgress"
				            @update-hint="updateHint"
				            @go-to-form="goToForm"
				            @update-us-dot="updateUSDot"
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
	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapActions, mutations } = createNamespacedHelpers('layout');
	export default {
		name: 'Layout',

		data() {
		    return {
		      progress: Number(localStorage.getItem('accountInfoProgress')) || 0,
		      hint: '',
		      US_DOT_or_company_name: '',
		      items: [
		       //  {
		       //    header: "Your Quote Progress",
		       //    link: { name: "AccountInfo" },
		       //    isOpen: true,
		       //    icon: '/img/sidebar/Your-Quote-Progress.png'
		      	// },
		        //   subItems: [
			        { 
			          header: "Business Information",
			          link: { name: "AccountInfoPersonalInfo" },
			          icon: '/img/sidebar/Information.png'
			        },
			        {
			          header: "Business Structure",
			          link: { name: "AccountInfoBusinessStructure" },
			          icon: '/img/sidebar/Structure.png'
			        },
			        { 
			          header: "Cargo Group",
			          link: { name: "AccountInfoCargoGroup" },
			          icon: '/img/sidebar/Group.png'
			        },
			        { 
			          header: "Cargo Hauled",
			          link: { name: "AccountInfoCargoHauled" },
			          icon: '/img/sidebar/Hauled.png'
			        },
			        { 
			          header: "Vehicles & Trailers",
			          link:{name:"AccountInfoVehiclesAndTrailers"},
			          icon: '/img/sidebar/Vehicle.png'
			        },
			        { 
			          header: "ELD Provider",
			          link: { name: "AccountInfoEldProvider" },
			          icon: '/img/sidebar/ELD_Provider.png'
			        },
			        { 
			          header: "Drivers",
			          link: { name: "AccountInfoDrivers" },
			          icon: '/img/sidebar/Drivers.png'
			        },
			        { 
			          header: "Owner",
			          link: { name: "AccountInfoOwners" },
			          icon: '/img/sidebar/Owners.png'
			        },
			        { 
			          header: "Comments", 
			          link: { name: "AccountInfoQuestions" },
			          icon: '/img/sidebar/Comments.png'
			        },
			        {
			          header: "Document Upload",
			          link: { name: "AccountInfoDocumentUpload" },
			          icon: '/img/sidebar/Document Upload.png'
			        },
			        {
			          header: "Additional Questions",
			          link: { name: "NicoQuestions1" },
			          icon: '/img/sidebar/Document Upload.png'
			        },
			        {
			          header:"Sign & Complete",
			          link:{name:"AccountInfoSignComplete"},
			          icon: '/img/sidebar/Sign.png'
			        },
		       //    ]
		      	// }
		      ],
		  	}
		},

		components: { 
	      Header: () => import('./Header'),
	      Footer: () => import('./Footer'),
	      Sidebar: () => import('./Sidebar/Sidebar'),
	      AccountInfoAccountProgress: () => import('../../components/AccountInfoAccountProgress.vue'),
	      FormHint: () => import('../../components/FormHint.vue'),
	    },

		methods: {
			...mapActions(['setSidebarStatic', 'switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar'],
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
		    	console.log('US_DOT_or_company_name', value)
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
			...mapState(["sidebarClose", "sidebarStatic"]),
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

		mounted () {
			if (!this.US_DOT_or_company_name) {
				this.updateUSDot(localStorage.getItem("usdot") || '')
			}
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.handleWindowResize);
		}
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