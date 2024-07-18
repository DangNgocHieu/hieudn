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
          <a-button class="btn-submit" @click="handleSubmit">
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
      <div v-if="!step">
        <p>Bạn đang thay đổi phương thức xác thực hai bước.</p>
        <p>Vui lòng nhập mật khẩu của bạn để thay đổi xác thực hai bước.</p>
        <a-form-model
          ref="ruleFormAuth"
          :model="ruleFormAuth"
          :rules="rulesAuth"
        >
          <a-form-model-item has-feedback prop="pass">
            <a-input-password v-model="ruleFormAuth.pass" autocomplete="off" />
          </a-form-model-item>
        </a-form-model>
      </div>
      <div v-else>
        <p>Từ ứng dụng đã tải xuống, hãy quét mã QR</p>
        <div v-html="dataQr"></div>
        <p>
          Nhập mã gồm 6 chữ số được hiển thị trong Google Authenticator và ấn
          "Xác nhận"
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
      </div>
      <!-- </div> -->
    </a-modal>
    <a-modal
      v-model="isShowModalPassword"
      title="Cài đặt bảo mật 2 lớp"
      @ok="handleOkPass"
      okText="Xác nhận"
      @cancel="handleCancelPass"
    >
      <p>
        Bạn có muốn tắt xác thực hai yếu tố không? Vui lòng nhập mật khẩu của
        bạn.
      </p>
      <a-form-model ref="ruleFormAuth" :model="ruleFormAuth" :rules="rulesAuth">
        <a-form-model-item has-feedback prop="pass">
          <a-input-password v-model="ruleFormAuth.pass" autocomplete="off" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import OtpInput from "@bachdgvn/vue-otp-input";
import generate from "../../mixins/generate";
export default {
  mixins: [generate],
  components: {
    OtpInput,
  },
  mounted() {
    this.initData();
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      isCheckbox: 1,
      isShowModal: false,
      isShowModalPassword: false,
      dataOTP: "",
      step: 0,
      dataQr: "",
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
      ruleFormAuth: {
        pass: "",
      },
      rules: {
        pass: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu cũ",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Nhập mật khẩu lớn hơn 8 kí tự",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Nhập mật khẩu lớn hơn 8 kí tự",
            trigger: "blur",
          },
        ],
        confirmNewPassword: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Nhập mật khẩu lớn hơn 8 kí tự",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.newPassword) {
                callback(new Error("Mật khẩu mới không khớp nhau"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      rulesAuth: {
        pass: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Nhập mật khẩu lớn hơn 8 kí tự",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async initData() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios.get("/laravel/me/settings");
        if (data.data) {
          this.isCheckbox = data.data.enabled_2fa ? 2 : 1;
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(valid);
        if (valid) {
          try {
            this.$store.commit("SET_LOADING", true);
            const payload = {
              current_password: this.ruleForm.pass,
              password: this.ruleForm.newPassword,
              password_confirmation: this.ruleForm.confirmNewPassword,
            };
            const { data } = await this.$axios.put(
              "/laravel/auth/user/password",
              payload,
            );
            console.log(data.message == "OK");
            if (data.message == "OK") {
              this.$store.commit("SET_LOADING", false);
              this.openNotificationWithIcon(
                "success",
                "Đổi mật khẩu thành công",
              );
              this.$refs["ruleForm"].resetFields();
            } else {
              this.$store.commit("SET_LOADING", false);
            }
          } catch (error) {
            this.openNotificationWithIcon(
              "error",
              "Mật khẩu hiện tại không đúng",
            );
            this.$store.commit("SET_LOADING", false);
          }
        }
      });
    },
    onChange(e) {
      this.isShowModal = e.target.value === 2;
      this.isShowModalPassword = e.target.value === 1;
    },
    async handleOk() {
      if (!this.step) {
        this.$refs["ruleFormAuth"].validate(async (valid) => {
          if (valid) {
            try {
              this.$store.commit("SET_LOADING", true);
              const { data } = await this.$axios.post(
                "/laravel/auth/user/confirm-password",
                {
                  password: this.ruleFormAuth.pass,
                },
              );
              if (data.message == "Created") {
                const res = await this.$axios.post(
                  "/laravel/auth/user/two-factor-authentication",
                );
                if (res) {
                  const { data } = await this.$axios.get(
                    "/laravel/auth/user/two-factor-qr-code",
                  );
                  if (data) {
                    this.dataQr = data.data.svg;
                  }
                }
                this.step = 1;
                this.$refs["ruleFormAuth"].resetFields();
                this.$store.commit("SET_LOADING", false);
              } else {
                this.$store.commit("SET_LOADING", false);
              }
            } catch (error) {
              this.openNotificationWithIcon(
                "error",
                "Mật khẩu không chính xác",
              );
              this.$store.commit("SET_LOADING", false);
            }
          } else {
            return false;
          }
        });
      } else {
        try {
          this.$store.commit("SET_LOADING", true);
          const { data } = await this.$axios.post(
            "/laravel/auth/user/confirmed-two-factor-authentication",
            { code: this.dataOTP },
          );
          if (data) {
            this.initData();
            this.openNotificationWithIcon("success", "Đã bật xác thực 2 lớp");
            this.isShowModal = false;
            this.$store.commit("SET_LOADING", false);
          } else {
          }
        } catch (error) {
          console.log(error);
          this.openNotificationWithIcon("error", "Nhập sai mã xác thực");
          this.$store.commit("SET_LOADING", false);
        }
      }
    },
    handleCancel() {
      if (!this.step) {
        this.$refs["ruleFormAuth"].resetFields();
      } else {
      }
      this.isCheckbox = 1;
      this.step = 0;
    },
    handleCancelPass() {
      this.isShowModalPassword = false;
      this.isCheckbox = 2;
    },
    async handleOkPass() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios.post(
          "/laravel/auth/user/confirm-password",
          { password: this.ruleFormAuth.pass },
        );
        console.log(data.data);
        if (data.message == "Created") {
          const result = await this.$axios.delete(
            "/laravel/auth/user/two-factor-authentication",
          );
          if (result) {
            this.isShowModal = false;
            this.initData();
            this.openNotificationWithIcon(
              "success",
              "Đã bật xác thực bằng mật khẩu",
            );
            this.$store.commit("SET_LOADING", false);
            this.isShowModalPassword = false;
            this.$refs["ruleFormAuth"].resetFields();
          }
        }
      } catch (error) {
        this.openNotificationWithIcon(
          "error",
          "Mật khẩu được cung cấp không chính xác.",
        );
        this.$store.commit("SET_LOADING", false);
      }
    },
    handleOnComplete(value) {
      this.dataOTP = value;
      console.log("OTP completed: ", value);
    },
    handleOnChange(value) {
      this.dataOTP = value;

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
  &.error {
    border: 1px solid red !important;
  }
}
</style>
