<template>
  <div>
    <a-card class="mb-4" title="Cài đặt bảo mật 2 lớp" :bordered="false">
      <a-radio-group v-model="value" @change="onChange">
        <a-radio :style="radioStyle" :value="1"> Mật khẩu </a-radio>
        <a-radio :style="radioStyle" :value="2"> Google authenticator </a-radio>
      </a-radio-group>
    </a-card>
    <a-card title="Đổi mật khẩu" :bordered="false">
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item has-feedback label="Mật khẩu hiện tại" prop="pass">
          <a-input-password v-model="ruleForm.pass" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Mật khẩu mới" prop="newPassword">
          <a-input-password v-model="ruleForm.newPassword" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          label="Xác nhận mật khẩu"
          prop="confirmNewPassword"
        >
          <a-input-password v-model="ruleForm.confirmNewPassword" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="handleSubmit">
            Đổi mật khẩu
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      value: 1,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
      },
      ruleForm: {
        pass: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      rules: {
        pass: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu cũ",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
            trigger: "blur",
          },
        ],
        confirmNewPassword: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(123);
        }
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
