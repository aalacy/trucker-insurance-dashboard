<template>
  <div class="pos-abs d-flex justify-content-end  ">
    <div class="row mr-2" >
      <transition name="fade">
    <div class=" " v-if="show">
      <div class="text-center">
      <img src="../assets/images/imga-truck.png" height="100" width="100" class="d-block mx-auto">
</div>
      <div class="clearfix d-flex align-items-center col-plac">
        <input type="text" class="input_text" value="Have a Question? >">
      </div></div>
    
      </transition></div>
    <div class=" d-flex justify-content-end align-items-end" @click="onClick">
      <img src="../assets/images/chat.png" style="width:50px; height:50px;">
    </div>
  </div>
</template>

<script>
export default {
  name: "chatboat",
  data(){
      return{
        show:false
      }
      
  },
  methods:{
      onClick(){
        //   console.log("a")
          this.show = !this.show;
      }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}   
.pos-abs {
  position: fixed;
  bottom: 20px;
  z-index: 10000;
  right: 20px;
  width: 100%;
  max-width: 262px;
}
.input_text {
  background-color: #fff;
  border-radius: 6px;
  padding: 5px;
  font-size: 14px;
  font-weight: 700;
  color: #5e98f9;
  border: 0px;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
