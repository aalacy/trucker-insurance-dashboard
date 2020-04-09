<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144855806-1"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-144855806-1");
</script>

<script>
export default {
  name: "App",

  mounted() {
    this.$intercom.boot({
      user_id: this.userId,
      name: this.name,
      email: this.email,
    });
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "./assets/scss/main.scss";
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';
@import "./assets/scss/variables.scss";
@import "./assets/scss/mixins.scss";

.text-right-a{
        /* color: black; */
    font-size: 16px;
    font-weight: bold;
    width: 60%;
    text-align: center;
    /* position: absolute; */
    /* z-index: 111; */

}
.viewquote{
  padding-bottom: 10px;
  white-space: nowrap;
  margin-left: 10px;
  padding-top: 9px;
}
.v-facebook-login span {
  color: white !important;
}

.container {
  position: relative;
}

.navbar-nav {
  width: 100%;
  padding: 1rem 0;
}

.collapse {
  .mobile-nav-btn{
    text-transform: uppercase;
    color: white;
    opacity: .8;
    font-weight: bold;
    font-size: 16px;
    background: transparent;
    border: none;
    padding: 0;
  }
}

</style>

