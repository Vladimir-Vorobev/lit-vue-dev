<template>
<div>
  <div class="main">
    <h1>{{ msg }}</h1>
  </div>
  <div ref="button" class="button" @mouseenter="ButtonEnter()" @mouseleave="ButtonLeave()">{{actualText}}</div>
  <div class="counter"> Вы навели на кнопку {{hoverCount}} раз</div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    let hoverCount = 0
    let actualText = 'Мышь не наведена'
    let loadingStatus = ''
    return {
      msg: 'Homework Page Title',
      hoverCount,
      actualText,
      loadingStatus
    }
  },
  methods:{
    ButtonEnter(){
      this.$refs.button.style.backgroundColor = "black"
      this.$refs.button.style.color = "white"
      this.hoverCount += 1
      this.actualText = 'Мышь наведена'
    },
    ButtonLeave(){
      this.$refs.button.style.backgroundColor = "white"
      this.$refs.button.style.color = "black"
      this.actualText = 'Мышь не наведена'
    },
  },
  beforeCreate(loadingStatus) {
    loadingStatus = "beforeCreate"
    console.log(loadingStatus);
  },
  created(loadingStatus) {
    loadingStatus = "created"
    console.log(loadingStatus);
  },
  beforeMount(loadingStatus) {
    loadingStatus = "beforeMount"
    console.log(loadingStatus);
  },
  mounted(loadingStatus) {
    loadingStatus = "mounted"
    console.log(loadingStatus);
  },
  beforeUpdate(loadingStatus) {
    loadingStatus = "beforeUpdate"
    console.log(loadingStatus);
  },
  updated(loadingStatus) {
    loadingStatus = "updated"
    console.log(loadingStatus);
  },
  beforeDestroy(loadingStatus) {
    loadingStatus = "beforeDestroy"
    console.log(loadingStatus);
  },
  destroyed(loadingStatus) {
    loadingStatus = "destroyed"
    console.log(loadingStatus);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
display: flex;
justify-content: center;
}
.button{
display: flex;
cursor: pointer;
justify-content: center;
width: 150px;
height: 50px;
margin-left: auto;
margin-right: auto;
font-weight: 700;
font-size: 15px;
color: black;
border-radius: 25px;
border-color: black;
border-style: solid;
text-align: center;
line-height: 50px;
}
.counter{
  margin-top: 10px
}
</style>
