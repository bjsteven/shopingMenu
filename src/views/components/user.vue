<template>
  <div>
    <div>
      <h4>当地日夜景转换时间</h4>
      <div class="time-range-wrapper">
        <ul>
          <li>
            <div class="time-picker" @click="handlePicker('Sunrise')">
              {{ Sunrise ? Sunrise : '-' }}
              <!-- <a-time-picker
                v-model:value="Sunrise"
                format="HH:mm"
                :inputReadOnly="true"
                style="width: 80%"
              >
                <template #suffixIcon><CaretDownOutlined /></template>
              </a-time-picker> -->
            </div>
            <p>日出时间</p>
          </li>
          <li>
            <div class="time-picker" @click="handlePicker('Sunset')">
              {{ Sunset ? Sunset : '-' }}
              <!-- <a-time-picker
                v-model:value="Sunset"
                format="HH:mm"
                :inputReadOnly="true"
              >
                <template #suffixIcon><CaretDownOutlined /></template>
              </a-time-picker> -->
            </div>
            <p>日落时间</p>
          </li>
        </ul>
        <div class="button-wrapper">
          <a-button
            type="primary"
            :loading="daynighttimeLoading"
            @click="handleDaynighttime"
          >
            {{ daynighttimeLoading ? '提交中' : '提交' }}
          </a-button>
          <a-button
            type="primary"
            :loading="autoswitchLoading"
            @click="handleAutoswitch"
          >
            {{
              autoswitchLoading
                ? '开启中'
                : currentModeType === 'user'
                ? '开启AUTO'
                : '开启User'
            }}
          </a-button>
        </div>
      </div>
    </div>
    <h4>用户密码</h4>
    <a-form
      class="change-pass-wrapper"
      name="custom-validation"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      style="margin: 10px 0"
    >
      <a-form-item required has-feedback name="pass">
        <a-input
          placeholder="Password(修改密码)"
          v-model:value="ruleForm.pass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback name="checkPass">
        <a-input
          placeholder="CheckPassword(确认密码)"
          v-model:value="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item>
        <a-button style="width: 100%" type="primary" html-type="submit">
          用户密码修改
        </a-button>
      </a-form-item>
    </a-form>
    <h4>系统控制</h4>
    <div class="device-ctrl-box">
      <div class="button-wrapper">
        <a-button
          type="primary"
          :loading="clearPhotoLoading"
          @click="handleClearPhoto"
        >
          删除照片
        </a-button>
        <a-button type="primary" @click="handleDownload">批量下载</a-button>
        <a-button type="primary" @click="handleLoginout">退出登录</a-button>
      </div>
    </div>
    <van-popup :show="showPicker" position="bottom">
      <!-- <div style="padding: 55px 15px; color: red">test</div> -->
      <DatetimePicker
        v-model="currentTime"
        type="time"
        title="选择时间"
        :min-hour="0"
        :max-hour="24"
        @confirm="onConfirm"
        @cancel="
          () => {
            showPicker = false
          }
        "
      />
    </van-popup>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import {
    passwordchange,
    daynighttime,
    autoswitch,
    deletephotos,
    getDownload,
  } from '@/api/user'
  import { CaretDownOutlined } from '@ant-design/icons-vue'
  import { recordRoute } from '@/config'
  import { message, notification } from 'ant-design-vue'
  import { mapGetters } from 'vuex'
  import { getDeviceInfo, CamSwitch } from '@/api/deviceinfo'

  import { DatetimePicker, Popup } from 'vant'
  import 'vant/lib/index.less'

  export default {
    computed: {
      ...mapGetters({
        allData: 'camera/allData',
        currentModeType: 'camera/currentModeType',
      }),
      currentTime: {
        get(val) {
          return this[`${this.pickerName}`]
        },
      },
    },
    data() {
      let validatePass = async (rule, value) => {
        if (value === '') {
          return Promise.reject('Please input the password')
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          return Promise.resolve()
        }
      }
      let validatePass2 = async (rule, value, callback) => {
        if (value === '') {
          return Promise.reject('Please input the password again')
        } else if (value !== this.ruleForm.pass) {
          return Promise.reject("Two inputs don't match!")
        } else {
          return Promise.resolve()
        }
      }
      return {
        daynighttimeLoading: false,
        autoswitchLoading: false,
        clearPhotoLoading: false,
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'change' }],
          checkPass: [{ validator: validatePass2, trigger: 'change' }],
        },
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 24 },
        },
        Sunrise: '06:30',
        Sunset: '18:30',
        pickerName: null,
        showPicker: false,
      }
    },
    methods: {
      async handleLoginout() {
        await this.$store.dispatch('user/logout')
        if (recordRoute) {
          const fullPath = this.$route.fullPath
          this.$router.push(`/login?redirect=${fullPath}`)
        } else {
          this.$router.push('/login')
        }
      },
      async handleDownload() {
        const res = await getDownload()
        console.log(res, '// res')
        const _this = this
        if (res && res.downloadlink) {
          this.$confirm({
            title: '下载',
            okText: '新窗口打开',
            cancelText: '关闭',
            content: res.downloadlink,
            onOk() {
              return new Promise((resolve, reject) => {
                window.open(res.downloadlink, '_blank')
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              }).catch(() => console.log('Oops errors!'))
            },
          })
        }
      },
      async handleClearPhoto() {
        const _this = this
        this.$confirm({
          title: '提示',
          content: '确定删除吗',
          async onOk() {
            _this.clearPhotoLoading = true
            const query = {
              deletephotos: 'yes',
            }
            const res = await deletephotos(query)
            if (res && res.status && res.status === 'succ') {
              message.success(`删除成功!`)
            }
            _this.clearPhotoLoading = false
          },
          onCancel() {},
        })
      },
      // 密码表单
      handleFinish(values) {
        console.log(values, '// finish')
        this.handleUpdatePassword()
      },
      // 密码表单
      async handleUpdatePassword() {
        const query = {
          newpassword: this.ruleForm.pass,
        }
        const res = await passwordchange(query)
        if (res && res.status && res.status === 'succ') {
          message.success(`修改成功!`)
        }
      },
      // 密码表单
      handleFinishFailed(errors) {
        console.log(errors, '// failed')
      },
      //  提交
      async handleDaynighttime() {
        if (this.Sunrise == '' || this.Sunset == '') {
          message.error(`请选择日出日落时间`)
          return
        }
        this.daynighttimeLoading = true
        const res = await daynighttime({
          Sunrise: this.Sunrise,
          Sunset: this.Sunset,
        })

        if (res) {
          console.log(res, '// res')

          this.daynighttimeLoading = false
        }
      },

      //  开启
      async handleAutoswitch() {
        this.autoswitchLoading = true
        const query = {
          Modeset: this.currentModeType,
        }
        console.log(this.currentModeType, '// currentModeType in frontEnd')
        if (this.currentModeType === 'user') {
          query['Modeset'] = 'auto'
          query['auto'] = toList(this.allData['auto'])
          query['night'] = toList(this.allData['night'])
        } else {
          query['user'] = toList(this.allData['user'])
          query['Modeset'] = 'user'
        }
        const res = await autoswitch(query)
        if (res) {
          console.log(res, '// response in autoswitch')
          const deviceInfo = await getDeviceInfo()
          const { CurrentMode } = deviceInfo
          this.$store.commit('camera/setCurrentModeType', CurrentMode)
          console.log(CurrentMode, '// CurrentMode in deviceInfo')
          // this.$store.commit('camera/setCurrentModeType', e.target.value)
          this.autoswitchLoading = false
        }
      },

      handlePicker(name) {
        this.pickerName = name
        this.showPicker = true
      },

      onConfirm(item) {
        this.showPicker = false
        this[`${this.pickerName}`] = item
        this.$nextTick(() => {
          this.pickerName = null
          console.log(this.pickerName, '// pickerName')
        })
      },
    },
    components: {
      CaretDownOutlined,
      DatetimePicker,
      'van-popup': Popup,
    },
  }
  function toList(obj) {
    const res = []
    Object.keys(obj).forEach((key) => {
      const value = obj[key].defaultValue
      res.push({
        [`${key}`]: value,
      })
    })
    return res
  }
