<template>
  <div class="index-container">
    <a-radio-group
      :defaultValue="currentComponentName"
      button-style="solid"
      @change="handleChange"
    >
      <a-radio-button value="camera">相机控制</a-radio-button>
      <a-radio-button value="photo">照片浏览</a-radio-button>
      <a-radio-button value="user">用户设置</a-radio-button>
    </a-radio-group>
    <div class="component-wrapper">
      <component :is="currentComponentName"></component>
    </div>
  </div>
</template>

<script>
  // https://www.antdv.com/docs/vue/introduce-cn/
  import user from '@/views/components/user'
  import photo from '@/views/components/photo'
  import camera from '@/views/components/camera'

  export default {
    name: 'home-page',
    data() {
      return {
        value: 1,
        mode: 'top',
        currentComponentName: 'camera',
      }
    },
    methods: {
      handleChange(e) {
        this.currentComponentName = e.target.value
      },
      callback(val) {
        console.log(val)
      },
    },
    components: {
      user,
      photo,
      camera,
    },
  }
</script>

<style lang="less" scoped>
  ::v-deep.ant-radio-group {
    display: flex;
  }
  ::v-deep.ant-radio-button-wrapper {
    flex: 1;
    text-align: center;
  }
  .component-wrapper {
    margin-top: 5px;
  }
</style>
