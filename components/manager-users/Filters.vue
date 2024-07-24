<template>
  <div class="filter-account">
    <a-button style="width: 100px" block icon="plus" @click="$emit('add')" />
    <a-button
      style="width: 100px"
      block
      icon="reload"
      @click="$emit('reload')"
    />
    <a-input
      style="min-width: 200px"
      placeholder="Tìm kiếm"
      v-model="filter.email"
    />
    <a-button type="primary" @click="$emit('search')"> Tìm kiếm </a-button>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object || String,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-account {
  min-width: 1000px;
  display: flex;
  gap: 12px;
}
</style>
