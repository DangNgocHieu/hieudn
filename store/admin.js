import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";
const INIT_STATE = {
  details: {},
};

export const state = () => cloneDeep(INIT_STATE);

export const actions = {
  async getDetails({ commit }, payload) {
    try {
      const response = await this.$axios.get(
        `laravel/admin/users/${payload.id}`,
      );
      if (response) {
        commit("SET_DETAIL", response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export const mutations = {
  updateField,
  SET_DETAIL(state, payload) {
    state.details = payload;
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
