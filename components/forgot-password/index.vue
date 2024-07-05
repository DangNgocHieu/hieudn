<template>
  <div id="root">
    <div class="container">
      <h1>Quên mật khẩu</h1>
      <div class="box-email">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="(e) => handleForgotPassword(e)"
        >
          <a-form-item label="Email">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập email',
                    },
                    {
                      type: 'email',
                      message: 'Vui lòng nhập đúng định dạng email',
                    },
                  ],
                },
              ]"
              v-model.trim="email"
              placeholder="Email"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <div class="custom-button-antd">
              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
                :disabled="hasErrors(form.getFieldsError())"
              >
                Gửi
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>

      <div class="footer">
        <span :style="'padding-bottom:10px;opacity:0.5'"
          >Trở lại đăng nhập</span
        >
        <span :style="'color:green;cursor:pointer'" @click="handleBackLogin"
          >Đăng nhập</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { WAEmail } from "~/mixins/ruleValidator";
import generate from "~/mixins/generate";
import ErrorMessage from "~/components/common/error/ErrorMessage.vue";
import { message } from "ant-design-vue";
export default {
  name: "ForgotPassword",
  components: {
    ErrorMessage,
  },
  mixins: [generate],
  validations: {
    email: {
      mustEmailFormat: WAEmail,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "normal_login" }),
      errorMessage: "",
    };
  },
  mounted() {},
  methods: {
    hasErrors(fieldsError) {
      return Object.keys(fieldsError).some((field) => fieldsError[field]);
    },
    async handleForgotPassword(e) {
      e.preventDefault();
      await this.$axios.get("/laravel/csrf-cookie");
      const res = await this.$axios.post("/laravel/auth/forgot-password", {
        email: this.email,
      });
    },
    handleBackLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapFields({
      email: "login.email",
    }),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: linear-gradient(to left, #76b852, #8dc26f);
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 26rem;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}
li {
  list-style: none;
}
h1 {
  text-align: center;
}
ul {
  padding: 0;
  margin: 20px;
}
.box-email {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  width: 100%;
  .text {
    font-size: 18px;
  }
  .login-form {
    width: 100%;
  }
}
.box-info {
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
.footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
