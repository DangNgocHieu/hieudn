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
        :disabled="this.dataTowFa?.length < 6"
        >Xác nhận</a-button
      >
    </a-card>
  </div>
</template>

<script>
import OtpInput from "@bachdgvn/vue-otp-input";

import { mapFields } from "vuex-map-fields";

export default {
  components: {
    OtpInput,
  },
  computed: {
    ...mapFields({
      form: "towfa.form",
      dataTowFa: "towfa.form.dataTowFa",
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
      this.dataTowFa = value;
    },
    handleOnChange(value) {
      this.dataTowFa = value;
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
