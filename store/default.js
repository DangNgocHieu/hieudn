import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
    dataDefautl: []
};

export const state = () => cloneDeep(INIT_STATE);

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },
    resetStateExcept({ commit }, payload) {
        commit("RESET_STATE", payload);
    },
};
export const mutations = {
    updateField,

    RESET_STATE(state, payload = []) {
        const arrKey = Object.keys(state);
        const initState = JSON.parse(JSON.stringify(INIT_STATE));
        arrKey.forEach((element) => {
            if (!payload.includes(element)) {
                state[element] = initState[element];
            }
        });
    },
    SET_DATA_DEFAULT(state, payload) {
        state.dataDefautl = payload
    }
};
export const getters = {
    getField,
};
