import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
    dataCustomize: [],
    dataDetail: [],
    isOpenModal: false,
    moneyAmount: 0
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
    SET_DATA_CUSTOMIZE(state, payload) {
        state.dataCustomize = payload
    },
    SET_DATA_DETAIL(state, payload) {
        state.dataDetail = payload
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
    SET_IS_OPEN_MODAL(state, payload) {
        state.isOpenModal = payload
    },
    SET_MONEY_AMOUNT(state, payload) {
        state.formState.moneyAmount = payload
    }
};
export const getters = {
    getField,
};
