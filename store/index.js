import user from "./modules/user";
import customer from "./modules/customer";
import salesConsulting from "./modules/salesConsulting";

export const state = () => ({
  appVersion: process.env.PACKAGE_VERSION || "0"
});

export const getters = {
  getAppVersion: state => {
    return state.appVersion;
  },
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  currentUser(state) {
    return state.auth.user;
  }
};

export const mutations = {};

export const actions = {};

export const modules = { user, customer, salesConsulting };
