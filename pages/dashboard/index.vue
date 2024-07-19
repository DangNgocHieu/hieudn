<template>
  <dashboard />
</template>

<script>
export default {
  middleware({ $auth, redirect }) {
    if (!$auth?.user?.data?.is_verify) {
      redirect("/ekyc");
    }
  },
  created() {},
};
</script>

<style lang="scss" scoped></style>
