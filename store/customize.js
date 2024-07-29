import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
  dataInfoBank: [],
  dataCustomize: [],
  dataDetail: [],
  isOpenModal: false,
  formMoney: {
    moneyAmount: null,
  },
  step: 1,
  typeModal: 0,
  bank_id: "",
  account_id: "",
  namePeopleBank: '',
  password: ""
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
    state.dataCustomize = payload;
  },
  SET_DATA_DETAIL(state, payload) {
    state.dataDetail = payload;
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
    state.isOpenModal = payload;
  },
  SET_MONEY_AMOUNT(state, payload) {
    state.formMoney.moneyAmount = payload;
  },
  SET_TYPE_MODAL(state, payload) {
    state.typeModal = payload;
  },
  SET_BANK_ID(state, payload) {
    state.bank_id = payload;
  },
  SET_ACCOUNT_ID(state, payload) {
    state.account_id = payload;
  },
  SET_NAME_PEOPLE_BANK(state, payload) {
    state.namePeopleBank = payload;
  },
  SET_PASSWORD(state, payload) {
    state.password = payload;
  },
  SET_STEP(state, payload) {
    state.step = payload;
  },
};
export const getters = {
  getField,
};
