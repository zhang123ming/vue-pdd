<template>
  <div id="login">
    <mt-header title="手机登陆">
      <router-link to="/selectlogin" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <form>
      <p>
        <img src="./../../../static/img/reset/shouji.svg" alt />
        <input type="text" maxlength="11" placeholder="手机号码" v-model="userPhone" />
      </p>
      <p>
        <img src="./../../../static/img/reset/suo.svg" alt />
        <input type="text" placeholder="验证码" maxlength="6" v-model="capt" />
        <button v-if="!countDown" @click.prevent="getVerfyCode">发送验证码</button>
        <button disabled v-else>已发送{{countDown}}s</button>
      </p>
    </form>
    <mt-button @click="resetInfo" class="tong" type="primary" size="large">同意协议并登陆</mt-button>
    <mt-button class="back" type="danger" @click="select" plain size="large">返回</mt-button>
    <p class="xieyi">
      我已经阅读并同意
      <i>服务协议与隐私政策</i>
    </p>
    <h3>{{userPhone}}========={{capt}}</h3>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      userPhone: "",
      capt: "",
      countDown: 0,
      yanphone: 0
    };
  },
  computed: {
    // 验证手机号是否合理
    phoneRight() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhone);
    }
  },
  methods: {
    // 获取验证码
    async getVerfyCode() {
      if (
        this.userPhone == null ||
        this.userPhone == "" ||
        this.userPhone.length !== 11
      ) {
        Toast({
          message: "手机号错误",
          position: "top",
          duration: 1000
        });
        console.log("手机号错误");
        return;
      }
      if (this.phoneRight) {
        this.countDown = 60;
        this.intervalID = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(this.intervalID);
          }
        }, 1000);
      }
      // 获取验证码
      this.axios.get("http://localhost:3000/api/send_code").then(res => {
        if (res.status === 200) {
          console.log("验证码+++++" + res.data.message);
        }
      });
    },
    // 返回按钮事件
    select() {
      this.$router.replace("/selectlogin");
    },
    // 同意按钮
    resetInfo() {
      Indicator.open("验证中...");
      this.axios
        .post("http://localhost:3000/api/userInfoReset", {
          phone: this.userPhone,
          capt: this.capt
        })
        .then(res => {
          if (res.data.err_code === 0) {
            return;
          } else if (res.data.success_code === 200) {
            if (res.data.message[0] === "添加成功") {
              this.yanphone = res.data.message[1];
              this.axios
                .post("http://localhost:3000/api/phoneID", {
                  yanphone: this.yanphone
                })
                .then(res => {
                  console.log("注册成功");
                  console.log(res);
                  if (res.data.success_code === 200) {
                    this.$store.commit("SAVE_USERIINFO", res.data.message);
                  }
                });
            } else {
              console.log("登录成功");
              this.$store.commit("SAVE_USERIINFO", res.data.message);
              window.localStorage.setItem(
                "userinfo",
                JSON.stringify(res.data.message)
              );
            }
            this.$router.replace("me");
            Indicator.close();
          }
        });
    }
  }
};
</script>
<style  scoped>
#login {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: absolute;
  z-index: 999999;
  overflow: hidden;
}

.mint-button--large {
  width: 80%;
  margin-left: 10%;
}
#login form {
  border-top: 1px solid #ddcfcf;
  border-bottom: 1px solid #ddcfcf;
  margin-top: 15px;
  background: #fff;
}
#login form p {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
#login form p:first-child {
  border-bottom: 1px solid #ddcfcf;
}
#login form p img {
  width: 30px;
  vertical-align: middle;
}
#login form p input {
  height: 90%;
  font-size: 15px;
  border: none;
}
input:focus {
  outline: none;
}
#login form p button {
  height: 60%;
  border: none;
  font-size: 15px;
  border-left: 1px solid #9c9c9c;
  background: #fff;
  padding-left: 20px;
}
#login form p button:last-child {
  color: #9c9c9c;
}
#login .tong {
  margin-top: 20px;
  background: red;
}
#login .back {
  margin-top: 10px;
}
#login .xieyi {
  font-size: 13px;
  margin-left: 20px;
  line-height: 40px;
  color: #58595b;
}
#login .xieyi i {
  color: #5b9ce7;
}
</style>