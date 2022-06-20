import { FadeTransition } from "vue2-transitions";
export default {
  data() {
    return {
      loadChart: false,
      data: []
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasData() {
      return this.data && this.data.length > 0;
    }
  },
  mounted() {
    this.fillChartData();
  },
  components: {
    FadeTransition
  },
  watch: {
    data() {
      this.fillChartData();
    }
  }
};
