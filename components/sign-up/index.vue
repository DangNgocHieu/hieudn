<template>
  <div id="root">
    <div class="sign-in-box">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item ref="email" label="Email" prop="email">
          <a-input v-model.trim="email" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Mật khẩu" prop="password">
          <a-input-password
            v-model="password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item label="Xác nhận mật khẩu" prop="checkPass">
          <a-input-password
            v-model="checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>

        <a-form-model-item>
          <a-button
            :disabled="isDisableSubmit"
            @click="handleSubmit()"
            class="btn-submit"
          >
            Đăng kí
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <span @click="goToSignUp" :style="'cursor:pointer'"
        >Quay lại đăng nhập</span
      >
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields({
      form: "login.form",
      email: "login.form.email",
      password: "login.form.password",
      checkPass: "login.form.checkPass",
      isDisableSubmit: "login.isDisableSubmit",
    }),
  },
  mounted() {},
  watch: {
    form: {
      handler() {
        this.$refs.ruleForm?.validate((valid) => {
          console.log(valid, "bbbb");
          this.isDisableSubmit = !valid;
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      rules: {
        email: [
          {
            required: true,
            message: "Vui lòng nhập email",
            trigger: "change",
          },
          {
            type: "email",
            message: "Vui lòng nhập đúng định dạng email",
            trigger: "change",
          },
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("Vui lòng nhập mật khẩu"));
              }
              if (value.length < 8) {
                callback(new Error("Nhập mật khẩu lớn hơn 8 kí tự"));
              } else {
                if (this.form.checkPass !== "") {
                  this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
              }
            },
            trigger: "change",
          },
        ],
        checkPass: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
            trigger: "change",
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("Vui lòng nhập mật khẩu"));
              }
              if (value.length < 8) {
                callback(new Error("Nhập mật khẩu lớn hơn 8 kí tự"));
              } else if (value !== this.form.password) {
                callback(new Error("Mật khẩu không khớp"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("1111");
    },
    goToSignUp() {
      this.$router.push("/login");
    },
  },
  beforeDestroy() {
    this.$store.commit("login/RESET_STATE");
  },
};
</script>

<style lang="scss" scoped>
p {
  padding: 0px !important;
}
h2 {
  text-align: center;
}
.logo {
  margin-bottom: 20px;
}

.sign-in-box {
  background-color: #fff;
  width: 26rem;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}
.btn-submit {
  background: green;
  color: #fff;
  border-color: green;
  &:hover {
    background: green;
    color: #fff;
  }
  &:focus {
    background: green;
    color: #fff;
  }
}
</style>
