import { CookieScheme } from "~auth/runtime";

export default class CustomScheme extends CookieScheme {
    async login(endpoint) {
        if (this.options.endpoints.csrf) {
            await this.$auth.request(this.options.endpoints.csrf, {
                maxRedirects: 0
            });
        }
        this.$auth.reset({ resetInterceptor: false });
        const { loginTwoFa, ...data } = endpoint.data;

        const url = loginTwoFa ? this.options.endpoints.loginTwoFa : this.options.endpoints.login

        const response = await this.$auth.request({ ...endpoint, data }, url);

        this.updateTokens(response);

        if (!this.requestHandler.interceptor) {
            this.initializeRequestInterceptor();
        }

        if (this.options.user.autoFetch) {
            await this.fetchUser();
        }

        return response;
    }
}
