<template>
  <div>
    <div class="header-history">
      <h1>Quản lý quỹ</h1>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :loading="loading"
      @change="handleChange"
      :style="'background-color:#fff'"
    >
      <template slot="key"> </template>
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    width: 80,
    scopedSlots: { customRender: "id" },
  },
  {
    title: "Tên quỹ",
    dataIndex: "code",
    key: "code",
  },
];

const data = [];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  data() {
    return {
      data,
      columns,
      filter: "",
      rowSelection,
      loading: false,
    };
  },
  mounted() {
    this.getListFunds();
  },
  methods: {
    getStatus(status) {
      return {
        color: !status ? "orange" : "green",
        text: !status ? "Đang chờ" : "Đã xác nhận",
      };
    },
    getStatusKyc(status) {
      return {
        color: !status ? "orange" : "green",
        text: !status ? "Đang chờ" : "Đã xác nhận",
      };
    },
    getRole(role) {
      return {
        color: role === 0 ? "orange" : "green",
        text: role === 0 ? "User" : "Admin",
      };
    },
    handleChange(value) {
      this.filter = value;
    },
    confirmDelete(e) {
      console.log(e);
      this.$message.success("Click on Yes");
    },
    async getListFunds() {
      this.loading = true;
      try {
        const response = await this.$axios.get("laravel/funds");
        console.log(response);
        if (response) {
          this.data = response?.data?.data;
        }
      } catch (error) {
        this.$message.error(error?.response?.data?.message);
      } finally {
        this.loading = false;
      }
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
