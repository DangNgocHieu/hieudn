<template>
  <div class="filter-account">
    <a-button style="width: 100px" block icon="plus" />
    <a-button style="width: 100px" block icon="reload" />
    <a-input style="min-width: 200px" placeholder="Tìm kiếm" />
    <a-select
      placeholder="Sắp xếp"
      style="min-width: 120px"
      @change="handleChange"
    >
      <a-select-option value="1"> Jack </a-select-option>
      <a-select-option value="2"> Lucy </a-select-option>
      <a-select-option value="3"> yiminghe </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.filter-account {
  min-width: 1000px;
  display: flex;
  gap: 12px;
}
</style>
