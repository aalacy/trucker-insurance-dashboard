<template>
  <div class="form-hint">
    <div class="hint card w-100">
      <div class="hint-card-triangle"></div>
      <div class="card-body">
        <h5 class="title form-sub-title">Account Info</h5>
        <div class="hint-centent">{{ hint }}</div>
        <div class="">
        
        </div>
      </div>
    </div>
    <div>
      <div class="hint-icon mr-4">
        <img src="../assets/images/icn_hint.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormHint',
  props: {
    hint: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>

.form-hint {
  display: flex;
  flex-direction: column;

  .hint {
    margin-bottom: 20px;
  }

  .hint-card-triangle {
    position: absolute;
    //top: 70px;
    //left: -21px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 0px 30px 30px;
    border-color: transparent transparent white transparent;
    transform: rotate(45deg);
    bottom: -15px;
    left: 21px;
  }

  .form-sub-title {
    margin: 0 0 10px 0 !important;
  }

  .hint-centent {
    color: #2a497b;
    font-size: 20px;
    font-weight: 400;
  }

  .hint-icon {
    width: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .card-body {
    padding: 1.5rem !important;
  }
}
</style>
