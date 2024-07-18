import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
  dataHistories: [],
};

export const state = () => cloneDeep(INIT_STATE);

export const actions = {
  resetState({ commit }) {
    commit("RESET_STATE");
  },
  async getDataHistories({ commit }) {
    const res = await this.$axios.get(`laravel/transactions`);
    commit("SET_DATA_HISTORIES", res?.data?.data);
  },
};
export const mutations = {
  updateField,
  SET_DATA_HISTORIES(state, payload) {
    state.dataHistories = payload;
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
