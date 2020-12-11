<template>
  <div>
    <div>
      <h4>当地日夜景转换时间</h4>
      <div class="time-range-wrapper">
        <ul>
          <li>
            <div>
              <a-time-picker v-model:value="Sunrise">
                <template #suffixIcon><CaretDownOutlined /></template>
              </a-time-picker>
            </div>
            <p>日出时间</p>
          </li>
          <li>
            <div>
              <a-time-picker v-model:value="Sunset">
                <template #suffixIcon><CaretDownOutlined /></template>
              </a-time-picker>
            </div>
            <p>日落时间</p>
          </li>
        </ul>
        <div class="button-wrapper">
          <a-button
            type="primary"
            :disabled="Sunrise == '' || Sunset == ''"
            :loading="daynighttimeLoading"
            @click="handleDaynighttime"
          >
            {{ daynighttimeLoading ? '提交中' : '提交' }}
          </a-button>
          <a-button
            type="primary"
            :disabled="Sunrise == '' || Sunset == ''"
            :loading="autoswitchLoading"
            @click="handleAutoswitch"
          >
            {{ autoswitchLoading ? '开启中' : '开启' }}
          </a-button>
        </div>
      </div>
    </div>
    <a-form
      class="change-pass-wrapper"
      name="custom-validation"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
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
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <div class="device-ctrl-box">
      <div class="button-wrapper">
        <a-button
          type="primary"
          :loading="clearPhotoLoading"
          @click="handleClearPhoto"
        >
          删除照片
        </a-button>
        <a-button type="primary" @click="handleLoginout">退出登录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import {
    updatePassword,
    daynighttime,
    autoswitch,
    deletephotos,
  } from '@/api/user'
  import { CaretDownOutlined } from '@ant-design/icons-vue'
  import { recordRoute } from '@/config'

  export default {
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
        Sunrise: '',
        Sunset: '',
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
      async handleClearPhoto() {
        console.log('清除')
        this.clearPhotoLoading = true
        const res = await deletephotos()
        if (res) {
          this.clearPhotoLoading = false
          console.log(res, '// res in deletephotos')
        }
      },
      // 密码表单
      handleFinish(values) {
        console.log(values, '// finish')
        this.handleUpdatePassword()
      },
      // 密码表单
      async handleUpdatePassword() {
        const res = await updatePassword(this.ruleForm)
        console.log(res, '// res')
      },
      // 密码表单
      handleFinishFailed(errors) {
        console.log(errors, '// failed')
      },
      // 日出日落时间提交
      async handleDaynighttime() {
        if (this.Sunrise == '' || this.Sunset == '') return
        this.daynighttimeLoading = true
        const res = await daynighttime({
          Sunrise: this.Sunrise,
          Sunset: this.Sunset,
        })
        if (res) {
          setTimeout(() => {
            this.daynighttimeLoading = false
            console.log(res, '// ressssssss')
          }, 3333)
        }
      },

      // 基于日出日落开启
      async handleAutoswitch() {
        if (this.Sunrise == '' || this.Sunset == '') return
        this.autoswitchLoading = true
        const res = await autoswitch({
          data: {
            Sunrise: this.Sunrise,
          },
        })
        if (res) {
          setTimeout(() => {
            this.autoswitchLoading = false
            console.log(res, '// ressssssss')
          }, 3333)
        }
      },
    },
    components: {
      CaretDownOutlined,
    },
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
        div {
          /deep/.ant-time-picker {
            width: 100%;
            height: @text-height;
            /deep/.ant-time-picker-input {
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
  }
  .change-pass-wrapper {
    padding: 10px;
    border: 1px solid @borderColor;
    border-radius: 2px 0 0 2px;
    color: @primary-color;
    padding-bottom: 0;
    /deep/.ant-form-item:last-child {
      margin-bottom: 10px;
    }
    /deep/.ant-form-item {
      flex: 1;
      width: 100%;
      margin-bottom: 10px;
      /deep/.ant-col {
        width: 100%;
      }
      /deep/input {
        height: @text-height;
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
    padding: 10px;
    border: 1px solid @borderColor;
    border-radius: 2px 0 0 2px;
    color: @primary-color;
  }
</style>
