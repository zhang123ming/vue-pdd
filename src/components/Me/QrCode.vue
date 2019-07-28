<template>
  <div class="box">
    <div class="qrCode" ref="qrCodeDiv" ></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {};
  },
  components: {

  },
  mounted: function() {
    this.$nextTick(() => {
      this.bindQRCode();
    });
  },
  methods: {
    bindQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: "https://www.zhangmingblog.xyz",
        width: 300,
        height: 300,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    }
  }
};
</script>
<style  scoped>
.box {
  width: 100%;
  height: 100%;
  background: #f40;
  position: relative;
}
.qrCode {
  width: 300px;
  height: 300px;
  background: #fff;
  padding: 10px;
  margin: 0px auto;
}
</style>