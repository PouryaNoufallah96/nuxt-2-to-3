<template>
  <footer class="footer px-4 mx-2">
    <div class="col-lg-12">
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
  </footer>
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
<style></style>
