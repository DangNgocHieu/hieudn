<template>
  <a-card title="Công cụ tính lãi kép" :bordered="false">
    <a-form-model :model="form" :rules="rules" @submit="handleSubmit">
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
        <a-button
          type="primary"
          html-type="submit"
          class="btn-submit"
          @click="handleSubmit"
        >
          Tính toán
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(this.form);
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
.btn-submit {
  background: green;
  color: #fff;
  border-color: green;
  &:hover {
    background: green;
    color: #fff;
  }
}
</style>
