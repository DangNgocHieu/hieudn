<template>
  <div>
    <a-breadcrumb :style="'margin-bottom:10px'">
      <a-breadcrumb-item
        ><a @click="$router.push('/invest')">Đầu tư</a></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push('/invest/recharge')"
          >Nạp tiền</a
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push('/invest/recharge/default')"
          >Các gói cơ bản</a
        ></a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-card :title="el.name" v-for="(el, key) in dataDefautl" :key="key">
      <template #extra>
        <img :src="el.avatar" class="recharge_title" alt="title_recharge"
      /></template>
      <div>Xây dựng danh mục đầu tư riêng của bạn</div>
      <div class="recharge-detail" @click="handleGoToDetail(el.id)">
        Nạp tiền >
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import generate from "../../../../mixins/generate";

export default {
  mixins: [generate],
  data() {
    return {};
  },
  computed: {
    ...mapFields({
      dataDefautl: "default.dataDefautl",
    }),
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios.get("/laravel/packages/default");
        if (data.data) {
          this.$store.commit("SET_LOADING", false);
          this.dataDefautl = data.data;
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    handleGoToDetail(id) {
      this.$router.push(`/invest/recharge/default/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.recharge_title {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.recharge-detail {
  padding-top: 10px;
  font-weight: 600;
  color: #32c610;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
