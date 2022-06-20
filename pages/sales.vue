<template>
  <div>
    <base-header type="default" class="text-center  pb-8"> </base-header>
    <sales-table></sales-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SalesTable from "@/components/pages/sales/SalesTable";
export default {
  layout: "DashboardLayout",
  async fetch() {
    await this.getData();
  },
  components: {
    SalesTable
  },
  methods: {
    async getData() {
      await this.$store.dispatch("getSalesFromServer");
    }
  }
};
</script>
