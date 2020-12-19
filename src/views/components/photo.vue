<template>
  <div class="photo-wrapper">
    <div class="loading-wrapper" v-if="loading">
      <a-spin />
    </div>
    <div class="photo-box" v-else>
      <div class="photo-des-box">
        <ul>
          <li class="icon-1">照片数量：{{ totalpage }}</li>
          <li class="icon-2">可拍照片：{{ totalphoto }}</li>
        </ul>
      </div>
      <div class="photo-list">
        <span
          v-for="(item, index) in data"
          @click="() => showSingle(index)"
          :key="item.id"
        >
          <img :src="item.src" />
        </span>
      </div>
      <a-pagination
        size="small"
        @change="paginationChange"
        v-model:current="pageIndex"
        :total="totalphoto"
      />
    </div>
    <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
  import { photolisting } from '@/api/photo'
  // https://github.com/XiongAmao/vue-easy-lightbox
  import VueEasyLightbox from 'vue-easy-lightbox'
  export default {
    name: 'photo',
    components: {
      VueEasyLightbox,
    },
    data() {
      return {
        imgs: [],
        visible: false,
        index: 0, // default: 0
        pageIndex: 1,
        totalphoto: 0,
        totalpage: 0,
        loading: true,
        data: [],
      }
    },
    mounted() {
      this.handlerFetch()
    },
    methods: {
      async handlerFetch(pageIndex = null) {
        this.loading = true
        const res = await photolisting({
          // pageSize: this.pageSize,
          page: pageIndex == null ? this.pageIndex : pageIndex,
        })
        if (res && res.status && res.status === 'succ') {
          this.totalpage = res.totalpage
          this.totalphoto = res.totalphoto
          this.data = res.items
        }
        this.loading = false
      },
      showSingle(index) {
        this.imgs = this.data
        this.index = index
        this.show()
      },
      show() {
        this.visible = true
      },
      handleHide() {
        this.visible = false
      },
      paginationChange(val) {
        this.handlerFetch(val)
      },
    },
  }
</script>

<style lang="less" scoped>
  .photo-list {
    border: 1px dashed @borderColor;
    padding: 5px;
    span {
      width: 33.3%;
      display: inline-block;
      padding: 6px;
      img {
        width: 100%;
        min-height: 50px;
      }
    }
  }
  .loading-wrapper {
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
  .photo-des-box {
    ul {
      margin: 0;
      padding: 10px;
      li {
        list-style: none;
        color: @borderColor;
        position: relative;
      }
      li::before {
        position: relative;
        width: 19px;
        height: 16px;
        content: '';
        display: inline-block;
      }
      li.icon-1::before {
        background: url('../../assets/icons/icon-1.png') center left no-repeat;
        background-size: contain;
      }
      li.icon-2::before {
        background: url('../../assets/icons/icon-2.png') center left no-repeat;
        background-size: contain;
        left: 5px;
      }
    }
  }
  .photo-box {
    /deep/.ant-pagination-item-active {
      background: none;
      border-color: @borderColor;
      color: @borderColor;
    }
    /deep/.ant-pagination-item {
      border: none;
      color: @borderColor;
    }
    /deep/.ant-pagination-item a,
    /deep/.ant-pagination-jump-next {
      color: @borderColor !important;
    }
  }
</style>
