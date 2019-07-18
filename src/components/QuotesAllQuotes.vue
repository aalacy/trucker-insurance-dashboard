<template>
  <div class="quotes-all-quotes container-fluid">
    <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title form-sub-title">
          All Quotes
        </h4>

        <div v-if="loading">
          Loading...
        </div>

        <div
          v-for="item in quotes"
          :key="item.id"
          class="mb-2 d-flex align-items-center"
        >
          <div class="quote-image-wrapper px-1">
            <img :src="item.img" alt="" class="quote-image" />
          </div>

          <div class="quote-info px-3">
            <div class="quote-title">{{ item.title }}</div>

            <div class="quote-subtitle">{{ item.subtitle }}</div>

            <div class="quote-price">{{ item.price }}</div>
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
export default {
  name: 'QuotesAllQuotes',
  data() {
    return {
      quotes: [
        {
          id: 1,
          title: 'Allied Insurance',
          subtitle: 'Carrier Coverage',
          price: 'Price',
          img: 'https://picsum.photos/200'
        },
        {
          id: 2,
          title: 'StateFarm',
          subtitle: 'Carrier Coverage',
          price: 'Price',
          img: 'https://picsum.photos/200'
        },
        {
          id: 3,
          title: 'Merchants Fleet',
          subtitle: 'Carrier Coverage',
          price: 'Price',
          img: 'https://picsum.photos/200'
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
.quotes-all-quotes {
  .quote-image-wrapper {
    height: 100px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .quote-image {
      border-radius: 15px;
    }
  }

  .quote-info {
    .quote-title {
      font-size: 1.3rem;
    }

    .quote-subtitle {
      font-size: 0.8rem;
      font-weight: 600;
    }

    .quote-price {
      font-weight: 200;
    }
  }
}
</style>
