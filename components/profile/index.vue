<template>
  <div>
    <a-card title="Ảnh đại diện" class="avatar-card">
      <a-upload
        name="avatar"
        listType="picture-card"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleUpdateAvatar"
        @preview="handlePreview"
      >
        <div>
          <div v-if="imageUrl" class="image-parent">
            <img :src="imageUrl" alt="" width="102" height="102" />
            <div class="image-child">
              <a-icon type="eye" class="icon-eye" />
              <a-icon class="icon-delete" type="delete" />
            </div>
          </div>
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </div>
      </a-upload>
    </a-card>
    <a-card title="Trạng thái tài khoản">
      <span>Đã kích hoạt</span>
    </a-card>
    <a-card title="Thông tin cá nhân">
      <a-form-model ref="formInfo" :model="formInfo" :rules="rulesInfo">
        <a-form-model-item
          :ref="el.ref"
          :label="el.label"
          :prop="el.props"
          v-for="(el, key) in dataFormInfo"
          :key="key"
        >
          <a-input v-model="formInfo[el.ref]" :disabled="!isChange" />
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card title="Thông tin CCCD">
      <a-form-model
        ref="formInfoCCCD"
        :model="formInfoCCCD"
        :rules="rulesInfoCCCD"
      >
        <a-form-model-item
          :ref="el.ref"
          :label="el.label"
          :prop="el.props"
          v-for="(el, key) in dataFormInfoCCCD"
          :key="key"
          type="date"
        >
          <a-input
            v-model="formInfoCCCD[el.ref]"
            v-if="['numberCCCD', 'addressRegisted'].includes(el.ref)"
            :disabled="!isChange"
          />
          <a-date-picker
            v-model="formInfoCCCD[el.ref]"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
            :disabled="!isChange"
            v-else
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            class="btn-submit"
            @click="ongChangeProfile()"
            v-if="!isChange"
          >
            Thay đổi
          </a-button>
          <a-button class="btn-submit" @click="onSubmit" v-else>
            Cập nhật
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import generate from "../../mixins/generate";
export default {
  mixins: [generate],
  data() {
    return {
      dataFormInfo: [
        {
          ref: "name",
          label: "Họ và tên",
          props: "name",
          model: "",
        },
        {
          ref: "phone",
          label: "Số điện thoại",
          props: "phone",
          model: "",
        },
        {
          ref: "email",
          label: "Email",
          props: "email",
          model: "",
        },
        {
          ref: "gender",
          label: "Giới tính",
          props: "gender",
          model: "",
        },
        {
          ref: "address",
          label: "Địa chỉ",
          props: "address",
          model: "",
        },
      ],
      dataFormInfoCCCD: [
        {
          ref: "numberCCCD",
          label: "Số CCCD",
          props: "numberCCCD",
        },
        {
          ref: "birthDay",
          label: "Ngày sinh",
          props: "birthDay",
        },
        {
          ref: "startDay",
          label: "Ngày bắt đầu",
          props: "startDay",
        },
        {
          ref: "endDay",
          label: "Ngày hết hạn",
          props: "endDay",
        },
        {
          ref: "addressRegisted",
          label: "Địa chỉ đăng kí",
          props: "addressRegisted",
        },
      ],
      rulesInfo: {
        name: [
          {
            required: true,
            message: "Vui lòng nhập họ và tên",
          },
        ],
        phone: [
          {
            required: true,
            message: "Vui lòng nhập số điện thoại",
          },
        ],
        email: [
          {
            required: true,
            message: "Vui lòng nhập email",
          },
        ],
        gender: [
          {
            required: true,
            message: "Vui lòng nhập giới tính",
          },
        ],
        address: [
          {
            required: true,
            message: "Vui lòng nhập địa chỉ",
          },
        ],
      },
      rulesInfoCCCD: {
        numberCCCD: [
          {
            required: true,
            message: "Vui lòng nhập số CCCD",
          },
        ],
        birthDay: [
          {
            required: true,
            message: "Vui lòng nhập ngày sinh",
          },
        ],
        startDay: [
          {
            required: true,
            message: "Vui lòng nhập ngày bắt đầu",
          },
        ],
        endDay: [
          {
            required: true,
            message: "Vui lòng nhập ngày hết hạn",
          },
        ],
        addressRegisted: [
          {
            required: true,
            message: "Vui lòng nhập địa chỉ đăng kí",
          },
        ],
      },
      formInfo: {
        name: "",
        phone: "",
        email: "",
        gender: "",
        address: "",
      },
      formInfoCCCD: {
        numberCCCD: "",
        birthDay: undefined,
        startDay: undefined,
        endDay: undefined,
        addressRegisted: "",
      },
      loading: false,
      previewVisible: false,
      previewImage: "",
    };
  },
  computed: {
    ...mapFields({
      isChange: "profile.isChange",
      imageUrl: "profile.imageUrl",
    }),
  },
  mounted() {},
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },

    ongChangeProfile() {
      console.log("1");
      this.isChange = !this.isChange;
    },
    onSubmit() {
      console.log("2");
    },
    handleChange(el, e) {
      this[el] = e.target.value;
      // this.$store.commit("profile/")
    },
    handleUpdateAvatar(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.getBase64(info.file.originFileObj, (imageUrl) => {
          this.$store.commit("profile/SET_IMG_URL", imageUrl);
          this.loading = false;
          this.openNotificationWithIcon(
            "success",
            "Cập nhật avatar thành công",
          );
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.openNotificationWithIcon(
          "error",
          "Bạn chỉ có thể tải lên ảnh có dạng .jpg hoặc .png",
        );
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.openNotificationWithIcon(
          "error",
          "Bạn chỉ có thể tải lên ảnh có dung lượng < 2MB!",
        );
      }
      return isJpgOrPng && isLt2M;
    },

    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-submit {
  background: green;
  color: #fff;
  &:hover {
    background: green;
    color: #fff;
  }
}
.icon-eye {
  // max-height: 200px;
  padding-right: 10px;
}
.icon-eye,
.icon-delete {
  z-index: 1000000;
}
.image-parent {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .image-child {
    position: absolute;
  }
}
</style>
