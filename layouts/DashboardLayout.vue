<template>
  <div class="wrapper">
    <notifications></notifications>
    <div class="main-content">
      <dashboard-navbar
        :type="$route.name === 'alternative' ? 'light' : 'default'"
      ></dashboard-navbar>
      <div>
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "~/components/layouts/ud/DashboardNavbar.vue";
import ContentFooter from "~/components/layouts/ud/ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  middleware: "auth",
};
</script>
<style lang="scss"></style>
