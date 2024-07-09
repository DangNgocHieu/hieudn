<template>
  <div>
    <a-card title="Các chứng chỉ quỹ">
      <div class="certificate">
        <div class="left-tc">
          <span
            >Hiện nay KTN có 4 loại quỹ đầu tư cho KH lựa chọn, mỗi quỹ phù hợp
            với một nhu cầu đầu tư khác nhau</span
          >
          <div class="btn-tc">
            <button
              v-for="(el, key) in dataCertificate"
              :key="key"
              :class="[{ 'active-button': key === isActive }]"
              @click="handleChangeButton(el.id)"
            >
              {{ el.name }}
            </button>
          </div>
        </div>
        <div class="right-tc">
          <a-card title="Quỹ đầu tư trái phiếu TCBF (TCBF)">
            <span
              >Quỹ đầu tư trái phiếu TCBF chuyển trái phiếu doanh nghiệp, chứng
              chỉ tiền gửi, tín phiếu tốt nhất thị trường để tạo nguồn thu nhập
              ổn định dài hạn</span
            >
          </a-card>
          <a-tabs default-active-key="1" @change="(e) => handleChangeTab(e)">
            <a-tab-pane tab="1 tháng" key="1"> </a-tab-pane>
            <a-tab-pane tab="3 tháng" key="2"> </a-tab-pane>
            <a-tab-pane tab="6 tháng" key="3"> </a-tab-pane>
            <a-tab-pane tab="1 năm" key="4"> </a-tab-pane>
          </a-tabs>
          <canvas id="myChart"></canvas>
        </div>
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
      isActive: 0,
      dataCertificate: [
        {
          name: "TCBF",
          id: 0,
        },
        {
          name: "TCFF",
          id: 1,
        },
        {
          name: "TCEF",
          id: 2,
        },
        {
          name: "TCFIN",
          id: 3,
        },
      ],
      dataChart: [1, 2, 3, 4, 5, 6, 7],
      indexChart: 1,
      myChart: null,
    };
  },

  watch: {
    indexChart(value) {
      if (value == 1) {
        this.dataChart = [7, 6, 5, 4, 3, 2, 1];
      }
      if (value == 2) {
        this.dataChart = [37, 36, 34, 35, 33, 32, 31];
      }
      if (value == 3) {
        this.dataChart = [17, 16, 15, 13, 14, 12, 11];
      }
      if (value == 4) {
        this.dataChart = [21, 22, 24, 23, 25, 26, 27];
      }
      console.log(value, "11");
      this.myChart.destroy();
      this.createChart();
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    handleChangeButton(index) {
      this.isActive = index;
    },
    handleChangeTab(e) {
      this.indexChart = e;
    },
    createChart() {
      var ctx = document.getElementById("myChart");
      this.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "week 1",
            "week 2",
            "week 3",
            "week 4",
            "week 5",
            "week 6",
            "week 7",
            "week 8",
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: this.dataChart,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {},
      });
      this.myChart.resize(200, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.certificate {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100vh - 49px - 56px - 48px);
}
.left-tc,
.right-tc {
  border: 1px solid;
}
.left-tc {
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 20%;

  .btn-tc {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    align-items: center;
    margin: 10px 10px;
    height: 100%;
    justify-content: center;
  }
  span {
    padding-left: 10px;
    padding-top: 10px;
  }
}
.right-tc {
  width: 75%;
  max-width: 75%;
}
button {
  padding: 5px 15px;
  margin: 20px 0;
}
.active-button {
  background: green;
  color: #fff;
}
</style>
