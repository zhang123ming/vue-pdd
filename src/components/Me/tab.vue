<template>
  <div id="tab">
    <ul class="box">
      <li
        :class="{current:flag==index}"
        v-for="(item,index) in msg"
        :key="item"
        @click="handel(index)"
      09>{{item}}</li>=-
    </ul>
    <ul class="content">
      <li :class="{show:flag===0}" class="item">内容一</li>
      <li  :class="{show:flag===1}" class="item">内容二</li>
      <li  :class="{show:flag===2}" class="item">内容三</li>
      <li  :class="{show:flag===3}" class="item">内容四</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ["标题1", "标题二", "标题三", "标题四"],
      flag: 0
    };
  },

  methods: {
    handel(index) {
      this.flag = index;
      // console.log(index);
    }
  }
};
</script>
<style  scoped>
#tab {
  width: 100%;
  height: 100%;
}
#tab .box {
  width: 100%;
  height: 50px;
  background: #f5f5f5;
}
#tab .box li {
  width: 25%;
  height: 100%;
  float: left;
  line-height: 50px;
  text-align: center;
}
#tab .box li.current {
  background: darkcyan;
  color: #fff;
}
.content{
  width: 100%;
  height:200px;
  position: relative;
/* background: darkgrey; */
}
.content .item{
width: 100%;
height: 100%;
line-height: 200px;
text-align: center;
font-size: 30px;
color: #fff;
position: absolute;
display: none;
}
.content .item.show{
  display: block;
}
.content .item:nth-child(1){
  background: rebeccapurple;
}
.content .item:nth-child(2){
  background: darkcyan;
}
.content .item:nth-child(3){
  background: darkgreen;
}
.content .item:nth-child(4){
  background: darkkhaki;
}
</style>