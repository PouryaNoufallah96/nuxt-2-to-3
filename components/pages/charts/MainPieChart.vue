<template>
  <fade-transition group name="pie-chart-transition" v-if="data">
    <div v-if="hasData" key="pie-chart-data">
      <fade-transition>
        <pie-chart
          v-if="loadChart"
          :height="450"
          :chart-data="pieChart.chartData"
          :extra-options="pieChart.extraOptions"
        >
        </pie-chart>
      </fade-transition>
    </div>
    <div v-else key="pie-chart-nodata">
      <div class="alert alert-warning text-center mx-5 p-4">
        در بازه تاریخی مورد نظر موردی یافت نشد
      </div>
    </div>
  </fade-transition>
</template>
<script>
import PieChart from "~/components/ud/Charts/PieChart";
import * as chartConfigs from "~/components/ud/Charts/config";
import { Charts } from "~/components/ud/Charts/config";
import mainChartMixin from "~/components/pages/charts/mainChartMixin";
import { generateListOfRandomColors } from "@/util/common.js";

export default {
  mixins: [mainChartMixin],
  data() {
    return {
      pieChart: {
        chartData: {},
        extraOptions: {
          responsive: true,
          pieceLabel: {
            mode: "percentage",
            position: "outside",
            textMargin: 5,
            fontColor: "black"
          },
          tooltips: {
            ...chartConfigs.toolTipOptions
          },
          legend: {
            display: true,
            position: "bottom",
            align: "center"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      }
    };
  },

  components: {
    PieChart
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    fillChartData() {
      if (this.hasData) {
        this.pieChart.chartData = {
          labels: this.data.map(d => d[this.label]),
          datasets: [
            {
              data: this.data.map(d => d[this.value]),
              backgroundColor: this.colorsProp
                ? this.colorsProp
                : generateListOfRandomColors(this.data.length),
              label: ""
            }
          ]
        };
        var isAllZero = chartConfigs.isAllDataZero(
          this.pieChart.chartData.datasets[0].data
        );
        if (!isAllZero) this.loadChart = true;
        else this.loadChart = false;
      }
    }
  }
};
</script>
