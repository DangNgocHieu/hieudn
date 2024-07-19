<template></template>

<script>
import generate from "../../mixins/generate";
export default {
  mixins: [generate],
  async mounted() {
    await this.handleVerify();
  },
  methods: {
    async handleVerify() {
      try {
        this.$store.commit("SET_LOADING", true);
        const temp = this.$route.fullPath?.split("/")[3]?.split("?");
        const id = this.$route.fullPath?.split("/")[2];
        const hash = temp[0];
        const res = await this.$axios.get(
          `laravel/auth/email/verify/${id}/${hash}?${temp[1]}`,
        );
        if (res) {
          this.$store.commit("SET_LOADING", false);
          localStorage.setItem("verify", "true");
          this.openNotificationWithIcon(
            "success",
            "Kích hoạt tài khoản thành công",
          );
          this.$router.push("/login");
        } else {
          this.$store.commit("SET_LOADING", false);
          this.openNotificationWithIcon(
            "success",
            "Kích hoạt tài khoản thất bại",
          );
          this.$router.push("/login");
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
