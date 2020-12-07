<template>
  <div>
    <div>
      <h4>当地日夜景转换时间</h4>
      <div>
        <ul>
          <li>
            <div>
              <a-time-picker v-model:value="Sunrise" size="small" />
            </div>
            <span>日出时间</span>
          </li>
          <li>
            <div>
              <a-time-picker v-model:value="Sunset" size="small" />
            </div>
            <span>日落时间</span>
          </li>
        </ul>
      </div>
      <div>
        <button @click="handleDaynighttime">提交</button>
        <button @click="handleAutoswitch">开启</button>
      </div>
    </div>
    <a-form
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
          v-model:value="ruleForm.pass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback name="checkPass">
        <a-input
          v-model:value="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import { updatePassword, daynighttime, autoswitch } from '@/api/user'

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
          wrapperCol: { span: 14 },
        },
        Sunrise: '',
        Sunset: '',
      }
    },
    methods: {
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
        if (this.Sunrise !== '' && this.Sunset !== '') {
          const res = await daynighttime({
            Sunrise: this.Sunrise,
            Sunset: this.Sunset,
          })
          console.log(res, '// ressssssss')
        }
      },

      // 基于日出日落开启
      async handleAutoswitch() {
        const res = await autoswitch({
          data: {
            Sunrise: this.Sunrise,
          },
        })
        console.log(res, '// ressssssss')
      },
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
</style>
