<template>
  <div class="policies-review container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">
          Review Policies
        </h4>

        <div v-if="loading">
          Loading...
        </div>

        <div v-for="item in quotes" :key="item.id" class="mb-2 d-flex">
          <div class="policy-image-wrapper px-1">
            <img :src="item.img" alt="" class="policy-image" />
          </div>

          <div class="policy-info px-3 pt-2">
            <div class="policy-title">{{ item.title }}</div>

            <div class="policy-subtitle">{{ item.policyType }}</div>

            <div class="policy-subtitle">
              Effective Date:
              <strong>{{ item.effectiveDate | date }}</strong>
            </div>

            <div class="policy-subtitle">
              Mo/Yr Premium:
              <strong>$ {{ item.premium | premium }}</strong>
            </div>

            <div class="py-2">
              <button type="button" class="btn btn-sm btn-primary">
                Request a Certificate
              </button>
            </div>

            <div class="d-flex small">
              <div class="px-2">
                <a href="#" @click.prevent>View Details</a>
              </div>

              <div class="px-2">
                <a href="#" @click.prevent>View Change History</a>
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
  name: 'PoliciesReview',
  filters: {
    date(date) {
      return moment(date).format('MMM, DD, YYYY');
    },
    premium(num) {
      // 12345.67 -> 12,345.67
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  },
  data() {
    return {
      quotes: [
        {
          id: 1,
          title: 'Allied Insurance',
          policyType: 'Policy Type',
          img: 'https://picsum.photos/200',
          effectiveDate: new Date(),
          premium: 1200
        },
        {
          id: 2,
          title: 'StateFarm',
          policyType: 'Policy Type',
          img: 'https://picsum.photos/200',
          effectiveDate: new Date(),
          premium: 1200
        },
        {
          id: 3,
          title: 'Merchants Fleet',
          policyType: 'Policy Type',
          img: 'https://picsum.photos/200',
          effectiveDate: new Date(),
          premium: 1200
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
.policies-review {
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
