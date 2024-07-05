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
        ><a @click="$router.push('/invest/recharge/customize')"
          >Các gói linh hoạt</a
        ></a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-card>
      <div class="customize__item">
        <div>
          <a-icon
            type="plus-circle-o"
            style="
              font-size: 40px;
              background-color: rgb(76, 175, 80);
              border-radius: 50%;
              color: rgb(255, 255, 255);
            "
          />
        </div>
        <div class="customize--text">Tạo gói mới</div>
      </div>
    </a-card>
    <div>
      <h3>Các gói đã tạo</h3>
      <a-card
        :title="el.name"
        v-for="(el, key) in dataCustomize"
        :key="key"
        class="customize-create"
      >
        <template #extra>
          <img :src="el.avatar" class="recharge__title" alt="title_recharge"
        /></template>
        <a @click="$router.push(`/invest/recharge/customize/${el.id}`)"
          >Nạp tiền ></a
        >
      </a-card>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  async mounted() {
    await this.initData();
  },
  computed: {
    ...mapFields({
      dataCustomize: "customize.dataCustomize",
    }),
  },
  methods: {
    async initData() {
      this.$store.commit("SET_LOADING", true);

      const res = await this.$axios.get("laravel/packages/customization");
      if (res) {
        this.$store.commit("SET_LOADING", false);
        this.$store.commit("customize/SET_DATA_CUSTOMIZE", res?.data?.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  padding-top: 20px;
}
.plus-circle {
  width: 50px;
  height: 50px;
  background: green($color: #000000);
}
.customize__item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.customize--text {
  padding-left: 20px;
  color: #000000;
  font-weight: 600;
  font-size: 16px;
}
.customize-create {
  margin-bottom: 15px;
}
.recharge__title {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
</style>
