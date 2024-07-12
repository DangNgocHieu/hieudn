
/* eslint-disable */
export default ({ app }) => {

  // app.store.commit("SET_LOADING", true, { root: true });

  app.$axios.get("/laravel/csrf-cookie");
  // app.store.commit("SET_LOADING", false, { root: true });

};
