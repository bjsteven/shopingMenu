<template>
  <div class="camera-container">
    <a-radio-group
      :defaultValue="currentModeType"
      button-style="solid"
      @change="handleChange"
    >
      <a-radio-button value="auto">Auto</a-radio-button>
      <a-radio-button value="night">Night</a-radio-button>
      <a-radio-button value="user">User</a-radio-button>
    </a-radio-group>
    <div>
      <ul class="device-option-list">
        <li v-for="item in allData[`${currentModeType}`]" :key="item.name">
          <dl>
            <dt>
              {{ item.name }}
            </dt>
            <dd>
              <a-select
                size="default"
                :default-value="item.defaultValue"
                placeholder="选择"
                @change="handleSelectChange"
              >
                <a-select-option
                  v-for="it in item.options"
                  :key="it.id"
                  :value="it.value"
                >
                  {{ it.value }}
                </a-select-option>
              </a-select>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'camera',
    data() {
      return {
        formLayout: 'horizontal',
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        // test
        loading: true,
        pagination: {
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSize: 6,
          current: 1,
        },
        data: [
          {
            id: '',
          },
        ],
        query: {},
      }
    },
    mounted() {
      console.log(this.routes, '// routes')
      console.log(this.$store.state, '// mapState')
    },
    computed: {
      ...mapGetters({
        allData: 'camera/allData',
        currentModeType: 'camera/currentModeType',
      }),
      formItemLayout() {
        const { formLayout } = this
        return formLayout === 'horizontal'
          ? {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            }
          : {}
      },
      buttonItemLayout() {
        const { formLayout } = this
        return formLayout === 'horizontal'
          ? {
              wrapperCol: { span: 14, offset: 4 },
            }
          : {}
      },
    },
    methods: {
      handleFormLayoutChange(e) {
        this.formLayout = e.target.value
      },
      handleChange(e) {
        this.currentModeType = e.target.value
      },
      handleSelectChange(value) {
        console.log(`Selected: ${value}`)
      },
    },
  }
</script>

<style lang="less" scoped>
  .device-option-list {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      padding: 5px 0;
      border-bottom: 1px solid @borderColor;
      dl {
        margin: 0;
        padding: 0 10px;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        dt {
          margin: 0;
          width: 60%;
          color: @borderColor;
        }
        dd {
          margin: 0;
          flex: 1;
        }
      }
    }
  }
  ::v-deep.ant-radio-group {
    display: flex;
    height: 44px;
    line-height: 44px;
    background: @backgroundColor;
  }
  ::v-deep.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
  ::v-deep.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active,
  ::v-deep.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    background: #575959;
    border-color: @borderColor;
  }
  ::v-deep.ant-radio-button-wrapper {
    flex: 1;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background: none;
    color: @borderColor;
  }
  ::v-deep.ant-select {
    width: 100%;
  }
</style>
