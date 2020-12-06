<template>
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
</template>

<script>
  /* eslint-disable no-unused-vars */
  import { updatePassword } from '@/api/user'

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
      }
    },
    methods: {
      handleFinish(values) {
        console.log(values, '// finish')
        this.handleUpdatePassword()
      },
      async handleUpdatePassword() {
        const res = await updatePassword(this.ruleForm)
        console.log(res, '// res')
      },
      handleFinishFailed(errors) {
        console.log(errors, '// failed')
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
    },
  }
</script>
