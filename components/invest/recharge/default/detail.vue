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
        ><a @click="$router.push('/invest/recharge/default')"
          >Các gói cơ bản</a
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><a @click="$router.push('/invest/recharge/default')">{{
          $route.params.id
        }}</a></a-breadcrumb-item
      >
    </a-breadcrumb>
    <div class="package">
      <div class="package-block">
        <img
          :src="dataDetail?.avatar"
          class="package__block--img"
          alt="avatar_package"
        /><br />
        <div class="package__block--title">{{ dataDetail?.name }}</div>
        <div class="package__block--repair">Sửa tên gói</div>
        <br />
        <div class="package__block--content">
          Phù hợp với những nhà đầu tư muốn thêm kênh sinh lời ổn định, với mức
          độ rủi ro thấp nhất.
        </div>
        <div class="package__btn" @click="onCreatePackage">
          <a-icon
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
        <div class="text-medium">Tạo gói</div>
      </div>
      <div class="package-block">
        <div>Chi tiết phân bổ</div>
        <canvas id="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { Chart, registerables } from "chart.js";
import generate from "../../../../mixins/generate";
Chart.register(...registerables);
export default {
  mixins: [generate],
  data() {
    return {
      dataDetail: [],
      labelChart: [],
      dataChart: [],
      chart: null,
    };
  },
  computed: {},
  mounted() {
    this.initData();
    this.createChart();
  },
  methods: {
    async onCreatePackage() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios.post(
          `/laravel/packages/${this.$route.params.id}/clone`,
        );
        if (data?.data) {
          console.log("1");
          this.$store.commit("SET_LOADING", false);
          this.$router.push(
            `/invest/recharge/customize/${this.$route.params.id}`,
          );
        } else {
          console.log("2");

          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(error);
        console.log("3");
        this.openNotificationWithIcon("error", error?.response?.data?.message);
        this.$store.commit("SET_LOADING", false);
      }
    },
    async initData() {
      try {
        this.$store.commit("SET_LOADING", true);
        const { data } = await this.$axios.get(
          `laravel//packages/${this.$route.params.id}`,
        );
        if (data.data) {
          this.dataDetail = data.data;
          this.labelChart.push(data.data.allocation[0].code);
          this.dataChart.push(data.data.allocation[0].percentage);
          this.chart.update();
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    createChart() {
      var ctx = document.getElementById("chart");
      this.chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.labelChart,
          datasets: [
            {
              data: this.dataChart,
              backgroundColor: ["rgb(255, 99, 132)"],
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
      this.chart.resize(100, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.package__block--img {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 50%;
}
.package-block {
  margin-bottom: 1rem;
  padding: 2rem;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.package__block--content {
  padding-bottom: 20px;
}
.package__block--title {
  font-size: 1.3rem;
  font-weight: 600;
}
.package__block--repair {
  color: #2875c7;
  cursor: pointer;
  font-size: 0.85rem;
}
canvas {
  max-height: 300px;
  max-width: 300px;
}
</style>
