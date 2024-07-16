<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <nuxt-link to="/admin/manager-users">Quản lý người dùng</nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>User 1</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  layout: "admin",
};
</script>

<style lang="scss" scoped></style>
