import VuexPersistence from "vuex-persist";
import { persistReducer } from "~/utils/persist_store";
/* eslint-disable */
export default ({ store }) => {
  new VuexPersistence({
    reducer: persistReducer,
    storage: window.sessionStorage,
  }).plugin(store);
};
