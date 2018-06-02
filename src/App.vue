<template>
  <div id="app">
    <el-container>
      <Msilder></Msilder>
      <el-main>
        <keep-alive>
          <transition name="el-zoom-in-top">
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </transition>
        </keep-alive>
        <transition name="el-zoom-in-top">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Msilder from '@/components/Msilder.vue'
export default {
  name: 'App',
  components:{
    Msilder
  },
  created:function(){
    //首次加载完成移除动画
    if (document.querySelector('#appLoading')) {
        document.querySelector('#appLoading').classList.add("removeAnimate");
        setTimeout(() => {
            document.body.removeChild(document.getElementById('appLoading'));
            // let version = getVersion(), newVersion = pkg.version;
            // if (version !== null) {
            //     setVersion(newVersion);
            //     if (version !== newVersion) {
            //         this.$refs.versionDialog.show()
            //     }
            // } else {
            //     setVersion(newVersion);
            //     this.$refs.versionDialog.show()
            // }
        }, 500)
    }
  },
  data(){
    return {
      loading: true
    }
  },
  methods:{

  }
}
</script>


<style lang="less">
@import './assets/css/var';
@import './assets/css/reset';
html,body{
  background-color:@body_backgroundColor;
  height:@height100per
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @background_color;
  font-size:@font_size_large_x;
    p{color:@text_color}
    .router-view {
        width: 100%;
        height: 100%;
    }
}
</style>
