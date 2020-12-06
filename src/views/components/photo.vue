<template>
  <div class="photo-wrapper">
    <div class="loading-wrapper" v-if="loading">
      <a-spin />
    </div>
    <div class="photo-list" v-else>
      <span
        v-for="(item, index) in data"
        @click="() => showSingle(index)"
        :key="item.id"
      >
        <img :src="item.src" />
      </span>
    </div>
    <a-pagination
      @change="paginationChange"
      v-model:current="pageIndex"
      :total="totalphoto"
    />

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
      handlerFetch(pageIndex = null) {
        this.loading = true
        photolisting({
          // pageSize: this.pageSize,
          page: pageIndex == null ? this.pageIndex : pageIndex,
        }).then(({ data }) => {
          this.totalphoto = data.totalphoto
          this.totalphoto = data.totalphoto
          this.data = data.items
          this.loading = false
        })
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
</style>
