<template>
  <div>
    <base-header type="default" class="text-center  pb-8"> </base-header>
    <products-table></products-table>
  </div>
</template>
<script>
import ProductsTable from "@/components/pages/index/ProductsTable";

export default {
  layout: "DashboardLayout",
  async fetch() {
    await this.getData();
  },
  components: {
    ProductsTable
  },
  methods: {
    async getData() {
      await this.$store.dispatch("getCustomerProductsFromServer");
    }
  }
};
</script>
<style></style>
