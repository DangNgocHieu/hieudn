import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
    form: {
        dataTowFa: null
    },
    isDisableOTP: false
};

export const state = () => cloneDeep(INIT_STATE);

export const actions = {
    setData({ commit }, payload) {
        commit("SET_DATA", payload);
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
    SET_DATA_TWO_FA(state, payload) {
        state.form.dataTowFa = payload;
    },

    RESET_STATE(state, payload = []) {
        const arrKey = Object.keys(state);
        const initState = JSON.parse(JSON.stringify(INIT_STATE));
        arrKey.forEach((element) => {
            if (!payload.includes(element)) {
                state[element] = initState[element];
            }
        });
    },
};
export const getters = {
    getField,
};
