<template>
  <div>
    <div class="header-history">
      <h1>Lịch sử giao dịch</h1>
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
    title: "Ngày giao dịch",
    dataIndex: "date",
    key: "date",
    scopedSlots: { customRender: "date" },
  },
  {
    title: "Số tham chiếu",
    dataIndex: "reference",
    key: "reference",
  },
  {
    title: "Số tiền giao dịch",
    dataIndex: "amount",
    key: "amount",
    ellipsis: true,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "Thao tác",
    key: "actions",
    ellipsis: true,
    scopedSlots: { customRender: "actions" },
  },
];

const data = [
  {
    key: "1",
    date: "04/07/2024",
    reference: 32,
    amount: "100đ",
    status: 1,
  },
  {
    key: "2",
    date: "04/07/2024",
    reference: 42,
    amount: "100đ",
    status: 2,
  },
  {
    key: "3",
    date: "04/07/2024",
    reference: 32,
    amount: "100đ",
    status: 1,
  },
];

export default {
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
</style>
