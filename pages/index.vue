<template></template>

<script>
export default {
  auth: "",
  name: "IndexPage",

  middleware({ $auth, redirect }) {
    redirect("/login");
  },
};
</script>
