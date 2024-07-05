<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item
        ><a @click="$router.push('/invest')">Đầu tư</a></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push('/invest/recharge')"
          >Nạp tiền</a
        ></a-breadcrumb-item
      >
    </a-breadcrumb>
    <br />
    <div>
      <a-card title="Gói linh hoạt">
        <template #extra
          ><a href="#"
            ><img
              src="~/assets/images/custom_package.svg"
              class="recharge__title"
              alt="title_recharge" /></a
        ></template>
        <p>Xây dựng danh mục đầu tư riêng của bạn</p>
        <p class="recharge-detail" @click="handleCustomize('customize')">
          Xem chi tiết >
        </p>
      </a-card>
    </div>
    <br />
    <br />

    <div>
      <a-card title="Các gói gợi ý">
        <template #extra
          ><a href="#"
            ><img
              src="~/assets/images/default_package.svg"
              class="recharge__title"
              alt="title_recharge" /></a
        ></template>
        <p>Danh sách các gói đầu tư KLTN gợi ý cho bạn</p>
        <p class="recharge-detail" @click="handleCustomize('default')">
          Xem chi tiết >
        </p>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleCustomize(type) {
      this.$router.push(`/invest/recharge/${type}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.recharge__title {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.recharge-detail {
  font-weight: 600;
  color: #32c610;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
