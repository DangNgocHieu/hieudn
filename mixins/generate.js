
import dayjs from 'dayjs';

export default {
  data() {
    return {
      timezoneUtc: null,
      displayDateTime: null,
      isCallingAPI: false,
    };
  },
  created() {

  },
  methods: {
    trimMultipleSpace(character, to) {
      let characterTrimSpace = character?.replace(/　+/g, to);
      let characterTrimTab = characterTrimSpace?.replace(/	+/g, to);
      let characterTrimSpace2 = characterTrimTab?.replace(/\s/g, to);
      return characterTrimSpace2?.replace(/ +/g, to);
    },
    openNotificationWithIcon(type, mess) {
      this.$notification[type]({
        message: type === 'success' ? 'Thành công' : 'Lỗi',
        description: mess,
      });
    },
    formatCurrency(value) {
      if (!value) return 0;
      return String(value.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDateTime(value) {
      if (!value) return '';
      return dayjs(value).format('DD-MM-YYYY');
    },
    computedInvest(profit, total) {
      if (!total) return 0;
      return ((profit / total) * 100).toFixed(2);
    }
  },
};
