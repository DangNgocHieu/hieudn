import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
    dataHistory: [],

};

export const state = () => cloneDeep(INIT_STATE);

export const actions = {
    setData({ commit }, payload) {
        commit("SET_DATA_CUSTOMIZE", payload);
    },
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    resetStateExcept({ commit }, payload) {
        commit("RESET_STATE", payload);
    },
};
export const mutations = {
    updateField,
    SET_DATA_HISTORY(state, payload) {
        state.dataHistory = payload
    }
};
export const getters = {
    getField,
};
