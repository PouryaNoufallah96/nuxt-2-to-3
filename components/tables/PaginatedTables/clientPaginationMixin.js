import Fuse from "fuse.js";
export default {
  props: {
    setterName: {
      type: String,
      default: ""
    }
  },
  computed: {
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      } else {
        if (this.searchQuery) {
          result = [];
        }
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
    sortChange({ prop, order }) {
      let result = [...this.tableData];
      let sortedValue = [];
      if (prop) {
        sortedValue = result.sort((a, b) => {
          let aVal = a[prop];
          let bVal = b[prop];
          if (order === "ascending") return aVal > bVal ? 1 : -1;
          return bVal > aVal ? 1 : -1;
        });
      } else {
        sortedValue = result.sort((a, b) => {
          return a.id - b.id;
        });
      }
      this.$store.commit(this.setterName, sortedValue);
    },
    fillFuseSearch() {
      this.fuseSearch = new Fuse(this.tableData, {
        keys: this.propsToSearch,
        threshold: 0.3
      });
    },
    updateSearchedData(product, currentStock) {
      if (this.searchedData.length > 0) {
        var currentProduct = { ...product };
        currentProduct.stock = currentStock;
        var index = this.searchedData.findIndex(function(item, i) {
          return item.productId === currentProduct.productId;
        });
        this.searchedData[index] = currentProduct;
        this.searchedData = [...this.searchedData.filter(s => s.stock !== 0)];
      }
    },
    deleteSearchedData(product) {
      if (this.searchedData.length > 0) {
        var index = this.searchedData.findIndex(function(item, i) {
          return item.productId === product.productId;
        });
        this.searchedData.splice(index, 1);
      }
    }
  },
  watch: {
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
        this.searchedData = result;
      } else this.searchedData = [];
    },
    tableData() {
      this.fillFuseSearch();
    }
  }
};
