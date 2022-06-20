<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{ 'bg-default navbar-dark': type === 'default' }"
  >
    <!-- Navbar links -->
    <div
      class="d-flex flex-wrap justify-content-between align-items-center w-100"
    >
      <ul class="navbar-nav align-items-center">
        <nuxt-link to="/">
          <span class="avatar avatar-sm rounded-circle">
            <img alt="Image placeholder" src="img/brand/logo_dark.png" />
          </span>
        </nuxt-link>
        <base-dropdown
          menu-on-right
          class="nav-item"
          tag="li"
          title-tag="a"
          title-classes="nav-link pr-0"
        >
          <a
            href="#"
            class="nav-link pr-0"
            @click.prevent
            slot="title-container"
            v-if="currentUser"
          >
            <div class="media align-items-center">
              <div class="media-body mr-2">
                <span class="text-white font-weight-bold">
                  {{ currentUser.username }}
                </span>
              </div>
            </div>
          </a>
          <template>
            <a href="#!" @click="logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>خروج</span>
            </a>
          </template>
        </base-dropdown>
      </ul>

      <ul class="navbar-nav align-items-center">
        <choose-customer> </choose-customer>
      </ul>
    </div>
  </base-nav>
</template>
<script>
import BaseNav from "@/components/ud/Navbar/BaseNav.vue";
import { mapGetters } from "vuex";
import ChooseCustomer from "./ChooseCustomer.vue";
export default {
  components: {
    ChooseCustomer,
    BaseNav
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)"
    }
  },
  computed: {
    ...mapGetters({
      currentUser: ["currentUser"]
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logoutFromServer");
    }
  }
};
</script>
