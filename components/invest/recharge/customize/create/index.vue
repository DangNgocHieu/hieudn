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
        ><a @click="$router.push('/invest/recharge/customize')"
          >Tạo gói linh hoạt</a
        ></a-breadcrumb-item
      >
    </a-breadcrumb>

    <a-card>
      <div className="create_customize__title">Tên gói</div>
      <br />
      <a-input v-model="name" />
      <br />
      <div>Điều chỉnh phân bố</div>
      <br />
      <div class="chart">
        <canvas id="myChartCreate"></canvas>
      </div>
      <br />
      <div>Danh sách quỹ đầu tư</div>
      <br />

      <a-card :title="el.code" v-for="(el, key) in dataFunds" :key="key">
        <template #extra>
          <a-button
            @click="handleChoose(el.id)"
            v-if="!el.isChoose"
            :disabled="isDisable >= 100"
            >Chọn</a-button
          >
          <div v-else class="btn-input">
            <a-input-number
              class="input-chart"
              :max="100"
              :min="0"
              v-model="el.value"
              @change="handleChangeInvestment(el)"
            ></a-input-number>
            <a-button @click="handleCancelChoose(el)">Hủy</a-button>
          </div>
        </template>
      </a-card>
      <div class="footer">
        <a-button
          class="btn-create"
          @click="handleCreatePackage"
          :disabled="isDisable !== 100"
          >Tạo</a-button
        >
      </div>
    </a-card>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import generate from "../../../../../mixins/generate";
Chart.register(...registerables);
export default {
  mixins: [generate],
  data() {
    return {
      dataFundsInit: [],
      dataFunds: [],
      myChartCreate: null,
      name: "",
      dataChart: [0, 0, 0, 0],
      labelChart: ["TCBF", "TCFF", "TCEF", "TCFIN"],
    };
  },
  watch: {},

  mounted() {
    this.createChart();
    this.initData();
  },
  computed: {
    isDisable() {
      let sum = 0;
      this.dataFunds.map((el) => {
        sum = sum + el.value;
      });
      return sum;
    },
  },
  methods: {
    async initData() {
      try {
        this.$store.commit("SET_LOADING", true);
        const res = await this.$axios.get("/laravel/funds");
        if (res) {
          const data = res?.data?.data.map((el) => {
            return { ...el, isChoose: false, value: 0, type: el.code };
          });
          this.dataFunds = data;
          this.dataFundsInit = data;
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    createChart() {
      var ctx = document.getElementById("myChartCreate");
      this.myChartCreate = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.labelChart,
          datasets: [
            {
              data: this.dataChart,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(0,128,0)",
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
      this.myChartCreate.resize(100, 200);
    },
    handleChoose(id) {
      this.dataFunds = this.dataFunds.map((el) =>
        el.id === id ? { ...el, isChoose: true } : el,
      );
    },
    handleCancelChoose(value) {
      this.dataFunds = this.dataFunds.map((el) =>
        el.id == value.id ? { ...el, isChoose: false, value: 0 } : el,
      );
      this.dataChart[value.id - 1] = 0;
      this.myChartCreate.update();
    },
    async handleCreatePackage() {
      try {
        this.$store.commit("SET_LOADING", true);

        let listAllocation = this.dataFunds.map((item) => {
          return {
            fund_id: item.id,
            percentage: item.value,
          };
        });
        listAllocation = listAllocation.filter((item) => item.percentage !== 0);
        const dataApi = {
          name: this.name,
          allocation: [...listAllocation],
        };
        const { data } = await this.$axios.post(
          "/laravel/packages/create",
          dataApi,
        );
        if (data.data) {
          this.$store.commit("SET_LOADING", false);
          this.dataFunds = this.dataFundsInit;
          this.name = "";
          Object.assign(this.dataChart, [0, 0, 0, 0]);
          this.myChartCreate.update();
          this.openNotificationWithIcon("success", "Tạo gói thành công");
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        if (error.response.status === 422) {
          this.openNotificationWithIcon(
            "error",
            "Vui lòng nhập tên gói > 3 kí tự",
          );
        }

        console.log(error);
        this.$store.commit("SET_LOADING", false);
      }
    },
    handleChangeInvestment(value) {
      this.dataChart[value.id - 1] = value.value;
      this.myChartCreate.update();
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  max-height: 300px;
  max-width: 300px;
}
.chart {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.btn-input {
  display: flex;
  .input-chart {
    width: 50px;
    margin-right: 10px;
  }
}
.footer {
  display: flex;
  justify-content: end;
  padding-top: 10px;
}
.btn-create {
  width: 100px;
}
</style>
