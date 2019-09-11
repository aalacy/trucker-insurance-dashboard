<template>
  <div class="policies-drivers container-fluid">

    <div class="card mb-5">
                  

      <div class="card-body">
        <div class="d-flex">
          <h4 class="card-title form-sub-title flex-grow-1">
            Review Policies
          </h4>

          <div>
            Add a Driver
            <button class="btn btn-sm btn-light border">+</button>
          </div>
        </div>

        <div v-if="loading">
          Loading...
        </div>

        <div v-for="item in drivers" :key="item.id" class="mb-2 d-flex">
          <div class="policy-image-wrapper px-1">
            <img :src="item.img" alt="" class="policy-image" />
          </div>

          <div class="policy-info px-3">
            <div class="policy-title">
              {{ item.firstName }} {{ item.lastName }}
            </div>

            <div class="policy-subtitle">
              Policy Type:
              <strong>{{ item.policyType }}</strong>
            </div>

            <div class="policy-subtitle">
              Date of Birth:
              <strong>{{ item.dob | date }}</strong>
            </div>

            <div class="policy-subtitle">
              Mo/Yr Premium:
              <strong>$ {{ item.premium | premium }}</strong>
            </div>

            <div class="policy-subtitle">
              License Number:
              <strong>{{ item.licenseNumber }}</strong>
            </div>

            <div class="policy-subtitle">
              State:
              <strong>{{ item.state }}</strong>
            </div>

            <div class="policy-subtitle">
              Date Hired:
              <strong>{{ item.dateHired | date }}</strong>
            </div>

            <div class="policy-subtitle mb-4">
              Years of Experience:
              <strong>{{ item.yearsOfExperience }}</strong>
            </div>

            <div>
              <div class="small">
                <strong>Remove this Driver</strong>
              </div>

              <textarea
                v-model="item.reasonOfRemove"
                placeholder="Reason..."
              ></textarea>

              <div>
                <button type="button" class="btn btn-sm btn-primary">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import headerAssistant from "./header.vue";

export default {
  name: 'PoliciesDrivers',
    components: {
 headerAssistant:headerAssistant
},
  filters: {
    date(date) {
      return moment(date).format('MM/DD/YYYY');
    },
    premium(num) {
      // 12345.67 -> 12,345.67
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  },
  data() {
    return {
      drivers: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Smith',
          policyType: 'Policy',
          img: 'https://picsum.photos/200',
          dob: new Date(),
          premium: 200,
          licenseNumber: 'LN9120932',
          state: 'New York',
          dateHired: new Date(),
          yearsOfExperience: 12,
          reasonOfRemove: ''
        },
        {
          id: 2,
          firstName: 'Kelly',
          lastName: 'Brown',
          policyType: 'Policy',
          img: 'https://picsum.photos/200',
          dob: new Date(),
          premium: 200,
          licenseNumber: 'LN9120932',
          state: 'New York',
          dateHired: new Date(),
          yearsOfExperience: 12,
          reasonOfRemove: ''
        }
      ],
      loading: false,
      error: null
    };
  },
  created() {
    this.$emit('update-hint', ' ');
  }
};
</script>

<style lang="scss" scoped>
// div {
//   outline: 1px solid red;
// }
.policies-drivers {
  .policy-image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .policy-image {
      border-radius: 15px;
    }
  }

  .policy-info {
    .policy-title {
      font-size: 1.3rem;
    }

    .policy-subtitle {
      font-size: 0.8rem;
    }
  }
}
</style>
