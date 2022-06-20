const state = () => ({
  customers: [],
  currentCustomer: null,
  customerProducts: []
});

const getters = {
  getCustomers(state) {
    return state.customers;
  },
  getCurrentCustomer(state) {
    return state.currentCustomer;
  },
  getCustomerProducts(state) {
    return state.customerProducts;
  }
};

const mutations = {
  setCustomers(state, list) {
    state.customers = list;
  },
  setCurrentCustomer(state, data) {
    state.currentCustomer = data;
  },
  setCustomerProducts(state, data) {
    state.customerProducts = data;
  },
  updateCustomerProduct(state, product) {
    var index = state.customerProducts.findIndex(function(item, i) {
      return item.productId === product.productId;
    });
    state.customerProducts[index] = product;
    state.customerProducts = [
      ...state.customerProducts.filter(c => c.stock !== 0)
    ];
  }
};

const actions = {
  async getCustomersFromServer({ commit }) {
    const response = await this.$axios.$get("/salesConsulting/get-customers");
    if (response) commit("setCustomers", response.data);
  },
  async getCustomerProductsFromServer({ state, commit }) {
    var customer = state.currentCustomer;
    if (!customer) return;
    const response = await this.$axios.$get(
      `/salesConsulting/get-customer-products/${customer.customerId}/0`
    );
    if (response) commit("setCustomerProducts", response.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
