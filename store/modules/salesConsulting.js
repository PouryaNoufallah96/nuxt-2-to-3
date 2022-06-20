const state = () => ({
  sales: []
});

const getters = {
  getSales(state) {
    return state.sales;
  }
};

const mutations = {
  setSales(state, list) {
    state.sales = list;
  },
  updateSale(state, sale) {
    var index = state.sales.findIndex(function(item, i) {
      return item.id === sale.id;
    });
    state.sales[index] = sale;
    state.sales = [...state.sales.filter(c => c.quantity !== 0)];
  },
  deleteSale(state, sale) {
    var index = state.sales.findIndex(function(item, i) {
      return item.id === sale.id;
    });
    if (index > -1) state.sales.splice(index, 1);
  }
};

const actions = {
  async getSalesFromServer({ rootState, commit }) {
    const customer = rootState.customer.currentCustomer;
    if (!customer) return;
    const response = await this.$axios.$get(
      `/salesConsulting/get-sales/${customer.customerId}/0`
    );
    if (response) commit("setSales", response.data);
  },
  async getSingleProduct({}, payload) {
    const singleProductResponse = await this.$axios.$get(
      `/salesConsulting/get-customer-products/${payload.customerId}/${payload.productId}`
    );
    return singleProductResponse.data;
  },
  async getSingleSale({}, payload) {
    const singleSaleResponse = await this.$axios.$get(
      `/salesConsulting/get-sales/${payload.customerId}/${payload.saleId}`
    );
    return singleSaleResponse.data;
  },
  async createSalesToServer({ rootState, commit, dispatch }, sale) {
    try {
      const customer = rootState.customer.currentCustomer;
      const { quantity, productId } = sale;
      const singleProduct = await dispatch("getSingleProduct", {
        customerId: customer.customerId,
        productId
      });
      var stock = singleProduct.length === 0 ? 0 : singleProduct[0].stock;
      if (stock >= quantity) {
        const body = {
          userId: rootState.auth.user.userId,
          customerId: customer.customerId,
          productId,
          quantity
        };
        const response = await this.$axios.$post(
          "/salesConsulting/create-sale",
          body
        );
        singleProduct[0].stock =
          !response || response.status !== 200 ? stock : stock - quantity;
      }
      commit("updateCustomerProduct", singleProduct[0]);
      return singleProduct[0].stock;
    } catch (error) {}
  },
  async updateSalesToServer({ rootState, state, commit, dispatch }, sale) {
    try {
      var quantity = 0;
      const { currentQuantity, preQuantity, id, productId, customerId } = sale;
      const singleProduct = await dispatch("getSingleProduct", {
        customerId,
        productId
      });
      var stock = singleProduct.length === 0 ? 0 : singleProduct[0].stock;
      if (stock + preQuantity >= currentQuantity) {
        const body = {
          userId: rootState.auth.user.userId,
          saleId: id,
          quantity: currentQuantity
        };
        const response = await this.$axios.$put(
          "/salesConsulting/update-sale",
          body
        );
      }
      const singleSale = await dispatch("getSingleSale", {
        customerId,
        saleId: id
      });
      quantity = singleSale[0].quantity;
      commit("updateSale", singleSale[0]);
      return { finalStock: stock + preQuantity - currentQuantity, quantity };
    } catch (error) {}
  },
  async deleteSalesFromServer({ state, commit }, saleId) {
    try {
      var currentSale = {
        ...state.sales.find(c => c.id == saleId)
      };
      const response = await this.$axios.$delete(
        `/salesConsulting/delete-sale/${saleId}`
      );
      if (!response || response.status !== 200) return false;
      commit("deleteSale", currentSale);
      return true;
    } catch (error) {}
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
