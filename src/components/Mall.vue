<template>
  <div>
  <Loading v-model="isLoadShow" />
  <el-card :body-style="{ padding: '0px' }"
  v-for='item in subjects'
  :key="item.id"
  v-if="!isLoadShow">
  <img v-lazy="getImage(item.images.small)" class="image">
    <div style="padding: 14px;">
      <span>{{item.subjects}}</span>
      <div class="bottom clearfix">
        <time class="time">{{ item.year }}</time>
        <el-button
        type="text" class="button">{{item.images.small}}</el-button>
      </div>
    </div>
  </el-card>
  </div>
</template>
<script>
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import {loadMixin} from '@/assets/js/mixin.js'

export default{
  name:'Mall',
  mixins: [loadMixin],
  components:{
    Loading
  },
  data(){
    return {
      list:[1,2,3,4],
      subjects:[]
    }
  },
  methods:{
    getImage(url){
      //豆瓣限制了图片的加载
      //images.weserv.nl缓存图片的网址
      if(url !== undefined){
        let a = url.substring(7);
        let src = 'https://images.weserv.nl/?url=' +a+'&w=120&t=fitup'
        return src;
      }
    }
  },
  created:function(){
    let obj = {
      count:9,
      start:1
    };
    axios.get('/douban/v2/movie/in_theaters',{params:obj})
      .then(response=>{
         console.log(response.data);
         this.subjects = response.data.subjects;
         // this.$parent.$parent.$parent.loading=false
         this._hideLoad()
      })
      .catch(error=>{
          console.log(error);
          // alert('网络错误，不能访问');
      })
  }
}
</script>
