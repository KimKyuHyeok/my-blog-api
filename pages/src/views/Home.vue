<template>

    <div id="main">
      <PostInfo id="post"></PostInfo>
    </div>
  </template>
  
  <script>
  import PostInfo from '@/components/HomePost.vue'

  
  export default {
    name: 'HomeView',
    components: {
      PostInfo,
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
  