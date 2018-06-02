<template>
  <el-aside width="">
    <!-- <el-radio-group v-model="isCollapse" >
      <el-radio-button :label="false">展</el-radio-button>
      <el-radio-button :label="true">收</el-radio-button>
    </el-radio-group> -->
    <el-menu default-active="1-4-1"
    :collapse-transition='false'
    @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <router-link :to="{ name: 'Pos', params: {} }">
        <el-menu-item index="1">
          <i class="iconfont icon-money"></i>
          <span slot="title">收银</span>
        </el-menu-item>
      </router-link>
      <router-link :to="{ name: 'Mall', params: {} }">
        <el-menu-item index="2">
          <i class="iconfont icon-shop"></i>
          <span slot="title">店铺</span>
        </el-menu-item>
      </router-link>

      <el-menu-item index="3">
        <i class="iconfont icon-shangpinfenlei"></i>
        <span slot="title">商品</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="iconfont icon-member"></i>
        <span slot="title">会员</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="iconfont icon-tongji"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="iconfont icon-shezhi"></i>
        <span slot="title">设置</span>
      </el-menu-item>
      <el-menu-item index="6" @click='folding' class="fold">
        <i class="iconfont"
        :class="this.isCollapse ? 'icon-menudots'  : 'icon-dot3' "></i>
        <span slot="title">{{ this.isCollapse ? "展开" : "收起" }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default{
  name:"Mslider",
  data(){
    return {
      //边栏展开/收起
      isCollapse: false
    }
  },
  methods: {
    folding($event){
      console.log(this);
      this.isCollapse ? this.isCollapse=false  : this.isCollapse=true
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style>

.iconfont {font-size: 22px}


.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-aside .el-menu--collapse{
  padding-right: 0;
  width: 40px
}
.el-aside .el-menu--collapse li div{
  padding:0 5px !important; width: 40px !important;
  }
.el-aside .el-menu.el-menu--collapse i{
  font-size: 12px
}
</style>
