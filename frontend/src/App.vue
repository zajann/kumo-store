<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif*/;
  font-family: 'Nanum Barun Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-color: black;
  /*color: #2c3e50;*/
  color: #000000;
  /*margin-top: 60px;*/
}

*:focus {
  outline: none;
}
</style>
