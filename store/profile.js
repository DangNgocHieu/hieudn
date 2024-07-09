import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
    formInfo: {
        name: "",
        phone: "",
        email: "",
        gender: "",
        address: ""
    },

    formInfoCCCD: {
        numberCCCD: "",
        birthDay: "",
        startDay: "",
        endDay: "",
        addressRegisted: ""
    },
    isChange: false,
    imageUrl: ""
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
    SET_DATA(state, payload) {
        state.email = payload.email;
        state.password = payload.password;
    },
    SET_IS_DISABLE_SUBMIT(state, payload) {
        state.isDisableSubmit = payload
    },
    SET_IMG_URL(state, payload) {
        state.imageUrl = payload
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
