<template>
  <div>
    <div class="header-history">
      <h1>Quản lý gói đầu tư</h1>
      <div class="filter-notify">
        <a-button style="width: 100px" block icon="plus" />
        <a-button style="width: 100px" block icon="reload" />
        <a-input style="min-width: 200px" placeholder="Tìm kiếm" />
        <a-select
          placeholder="Sắp xếp"
          style="min-width: 120px"
          @change="handleChange"
        >
          <a-select-option value="1"> Tăng dần </a-select-option>
          <a-select-option value="2"> Giảm dần </a-select-option>
        </a-select>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :style="'background-color:#fff'"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="status" slot-scope="status"
        ><a-tag :color="getStatus(status).color">
          {{ getStatus(status).text }}
        </a-tag>
      </a>
      <a slot="actions">Chi tiết</a>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 100,
    align: "center",
  },
  {
    title: "Nội dung",
    dataIndex: "contents",
    key: "contents",
  },

  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
    width: 200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    ellipsis: true,
    width: 300,
  },
];

const data = [
  {
    key: "1",
    created_at: "04/07/2024",
    reference: 32,
    contents: "100đ",
    status: 1,
  },
  {
    key: "2",
    created_at: "04/07/2024",
    reference: 42,
    contents: "100đ",
    status: 2,
  },
  {
    key: "3",
    created_at: "04/07/2024",
    reference: 32,
    contents: "100đ",
    status: 1,
  },
];

export default {
  layout: "admin",
  data() {
    return {
      data,
      columns,
      filter: "",
    };
  },
  methods: {
    getStatus(status) {
      return {
        color: status === 1 ? "orange" : "green",
        text: status === 1 ? "Đang chờ" : "Đã xác nhận",
      };
    },
    handleChange(value) {
      this.filter = value;
    },
  },
};
</script>

<style lang="css" scoped>
.header-history {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-notify {
  min-width: 1000px;
  display: flex;
  gap: 12px;
}
</style>
