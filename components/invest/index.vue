<template>
  <div>
    <div class="invest__block">
      <div class="invest__block--title">Tổng quan</div>
      <br />
      <div class="invest__currency">
        {{
          assetInvest?.balance
            ? formatCurrency(assetInvest?.balance) + " đ"
            : "-1111"
        }}
      </div>
      <div class="invest__block__method">
        <div class="invest__block__method--recharge">
          <div class="invest__btn" @click="handleNextRecharge">
            <a-icon type="wallet" class="icon-wallet" />
          </div>
          <div class="text-medium">Đầu tư</div>
        </div>
      </div>
    </div>
    <div class="invest__info">
      <div class="invest__info--title">Thông tin chung</div>
      <div class="invest__info-block">
        <div class="invest__info__child">
          <div>
            <div class="invest__info__child--title">Tổng đầu tư</div>
            <div class="invest__info__child--num">
              {{
                assetInvest?.total_invest
                  ? formatCurrency(assetInvest.total_invest) + " đ"
                  : "-"
              }}
            </div>
          </div>
          <div>
            <div class="invest__info__child--title">Ngày bắt đầu</div>
            <div class="invest__info__child--num">
              {{
                assetInvest?.started_at
                  ? formatDate(assetInvest?.started_at)
                  : "-"
              }}
            </div>
          </div>
        </div>
        <div class="invest__info__child">
          <div>
            <div class="invest__info__child--title">Tăng trưởng</div>
            <div>
              {{
                assetInvest?.profit
                  ? formatCurrency(assetInvest?.profit) + " đ"
                  : "-"
              }}
            </div>
          </div>
          <div>
            <div class="invest__info__child--title">Đã rút</div>
            <div class="invest__info__child--num">-</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import generate from "../../mixins/generate";

export default {
  components: {},
  mixins: [generate],
  data() {
    return {
      assetInvest: null,
    };
  },
  mounted() {
    this.getAssetInvest();
  },
  methods: {
    handleNextRecharge() {
      this.$router.push("/invest/recharge");
    },
    async getAssetInvest() {
      try {
        this.$store.commit("SET_LOADING", true);
        const res = await this.$axios.get("/laravel/me/assets");
        console.log(res.data.data);
        if (res.data.data) {
          this.$store.commit("SET_LOADING", false);
          this.assetInvest = res.data.data;
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
.invest__block,
.invest__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  background-color: #fff;
  .invest__block--title {
    font-size: 16px;
    font-weight: 500;
  }
  .invest__currency {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
}
.invest__info {
  margin-top: 20px;
  .invest__info--title {
    font-weight: 600;
    font-size: 16px;
  }
  .invest__info-block {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    padding-top: 20px;
    .invest__info__child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 120px;
      min-height: 120px;
    }
  }
}
.icon-wallet {
  padding: 0.8rem;
  background-color: rgb(50, 198, 16);
  font-size: 1.2rem;
  border: 1px solid rgb(50, 198, 16);
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
}
.text-medium {
  padding-top: 4px;
  font-weight: 600;
}
</style>
