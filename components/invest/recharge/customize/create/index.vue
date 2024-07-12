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
            :disabled="getDisable === 100"
            >Chọn</a-button
          >
          <div v-else class="btn-input">
            <a-input-number
              class="input-chart"
              :max="100"
              :min="0"
              v-model="el.value"
            ></a-input-number>
            <a-button @click="handleCancelChoose(el.id)">Hủy</a-button>
          </div>
        </template>
      </a-card>
      <div class="footer">
        <a-button @click="handleCreatePackage">Tạo</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  data() {
    return {
      dataFunds: [
        {
          code: "TCBF",
          id: 1,
          isChoose: false,
          type: "TCBF",
          value: 0,
        },
        {
          code: "TCFF",
          id: 2,
          isChoose: false,
          type: "TCFF",
          value: 0,
        },
        {
          code: "TCEF",
          id: 3,
          isChoose: false,
          type: "TCEF",
          value: 0,
        },
        {
          code: "TCFIN",
          id: 4,
          isChoose: false,
          type: "TCFIN",
          value: 0,
        },
      ],
      myChartCreate: null,
      name: "",
    };
  },
  watch: {
    data(newValue, oldValue) {
      this.myChartCreate.destroy();
      this.createChart();
    },
  },
  mounted() {
    this.createChart();
    // this.initData();
  },
  computed: {
    getDisable() {
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
        console.log(res);
        if (res) {
          const data = res?.data?.data.map((el) => {
            return { ...el, isChoose: false, value: 0, type: el.code };
          });
          this.dataFunds = data;
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
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              data: [10, 10, 10],
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
      this.myChartCreate.resize(100, 200);
    },
    handleChoose(id) {
      this.dataFunds = this.dataFunds.map((el) =>
        el.id === id ? { ...el, isChoose: true } : el,
      );
    },
    handleCancelChoose(id) {
      this.dataFunds = this.dataFunds.map((el) =>
        el.id === id ? { ...el, isChoose: false, value: 0 } : el,
      );
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
        const { res } = await this.$axios.post(
          "/laravel/packages/create",
          dataApi,
        );
        console.log(res);
        if (res) {
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(error);
        this.$store.commit("SET_LOADING", false);
      }
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
</style>
