<template>
  <div>
    <div v-if="loading" class="loading">
      <a-spin class="outer">
        <a-icon slot="indicator" type="loading" style="font-size: 48px" spin />
      </a-spin>
    </div>
    <div class="wrapper">
      <div class="logo">
        <img
          src="data:image/png;base64,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
"
          alt="logo_auth"
          height="45"
        />
      </div>
      <Nuxt />
    </div>
    <Notify />
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields({
      loading: "loading",
    }),
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .outer {
    display: flex;
    min-height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
  }
}
.wrapper {
  background: linear-gradient(to left, #76b852, #8dc26f);
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.logo {
  margin-bottom: 20px;
}
</style>
