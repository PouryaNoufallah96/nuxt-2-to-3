<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-6 py-lg-7 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">خوش آمدید!</h1>
              <p class="text-lead text-white">
                نرم‌افزار مشاوره فروش فراروند ‌داده‌ها
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--9 pb-4">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3">
                <h2>ورود</h2>
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    type="number"
                    name="نام کاربری"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-single-02"
                    placeholder="نام کاربری"
                    v-model="model.userId"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="رمز عبور"
                    :rules="{ required: true, max: 50 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="رمز عبور"
                    v-model="model.password"
                  >
                  </base-input>

                  <base-checkbox v-model="model.rememberMe"
                    >مرا به خاطر بسپار</base-checkbox
                  >
                  <div class="d-flex flex-column">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4 mx-auto"
                      >ورود</base-button
                    >
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "AuthLayout",
  middleware: "guest",
  data() {
    return {
      model: {
        userId: "",
        password: "",
        rememberMe: false
      }
    };
  },
  methods: {
    async onSubmit() {
      const login = {
        userId: this.model.userId,
        password: this.model.password,
        rememberMe: this.model.rememberMe
      };
      await this.$store.dispatch("loginToServer", login);
    }
  }
};
</script>
