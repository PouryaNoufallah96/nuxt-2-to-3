<template>
  <card class="container-fluid  mt--8">
    <base-button slot="header" type="primary">
      <nuxt-link to="/sales" class="text-white">
        لیست فروش
      </nuxt-link>
    </base-button>

    <div class="d-flex flex-column justify-content-center align-content-center">
      <paginated-table
        key="product-table"
        ref="paginatedTable"
        :tableData="tableData"
        setterName="setCustomerProducts"
        :propsToSearch="propsToSearch"
        :tableColumns="tableColumns"
      >
        <el-table-column
          align="right"
          label="تعداد"
          slot="start-cols"
          :width="150"
        >
          <base-input
            slot-scope="{ $index, row }"
            @blur="handleSale($index, row, $event)"
            type="number"
            :inputClasses="'text-center h-25 mb-0 p-1'"
            :containerClasses="'mb-0'"
          >
          </base-input>
        </el-table-column>
      </paginated-table>
    </div>
    <div class="row card-body"></div>
  </card>
</template>
<script>
import { TableColumn } from "element-ui";
import PaginatedTable from "@/components/tables/PaginatedTables/PaginatedTable.vue";
import { handleErrorNotification } from "@/util/handleResponses";
import { sepratePrice } from "@/util/common.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      propsToSearch: ["productName"],
      tableColumns: [
        {
          prop: "productName",
          label: "نام کالا",
          minWidth: 250,
          sortable: true
        },
        {
          prop: "stock",
          label: "موجودی",
          minWidth: 120,
          sortable: true
        },
        {
          prop: "commissionPercentage",
          label: "پورسانت",
          minWidth: 120,
          sortable: true
        },
        {
          prop: "salesPrice",
          label: "مبلغ فروش",
          minWidth: 160,
          sortable: true,
          formatter: (row, column, cellValue, index) => sepratePrice(cellValue)
        },
        {
          prop: "consumerPrice",
          label: "مبلغ مصرف‌کننده",
          minWidth: 160,
          sortable: true,
          formatter: (row, column, cellValue, index) => sepratePrice(cellValue)
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      tableData: ["getCustomerProducts"]
    })
  },
  methods: {
    async handleSale(index, row, event) {
      const quantity = parseInt(event.target.value);
      if (!Number.isNaN(quantity) && quantity > 0) {
        var currentStock = await this.$store.dispatch("createSalesToServer", {
          productId: row.productId,
          quantity
        });
        if (currentStock === row.stock)
          handleErrorNotification("موجودی کافی نیست");
        this.$refs.paginatedTable.updateSearchedData(row, currentStock);
      }
      event.target.value = "";
    }
  },
  components: {
    PaginatedTable,
    [TableColumn.name]: TableColumn
  }
};
</script>
