<template>
  <div>
    <div class="header-history">
      <h1>Quản lý giao dịch</h1>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataHistories"
      :style="'background-color:#fff'"
    >
      <span
        style="font-weight: bold"
        slot="updated_at"
        slot-scope="updated_at"
        >{{ updated_at }}</span
      >
      <span
        style="font-weight: bold"
        slot="reference_number"
        slot-scope="reference_number"
        >{{ reference_number }}</span
      >
      <span
        style="font-weight: bold"
        slot="transfer_amount"
        slot-scope="transfer_amount"
        >{{ transfer_amount }} đ</span
      >
      <span slot="payment_status" slot-scope="payment_status"
        ><a-tag :color="getStatus(payment_status).color">
          {{ getStatus(payment_status).text }}
        </a-tag>
      </span>
      <a slot="actions" slot-scope="record" @click="showModal(record)"
        >Chi tiết</a
      >
    </a-table>
    <a-modal v-model="visible" title="Thông tin chi tiết" @ok="handleOk">
      <div class="item_modal">
        <span style="font-weight: bold">Ngày giao dịch:</span>
        <span>{{ dataDetail?.updated_at }}</span>
      </div>
      <div class="item_modal">
        <span style="font-weight: bold">Số tham chiếu:</span>
        <span>{{ dataDetail?.reference_number }}</span>

        <a-tooltip placement="top" trigger="click">
          <template slot="title"> Copied </template>
          <a-icon
            style="cursor: pointer"
            @click="copyClipboard(dataDetail?.reference_number)"
            type="copy"
          />
        </a-tooltip>
      </div>
      <div class="item_modal">
        <span style="font-weight: bold">Số tiền giao dịch:</span>
        <span>{{ dataDetail?.transfer_amount }} đ</span>
      </div>
      <div class="item_modal">
        <span style="font-weight: bold">Trạng thái:</span>
        <span :style="{ color: getStatus(dataDetail?.payment_status).color }">{{
          getStatus(dataDetail?.payment_status).text
        }}</span>
      </div>
      <template #footer>
        <a-button
          type="primary"
          style="background: green"
          @click="visible = false"
        >
          Đóng
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
const columns = [
  {
    title: "Ngày giao dịch",
    dataIndex: "updated_at",
    key: "updated_at",
    scopedSlots: { customRender: "updated_at" },
  },
  {
    title: "Số tham chiếu",
    dataIndex: "reference_number",
    key: "reference_number",
  },
  {
    title: "Số tiền giao dịch",
    dataIndex: "transfer_amount",
    key: "transfer_amount",
    scopedSlots: { customRender: "transfer_amount" },
  },
  {
    title: "Trạng thái",
    dataIndex: "payment_status",
    key: "payment_status",
    scopedSlots: { customRender: "payment_status" },
  },
  {
    title: "Thao tác",
    key: "actions",
    scopedSlots: { customRender: "actions" },
  },
];

export default {
  layout: "admin",
  data() {
    return {
      columns,
      filter: "",
      visible: false,
      dataDetail: null,
    };
  },
  computed: {
    ...mapState("history", ["dataHistories"]),
  },
  async mounted() {
    await this.getDataHistories();
  },
  methods: {
    ...mapActions("history", ["getDataHistories"]),
    showModal(record) {
      this.dataDetail = record;
      this.visible = true;
    },
    getStatus(status) {
      return {
        color: status === 0 ? "orange" : "green",
        text: status === 0 ? "Đang chờ" : "Đã xác nhận",
      };
    },
    copyClipboard(value) {
      navigator.clipboard.writeText(value);
    },
    handleChange(value) {
      this.filter = value;
    },
  },
};
</script>

<style lang="css">
.item_modal {
  margin: 5px 0;
}
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
