import Vue from "vue";
import moment from "moment";
import { UAParser } from "ua-parser-js";
import { debounce } from "lodash";
import { Fragment } from "vue-frag";
import { getErrors, getErrorMessageResponse } from "@/utils";
import {
    sendCrossAuth,
    decodeRedirectUrl,
    formatTimezone,
} from "~/utils/common";

const DEBOUNCE_DELAY = 300;
const mixin = {
    components: {
        Fragment,
    },
    data() {
        return {};
    },
    computed: {
        isSPAndroid() {
            const ua = UAParser();
            return (
                ua.os.name === "Android" &&
                ua.device.type === "mobile" &&
                ua.browser.name === "Chrome"
            );
        },

        isSafari() {
            const ua = UAParser();
            return (
                ua.browser.name === "Mobile Safari" || ua.browser.name === "Safari"
            );
        },

        isProduction() {
            return this.$config.isProduction;
        },

        isLoading() {
            return this.$store?.state?.loading;
        },
        listLanguage() {
            return [
                {
                    code: "en",
                    img: "en",
                },
                {
                    code: "ja",
                    img: "jp",
                },
            ];
        },
        inquiryURL() {
            return `${this.$config.inquiryURL.replace(/\/$/, "")}/${this.$i18n.locale}`;
        },
    },

    methods: {
        sendCrossAuth,
        getErrorMessageResponse,
        decodeRedirectUrl,
        onSubmitDebounce: debounce(function (cb) {
            cb();
        }, DEBOUNCE_DELAY),
        htaccessRedirect(id) {
            if (!id) {
                return this.$config.mediaDomain;
            }
            return `${this.$config.mediaDomain.replace(/\/$/, "")}/access.php?id=${id}`;
        },

        // function common for get validate message
        getErrorsMessage(v) {
            const errorObj = getErrors(v);
            const options = errorObj?.params?.value;
            return {
                key: `validations.${errorObj?.params?.type}`,
                options,
            };
        },
        formatDateTimeUtc(dateTime, format = "YYYY.MM.DD HH.mm") {
            if (!dateTime) return null;
            const zone = formatTimezone(this.$auth.$state.user?.timezone);
            return moment(dateTime).zone(zone).format(format);
        },
    },
};

Vue.mixin(mixin);
