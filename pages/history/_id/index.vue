<template>
  <div>
    <a-breadcrumb :style="'margin-bottom:10px'">
      <a-breadcrumb-item
        ><a @click="$router.push('/history')"
          >Lịch sử giao dịch</a
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push(`/history/${$route.params.id}`)">{{
          $route.params.id
        }}</a></a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-card title="Thông tin giao dịch">
      <div class="transaction-info">
        <div class="transaction-detail-info">
          <a-icon :type="paymentStatusIcon" :class="paymentStatusClass" />
          <div :class="paymentStatusClassLabel">
            <div>{{ paymentStatusMessage }}</div>
          </div>
          <div
            v-if="dataDetail?.payment_status == 1"
            :class="paymentStatusClassLabel"
          >
            {{ formattedTransferAmount }}
          </div>
        </div>
        <div class="transaction-detail-child">
          <div>Mã giao dịch:</div>
          <div>{{ dataDetail?.reference_number }}</div>
        </div>
        <div class="transaction-detail-child">
          <div>Số tiền:</div>
          <div class="bold-text">{{ formattedTransferAmount }}</div>
        </div>
        <div class="transaction-detail-child">
          <div>Thời gian:</div>
          <div>{{ dataDetail?.created_at }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields({
      dataHistory: "history.dataHistory",
    }),
    dataDetail() {
      return this.dataHistory.find(
        (el) => el.reference_number == this.$route.params.id,
      );
    },
    paymentStatusIcon() {
      return this.dataDetail?.payment_status === -1
        ? "close-circle"
        : this.dataDetail?.payment_status === 1
          ? "check-circle"
          : "exclamation-circle";
    },
    paymentStatusClass() {
      return this.dataDetail?.payment_status === -1
        ? "icon-error"
        : this.dataDetail?.payment_status === 1
          ? "icon-success"
          : "icon-pending";
    },
    paymentStatusClassLabel() {
      return this.dataDetail?.payment_status === -1
        ? "error"
        : this.dataDetail?.payment_status === 1
          ? "success"
          : "pending";
    },
    paymentStatusMessage() {
      return this.dataDetail?.payment_status === -1
        ? "Nạp tiền thất bại"
        : this.dataDetail?.payment_status === 1
          ? "Nạp tiền thành công"
          : "Đang chờ thanh toán";
    },
    formattedTransferAmount() {
      return `+ ${new Intl.NumberFormat("ja-JP").format(this.dataDetail.transfer_amount)} đ`;
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-info {
  display: flex;
  flex-direction: column;
}
.transaction-detail-info {
  display: flex;
  padding-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.transaction-detail-child {
  display: flex;
  flex: row;
  justify-content: space-between;
  padding-bottom: 10px;
}
.icon-error {
  color: #f50;
  font-size: 2.5rem;
}
.icon-pending {
  color: #f9bf57;
  font-size: 2.5rem;
}
.icon-success {
  color: #4caf50;
  font-size: 2.5rem;
}
.pending {
  color: #f9bf57;
  padding-top: 10px;
  font-weight: 500;
}
.success {
  color: #4caf50;
  padding-top: 10px;
  font-weight: 500;
}
.error {
  color: #f50;
  padding-top: 10px;
  font-weight: 500;
}
.transaction_detail__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}
</style>
