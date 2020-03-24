<template>
  <div class="policies-drivers container-fluid">

    <div class="card mb-5">
      <div class="card-body">
        <div class="d-flex">
          <h4 class="card-title form-sub-title flex-grow-1 mb-4">
            Drivers
          </h4>

          <div class="block-subtitle">
            <strong class="mr-3">Add a Driver</strong>
            <button class="btn btn-light border">+</button>
          </div>
        </div>

        <div v-if="loading">
          Loading...
        </div>

        <div v-for="item in drivers" :key="item.id" class="block-divider d-flex">
          <div class="policy-image-wrapper px-1">
            <img :src="item.img" alt="" class="policy-image" />
          </div>

          <div class="policy-info w-100 px-3">
            <div class="block-title">
              {{ item.firstName }} {{ item.lastName }}
            </div>

            <div class="row mb-4">
              <div class="col">
                <div class="block-subtitle">
                  Policy Type:
                </div>

                <div class="block-subtitle">
                  Date of Birth:
                </div>

                <div class="block-subtitle">
                  Mo/Yr Premium:
                </div>

                <div class="block-subtitle">
                  License Number:
                </div>

                <div class="block-subtitle">
                  State:
                </div>

                <div class="block-subtitle">
                  Date Hired:
                </div>

                <div class="block-subtitle">
                  Years of Experience:
                </div>
              </div>
              <div class="col">
                <div class="block-subtitle"><strong>{{ item.policyType }}</strong></div>
                <div class="block-subtitle"><strong>{{ item.dob | date }}</strong></div>
                <div class="block-subtitle"><strong>$ {{ item.premium | premium }}</strong></div>
                <div class="block-subtitle"><strong>{{ item.licenseNumber }}</strong></div>
                <div class="block-subtitle"><strong>{{ item.state }}</strong></div>
                <div class="block-subtitle"><strong>{{ item.dateHired | date }}</strong></div>
                <div class="block-subtitle"><strong>{{ item.yearsOfExperience }}</strong></div>
              </div>
            </div>


            <div>
              <div class="block-subtitle mb-1">
                <strong>Remove this Driver</strong>
              </div>

              <textarea
                class="col-10 mb-2"
                style="height: 131px;"
                v-model="item.reasonOfRemove"
                placeholder="Reason..."
              ></textarea>

              <div>
                <button type="button" class="lt-button lt-button-main">
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

export default {
  name: 'PoliciesDrivers',
 
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
    this.$emit('update-hint', 'Please be sure that all drivers currently operating under your authority are added to your current policy. Please use this section to add or subtract drivers.');
  }
};
</script>

<style lang="scss" scoped>
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
      color: #5e98f9;
      font-weight: 700;
    }

    .policy-subtitle {
      font-size: 0.8rem;
      line-height: 25px;
    }
  }
}
</style>
