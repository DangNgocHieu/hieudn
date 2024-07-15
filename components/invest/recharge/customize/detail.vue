<template>
  <div>
    <a-breadcrumb :style="'margin-bottom:10px'">
      <a-breadcrumb-item
        ><a @click="$router.push('/invest')">Đầu tư</a></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push('/invest/recharge')"
          >Nạp tiền</a
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push('/invest/recharge/customize')"
          >Các gói linh hoạt</a
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a
          @click="$router.push(`/invest/recharge/customize/${dataDetail?.id}`)"
          >{{ dataDetail?.id }}</a
        ></a-breadcrumb-item
      >
    </a-breadcrumb>
    <div class="invest-customize-block">
      <div class="invest_customize_detail">
        <br />
        <div class="invest_customize_detail--title">
          {{ dataDetail?.name }}
        </div>
        <br />
        <img :src="dataDetail?.avatar" class="customize-detail-img" />
        <br />
        <br />
        <div class="">
          <div class="">
            <div class="">
              <div>asdasds</div>
              <br />
              <br />
              <a-icon
                @click="showModal"
                type="plus"
                style="
                  padding: 0.8rem;
                  font-size: 1.2rem;
                  background-color: rgb(50, 198, 16);
                  border-radius: 50%;
                  color: rgb(255, 255, 255);
                  border: 1.5px solid rgb(50, 198, 16);
                  cursor: pointer;
                "
              />
            </div>
            <br />
            <div class="text-medium">Nạp tiền</div>
            <br />
            <br />
          </div>
        </div>
      </div>
      <div class="invest_customize_detail">
        <br />
        <div class="invest_customize_detail--title">Chi tiết phân bổ</div>
        <div>
          <canvas id="myChart"></canvas>
        </div>
        <br />
      </div>
      <div class="invest_customize_detail">
        <br />
        <div class="invest_customize_detail--title">Lịch sử giao dịch</div>
        <a-table
          :dataSource="dataSource || dataDetail.transactions"
          :columns="columns"
          class="table-history"
        />
      </div>
    </div>

    <a-modal
      v-model="isOpenModal"
      title="Nạp tiền đầu tư"
      @ok="handleSubmit"
      okText="Nạp tiền"
      cancelText="Hủy"
      @cancel="handleCancel"
    >
    <div v-if="step=== 1">
      <a-form-model
        ref="ruleForm"
        :model="formMoney"
        @submit="handleSubmit"
        :rules="rules"
      >
        <a-form-model-item label="Số tiền">
          <a-input name="moneyAmount" v-model="moneyAmount" />
        </a-form-model-item>
      </a-form-model>
    </div>
     <div v-else>
      <div className="info-bank">
        <img src={Tpbank} alt="tpbank" width={150} height={150} />
        <div className="info-bank__info">
          <div className="info-bank__block">
            <div>CHỦ TÀI KHOẢN:</div>
            <div>
              <b>{{dataInfoBank.beneficiary_name}}</b>
            </div>
          </div>
          <div className="info-bank__block">
            <div>SỐ TÀI KHOẢN:</div>
            <div>
              <b>{{dataInfoBank.account_number}}</b>
            </div>
          </div>
          <div className="info-bank__block">
            <div>NỘI DUNG CHUYỂN KHOẢN:</div>
            <div>
              <b>{{dataInfoBank.reference_number}}</b>
            </div>
          </div>
          <div className="info-bank__block">
            <div>SỐ TIỀN CHUYỂN:</div>
            <div>
              <b>{{dataInfoBank.transfer_amount}}đ</b>
            </div>
          </div>
        </div>
      </div>
      <div className="info-bank"><b className='info-bank__title'>Quét mã thanh toán QR</b></div>
      <div className="info-bank">
        <img :src="dataInfoBank.qr" className="info-bank__qr" width={150} height={150} alt="qr-payment" />
      </div>
     </div>
     <template slot="footer" v-if="step==2">
        <a-button key="back" @click="handleCancel">
          Đóng
        </a-button>
        
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  props: {},
  components: {},
  computed: {
    ...mapFields({
      dataInfoBank:"customize.dataInfoBank",
      dataCustomize: "customize.dataCustomize",
      dataDetail: "customize.dataDetail",
      isOpenModal: "customize.isOpenModal",
      formMoney: "customize.formMoney",
      moneyAmount: "customize.formMoney.moneyAmount",
      step:"customize.step"
    }),
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      dataSource: [
        {
          key: "1",
          name: "Mike",
          age: 32,
          address: "10 Downing Street",
          abc: "1",
        },
        {
          key: "2",
          name: "John",
          age: 42,
          address: "10 Downing Street",
          abc: "2",
        },
      ],
      columns: [
        {
          title: "Ngày giao dịch",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Số tham chiếu",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Số lần giao dịch",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Số lượng CCCQ",
          dataIndex: "abc",
          key: "abc",
        },
      ],
      dataChart: [],
      labelsChart: [],
      rules: {
        moneyAmount: [
          { required: true, message: "Vui lòng nhập số tiền nạp" },
          {
            pattern: /^\d+$/,
            message: "Vui lòng nhập số",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  async mounted() {
    this.createChart();
    this.$store.commit("SET_LOADING", true);
    const res = await this.$axios.get(
      `laravel/packages/${this.$route.params.id}`,
    );
    if (res) {
      console.log(res, "res");
      this.$store.commit("SET_LOADING", false);
      this.$store.commit("customize/SET_DATA_DETAIL", res?.data?.data);
      res?.data?.data?.allocation?.forEach((el) => {
        this.dataChart.push(el.percentage);
        this.labelsChart.push(el.code);
      });
      this.myChart.update();
    }
  },
  methods: {
    createChart() {
      var ctx = document.getElementById("myChart");
      this.myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.labelsChart,
          datasets: [
            {
              data: this.dataChart,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false,
            },
          },
        },
      });
      // this.myChart.resize(100, 200);
    },
    showModal() {
      this.$store.commit("customize/SET_IS_OPEN_MODAL", !this.isOpenModal);
    },
    handleOk() {
      console.log("11");
    },
    async handleSubmit(e) {
      try {
        this.$store.commit("SET_LOADING", true);
        const res = await this.$axios.post(
          `laravel/packages/${this.$route.params.id}/invest`,
          {
            amount: this.moneyAmount,
          },
        );
        console.log(res.data.data);
        if (res.data.data) {
          this.step = 2 
          this.dataInfoBank = res.data.data
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    handleCancel() {
      this.isOpenModal = false
      this.form.resetFields();
    },
    onFinish() {},
    onFinishFailed() {},
  },
};
</script>

<style lang="scss" scoped>
.customize-detail-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.invest_customize_detail {
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text-medium {
    font-weight: 600;
  }
  .table-history {
    width: 100%;
  }
  .invest_customize_detail--title {
  }
}
// canvas {
//   max-height: 300px;
//   max-width: 300px;
// }
</style>
