<template>
  <div id="detail">
    <mt-header title="用户信息">
      <router-link to="/me" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-field label="用户名" placeholder="用户名" v-model="username"></mt-field>
    <mt-field label="头像" placeholder="头像" v-model="userimg"></mt-field>
    <mt-field label="邮箱" placeholder="email" type="email" v-model="email"></mt-field>
    <mt-field label="密码" placeholder="密码" type="text" v-model="password"></mt-field>
    <mt-field label="性别" placeholder type="text" v-model="sex"></mt-field>
    <mt-field label="年龄" placeholder type="text" v-model="age"></mt-field>
    <mt-field label="电话" placeholder="电话" type="tel" v-model="phone"></mt-field>
    <mt-field label="家庭地址" placeholder="家庭地址" v-model="address"></mt-field>
    <mt-field label="个性签名" placeholder="个性签名" type="textarea" rows="4" v-model="introduction"></mt-field>
    <mt-button class="sureBtn" type="danger" @click="updateUserInfo" size="large">确认修改</mt-button>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      userinfo: {},
      username: "",
      userimg: "",
      email: "",
      password: "",
      phone: "",
      introduction: "",
      address: "",
      sex: "",
      age: ""
    };
  },
  created() {
    this.getuserinfo();
  },
  methods: {
    //   获取用户信息
    getuserinfo() {
      this.userinfo = this.$store.state.userinfo;
      // console.log("进入详情");
      // console.log(this.$store.state.userinfo);
      this.username = this.userinfo.user_name;
      this.userimg =
        this.userinfo.user_img ||
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3663082828,4038475488&fm=27&gp=0.jpg";
      this.email = this.userinfo.user_email || "未设置";
      this.password = this.userinfo.user_pass || "未设置";
      this.phone = this.userinfo.user_phone || "未设置";
      this.address = this.userinfo.user_address || "未设置";
      (this.sex = this.userinfo.user_sex || "男"),
        (this.age = this.userinfo.user_age || 0),
        (this.introduction = this.userinfo.user_auto || "还没有说说哦~~");
    },
    updateUserInfo() {
      Indicator.open("Loading...");
      this.userinfo.user_phone = this.phone;
      this.userinfo.user_name = this.username;
      this.userinfo.user_img = this.userimg;
      this.userinfo.user_email = this.email;
      this.userinfo.user_pass = this.password;
      this.userinfo.user_age = this.age;
      this.userinfo.user_phone = this.phone;
      this.userinfo.user_address = this.address;
      this.userinfo.user_auto = this.introduction;
      this.axios
        .post("http://localhost:3000/api/updateuserinfo", {
          id: this.userinfo.user_id,
          name: this.userinfo.user_name,
          img: this.userinfo.user_img,
          email: this.userinfo.user_email,
          pass: this.userinfo.user_pass,
          phone: this.userinfo.user_phone,
          address: this.userinfo.user_address,
          auto: this.userinfo.user_auto,
          age: this.userinfo.user_age,
          sex: this.userinfo.user_sex
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$store.commit("SAVE_USERIINFO", this.userinfo);
            Indicator.close();
            this.$router.replace("/me");
          }
        });
    }
  }
};
</script>
<style  scoped>
#detail {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.sureBtn {
  width: 85%;
  margin: 20px auto;
}
</style>