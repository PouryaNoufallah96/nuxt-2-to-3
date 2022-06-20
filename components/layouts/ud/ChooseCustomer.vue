<template>
  <div class="col-12">
    <div class="d-flex flex-wrap justify-content-between mb-3 p-2">
      <div>
        <base-button outline type="white" size="sm" @click="openModal()">
          <span class="btn-inner--text">مشتری : {{ customerName }}</span>
        </base-button>
      </div>
      <modal :show.sync="modalCustomer" size="lg" @close="close()">
        <h6 slot="header" class="modal-title">انتخاب مشتری</h6>

        <div
          class="d-flex flex-column justify-content-center align-content-center"
        >
          <paginated-table
            key="choose-customer-table"
            ref="paginatedTable"
            :tableData="tableData"
            setterName="setCustomers"
            :propsToSearch="propsToSearch"
            :tableColumns="tableColumns"
          >
            <el-table-column
              align="right"
              label="انتخاب"
              slot="start-cols"
              :width="90"
            >
              <base-button
                slot-scope="{ $index, row }"
                @click.native="handleChoose($index, row)"
                type="primary"
                outline
                size="sm"
                icon
              >
                <i class="ni ni-check-bold"></i>
              </base-button>
            </el-table-column>
          </paginated-table>
        </div>

        <template slot="footer">
          <base-button
            type="link"
            class="ml-auto"
            @click="modalCustomer = false"
            >بستن</base-button
          >
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
import { TableColumn } from "element-ui";
import PaginatedTable from "@/components/tables/PaginatedTables/PaginatedTable.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modalCustomer: false,
      propsToSearch: ["customerName"],
      tableColumns: [
        {
          prop: "customerName",
          label: "نام مشتری",
          minWidth: 200,
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      tableData: ["getCustomers"],
      currentCustomer: ["getCurrentCustomer"]
    }),
    customerName() {
      return this.currentCustomer ? this.currentCustomer.customerName : "---";
    }
  },
  methods: {
    async openModal() {
      await this.$store.dispatch("getCustomersFromServer");
      this.modalCustomer = true;
    },
    async handleChoose(index, row) {
      this.$store.commit("setCurrentCustomer", row);
      if (this.$route.name === "index")
        await this.$store.dispatch("getCustomerProductsFromServer");
      else if (this.$route.name === "sales")
        await this.$store.dispatch("getSalesFromServer");
      this.modalCustomer = false;
    },
    close() {
      this.$store.commit("setCustomers", []);
    }
  },
  components: {
    PaginatedTable,
    [TableColumn.name]: TableColumn
  }
};
</script>
