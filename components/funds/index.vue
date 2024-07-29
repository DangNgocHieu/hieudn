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
              :class="[{ 'active-button': el.id === isActive }]"
              @click="handleChangeButton(el.id)"
            >
              {{ el.code }}
            </button>
          </div>
        </div>
        <div class="right-tc">
          <a-card :title="dataLabel.name">
            <span>{{ dataLabel.description }}</span>
          </a-card>
          <a-tabs default-active-key="1" @change="(e) => handleChangeTab(e)">
            <a-tab-pane tab="1 tháng" key="1"> </a-tab-pane>
            <a-tab-pane tab="3 tháng" key="3"> </a-tab-pane>
            <a-tab-pane tab="6 tháng" key="6"> </a-tab-pane>
            <a-tab-pane tab="1 năm" key="12"> </a-tab-pane>
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
      dataCertificate: [],
      dataChart: [],
      indexChart: 1,
      myChart: null,
      dataLabel: {},
    };
  },
  watch: {
    dataChart: {
      handler(val) {
        this.myChart.destroy();
        this.createChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.createChart();
    this.initData();
    this.handleCallApiChart(1);
  },
  methods: {
    async initData() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios.get("/laravel/funds");
        if (data.data) {
          this.dataCertificate = data.data;
          this.isActive = data.data[0]?.id;
          this.handleCallApiDetail(1);
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    async handleCallApiDetail(id) {
      this.$store.commit("SET_LOADING", true);
      try {
        const { data } = await this.$axios.get(`/laravel/funds/${id}`);
        if (data.data) {
          this.dataLabel = data.data;
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    async handleCallApiChart(id) {
      this.$store.commit("SET_LOADING", true);
      try {
        const { data } = await this.$axios.get(
          `/laravel/funds/${id}/history?month=${this.indexChart}`,
        );
        if (data.data) {
          let convertData = data.data.map((item, index) => {
            if (index === 0) {
              return (item = {
                ...item,
                navCurrent: item.navCurrent,
                percent: 0,
              });
            }
            return {
              ...item,
              navCurrent: item.navCurrent,
              percent: +(
                ((data.data[index].navCurrent - data.data[0].navCurrent) /
                  data.data[0].navCurrent) *
                100
              ).toFixed(2),
            };
          });
          this.dataChart = convertData;
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    handleChangeButton(index) {
      this.isActive = index;
      this.handleCallApiDetail(index);
      this.handleCallApiChart(index);
    },
    handleChangeTab(e) {
      this.indexChart = e;
      this.handleCallApiChart(this.isActive);
    },
    createChart() {
      const a = this.dataChart.map((el) => {
        return el.navCurrent;
      });
      var ctx = document.getElementById("myChart");
      this.myChart = new Chart(ctx, {
        type: "line",

        data: {
          labels: this.dataChart.map((el) => {
            return el.matchedDate;
          }),
          datasets: [
            {
              label: "NAV",
              data: this.dataChart.map((el) => {
                return el.navCurrent;
              }),
              fill: true,
              borderColor: "red",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              suggestedMax: Math.max(
                this.dataChart.map((el) => {
                  return el.percent;
                }),
              ),
            },
            x: {
              type: "category",
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
              callbacks: {
                title: (tooltipItems) => {
                  return `${tooltipItems[0].label}`;
                },
                label: (tooltipItem) => {
                  return `Giá hiện tại: ${tooltipItem.raw}`;
                },
                afterLabel: (tooltipItem) => {
                  return `Tỉ lệ tăng trưởng: ${this.dataChart[tooltipItem?.dataIndex]?.percent} %`;
                },
              },
            },
          },
        },
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
