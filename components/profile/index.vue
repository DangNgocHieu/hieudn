<template>
  <div>
    <a-card title="Ảnh đại diện" class="avatar-card">
      <a-upload
        name="avatar"
        listType="picture-card"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleUpdateAvatar"
      >
        <img
          :src="`${imageUrl.replace('/api', '/laravel')}`"
          alt=""
          width="102"
          height="102"
          v-if="imageUrl"
        />

        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="imageUrl" />
      </a-modal>
    </a-card>
    <a-card title="Trạng thái tài khoản">
      <a-tag :color="`${$auth?.user?.data?.is_verify ? '#87d068' : '#f50'}`">
        {{ $auth?.user?.data?.is_verify ? "Đã kích hoạt" : "Chưa kích hoạt" }}
      </a-tag>
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
        <div class="profile-block-img">
          <div style="width: 100%" v-if="$auth.user.data.identity_image_front">
            <div>Mặt trước</div>
            <img
              :src="`${$auth.user.data.identity_image_front?.replace('/api', '/laravel')}`"
              width="300"
              height="180"
              alt="front_img"
            />
          </div>
          <div style="width: 100%" v-if="$auth.user.data.identity_image_back">
            <div>Mặt sau</div>
            <img
              :src="`${$auth.user.data.identity_image_back?.replace('/api', '/laravel')}`"
              width="300"
              height="180"
              alt="back_img"
            />
          </div>
        </div>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import generate from "../../mixins/generate";
import moment from "moment";

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
    };
  },
  computed: {
    ...mapFields({
      isChange: "profile.isChange",
      imageUrl: "profile.imageUrl",
    }),
  },
  mounted() {
    this.$store.commit(
      "profile/SET_IMG_URL",
      this.$auth.user.data.avatar ? this.$auth.user.data.avatar : "",
    );
    const {
      name,
      email,
      gender,
      address,
      identity_number,
      valid_date,
      dob,
      issue_date,
      issue_place,
    } = this.$auth.user.data;
    this.formInfo = {
      name,
      phone: "",
      email,
      gender,
      address,
    };
    this.formInfoCCCD = {
      numberCCCD: identity_number,
      birthDay: dob,
      startDay: issue_date,
      endDay: moment(valid_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      addressRegisted: issue_place,
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewVisible = true;
    },

    ongChangeProfile() {
      this.isChange = !this.isChange;
    },
    onSubmit() {},
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
    async beforeUpload(file) {
      const isJpgOrPng = ["image/jpg", "image/png", "image/jpeg"].includes(
        file.type,
      );
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng) {
        this.openNotificationWithIcon(
          "error",
          "Bạn chỉ có thể tải lên ảnh có dạng .jpg hoặc .png",
        );
      } else if (!isLt2M) {
        this.openNotificationWithIcon(
          "error",
          "Bạn chỉ có thể tải lên ảnh có dung lượng < 2MB!",
        );
      } else {
        try {
          this.$store.commit("SET_LOADING", true);
          let formData = new FormData();
          formData.append("image", file);
          const { data } = await this.$axios.post(
            "/laravel/me/change-avatar",
            formData,
          );

          if (data) {
            this.$store.commit("SET_LOADING", false);
            await this.$auth.fetchUser();
          } else {
            this.$store.commit("SET_LOADING", false);
          }
        } catch (error) {
          this.$store.commit("SET_LOADING", false);
        }
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
// .btn-submit {
//   background: green;
//   color: #fff;
//   &:hover {
//     background: green;
//     color: #fff;
//   }
// }
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
.profile-block-img {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
</style>
