<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="email" label="Email" prop="email">
      <a-input placeholder="Email" v-model="form.email" />
    </a-form-model-item>
    <a-form-model-item ref="password" label="Mật khẩu" prop="password">
      <a-input-password
        @input="inputPassword"
        placeholder="Mật khẩu"
        v-model="form.password"
      />
    </a-form-model-item>
    <a-form-model-item
      ref="password_confirmation"
      label="Nhập lại"
      prop="password_confirmation"
    >
      <a-input-password
        placeholder="Nhập lại mật khẩu"
        v-model="form.password_confirmation"
      />
    </a-form-model-item>
    <a-form-model-item label="Phân quyền" prop="role">
      <a-select v-model="form.role" placeholder="Chọn quyền">
        <a-select-option :value="1">Admin</a-select-option>
        <a-select-option :value="0"> Người dùng </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
      <a-button type="primary" @click="onSubmit"> Thêm mới </a-button>
      <a-button style="margin-left: 10px" @click="resetForm">
        Đặt lại
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      other: "",
      form: {
        email: "",
        password: "",
        password_confirmation: "",
        role: undefined,
      },
      rules: {
        email: [
          {
            required: true,
            message: "Vui lòng nhập email.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Vui lòng nhập đúng định dạng email",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới.",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Nhập mật khẩu lớn hơn 8 kí tự",
            trigger: "blur",
          },
        ],
        password_confirmation: [
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu.",
            trigger: "blur",
          },
          { validator: this.validateConfirmPassword, trigger: "blur" },
        ],
        role: [
          {
            required: true,
            message: "Vui lòng lựa chọn quyền cho người dùng.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error("Mật khẩu không trùng khớp."));
      } else {
        callback();
      }
    },
    inputPassword() {
      this.$refs.ruleForm.clearValidate(["password_confirmation"]);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("handleSubmit", this.form);
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
