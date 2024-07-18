<template>
  <div id="root">
    <div class="login-box">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item ref="email" label="Email" prop="email">
          <a-input v-model.trim="email" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item ref="password" label="Mật khẩu" prop="password">
          <a-input-password v-model.trim="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item>
          <div class="custom-button-antd">
            <a-button
              :disabled="isDisableSubmit"
              @click="handleSubmit"
              class="btn-submit"
            >
              Đăng nhập
            </a-button>
            <span @click="goToForgot" :style="'cursor:pointer'">
              Quên mật khẩu
            </span>
          </div>
        </a-form-model-item>
        <a-form-model-item>
          <div class="custom-button-signup">
            <span @click="goToForgot"> Bạn chưa có tài khoản </span>
            <a-button @click="goToSignUp" class="btn-submit">
              Đăng ký
            </a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import generate from "~/mixins/generate";
export default {
  name: "LoginForm",
  components: {},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",

      rules: {
        email: [
          {
            required: true,
            message: "Vui lòng nhập email",
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
  mounted() {
    this.$nextTick(() => {
      this.$refs.ruleForm.resetFields();
    });
  },
  watch: {
    form: {
      handler() {
        this.$refs.ruleForm?.validate((valid) => {
          this.$store.commit("login/SET_IS_DISABLE_SUBMIT", !valid);
        });
      },
      deep: true,
    },
  },
  mixins: [generate],
  computed: {
    ...mapFields({
      form: "login.form",
      email: "login.form.email",
      password: "login.form.password",
      isDisableSubmit: "login.isDisableSubmit",
    }),
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.$store.commit("SET_LOADING", true);
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(valid);
          try {
            const res = await this.$auth.loginWith("laravelSanctum", {
              data: {
                email: this.email,

                password: this.password,
              },
            });
            console.log(res, "res");
            if (res.data.data.two_factor) {
              this.$router.push("/2fa");
              this.$store.commit("SET_LOADING", false);
            } else {
              const { data } = await this.$auth.fetchUser();
              console.log(data, "dataaaaaaa");
              if (data) {
                this.$store.commit("SET_LOADING", false);
                this.openNotificationWithIcon(
                  "success",
                  "Đăng nhập thành công",
                );
              } else {
                this.$store.commit("SET_LOADING", false);
              }
            }
          } catch (error) {
            console.log(error, "asdasdasdasds");
            if (error?.response?.status === 403) {
              this.openNotificationWithIcon(
                "error",
                "Địa chỉ email của bạn chưa được xác minh",
              );
            }
            if (error?.response?.status === 422) {
              this.openNotificationWithIcon(
                "error",
                "Vui lòng kiểm tra lại tài khoản và mật khẩu",
              );
            }
            if (error?.response?.status === 419) {
              this.openNotificationWithIcon("error", "CSRF token mismatch.");
            }
            this.$store.commit("SET_LOADING", false);
          }
        } else {
          this.$store.commit("login/SET_IS_DISABLE_SUBMIT", true);
          this.$store.commit("SET_LOADING", false);
        }
      });
    },
    goToForgot() {
      this.$router.push("/forgot-password");
    },
    goToSignUp() {
      this.$router.push("/sign-up");
    },
    onFinish(e) {
      e.preventDefault();
    },
    onFinishFailed() {},
  },
  beforeDestroy() {
    this.$store.commit("login/RESET_STATE");
  },
};
</script>

<style lang="scss" scoped>
#root {
}
p {
  padding: 0px !important;
}
h2 {
  text-align: center;
}
.logo {
  margin-bottom: 20px;
}

.login-box {
  background-color: #fff;
  width: 26rem;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}
li {
  list-style: none;
}
ul {
  padding: 0;
  margin: 20px;
}
.box-infor {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
  min-height: 30px;
  li {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
}
.forgot-password {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  .text-login {
    background: #058f48;
    color: #fff;
    padding: 4px 15px;
    border-radius: 2px;
    cursor: pointer;
  }
}
.sign-up {
  display: flex !important;
  align-items: center;
  flex-direction: column;
  span {
    opacity: 0.5;
  }
}
.box-email,
.box-password {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  justify-content: space-between;
  min-height: 30px;
  .text {
    width: 80px;
    font-size: 18px;
  }
  li {
    display: flex;
    flex-direction: column;
  }
}
input {
  line-height: 1.7;
  width: 100%;
}
.custom-button-antd {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.custom-button-signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
