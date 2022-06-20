<template>
  <div class="auth-layout bg-default">
    <notifications></notifications>
    <div class="main-content">
      <nuxt></nuxt>
    </div>
    <footer class="py-4" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-12">
            <div class="copyright text-center text-muted">
              &copy; {{ year }}
              <a
                href="https://www.ultradatagroup.com"
                class="font-weight-bold ml-1"
                target="_blank"
                >فراروند داده‌ها</a
              >
              -
              <span class="font-weight-500">ورژن {{ appVersion }}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  computed: {
    ...mapGetters({
      appVersion: ["getAppVersion"]
    })
  }
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
