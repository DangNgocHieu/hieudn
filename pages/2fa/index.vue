<template>
  <TwoFa />
</template>

<script>
import TwoFa from "../../components/2fa/index.vue";
export default {
  auth: "guest",
  layout: "authLayout",
  components: { TwoFa },
};
</script>

<style lang="scss" scoped></style>
