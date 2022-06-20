<template>
  <card class="container-fluid  mt--8">
    <h6 slot="header" class="h2 text-center mb-0">لیست فروش</h6>
    <div class="d-flex flex-column justify-content-center align-content-center">
      <paginated-table
        key="sales-table"
        ref="paginatedTable"
        :tableData="tableData"
        setterName="setSales"
        :propsToSearch="propsToSearch"
        :tableColumns="tableColumns"
      >
        <el-table-column
          align="right"
          :width="150"
          label="به روزرسانی"
          slot="start-cols"
        >
          <base-input
            v-if="isToday(new Date(row.date))"
            slot-scope="{ $index, row }"
            @blur="updateSale($index, row, $event)"
            type="number"
            :inputClasses="'text-center h-25 mb-0 p-1'"
            :containerClasses="'mb-0'"
          >
          </base-input>

          <span v-else class="text-warning">---</span>
        </el-table-column>
        <el-table-column :width="90" align="right" label="حذف" slot="end-cols">
          <base-button
            slot-scope="{ $index, row }"
            @click.native="handleDelete($index, row)"
            type="danger"
            outline
            size="sm"
            icon
            v-if="isToday(new Date(row.date))"
          >
            <i class="ni ni-fat-remove"></i>
          </base-button>
          <span v-else class="text-warning">---</span>
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
import { mapGetters } from "vuex";
import { formatPersianDate, sepratePrice } from "@/util/common.js";
export default {
  data() {
    return {
      propsToSearch: ["productName", "date"],
      tableColumns: [
        {
          prop: "productName",
          label: "نام کالا",
          minWidth: 250,
          sortable: true
        },
        {
          prop: "quantity",
          label: "تعداد",
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
          prop: "commission",
          label: "مبلغ پورسانت",
          minWidth: 160,
          sortable: true,
          formatter: (row, column, cellValue, index) => sepratePrice(cellValue)
        },
        {
          prop: "date",
          label: "تاریخ",
          minWidth: 120,
          sortable: true,
          formatter: (row, column, cellValue, index) =>
            formatPersianDate(cellValue)
        },
        {
          prop: "commissionPercentage",
          label: "پورسانت",
          minWidth: 120,
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      tableData: ["getSales"]
    }),
    isToday() {
      const today = new Date();
      return someDate =>
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();
    }
  },
  methods: {
    timeUp(row) {
      if (!this.isToday(new Date(row.date))) {
        handleErrorNotification("مهلت به پایان رسیده است");
        return true;
      }
      return false;
    },
    async handleDelete(index, row) {
      if (this.timeUp(row)) return;
      var successDelete = await this.$store.dispatch(
        "deleteSalesFromServer",
        row.id
      );
      if (successDelete) this.$refs.paginatedTable.deleteSearchedData(row);
    },

    async updateSale(index, row, event) {
      if (this.timeUp(row)) return;
      const quantity = parseInt(event.target.value);
      if (
        !Number.isNaN(quantity) &&
        quantity > 0 &&
        quantity !== row.quantity
      ) {
        var result = await this.$store.dispatch("updateSalesToServer", {
          productId: row.productId,
          customerId: row.customerId,
          id: row.id,
          preQuantity: row.quantity,
          currentQuantity: quantity
        });
        if (result.finalStock < 0) handleErrorNotification("موجودی کافی نیست");
        this.$refs.paginatedTable.updateSearchedData(row, result.quantity);
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
