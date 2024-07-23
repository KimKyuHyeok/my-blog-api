<template>
  <header id="header">
    <SideMenu></SideMenu>
  </header>
  <div id="main">
    <PostInfo id="post"></PostInfo>
  </div>
</template>

<script>
import PostInfo from './components/post.vue'
import SideMenu from './components/header/SideHeader.vue'

export default {
  name: 'App',
  components: {
    PostInfo,
    SideMenu
  }
}
</script>

<style>

ul, ol, li {
    list-style-type: none;
    padding: 0; /* 패딩을 제거하려면 추가 */
    margin: 0;  /* 마진을 제거하려면 추가 */
}

#app {
  display: flex;
}

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

#main {
  flex: 0 0 60%;
  display: flex;
  margin-left: auto;
  margin-top: 10%;
  align-items: center;
  justify-content: center;
}

#post {
  width: 100%;
  text-align: center;
}
</style>
