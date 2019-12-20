import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
 
  routes: [
    {
      path:'/',
      name:'Home',
      component:()=>import('./views/Home.vue')
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/log-in',
      name: 'LogIn',
      component: () => import('./views/LogIn.vue')
    },
    {
      path: '/reset-password/:code',
      name: 'Resetpassword',
      component: () => import('./views/ResetPassword.vue')
    },
    {
      path: '/simple-estimate-wizard',
      name: 'SimpleEstimateWizard',
      component: () => import('./views/SimpleEstimateWizard.vue')
    },
    {
        path: '/my-account',
        name:'MyAccount',
        component:() => import('./views/MyAccount.vue'),
        children:[
          {
            path: 'quotes',
            name: 'Quotes',
            redirect: { name: 'QuotesAllQuotes' }
          },
          {
            path: 'quotes/all-quotes',
            name: 'QuotesAllQuotes',
            component: () =>
              import(/* webpackChunkName: "QuotesAllQuotes" */
              './components/QuotesAllQuotes.vue')
          },
          {
            path: 'quotes/request-new-quote',
            name: 'QuotesRequestNewQuote',
            component: () =>
              import(/* webpackChunkName: "QuotesRequestNewQuote" */
              './components/QuotesRequestNewQuote.vue')
          },
          {
            path: 'policies',
            name: 'Policies',
            redirect: { name: 'PoliciesReview' }
          },
          {
            path: 'policies/review',
            name: 'PoliciesReview',
            component: () =>
              import(/* webpackChunkName: "PoliciesReview" */
              './components/PoliciesReview.vue')
          },
          {
            path: 'policies/drivers',
            name: 'PoliciesDrivers',
            component: () =>
              import(/* webpackChunkName: "PoliciesDrivers" */
              './components/PoliciesDrivers.vue')
          },
          {
            path: 'policies/vehicles-and-trailers',
            name: 'PoliciesVehiclesAndTrailers',
            component: () =>
              import(/* webpackChunkName: "PoliciesVehiclesAndTrailers" */
              './components/PoliciesVehiclesAndTrailers.vue')
          },
          {
            path: 'policies/other-coverages',
            name: 'PoliciesOtherCoverages',
            component: () =>
              import(/* webpackChunkName: "PoliciesOtherCoverages" */
              './components/PoliciesOtherCoverages.vue')
          },
          {
            path: 'certificates',
            name: 'Certificates',
            redirect: { name: 'CertificatesPast' }
          },
          {
            path: 'certificates/past-certificates',
            name: 'CertificatesPast',
            component: () =>
              import(/* webpackChunkName: "CertificatesPast" */
              './components/CertificatesPast.vue')
          },
          {
            path: 'certificates/request-new-certificate',
            name: 'CertificatesRequestNewCertificate',
            component: () =>
              import(/* webpackChunkName: "CertificatesRequestNewCertificate" */
              './components/CertificatesRequestNewCertificate.vue')
          },
          {
            path: 'billing',
            name: 'Billing',
            redirect: { name: 'BillingPaymentInformation' }
          },
          {
            path: 'billing/payment-information',
            name: 'BillingPaymentInformation',
            component: () =>
              import(/* webpackChunkName: "BillingPaymentInformation" */
              './components/BillingPaymentInformation.vue')
          },
          {
            path: 'billing/payment-schedule',
            name: 'BillingPaymentSchedule',
            component: () =>
              import(/* webpackChunkName: "BillingPaymentSchedule" */
              './components/BillingPaymentSchedule.vue')
          },
          {
            path: 'billing/payment-history',
            name: 'BillingPaymentHistory',
            component: () =>
              import(/* webpackChunkName: "BillingPaymentHistory" */
              './components/BillingPaymentHistory.vue')
          },
          {
            path: 'billing/make-a-payment',
            name: 'BillingMakePayment',
            component: () =>
              import(/* webpackChunkName: "BillingMakePayment" */
              './components/BillingMakePayment.vue')
          },
          {
            path: 'resources',
            name: 'Resourses',
            redirect: { name: 'ResoursesEldProviders' }
          },
          {
            path: 'resources/eld-providers',
            name: 'ResoursesEldProviders',
            component: () =>
              import(/* webpackChunkName: "ResoursesEldProviders" */
              './components/ResoursesEldProviders.vue')
          },
          {
            path: 'resources/risk-management',
            name: 'ResoursesRiskManagement',
            component: () =>
              import(/* webpackChunkName: "ResoursesRiskManagement" */
              './components/ResoursesRiskManagement.vue')
          },
          {
            path: 'resources/buy-new-truck-trailer',
            name: 'ResoursesBuyNewTruckTrailer',
            component: () =>
              import(/* webpackChunkName: "ResoursesBuyNewTruckTrailer" */
              './components/ResoursesBuyNewTruckTrailer.vue')
          },
          {
            path: 'resources/find-a-driver',
            name: 'ResoursesFindDriver',
            component: () =>
              import(/* webpackChunkName: "ResoursesFindDriver" */
              './components/ResoursesFindDriver.vue')
          },
          {
            path: 'resources/freight-board',
            name: 'ResoursesFreightBoard',
            component: () =>
              import(/* webpackChunkName: "ResoursesFreightBoard" */
              './components/ResoursesFreightBoard.vue')
          }
        ]
    },
    {
      path: '/account-info',
      name: 'AccountInfo',
      redirect: '/account-info/personal-info',
      component: () => import('./views/AccountInfo.vue'),
      children: [
        {
          path: 'upload-documents',
          name: 'AccountInfoUploadDocuments',
          component: () =>
            import('./components/AccountInfoUploadDocuments.vue'),
          props: {
            nextForm: 'AccountInfoPersonalInfo',
            progress: 0
          }
        },
        {
          path: 'personal-info',
          name: 'AccountInfoPersonalInfo',
          component: () => import('./components/AccountInfoPersonalInfo.vue'),
          props: {
            prevForm:'AccountInfoUploadDocuments',
            nextForm: 'AccountInfoBusinessStructure',
            progress: 10
          }
        },
        {
          path: 'business-structure',
          name: 'AccountInfoBusinessStructure',
          component: () =>
            import('./components/AccountInfoBusinessStructure.vue'),
          props: {
            prevForm: 'AccountInfoPersonalInfo',
            nextForm: 'AccountInfoCargoGroup',
            progress: 20
          }
        },
        {
          path: 'cargo-group',
          name: 'AccountInfoCargoGroup',
          component: () => import('./components/AccountInfoCargoGroup.vue'),
          props: {
            prevForm: 'AccountInfoBusinessStructure',
            nextForm: 'AccountInfoCargoHauled',
            progress: 30
          }
        },
        {
          path: 'cargo-hauled',
          name: 'AccountInfoCargoHauled',
          component: () => import('./components/AccountInfoCargoHauled.vue'),
          props: {
            prevForm: 'AccountInfoCargoGroup',
            nextForm: 'AccountInfoVehiclesAndTrailers',
            progress: 40
          }
        },
        {
          path: 'vehicles-and-trailers',
          name: 'AccountInfoVehiclesAndTrailers',
          component: () =>
            import('./components/AccountInfoVehiclesAndTrailers.vue'),
          props: {
            prevForm: 'AccountInfoCargoHauled',
            nextForm: 'AccountInfoEldProvider',
            progress: 50
          }
        },
        {
          path: 'eld-provider',
          name: 'AccountInfoEldProvider',
          component: () => import('./components/AccountInfoEldProvider.vue'),
          props: {
            prevForm: 'AccountInfoVehiclesAndTrailers',
            nextForm: 'AccountInfoDrivers',
            progress: 60
          }
        },
        {
          path: 'drivers',
          name: 'AccountInfoDrivers',
          component: () => import('./components/AccountInfoDrivers.vue'),
          props: {
            prevForm: 'AccountInfoEldProvider',
            nextForm: 'AccountInfoOwners',
            progress: 70
          }
        },
        {
          path: 'owners',
          name: 'AccountInfoOwners',
          component: () => import('./components/AccountInfoOwners.vue'),
          props: {
            prevForm: 'AccountInfoDrivers',
            nextForm: 'AccountInfoQuestions',
            progress: 80
          }
        },
        {
          path: 'questions',
          name: 'AccountInfoQuestions',
          component: () => import('./components/AccountInfoQuestions.vue'),
          props: {
            prevForm: 'AccountInfoOwners',
            nextForm: 'AccountInfoDocumentUpload',
            progress: 85
          }
        },
        {
          path: 'document-upload',
          name: 'AccountInfoDocumentUpload',
          component: () => import('./components/AccountInfoDocumentUpload.vue'),
          props: {
            prevForm: 'AccountInfoQuestions',
            nextForm: 'AccountInfoSignComplete',
            progress: 90
          }
        },
        {
          path:'sign-complete',
          name:'AccountInfoSignComplete',
          component:() => import('./components/AccountInfoSignComplete.vue'),
          props:{
            prevForm: 'AccountInfoDocumentUpload',
            nextForm: 'AccountInfoThankYou',
            progress: 95
          }
        },
        {
          path: 'download',
          name: 'AccountInfoThankYou',
          component: () => import('./components/AccountInfoThankYou.vue'),
          props: {
            progress: 100
          }
        },
        
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/documents',
      component: () => import('./views/Admin.vue'),
      children: [
        {
          path: 'documents',
          name: 'AdminDocuments',
          component: () => import('./views/AdminDocuments.vue')
        },
        {
          path: 'document/:docId',
          name: 'AdminDocumentsItem',
          component: () => import('./views/AdminDocumentsItem.vue'),
          props: true
        }
      ]
    }
  ]
});