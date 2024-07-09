<template>
  <div>
    <a-card class="mb-4" title="Cài đặt bảo mật 2 lớp" :bordered="false">
      <a-radio-group v-model="isCheckbox" @change="onChange">
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
          <a-button type="primary" class="btn-submit" @click="handleSubmit">
            Đổi mật khẩu
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-modal
      v-model="isShowModal"
      title="Cài đặt bảo mật 2 lớp"
      @ok="handleOk"
      okText="Xác nhận"
      @cancel="handleCancel"
    >
      <p>Từ ứng dụng đã tải xuống, hãy quét mã QR</p>
      <img src="" />
      <p>
        Nhập mã gồm 6 chữ số được hiển thị trong Google Authenticator và ấn "Xác
        nhận"
      </p>
      <!-- <div class="otp-authen"> -->
      <OtpInput
        ref="otpInput"
        input-classes="otp-input"
        separator="-"
        :num-inputs="6"
        :should-auto-focus="true"
        :is-input-num="true"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
      <!-- </div> -->
    </a-modal>
  </div>
</template>

<script>
import OtpInput from "@bachdgvn/vue-otp-input";
export default {
  components: {
    OtpInput,
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      isCheckbox: 1,
      isShowModal: false,
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
    onChange(value) {
      this.isShowModal = this.isCheckbox === 2;
    },
    handleOk() {},
    handleCancel() {
      this.isCheckbox = 1;
    },
    handleOnComplete(value) {
      console.log("OTP completed: ", value);
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
  },
};
</script>
<style lang="scss">
.btn-submit {
  background: green;
  color: #fff;
  border-color: green;
  &:hover {
    background: green;
    color: #fff;
  }
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  text-align: center;
}
</style>
