<template>
  <div v-if="tableData">
    <div>
      <div
        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap mb-3 mb-1"
      >
        <base-input
          class=""
          v-model="searchQuery"
          prepend-icon="fas fa-search"
          placeholder="جستجو..."
        >
        </base-input>

        <el-select
          class="select-primary pagination-select"
          v-model="pagination.perPage"
          placeholder="هر صحفه"
        >
          <el-option
            class="select-primary"
            v-for="item in pagination.perPageOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="queriedData"
        header-row-class-name="thead-light"
        @sort-change="sortChange"
      >
        <div class="col-12" slot="append" v-if="tableData.length == '0'">
          <p class="p-2 text-center">موردی یافت نشد</p>
        </div>
        <slot name="start-cols"></slot>
        <el-table-column
          v-for="column in tableColumns"
          :key="column.label"
          v-bind="column"
        >
        </el-table-column>
        <slot name="end-cols"></slot>
      </el-table>
    </div>
    <div
      slot="footer"
      class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap mt-3"
    >
      <div class="ml-2">
        <p class="card-category">
          نمایش {{ from + 1 }} تا {{ to }} از {{ total }} آیتم
        </p>
      </div>
      <base-pagination
        class="pagination-no-border"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="total"
      >
      </base-pagination>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { BasePagination } from "@/components/ud";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import { mapGetters } from "vuex";
import { fixSelectScroll } from "@/util/common.js";
export default {
  mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: {
    tableColumns: {
      type: Array,
      default: []
    },
    propsToSearch: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.fillFuseSearch();
    });
  }
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
