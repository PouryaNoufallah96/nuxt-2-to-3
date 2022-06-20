const actions = {
  async loginToServer({}, login) {
    try {
      await this.$auth.loginWith("local", {
        data: login
      });
    } catch (error) {}
  },
  async logoutFromServer() {
    try {
      await this.$auth.logout();
      this.$router.push("/login");
    } catch (error) {}
  }
};

export default {
  actions
};
