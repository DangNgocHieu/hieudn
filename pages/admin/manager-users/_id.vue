<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <nuxt-link to="/admin/manager-users">Quản lý người dùng</nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ details?.name }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="mt-4">
      <a-tabs
        :default-active-key="$route.query?.tab || 1"
        @change="handleChangeTab"
      >
        <a-tab-pane key="1" tab="Thông tin cá nhân">
          <ManagerUsersProfile />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Thông báo">
          <ManagerUsersNotify />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Lịch sử giao dịch">
          <ManagerUsersHistory />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Các gói đầu tư "
          ><ManagerUsersInvest />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import detail from "./../../../components/invest/recharge/customize/detail.vue";
export default {
  components: { detail },
  layout: "admin",
  computed: {
    ...mapState("admin", ["details"]),
  },
  mounted() {
    this.getDetails({ id: this.$route.params.id });
    if (!this.$route.query?.tab) {
      this.$router.push({ query: { ...this.$route.query, tab: 1 } });
    }
  },
  methods: {
    ...mapActions("admin", ["getDetails"]),
    handleChangeTab(key) {
      this.$router.push({ query: { ...this.$route.query, tab: key } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
