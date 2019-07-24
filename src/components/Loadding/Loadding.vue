<template>
  <div class="box">
    <div class="center container">
      <div class="loadContainer">
        <div class="loader2"></div>
        <div class="loader3"></div>
        <div class="loader4"></div>
      </div>
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>
<style  scoped>
.box {
  background: #36c;
  width: 100%;
  height: 100%;
  position: relative;
}
.center {
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.loadContainer {
  height: 35px;
  width: 35px;
  float: left;
}

.container {
  height: 35px;
  width: 205px;
}

span {
  font: "Ubuntu";
  font-size: 35px;
  font-style: oblique;
  color: #ddd;
  padding-left: 16px;
  text-shadow: 0px 0px 4px #9cf;
  animation: loadingText 0.4s ease-in-out infinite alternate;
}

.loader2 {
  border-top: 3px solid #ddd;
  border-bottom: 3px solid #ddd;
  border-radius: 50%;
  height: 14px;
  width: 15px;
  margin: 10px;
  position: absolute;
  animation: loading 1.2s infinite linear;
}

.loader3 {
  border-left: 3px solid #ccc;
  border-right: 3px solid #ccc;
  border-radius: 50%;
  height: 24px;
  width: 25px;
  margin: 8px 2px;
  position: absolute;
  animation: loading 1s infinite linear;
}

.loader4 {
  border-top: 3px solid #bbb;
  border-bottom: 3px solid #bbb;
  border-radius: 50%;
  height: 34px;
  width: 35px;
  position: absolute;
  animation: loading 0.8s infinite linear;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes loadingText {
  to {
    text-shadow: 0 0 2px #9cf, 0 0 3px #9cf, 0 0 4px #69c, 0 0 5px #69c;
  }
}
</style>