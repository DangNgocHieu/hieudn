import { cloneDeep } from "lodash";
import { getField, updateField } from "vuex-map-fields";
import { make } from "@/utils";

export const state = () => ({
    initialState: null,
    loading: false, // FOR LOADING PURPOSE
    fetching: false, // FOR FETCHING BEFORE RENDER PAGE PURPOSE
    notify: {
        open: false,
        text: "",
        type: "",
    },
    dateActivePosition: "",
    showingModalName: "",
    showingDrawerName: "",
    listCountries: [],
    location: null,
});
export const actions = {
    error(_, payload) {
        return this.$axios.post("/error-log", payload, {
            baseURL: this.$config.urlP2T,
        });
    },
    setNotify({ commit }, payload) {
        commit("SET_NOTIFY", payload);
    },
    async setLoading({ commit }, payload) {
        if (typeof payload === "boolean") {
            commit("SET_LOADING", payload);
        } else if (typeof payload === "number") {
            commit("SET_LOADING", true);
            await new Promise((resolve) => {
                const t = setTimeout(() => {
                    resolve(clearTimeout(t));
                }, payload);
            });
            commit("SET_LOADING", false);
        }
    },

    setFetching({ commit }, payload) {
        commit("SET_FETCHING", payload);
    },
    async getListCountries({ commit, state }) {
        if (state.listCountries?.length) return state.listCountries;

        try {
            const res = await this.$axios.get("/countries");
            make(commit)("listCountries", res.data);
            return res.data;
        } catch (error) {
            return [];
        }
    },
    async getLocation({ commit, state }) {
        if (state.location) return state.location;

        try {
            const res = await this.$axios.get("/location");
            make(commit)("location", res.data);

            return res.data;
        } catch (error) {
            return undefined;
        }
    },
};
export const mutations = {
    updateField,

    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_FETCHING(state, payload) {
        state.fetching = payload;
    },
    SET_NOTIFY(state, payload) {
        const { text, type, open } = payload;
        state.notify.text = text;
        state.notify.type = type;
        state.notify.open = open;
    },

    resetState(state) {
        // Merge rather than replace so we don't lose observers
        // https://github.com/vuejs/vuex/issues/1118
        Object.assign(state, cloneDeep(state.initialState));
    },
};
export const getters = {
    getField,
};
