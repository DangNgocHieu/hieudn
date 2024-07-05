<template>
  <InvestRechargeCustomizeDetail />
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields({
      dataCustomize: "customize.dataCustomize",
      dataDetail: "customize.dataDetail",
    }),
  },
  mounted() {
    this.dataDetail = this.dataCustomize?.filter(
      (el) => el.id == this.$route.params?.id,
    );
  },
};
</script>

<style lang="scss" scoped></style>
