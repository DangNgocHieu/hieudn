<template>
  <div class="two-fa">
    <a-card title="Bảo mật 2 lớp">
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
      <a-button
        :style="'margin-top:20px'"
        :disabled="this.data2Fa?.length < 6"
        @click="handleSubmit()"
        >Xác nhận</a-button
      >
    </a-card>
  </div>
</template>

<script>
import OtpInput from "@bachdgvn/vue-otp-input";

import { mapFields } from "vuex-map-fields";
import generate from "../../mixins/generate";

export default {
  components: {
    OtpInput,
  },
  mixins: [generate],
  computed: {
    ...mapFields({
      form: "towfa.form",
      data2Fa: "towfa.form.data2Fa",
      isDisableOTP: "towfa.isDisableOTP",
    }),
  },
  watch: {
    form: {
      handler() {
        this.$refs.ruleForm?.validate((valid) => {
          this.isDisableOTP = !valid;
        });
      },
      deep: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleOnComplete(value) {
      this.data2Fa = value;
    },
    handleOnChange(value) {
      this.data2Fa = value;
    },
    async handleSubmit() {
      try {
        this.$store.commit("SET_LOADING", true);
        const res = await this.$axios.post(
          "/laravel/auth/two-factor-challenge",
          { code: this.data2Fa },
        );
        if (res.status < 400) {
          this.$auth.fetchUser();
          this.$store.commit("SET_LOADING", false);
          this.openNotificationWithIcon("success", "Đăng nhập thành công");
        } else {
          this.$store.commit("SET_LOADING", false);
          this.openNotificationWithIcon("error", "Xác thực thất bại");
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
  },
};
</script>

<style lang="scss">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  text-align: center;
}
.two-fa {
  min-width: 26rem;
}
</style>
