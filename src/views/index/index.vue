<template>
  <div class="index-container">
    <div>
      <h4>{{ date0 }}</h4>
      <h5>
        {{ date1 }}
        <span>{{ date2 }}</span>
      </h5>
    </div>
    <div class="device-status-wrapper">
      <ul v-if="deviceInfoData">
        <li>
          <i class="a1"></i>
          <span>{{ deviceInfoData.BatteryVol }}</span>
        </li>
        <li>
          <i class="a2"></i>
          <span>{{ deviceInfoData.MemoryVol }}</span>
        </li>
        <li>
          <i class="a3"></i>
          <span>{{ deviceInfoData.CPUtemp }}℃</span>
        </li>
        <li>
          <i class="a4"></i>
          <span>{{ deviceInfoData.CPUusage }}%</span>
        </li>
        <li>
          <i class="a5"></i>
          <span>{{ deviceInfoData.isCharged }}</span>
        </li>
        <li>
          <i class="a6"></i>
          <span>{{ deviceInfoData.CamIsOn }}</span>
        </li>
      </ul>
    </div>
    <div class="device-ctrl-box" v-if="deviceInfoData">
      <div class="button-wrapper">
        <a-button
          type="primary"
          @click="handleCamSwitch"
          :loading="camSwitchLoading"
        >
          {{ camIsOn ? '拍摄中' : '待机中' }}
        </a-button>
      </div>
    </div>
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
    <div
      style="
        text-align: center;
        font-size: 12px;
        padding: 14px;
        color: #fff;
        padding-top: 33px;
      "
    >
      FARPOV 版权所有 备案号：湘ICP备2020019150号-1
    </div>
  </div>
</template>

<script>
  // https://www.antdv.com/docs/vue/introduce-cn/
  import user from '@/views/components/user'
  import photo from '@/views/components/photo'
  import camera from '@/views/components/camera'
  import moment from 'moment'
  import { getDeviceInfo, CamSwitch, getDevicesetup } from '@/api/deviceinfo'
  import { mapGetters } from 'vuex'
  import lodash from 'lodash'
  import MobileDetect from 'mobile-detect'

  export default {
    name: 'home-page',
    mounted() {
      const allDate = new Date()
      const date = moment(allDate).format('LLLL').split(',')
      this.date0 = date[0]
      this.date1 = date[1]
      this.date2 = allDate.getFullYear()
      this.handleGetDeviceInfo()
      this.handleGetDevicesetup()
      this.handleGetBrowserInfo()
    },
    data() {
      return {
        deviceInfoData: null,
        date0: '',
        date1: '',
        date2: '',
        value: 1,
        mode: 'top',
        currentComponentName: 'camera',
        camSwitchLoading: false,
      }
    },
    methods: {
      handleGetBrowserInfo() {
        const md = new MobileDetect(global.navigator.userAgent)
        console.log(md, '// ssssssssss')
        // this.$store.commit('setDesktop', md.mobile())
      },
      handleChange(e) {
        this.currentComponentName = e.target.value
      },
      callback(val) {
        console.log(val)
      },
      async handleGetDeviceInfo() {
        const res = await getDeviceInfo()
        this.deviceInfoData = res
        const { CurrentMode } = res
        this.$store.commit('camera/setCurrentModeType', CurrentMode)
      },
      async handleGetDevicesetup() {
        const res = await getDevicesetup()
        console.log(res, '// devicesetup res')
        console.log(this.allData, '// this.allData')
        const { data } = res
        if (data) {
          let newData = {}
          Object.keys(data).forEach((mode) => {
            newData[mode] = {}
            data[mode].forEach((item) => {
              newData[mode] = {
                ...newData[mode],
                ...item,
              }
            })
          })
          newData['user'] = lodash.cloneDeep(newData['auto'])
          Object.keys(this.allData).forEach((mode) => {
            if (this.allData[mode]) {
              for (let key in this.allData[mode]) {
                if (newData[mode] && newData[mode][key]) {
                  // console.group('-----------')
                  // console.log(key, '// key')
                  // console.log(newData[mode][key], '// item')
                  // console.log(this.allData[mode][key].defaultValue, '// ddd')
                  // console.groupEnd()
                  this.allData[mode][key]['defaultValue'] = newData[mode][key]
                }
              }
            }
          })
        }
      },
      async handleCamSwitch() {
        this.camSwitchLoading = true
        const query = {
          Mode: this.currentModeType,
          CamIsOn: this.camIsOn ? 'OFF' : 'ON',
          // options: {},
        }
        // Object.keys(this.allData[this.currentModeType]).forEach((it) => {
        //   query.options[it] = this.allData[this.currentModeType][
        //     it
        //   ].defaultValue
        // })
        console.log(query, '// queryqueryquery')

        const res = await CamSwitch(query)
        if (res.status === 'succ') {
          this.camSwitchLoading = false
          // 重新更新设备信息
          this.handleGetDeviceInfo()
        }
      },
    },
    computed: {
      ...mapGetters({
        allData: 'camera/allData',
        currentModeType: 'camera/currentModeType',
      }),
      camIsOn() {
        return (
          this.deviceInfoData &&
          this.deviceInfoData.CamIsOn &&
          this.deviceInfoData.CamIsOn === 'ON'
        )
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
  .index-container {
    padding: 5px;
  }
  ::v-deep.ant-radio-group {
    display: flex;
    height: 44px;
    line-height: 44px;
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
  .component-wrapper {
    margin-top: 5px;
  }
  h4 {
    color: @borderColor;
    font-size: 22px;
    margin-bottom: 5px;
  }
  h5 {
    color: @borderColor;
    margin-top: 2px;
    font-size: 18px;
    padding-left: 10px;
  }
  .device-status-wrapper {
    color: @borderColor;
    padding: 15px;
    ul {
      padding: 0;
      margin: 0;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      li {
        list-style: none;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        i {
          width: 30px;
          height: 33px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
        }
        i.a1 {
          background-image: url('../../assets/icons/a1.png');
        }
        i.a2 {
          background-image: url('../../assets/icons/a2.png');
        }
        i.a3 {
          background-image: url('../../assets/icons/a3.png');
        }
        i.a4 {
          background-image: url('../../assets/icons/a4.png');
        }
        i.a5 {
          background-image: url('../../assets/icons/a5.png');
        }
        i.a6 {
          background-image: url('../../assets/icons/a6.png');
        }
      }
    }
  }
  /deep/.ant-btn {
    padding: 0 10px;
    border: 1px solid @borderColor;
    border-radius: 2px 0 0 2px;
    background: @borderColor;
    color: @primary-color;
    height: @text-height;
    &::disabled {
      color: red;
    }
  }
  .device-ctrl-box {
    margin: 10px 0;
    padding: 0;
    border-radius: 2px 0 0 2px;
    color: @primary-color;
    text-align: right;
  }
</style>
