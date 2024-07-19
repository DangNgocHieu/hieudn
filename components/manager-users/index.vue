<template>
  <div>
    <div class="header-history">
      <h1>Quản lý người dùng</h1>
      <ManagerUsersFilters />
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :style="'background-color:#fff'"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="status" slot-scope="status"
        ><a-tag :color="getStatus(status).color">
          {{ getStatus(status).text }}
        </a-tag>
      </a>
      <a slot="ekyc_status" slot-scope="ekyc_status"
        ><a-tag :color="getStatus(ekyc_status).color">
          {{ getStatus(ekyc_status).text }}
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
    dataIndex: "key",
    key: "key",
    width: 80,
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
  },
  {
    title: "Trạng thái tài khoản",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
    width: 160,
  },
  {
    title: "Xác minh eKYC",
    dataIndex: "ekyc_status",
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

const data = [
  {
    id: 1,
    key: "1",
    name: "Đặng Ngọc Hiếu",
    created_date: "04/07/2024",
    role: "Admin",
    ekyc_status: 1,
    email: "hieudn@rikkeisoft.com",
    status: 1,
  },
  {
    id: 2,
    key: "2",
    name: "Đặng Ngọc Hiếu",
    created_date: "04/07/2024",
    role: "Admin",
    ekyc_status: 1,
    email: "hieudn@rikkeisoft.com",
    status: 2,
  },
  {
    id: 3,
    key: "3",
    name: "Đặng Ngọc Hiếu",
    created_date: "04/07/2024",
    role: "Admin",
    ekyc_status: 2,
    email: "hieudn@rikkeisoft.com",
    status: 1,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  onSelect: (record, selected, selectedRows) => {},
  onSelectAll: (selected, selectedRows, changeRows) => {},
};

export default {
  data() {
    return {
      data,
      columns,
      filter: "",
      rowSelection,
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
    confirmDelete(e) {
      this.$message.success("Click on Yes");
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
