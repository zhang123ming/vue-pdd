<template>
  <div class="login">
    <div class="content">
      <h3>选择登陆方式</h3>
      <div class="phone" @click="selectLogin">
        <img src="./../../../static/img/login/shouji.svg" alt />
        <span>手机登陆</span>
      </div>
    </div>
    <div class="foot">
      <div class="box-img">
        <img src="./../../../static/img/login/pinduoduo.svg" alt />
        <span>拼多多</span>
      </div>
      <div class="box-foot">
        <img src="./../../../static/img/login/dunpai.svg" alt />
        <span>
          由<i>PICC</i>中国人民保险全程保障
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    //   登陆页面， 
      selectLogin(){
this.$router.replace("/login")
      }
  }
};
</script>
<style  scoped>
.login {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  z-index: 9999999;
  position: fixed;
  overflow: hidden;
  top: 0;
}
.content {
  padding-top: 150px;
}

.content h3 {
  font-size: 18px;
  text-align: center;
  color: #151516;
}
.content .phone {
  width: 80%;
  height: 50px;
  background: #f6a622;
  border-radius: 5px;
  margin-left: 10%;
  margin-top: 40px;
  text-align: center;
  line-height: 50px;
}
.content .phone img {
  width: 20px;
  vertical-align: middle;
}
.content .phone span {
  color: #fff;
  font-size: 14px;
}
.foot {
  position: absolute;
  bottom: 20px;
  width: 100%;


}
.foot .box-img{
width: 100%;
text-align: center;
/* background: orange; */
margin-top: -150px;
}
.foot .box-img img{
    width: 60px;
    vertical-align: middle;
    margin-top: -10px;
}
.foot .box-img span{
    font-size: 40px;
    font-weight: bolder;
    color: crimson;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
.foot .box-foot{
width: 100%;
text-align: center;
line-height: 50px;
}
.foot .box-foot img{
    width: 20px;
    vertical-align: middle;
}
.foot .box-foot i{
    color: crimson;
    font-weight: bolder;
}
</style>