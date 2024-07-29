<template>
  <div>
    <div class="header-history">
      <h1>Lịch sử giao dịch</h1>
      <a-select
        placeholder="Sắp xếp"
        style="min-width: 120px"
        @change="handleChange"
      >
        <a-select-option value="1"> Tăng dần </a-select-option>
        <a-select-option value="2"> Giảm dần </a-select-option>
      </a-select>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataHistory"
      :style="'background-color:#fff'"
    >
      <span slot="amount" slot-scope="transfer_amount">{{
        `${new Intl.NumberFormat("ja-JP").format(transfer_amount)} đ`
      }}</span>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="status" slot-scope="status"
        ><a-tag :color="getStatus(status).color">
          {{ getStatus(status).text }}
        </a-tag>
      </a>
      <a slot="actions" slot-scope="actions" @click="handleGoToDetail(actions)"
        >Chi tiết</a
      >
    </a-table>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";

const columns = [
  {
    title: "Ngày giao dịch",
    dataIndex: "created_at",
    key: "date",
    scopedSlots: { customRender: "date" },
  },
  {
    title: "Số tham chiếu",
    dataIndex: "reference_number",
    key: "reference",
  },
  {
    title: "Số tiền giao dịch",
    dataIndex: "transfer_amount",
    key: "amount",
    ellipsis: true,
    scopedSlots: { customRender: "amount" },
  },
  {
    title: "Trạng thái",
    dataIndex: "payment_status",
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
export default {
  data() {
    return {
      columns,
      filter: "",
    };
  },
  computed: {
    ...mapFields({
      dataHistory: "history.dataHistory",
    }),
  },
  mounted() {
    this.initPage();
  },
  methods: {
    async initPage() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios("/laravel/transactions");
        if (data.data) {
          this.$store.commit("history/SET_DATA_HISTORY", data.data);
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    getStatus(status) {
      return {
        color: status == -1 ? "red" : status == 1 ? "green" : "orange",
        text:
          status == -1 ? "Thất bại" : status == 1 ? "Đã xác nhận" : "Đang chờ",
      };
    },
    handleChange(value) {
      this.filter = value;
    },
    handleGoToDetail(id) {
      this.$router.push(`/history/${id.reference_number}`);
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
