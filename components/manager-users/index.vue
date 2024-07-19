<template>
  <div>
    <div class="header-history">
      <h1>Quản lý người dùng</h1>
      <ManagerUsersFilters
        :filter="filter"
        @search="handleSearch"
        @add="handleAddUser"
      />
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :style="'background-color:#fff'"
    >
      <template slot="key" slot-scope="record, text, index">
        {{ (pagination?.current_page - 1) * pagination?.per_page + index + 1 }}
      </template>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="role" slot-scope="role"
        ><a-tag :color="getRole(role).color">
          {{ getRole(role).text }}
        </a-tag>
      </a>
      <a slot="status" slot-scope="data"
        ><a-tag :color="getStatus(data?.is_activated).color">
          {{ getStatus(data?.is_activated).text }}
        </a-tag>
      </a>
      <a slot="ekyc_status" slot-scope="is_verify"
        ><a-tag :color="getStatusKyc(is_verify).color">
          {{ getStatusKyc(is_verify).text }}
        </a-tag>
      </a>
      <a slot="actions" slot-scope="data">
        <div>
          <a-button
            type="primary"
            @click="$router.push(`/admin/manager-users/${data.id}`)"
          >
            Chi tiết
          </a-button>

          <a-popconfirm
            title="Bạn có muốn xóa người dùng này không?"
            ok-text="Xóa"
            cancel-text="Hủy"
            okType="danger"
            @confirm="confirmDelete"
            @cancel="cancel"
          >
            <a-button type="danger"> Xóa </a-button>
          </a-popconfirm>
          <a-button> Hủy kích hoạt </a-button>
        </div></a
      >
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "STT",
    key: "key",
    width: 80,
    scopedSlots: { customRender: "key" },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phân quyền",
    dataIndex: "role",
    key: "role",
    width: 160,
    scopedSlots: { customRender: "role" },
  },
  {
    title: "Trạng thái tài khoản",
    key: "status",
    scopedSlots: { customRender: "status" },
    width: 160,
  },
  {
    title: "Xác minh eKYC",
    dataIndex: "is_verify",
    key: "ekyc_status",
    scopedSlots: { customRender: "ekyc_status" },
    width: 160,
  },
  {
    title: "Ngày tạo tài khoản",
    dataIndex: "created_date",
    key: "created_date",
    width: 200,
  },
  {
    title: "",
    key: "actions",
    ellipsis: true,
    scopedSlots: { customRender: "actions" },
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
      pagination: {},
    };
  },
  mounted() {
    this.getListUsers();
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
    async getListUsers(payload) {
      this.loading = true;
      try {
        const response = await this.$axios.get("laravel/admin/users", {
          params: { ...payload },
        });
        if (response) {
          this.data = response?.data?.data?.data;
          const { current_page, from, last_page, per_page, total } =
            response?.data?.data;
          this.pagination = { current_page, from, last_page, per_page, total };
        }
      } catch (error) {
        this.$message.error(error?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.getListUsers({ ...this.filter });
    },
    handleAddUser() {
      console.log(123);
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
