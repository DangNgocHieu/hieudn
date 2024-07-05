

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
  },
};
