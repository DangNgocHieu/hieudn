<template>
  <div class="two-fa">
    <a-card title="Bảo mật 2 lớp">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item ref="dataTowFa" label="OTP" prop="dataTowFa">
          <a-input :maxLength="6" v-model="dataTowFa"></a-input>
        </a-form-model-item>
        <a-button
          :style="'margin-top:20px'"
          :disabled="isDisableOTP || this.dataTowFa?.length < 6"
          >Xác nhận</a-button
        >
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
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
    return {
      rules: {
        dataTowFa: [
          {
            required: true,
            message: "Vui lòng nhập otp",
            trigger: "change",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Vui lòng nhập đúng định dạng otp",
            trigger: "change",
          },
          ,
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.two-fa {
  min-width: 26rem;
}
</style>
