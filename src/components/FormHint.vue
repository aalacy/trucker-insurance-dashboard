<template>
  <div class="form-hint">
    <div>
      <div class="hint-icon mr-4">
        <img src="../assets/images/icn_hint.png" />
      </div>
    </div>

    <div class="hint card w-100">
      <div class="hint-card-triangle"></div>
      <div class="card-body">
        <h5 class="title form-sub-title">Account Info</h5>
        {{ hint }}
        <div class="">
        
        </div>
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

  .hint-card-triangle {
    position: absolute;
    top: 70px;
    left: -30px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 0px 30px 30px;
    border-color: transparent transparent white transparent;
  }
  .hint-icon {
    width: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
}
</style>
