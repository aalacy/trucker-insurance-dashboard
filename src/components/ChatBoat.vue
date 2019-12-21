<template>
  <div class="pos-abs d-flex justify-content-end">
    <div class="row mr-2">
      <transition name="fade">
        <!-- <div class v-if="show"> -->
          <div>
          <div class="text-center">
            <img
              src="../assets/images/imga-truck.png"
              height="100"
              width="100"
              class="d-block mx-auto"
            >
          </div>
          <div class="clearfix d-flex align-items-center col-plac">
            <input type="text" class="input_text" value="Have a Question? >">
          </div>
        </div>
      </transition>
    </div>
    <!-- <div class="d-flex justify-content-end align-items-end" @click="onClick">
      <img src="../assets/images/chat.png" style="width:50px; height:50px;">
    </div> -->
  </div>
</template>



<script type='text/javascript' data-cfasync='false'>
window.purechatApi = {
  l: [],
  t: [],
  on: function() {
    this.l.push(arguments);
  }
};
(function() {
  var done = false;
  var script = document.createElement("script");
  script.async = true;
  script.type = "text/javascript";
  script.src = "https://app.purechat.com/VisitorWidget/WidgetScript";
  document
    .getElementsByTagName("HEAD")
    .item(0)
    .appendChild(script);
  script.onreadystatechange = script.onload = function(e) {
    if (
      !done &&
      (!this.readyState ||
        this.readyState == "loaded" ||
        this.readyState == "complete")
    ) {
      var w = new PCWidget({
        c: "410a2e29-a94a-4996-8026-9610c0195865",
        f: true
      });
      done = true;
    }
  };
})();
</script>