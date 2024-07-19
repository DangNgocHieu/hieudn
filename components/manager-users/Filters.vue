<template>
  <div class="filter-account">
    <a-button style="width: 100px" block icon="plus" @click="$emit('add')" />
    <a-button style="width: 100px" block icon="reload" />
    <a-input
      style="min-width: 200px"
      placeholder="Tìm kiếm"
      v-model="filter.search"
    />
    <a-select
      placeholder="Sắp xếp"
      style="min-width: 120px"
      @change="handleChange"
    >
      <a-select-option value="1"> Jack </a-select-option>
      <a-select-option value="2"> Lucy </a-select-option>
      <a-select-option value="3"> yiminghe </a-select-option>
    </a-select>
    <a-button type="primary" @click="$emit('search')"> Tìm kiếm </a-button>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
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
