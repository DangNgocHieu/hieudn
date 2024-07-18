<template>
  <div class="ekyc-box">
    <p>Xác minh danh tính của bạn bằng cách tải ảnh CCCD</p>
    <a-progress :percent="percent" />
    <div v-if="!step" class="box-img">
      <p class="text">Mặt trước</p>
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUploadFont"
        @change="handleChangeFont"
      >
        <img
          :src="
            imageUrlFont
              ? imageUrlFont
              : require('~/assets/images/front_img.png')
          "
          width="316px"
          height="200px"
        />
      </a-upload>
    </div>
    <div v-else class="box-img">
      <p class="text">Mặt sau</p>
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUploadBack"
        @change="handleChangeBack"
      >
        <img
          :src="
            imageUrlBack
              ? imageUrlBack
              : require('~/assets/images/back_img.png')
          "
          width="316px"
          height="200px"
        />
      </a-upload>
    </div>

    <div class="btn-submit-parent">
      <a-button @click="handleBackStatus" class="btn-submit">{{
        percent >= 50 && step === 1 ? "Trước" : "Đăng xuất"
      }}</a-button>
      <a-button
        @click="handleConfirm"
        :disabled="percent != 100"
        class="btn-submit"
        v-if="percent >= 50 && step === 1"
        >Hoàn tất</a-button
      >
      <a-button
        class="btn-submit"
        @click="handleNextStatus"
        :disabled="percent === 0"
        v-else
        >Tiếp</a-button
      >
    </div>
  </div>
</template>

<script>
import generate from "../../mixins/generate";
export default {
  components: {},
  data() {
    return {
      imageUrlFont: "",
      imageUrlBack: "",
      percent: 0,
      isStatus: "",
      step: 0,
    };
  },
  mixins: [generate],
  methods: {
    async handleChangeFont(info) {
      console.log(info.file, "aaa");

      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrlFont = imageUrl;
          this.loading = false;
          this.percent = 50;
          this.step = 1;
        });
      }
    },
    handleChangeBack(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrlBack = imageUrl;
          this.loading = false;
          this.percent = 100;
        });
      }
    },
    async beforeUploadFont(file) {
      try {
        this.$store.commit("SET_LOADING", true);
        let formData = new FormData();
        formData.append("image", file);
        console.log(formData);
        const res = await this.$axios.post(
          "/laravel/me/kyc/identity_image_front",
          formData,
        );
        if (res) {
          console.log(res);
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    async beforeUploadBack(file) {
      try {
        this.$store.commit("SET_LOADING", true);
        let formData = new FormData();
        formData.append("image", file);
        const res = await this.$axios.post(
          "/laravel/me/kyc/identity_image_back",
          formData,
        );
        if (res) {
          console.log(res);
          this.$store.commit("SET_LOADING", false);
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    // truoc, dang xuat
    async handleBackStatus() {
      try {
        this.$store.commit("SET_LOADING", true);
        if (this.percent == 0 && this.step === 0) {
          // await this.$axios.post("/laravel/logout");
          await this.$auth.logout();
        }
        this.$store.commit("SET_LOADING", false);
        this.step = 0;
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
      }
    },
    //tiep
    handleNextStatus() {
      if (this.imageUrlFont) {
        this.step = 1;
      }
    },
    //hoan tat
    async handleConfirm() {
      try {
        this.$store.commit("SET_LOADING", true);
        const res = await this.$axios.post("/laravel/me/kyc/verify");
        if (res) {
          this.$store.commit("SET_LOADING", false);
          this.openNotificationWithIcon(
            "success",
            "Bạn đã xác thực thành công",
          );
          await this.$auth.fetchUser();
          this.$router.push("/dashboard");
        } else {
          this.$store.commit("SET_LOADING", false);
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
        this.openNotificationWithIcon(
          "error",
          "Bạn đã xác thực thất bại, Ảnh không hợp lệ",
        );
        this.$store.commit("SET_LOADING", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ekyc-box {
  background-color: #fff;
  width: 26rem;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}
.btn-submit-parent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    padding-top: 10px;
  }
}
.avatar-uploader {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
