<template>
  <header id="header">
    <SideMenu></SideMenu>
  </header>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import SideMenu from '@/components/header/SideHeader.vue'

export default {
  name: 'App',
  components: {
      SideMenu
    }
}
</script>

<style>
  #header {
    position: fixed;
    flex: 0 0 40%;
    width: 60vh;
    height: 100vh;
    display: flex;
    justify-content: center;
    border-right: 1px solid #ccc;
    background-image: url('http://localhost/image/bg.jpg');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
  }
</style>