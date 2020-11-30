<template>
  <a-form
    layout="inline"
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item>
      <a-input
        ref="name"
        name="name"
        label="Instant delivery"
        v-model:value="form.name"
        placeholder="Username"
      >
        <template #prefix>
          <a-icon style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        ref="password"
        v-model:value="form.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix>
          <vab-icon icon="24-hours-fill"></vab-icon>
        </template>
      </a-input>
    </a-form-item>

    <!-- <a-form-item ref="name" label="Activity name" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item> -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        other: '',
        form: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: 'Please input Activity name',
              trigger: 'blur',
            },
            {
              min: 3,
              max: 5,
              message: 'Length should be 3 to 5',
              trigger: 'blur',
            },
          ],
          password: [
            {
              required: true,
              message: 'Please input Activity name',
              trigger: 'blur',
            },
            {
              min: 3,
              max: 5,
              message: 'Length should be 3 to 5',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs.ruleForm
          .validate()
          .then(() => {
            console.log('values', this.form)
          })
          .catch((error) => {
            console.log('error', error)
          })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
    },
  }
</script>
