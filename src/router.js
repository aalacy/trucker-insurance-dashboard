import Vue from 'vue';
import Router from 'vue-router';

import LayoutHome from '@/views/layout/LayoutHome';

Vue.use(Router);


const router = new Router({
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
      path: '/',
      name: 'LayoutHome',
      component: LayoutHome,
      children: [
        {
          path: '',
          name: 'Home',
          component:()=>import('./views/Home.vue')
        },
        {
          path: 'services/insurance',
          name: 'Insurance',
          component:()=>import('./views/services/Insurance.vue')
        },
        {
          path: 'services/maintenance',
          name: 'Maintenance',
          component:()=>import('./views/services/Maintenance.vue')
        },
        {
          path: 'services/operations',
          name: 'Operations',
          component:()=>import('./views/services/Operations.vue')
        },
        {
          path: 'services/authority',
          name: 'Authority',
          component:()=>import('./views/services/AuthorityManagement.vue')
        },
        {
          path: 'sign-up',
          name: 'SignUp',
          component: () => import('./views/SignUp.vue')
        },
        {
          path: 'log-in',
          name: 'LogIn',
          component: () => import('./views/LogIn.vue')
        },
        {
          path: 'reset-password/:code',
          name: 'Resetpassword',
          component: () => import('./views/ResetPassword.vue')
        },
        {
          path: 'contactus',
          name: 'ContactUs',
          component: () => import('./views/ContactUs.vue')
        },
        {
          path: 'ocr',
          name: 'OCR',
          component: () => import('./views/ocr/ocr')
        },
      ]
    },
    {
      path: '/simple-estimate-wizard',
      name: 'SimpleEstimateWizard',
      component: () => import('./views/SimpleEstimateWizard.vue')
    },
    {
      path: '/new-accountInfo',
      name: 'NewAccountInfo',
      component:() => import('./views/NewAccountInfo.vue'),
      redirect: '/new-accountInfo/newpersonal-info',
      children: [
        {
          path: 'newbusiness-structure',
          name: 'NewAccountInfoBusinessStructure',
          component: () =>
            import('./components/NewAccountInfoBusinessStructure.vue'),
          props: {
            prevForm: 'NewAccountInfoPersonalInfo',
            nextForm: 'NewAccountInfoCargoGroup',
            progress: 20
          }
        },
        {
          path: 'newcargo-group',
          name: 'NewAccountInfoCargoGroup',
          component: () => import('./components/NewAccountInfoCargoGroup.vue'),
          props: {
            prevForm: 'NewAccountInfoBusinessStructure',
            nextForm: 'NewAccountInfoCargoHauled',
            progress: 30
          }
        },
        {
          path: 'newcargo-hauled',
          name: 'NewAccountInfoCargoHauled',
          component: () => import('./components/NewAccountInfoCargoHauled.vue'),
          props: {
            prevForm: 'NewAccountInfoCargoGroup',
            nextForm: 'NewAccountInfoVehiclesAndTrailers',
            progress: 40
          }
        },
        {
          path: 'newvehicles-and-trailers',
          name: 'NewAccountInfoVehiclesAndTrailers',
          component: () =>
            import('./components/NewAccountInfoVehiclesAndTrailers.vue'),
          props: {
            prevForm: 'NewAccountInfoCargoHauled',
            nextForm: 'NewAccountInfoEldProvider',
            progress: 50
          }
        },
        {
          path: 'neweld-provider',
          name: 'NewAccountInfoEldProvider',
          component: () => import('./components/NewAccountInfoEldProvider.vue'),
          props: {
            prevForm: 'NewAccountInfoVehiclesAndTrailers',
            nextForm: 'NewAccountInfoDrivers',
            progress: 60
          }
        },
        {
          path: 'newdrivers',
          name: 'NewAccountInfoDrivers',
          component: () => import('./components/NewAccountInfoDrivers.vue'),
          props: {
            prevForm: 'NewAccountInfoEldProvider',
            nextForm: 'NewAccountInfoOwners',
            progress: 70
          }
        },
        {
          path: 'newowners',
          name: 'NewAccountInfoOwners',
          component: () => import('./components/NewAccountInfoOwners.vue'),
          props: {
            prevForm: 'NewAccountInfoDrivers',
            nextForm: 'NewAccountInfoQuestions',
            progress: 80
          }
        },
        {
          path: 'newquestions',
          name: 'NewAccountInfoQuestions',
          component: () => import('./components/NewAccountInfoQuestions.vue'),
          props: {
            prevForm: 'NewAccountInfoOwners',
            nextForm: 'NewAccountInfoDocumentUpload',
            progress: 85
          }
        },
        {
          path: 'newdocument-upload',
          name: 'NewAccountInfoDocumentUpload',
          component: () => import('./components/NewAccountInfoDocumentUpload.vue'),
          props: {
            prevForm: 'NewAccountInfoQuestions',
            nextForm: 'NewAccountInfoThankYou',
            progress: 90
          }
        },
      ]
    },
    {
        path: '/my-account',
        name:'MyAccount',
        component:() => import('./views/layout/LayoutPortal'),
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
              './components/QuotesAllQuotes.vue'),
            meta: {
              requiresAuth: true
            }
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
          },
          {
            path: 'accountinfo',
            name: 'QuotesAccountInfo',
            component: () =>
              import(/* webpackChunkName: "ResoursesFreightBoard" */
              './components/QuotesAccountInfo.vue')
          }
        ]
    },
    {
      path: '/account-info',
      name: 'AccountInfo',
      component:() => import('./views/layout/Layout'),
      redirect: '/account-info/personal-info',
      children: [
        {
          path: 'personal-info',
          name: 'AccountInfoPersonalInfo',
          component: () => import('./components/AccountInfoPersonalInfo.vue'),
          props: {
            nextForm: 'AccountInfoBusinessStructure',
            progress: 0
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
            progress: 10
          }
        },
        {
          path: 'cargo-group',
          name: 'AccountInfoCargoGroup',
          component: () => import('./components/AccountInfoCargoGroup.vue'),
          props: {
            prevForm: 'AccountInfoBusinessStructure',
            nextForm: 'AccountInfoCargoHauled',
            progress: 20
          }
        },
        {
          path: 'cargo-hauled',
          name: 'AccountInfoCargoHauled',
          component: () => import('./components/AccountInfoCargoHauled.vue'),
          props: {
            prevForm: 'AccountInfoCargoGroup',
            nextForm: 'AccountInfoVehiclesAndTrailers',
            progress: 30
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
            progress: 40
          }
        },
        {
          path: 'eld-provider',
          name: 'AccountInfoEldProvider',
          component: () => import('./components/AccountInfoEldProvider.vue'),
          props: {
            prevForm: 'AccountInfoVehiclesAndTrailers',
            nextForm: 'AccountInfoDrivers',
            progress: 50
          }
        },
        {
          path: 'drivers',
          name: 'AccountInfoDrivers',
          component: () => import('./components/AccountInfoDrivers.vue'),
          props: {
            prevForm: 'AccountInfoEldProvider',
            nextForm: 'AccountInfoOwners',
            progress: 60
          }
        },
        {
          path: 'owners',
          name: 'AccountInfoOwners',
          component: () => import('./components/AccountInfoOwners.vue'),
          props: {
            prevForm: 'AccountInfoDrivers',
            nextForm: 'AccountInfoQuestions',
            progress: 70
          }
        },
        {
          path: 'questions',
          name: 'AccountInfoQuestions',
          component: () => import('./components/AccountInfoQuestions.vue'),
          props: {
            prevForm: 'AccountInfoOwners',
            nextForm: 'AccountInfoDocumentUpload',
            progress: 75
          }
        },
        {
          path: 'document-upload',
          name: 'AccountInfoDocumentUpload',
          component: () => import('./components/AccountInfoDocumentUpload.vue'),
          props: {
            prevForm: 'AccountInfoQuestions',
            nextForm: 'NicoQuestions1',
            progress: 80
          }
        },
        {
          path: 'nico-questions1',
          name: 'NicoQuestions1',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'AccountInfoDocumentUpload',
            nextForm: 'NicoQuestions2',
            progress: 81,
            questions: [
              'This is your primary business.',
              'You have never filed for bankruptcy.',
              'You haul for hire.'
            ]
          }
        },
        {
          path: 'nico-questions2',
          name: 'NicoQuestions2',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions1',
            nextForm: 'NicoQuestions3',
            progress: 82,
            questions: [
              'You are a common carrier.',
              'You are not a contract hauler.',
              'You don\'t haul hazardous materials.'
            ]
          }
        },
        {
          path: 'nico-questions3',
          name: 'NicoQuestions3',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions2',
            nextForm: 'NicoQuestions4',
            progress: 83,
            questions: [
              'You don\'t only haul your own cargo.',
              'You don\'t pull double trailers.',
              'You don\'t pull triple trailers.'
            ]
          }
        },
        {
          path: 'nico-questions4',
          name: 'NicoQuestions4',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions3',
            nextForm: 'NicoQuestions5',
            progress: 84,
            questions: [
              'You don\'t rent or lease your equipment to others.',
              'Your drivers aren’t covered by workers compensation.',
              'Drivers are allowed to take their vehicles home at night.'
            ]
          }
        },
        {
          path: 'nico-questions5',
          name: 'NicoQuestions5',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions4',
            nextForm: 'NicoQuestions6',
            progress: 85,
            questions: [
              'Family members without CDL/not listed in the driver section aren’t allowed to drive.',
              'You order MVRs on all drivers prior to hiring.',
              'You agree to report all newly hired operators.'
            ]
          }
        },
        {
          path: 'nico-questions6',
          name: 'NicoQuestions6',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions5',
            nextForm: 'NicoQuestions7',
            progress: 86,
            questions: [
              'You want broad form peril coverage for cargo (if you need cargo).',
              'You have never changed your operating name.',
              'You don\'t operate under another name.'
            ]
          }
        },
        {
          path: 'nico-questions7',
          name: 'NicoQuestions7',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions6',
            nextForm: 'NicoQuestions8',
            progress: 87,
            questions: [
              'You don\'t operate as a subsidiary of another company.',
              'You don\'t own or manage any other transportation operations that aren’t covered.',
              'You don\'t lease your authority.'
            ]
          }
        },
        {
          path: 'nico-questions8',
          name: 'NicoQuestions8',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions7',
            nextForm: 'NicoQuestions9',
            progress: 88,
            questions: [
              'You don\'t appoint agents or hire independent contractors to operate on your behalf.',
              'You have never lost or had your authority withdrawn or been under probation by any regulatory authority.',
              'You need proof of coverage.'
            ]
          }
        },
        {
          path: 'nico-questions9',
          name: 'NicoQuestions9',
          component: () => import('./components/NicoQuestions.vue'),
          props: {
            prevForm: 'NicoQuestions8',
            nextForm: 'AccountInfoSignComplete',
            progress: 89,
            questions: [
              'You don\'t have agreements with other carriers for the interchange of equipment or transportation of loads.',
              'You don\'t barter, hire, or lease any vehicles.',
            ]
          }
        },
        {
          path:'sign-complete',
          name:'AccountInfoSignComplete',
          component:() => import('./components/AccountInfoSignComplete.vue'),
          props:{
            prevForm: 'NicoQuestions9',
            nextForm: 'QuotesAccountInfo',
            progress: 90
          },
          meta: {
            requiresAuth: true
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

const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const updateUUIDAndDotId = () => {
  const params = getUrlVars()
  if (params.uuid && params.uuid != undefined) {
    localStorage.setItem('uuid', params.uuid)
  }
  if (params.dotId && params.dotId != undefined) {
    console.log('router', params.dotId)
    localStorage.setItem('usdot', params.dotId)
  }
}

router.beforeEach((to, from, next) => {
  if (to.name == 'AccountInfoPersonalInfo') {
    updateUUIDAndDotId()
  }
  if(to.matched.some(record =>  record.meta.requiresAuth)) {
    if (localStorage.getItem('userId') == '' || localStorage.getItem('userId') == null || localStorage.getItem('userId') == 'null') {
      let query = `?next=${to.name}`
      if (to.name == 'AccountInfoSignComplete') {
        query += '&sf=true'
      }
      next({
          path: '/log-in' + query,
          params: { next: to.name }
      })
    } else {
      next()
    }
  } else {
      next()
  }
});

export default router;