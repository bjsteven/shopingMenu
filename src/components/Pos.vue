<template>
  <div class="pos">
    <Loading v-model='isLoadShow'></Loading>
    <template v-if="!isLoadShow" >
    <el-row id='order-list'>
      <el-col :span='12'>
        <el-tabs type="card"
        v-model="activeName"
        @tab-click="handleClick">
          <el-tab-pane label="点餐" name="first">
            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="商品名称"
                prop="goodsName"
                width="120">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量"
                width="120">
              </el-table-column>
              <el-table-column
                prop="price"
                label="金额"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="220px"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-button--primary"
                  @click.native.prevent='addRow(scope)'>增加</el-button>
                  <el-button size="mini" type="primary" icon="el-button--primary"
                  @click.native.prevent="deleteRow(scope)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <div class="result">
                <div class="zongjia" v-if='basket_total_price'>
                  <span>总价：</span>￥{{basket_total_price}}
                </div>
              </div>
              <el-button type="warning"
              icon="el-icon-tickets">挂单</el-button>
              <el-button type="danger"
              icon="el-icon-circle-close"
              @click.native.prevent='dialogVisible=true'>删除</el-button>
              <el-button type="primary"
              @click.native.prevent='dialogVisible=true'
              icon="el-icon-success"  >结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">
              <template>123</template>
          </el-tab-pane>
          <el-tab-pane label="外卖" name="third">
              <template>222</template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='12'>
        <el-row>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <h6>常用商品</h6>
            </div>
            <div class="often-goods-list" >
              <ul>
                <li
                @click="addOrderList(item)"
                v-for="item in oftenGoods"
                :key="item.goodsName">
                  <el-button
                  size="medium">{{item.goodsName}} {{item.price}}元</el-button>
                </li>
              </ul>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card" shadow="never">
              <el-tabs type="card"
              v-model="activeName2"
              class="typeGoods">
                <el-tab-pane label="汉堡" name="type0Goods">
                  <div>
                    <ul class="cookList">
                      <li v-for="goods in type0Goods" :key='goods.goodsId'
                      @click="addOrderList(goods)">
                        <span class="foodImg"><img v-lazy="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="小食" name="type1Goods">
                  <div>
                    <ul class="cookList">
                      <li v-for="goods in type1Goods" :key='goods.goodsId'>
                        <span class="foodImg"><img v-lazy="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="饮料" name="type2Goods">
                  <div>
                    <ul class="cookList">
                      <li v-for="goods in type2Goods" :key='goods.goodsId'>
                        <span class="foodImg"><img v-lazy="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="套餐" name="type3Goods">
                  <div>
                    <ul class="cookList">
                      <li v-for="goods in type3Goods" :key='goods.goodsId'>
                        <span class="foodImg"><img v-lazy="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
              </el-tabs>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    </template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSelectedRow">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import {loadMixin} from '@/assets/js/mixin.js'

export default {
  name: 'Pos',
  components:{
    Loading
  },
  mixins: [loadMixin],
  mounted:function(){
    var _height = document.body.clientHeight;
    setTimeout(function(){
      //list实在loading后才渲染
      document.getElementById('order-list').style.height=_height+'px';
    },1000)
  },
  created:function(){
      function getOftenGoods() {
        return axios.get('http://jspang.com/DemoApi/oftenGoods.php');
      }
      function getTypeGoods() {
        return axios.get('http://jspang.com/DemoApi/typeGoods.php');
      }
      axios.all([getOftenGoods(), getTypeGoods()])
        .then(response=>{
          // console.log(response);
          this.oftenGoods = response[0].data
          this.type0Goods = response[1].data[0]
          this.type1Goods = response[1].data[1]
          this.type2Goods = response[1].data[2]
          this.type3Goods = response[1].data[3]
          // this.$parent.$parent.$parent.loading=false;
          this._hideLoad()
        })
        .catch(error=>{
          console.log(error);
        })
  },
  data() {
    return {
      dialogVisible: false,
      active: 0,
      activeName: 'first',
      activeName2: 'type0Goods',
      tableData: [],
      oftenGoods:[],
      type0Goods:[],
      type1Goods:[],
      type2Goods:[],
      type3Goods:[],
      multipleSelection: []
    }
  },
  computed:{
    basket_total_price(){
      let result=0;
      if(this.tableData.length !==0){
        this.tableData.map((item)=>{
          result += item.price*item.count
        })
      }
      return result;
    }
  },
  methods: {
    addOrderList(goods){
      // console.log(goods);
      //匹配当前商品 _thisGoods
      let _thisGoods = this.tableData.filter(item=>{
        return item.goodsName == goods.goodsName
      })[0];
      //判断当前商品是否存在，业务处理
      if(_thisGoods){
        _thisGoods.count++
      }else{
        let newObj = {
          goodsId:goods.goodsId,
          goodsName:goods.goodsName,
          price:goods.price,
          count:1
        }
        let _this = this;
        setTimeout(function(){
          _this.tableData.push(newObj);
        },60);
      }
    },
    addRow(scope){
      scope.row.count++
    },
    deleteRow(scope) {
      if(scope.row.count > 1){
        scope.row.count--
      }else{
        this.tableData.splice(scope.$index, 1);
      }
    },
    handleClick(tab, event) {
      // /*console.log( event);
      console.log(this)
      console.log(this.$parent)
      console.log(this.$refs)

    },
    toggleSelection(rows) {
      //选项卡
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      // console.log(val,'val');
      this.multipleSelection = val;
    },
    deleteSelectedRow(){
      // console.log(this.multipleSelection)
      // console.log(this.tableData);
      for(let i=0; i<this.multipleSelection.length; i++){
        for (let [index,value] of Object.entries(this.tableData)) {
          if(value.goodsId == this.multipleSelection[i].goodsId){
            this.tableData.splice(index,1)
          }
        }
      }
      this.multipleSelection =[];
      this.dialogVisible = false
    }
  },
  render() {
    //无效
    return ('div', {
      'class': {
        btn: true,
        success: this.type === 'success',
        error: this.type === 'error',
        warm: this.type === 'warm',
        default: this.type === 'default'
      }
    })
  }
}
</script>

<style lang="less">
@import '../assets/css/var';
@import '../assets/css/reset';
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
#pane-second{
  padding: 25px
}
.el-tabs--card>.el-tabs__header .el-tabs__nav:first-child{
  border-left:none

}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color:none;
}
.pos .el-col {
  border-radius: 4px;
  background-color:@backgroundColor_white
}
.el-table .cell{
  text-align: left;
}
.el-tabs__item{
  height:59px;
  line-height: 59px;
}
.often-goods-list ul {text-align:left}
.often-goods-list ul li{
  padding-right:10px;
  padding-bottom:10px;
  display:inline-block
}


/*
  选择区域2*/
.typeGoods .el-tabs__header{
  margin-bottom:0
}
.typeGoods .el-tabs__content{
  border:1px solid #e4e7ed;
  border-top:none;
  padding-top:20px
}
.typeGoods .el-tabs__header .el-tabs__nav:first-child{
  border-left:1px solid #e4e7ed
}
.cookList{ text-align:left;
padding-left:2%}
.cookList li{
       list-style: none;
       width:30%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       margin: 2px;
       display:inline-block

   }
   .cookList li span{
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 13px;
       padding-left: 10px;
       color:brown;
       margin-top:10px

   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
   .result{
     padding: 25px 0
   }
</style>
