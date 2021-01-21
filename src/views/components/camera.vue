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
        <li
          v-for="item in allData[`${currentModeType}`]"
          :key="item.name"
          @click="handlePicker(item.name)"
        >
          <dl>
            <dt>{{ item.name }}：</dt>
            <dd>{{ item.defaultValue }} ></dd>
            <!-- <dd>
              <a-select
                size="default"
                v-model:value="item.defaultValue"
                placeholder="选择"
                optionFilterProp="children"
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
            </dd> -->
          </dl>
        </li>
      </ul>
    </div>

    <van-popup :show="showPicker" position="bottom">
      <van-picker
        show-toolbar
        v-if="pickerItemOptions"
        :columns="pickerItemOptions"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Picker, Popup } from 'vant'
  import 'vant/lib/index.less'

  /* eslint-disable no-unused-vars */
  import { mapGetters } from 'vuex'

  export default {
    name: 'camera',
    components: {
      'van-picker': Picker,
      'van-popup': Popup,
    },
    data() {
      return {
        showPicker: false,
        pickerName: null,
      }
    },
    computed: {
      ...mapGetters({
        allData: 'camera/allData',
        currentModeType: 'camera/currentModeType',
      }),
      pickerItemOptions() {
        if (this.pickerName) {
          // return ['山东', '潍坊']
          return this.allData[this.currentModeType][
            this.pickerName
          ].options.map((it) => it.value)
        } else {
          // return ['北京', '上海']
          return []
        }
      },
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
      onConfirm(item) {
        // console.log(item, '// onConfirm')
        // console.log(this.currentModeType, '// currentModeType')
        // console.log(this.pickerName, '// pickerName')
        this.allData[this.currentModeType][this.pickerName].defaultValue = item
        this.showPicker = false
      },
      handlePicker(name) {
        this.pickerName = name
        this.showPicker = true
      },
      // handleFormLayoutChange(e) {
      //   this.formLayout = e.target.value
      // },
      handleChange(e) {
        this.$store.commit('camera/setCurrentModeType', e.target.value)
      },
      // handleSelectChange(item) {
      //   console.log(item.id, '// item')
      // },
    },
  }
</script>

<style lang="less" scoped>
  .device-option-list {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      padding: 9px 0;
      border-bottom: 1px solid @borderColor;
      dl {
        margin: 0;
        padding: 0 10px;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        dt {
          display: inline-block;
          color: @borderColor;
        }
        dd {
          color: @borderColor;
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
