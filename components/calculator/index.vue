<template>
  <div>
    <a-card title="Công cụ tính lãi kép" :bordered="false">
      <a-form-model
        :model="form"
        :rules="rules"
        @submit="handleSubmit"
        ref="ruleForm"
      >
        <div class="form">
          <a-form-model-item
            label="Số tiền vốn ban đầu"
            prop="initialAmount"
            class="form-item"
          >
            <a-input v-model="form.initialAmount"> </a-input>
          </a-form-model-item>
          <a-form-model-item
            label="Thời gian gửi (năm)"
            prop="time"
            class="form-item"
          >
            <a-input v-model="form.time"> </a-input>
          </a-form-model-item>
        </div>
        <div class="form">
          <a-form-model-item label="Lãi suất (%)" prop="rate" class="form-item">
            <a-input v-model="form.rate"> </a-input>
          </a-form-model-item>
          <a-form-model-item
            label="Số lần ghép lãi trong năm"
            prop="accumulations"
            class="form-item"
          >
            <a-input v-model="form.accumulations"> </a-input>
          </a-form-model-item>
        </div>
        <a-form-model-item>
          <a-button class="btn-submit" @click="handleSubmit">
            Tính toán
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div v-if="isShowChart">
        <div class="text-total">
          <div>
            Với số tiền ban đầu:
            <p>{{ form.initialAmount }}</p>
          </div>
          <div>
            Lãi suất hàng năm:
            <p>{{ form.rate }}</p>
            . Mỗi năm lãi ghép
            <p>{{ form.accumulations }}</p>
          </div>
          <div>
            Kết quả bạn sẽ có
            <p>
              {{
                compoundInterest(
                  form.initialAmount,
                  form.rate / 100,
                  form.accumulations,
                  form.rate,
                )
              }}
            </p>
            sau
            <p>{{ form.time }}</p>
            năm.
          </div>
          <canvas id="chart"></canvas>
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
      dataForm: null,
      form: {
        initialAmount: "",
        time: "",
        rate: "",
        accumulations: "",
      },
      rules: {
        initialAmount: [
          {
            required: true,
            message: "Vui lòng nhập số vốn ban đầu",
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: "Vui lòng nhập thời gian gửi",
            trigger: "blur",
          },
        ],
        rate: [
          {
            required: true,
            message: "Vui lòng nhập lãi suất",
            trigger: "blur",
          },
        ],
        accumulations: [
          {
            required: true,
            message: "Vui lòng nhập số lần ghép lãi ",
            trigger: "blur",
          },
        ],
      },
      dataChart: [],
      labelChart: [],
      chart: null,
      isShowChart: false,
    };
  },
  mounted() {},
  methods: {
    handleSubmit(e) {
      return this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isShowChart = true;
          this.chart?.destroy();
          this.dataChart = [];
          this.labelChart = [];
          this.dataForm = this.form;
          let { initialAmount, time, accumulations, rate } = this.form;
          if (time >= 1) {
            for (let idx = 0; idx < Math.floor(time); idx++) {
              this.dataChart.push(
                this.compoundInterest(
                  initialAmount,
                  rate / 100,
                  accumulations,
                  idx,
                ),
              );
              this.labelChart.push(idx);
            }
          }
          this.createChart();
        } else {
          console.log("error submit!!");
          this.isShowChart = false;
          return false;
        }
      });
    },
    //p: so tien von ban dau
    //i:  lai suat
    //n: thoi gian gui
    //m:  lai ghep trong nam
    compoundInterest(p, i, m, n) {
      return (p * Math.pow(1 + i / m, n * m))
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    createChart() {
      var ctx = document.getElementById("chart");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labelChart,
          datasets: [
            {
              label: "12121",
              data: this.dataChart,
              fill: false,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  display: flex;
  gap: 12px;
}
.form-item {
  width: 100%;
}
</style>