</script>

<style lang="less" scoped>
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    align-items: center;
    li {
      list-style: none;
    }
  }
  h4 {
    color: @borderColor;
  }
  .button-wrapper {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-flow: row;
    button {
      flex: 1;
      margin: 0 10px;
      line-height: @text-height;
      height: @text-height;
    }
  }
  .time-range-wrapper {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid @borderColor;
    border-radius: 2px 0 0 2px;
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      display: flex;
      flex-flow: row;
      li {
        margin: 0 10px;
        list-style: none;
        padding: 0;
        text-align: center;
        width: 40%;
        div {
          ::v-deep.ant-time-picker {
            width: 100%;
            height: @text-height;
            ::v-deep.ant-time-picker-input {
              height: 100%;
            }
          }
        }
        p {
          color: @borderColor;
          font-size: 16px;
          padding-top: 5px;
          margin: 0;
          margin-bottom: 10px;
        }
      }
    }
    .time-picker {
      color: @borderColor;
      font-size: 24px;
      border: 1px solid @borderColor;
      width: 100%;
    }
  }
  .change-pass-wrapper {
    padding: 10px;
    border: 1px solid @borderColor;
    border-radius: 2px 0 0 2px;
    color: @primary-color;
    padding-bottom: 0;
    ::v-deep.ant-form-item:last-child {
      margin-bottom: 10px;
    }
    ::v-deep.ant-form-item {
      flex: 1;
      width: 100%;
      margin-bottom: 10px;
      ::v-deep.ant-col {
        width: 100%;
      }
      ::v-deepinput {
        height: @text-height;
      }
    }
  }
  ::v-deep.ant-btn {
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
    padding: 10px;
    border: 1px solid @borderColor;
    border-radius: 2px 0 0 2px;
    color: @primary-color;
  }
</style>
