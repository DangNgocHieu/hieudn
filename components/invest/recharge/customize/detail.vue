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
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="Số tiền">
          <a-input
            name="moneyAmount"
            v-decorator="[
              'Số tiền',
              {
                rules: [
                  { required: true, message: 'Vui lòng nhập số tiền nạp' },
                  {
                    pattern: /^\d+$/,
                    message: 'Vui lòng nhập số',
                    trigger: ['blur', 'change'],
                  },
                ],
              },
            ]"
            :value="moneyAmount"
          />
        </a-form-item>
      </a-form>
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
      dataCustomize: "customize.dataCustomize",
      dataDetail: "customize.dataDetail",
      isOpenModal: "customize.isOpenModal",
      moneyAmount: "customize.moneyAmount",
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
    };
  },
  async mounted() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Red", "Orange", "Yellow"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132),rgb(255, 99, 0)",
            borderColor: "rgb(255, 99, 132)",
            data: [10, 20, 30, 40],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.$store.commit("SET_LOADING", true);
    const res = await this.$axios.get(
      `laravel/packages/${this.$route.params.id}`,
    );
    if (res) {
      console.log(res, "res");
      this.$store.commit("SET_LOADING", false);
      this.$store.commit("customize/SET_DATA_DETAIL", res?.data?.data);
    }
  },
  methods: {
    showModal() {
      this.$store.commit("customize/SET_IS_OPEN_MODAL", !this.isOpenModal);
    },
    handleOk() {
      console.log("11");
    },
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        console.log(err);
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleCancel() {
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
</style>
