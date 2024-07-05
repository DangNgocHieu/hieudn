<template>
  <span :class="['c-input-common__tooltip', message && 'is-show']"
    ><span
      :class="[
        isTooltipSmall
          ? 'c-input-common__tooltip-item--width-small'
          : 'c-input-common__tooltip-item',
      ]"
      v-html="message"
    ></span
  ></span>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    validator: {
      type: Object,
      default: () => {},
    },
    scheme: {
      type: Array,
      default: () => [],
    },
    errorResponse: {
      type: String,
      default: "",
    },
    isCustomMessError: {
      type: Boolean,
      default: false,
    },
    isTooltipSmall: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    message() {
      if (this.validator?.$error) {
        for (let item of this.scheme) {
          if (!this.validator[item.key]) {
            if (this.isCustomMessError) {
              item.options &&
                Object.keys(item.options).map((key) => {
                  item.options[key] = this.$t(item.options[key]);
                });

              return this.$t(item.msg, { ...item.options });
            } else {
              const fieldValue = this.$t(item.options?.field);
              const fieldObj = fieldValue ? { field: fieldValue } : {};
              return this.$t(item.msg, { ...item.options, ...fieldObj });
            }
          }
        }
      } else if (this.errorResponse) {
        return this.$t(this.errorResponse);
      }
    },
  },
};
</script>

<style></style>
