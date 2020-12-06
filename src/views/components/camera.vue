<template>
  <div class="camera-container">
    <a-radio-group
      :defaultValue="currentModeType"
      button-style="solid"
      @change="handleChange"
    >
      <a-radio-button value="Auto">Auto</a-radio-button>
      <a-radio-button value="Night">Night</a-radio-button>
      <a-radio-button value="user">User</a-radio-button>
    </a-radio-group>
    <div>
      <ul class="device-option-list">
        <li>
          <dl>
            <dt>
              <button @click="handlerFetch">sss</button>
            </dt>
            <dd>
              <a-select
                size="default"
                :default-value="this.allData.shutter.defaultValue"
                placeholder="选择"
                @change="handleSelectChange"
              >
                <a-select-option
                  v-for="item in this.allData.shutter.options"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
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
  import { getList } from '@/api/camera'
  import allData from '@/utils/detail.json'

  export default {
    name: 'camera',
    data() {
      return {
        currentModeType: 'Auto',
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
        allData,
      }
    },
    mounted() {},
    computed: {
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
      handlerFetch() {
        this.loading = true
        getList({
          pageSize: this.pagination.pageSize,
          current: this.pagination.current,
        }).then(({ data, total }) => {
          console.log(data, '// data')
          const pagination = { ...this.pagination }
          pagination.total = total
          this.loading = false
          this.data = data
          this.pagination = pagination
        })
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
      padding-bottom: 5px;
      border-bottom: 1px solid @borderColor;
      dl {
        padding: 0 10px;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        dt {
          flex: 1;
          background: #e1e1e1;
          margin: 0;
        }
        dd {
          margin: 0;
          width: 30%;
        }
      }
    }
  }
  ::v-deep.ant-radio-group {
    display: flex;
  }
  ::v-deep.ant-radio-button-wrapper {
    flex: 1;
    text-align: center;
  }
  ::v-deep.ant-select {
    width: 100%;
  }
</style>
