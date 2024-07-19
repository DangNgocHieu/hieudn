import { CookieScheme } from "~auth/runtime";

export default class CustomScheme extends CookieScheme {
    async login(endpoint) {
        try {
            this.$auth.reset({ resetInterceptor: false });
            const { loginTwoFa, ...data } = endpoint.data;

            const url = loginTwoFa ? this.options.endpoints.loginTwoFa : this.options.endpoints.login

            const response = await this.$auth.request({ ...endpoint, data }, url);

            this.updateTokens(response);
            // if (!this.requestHandler.interceptor) {
            //     this.initializeRequestInterceptor();
            // }

            // if (this.options.user.autoFetch) {
            //     await this.fetchUser();
            // }

            return response;
        } catch (error) {
            console.log(error, "eerrrrr");
        }
    }
    updateTokens(response) {
        const token = response?.data?.accessToken;
        this.token.set(token);
    }
}
