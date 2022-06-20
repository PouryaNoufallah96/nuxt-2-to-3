<template>
  <fade-transition group name="doughnut-chart-transition" v-if="data">
    <div v-if="hasData" key="doughnut-chart-data">
      <fade-transition>
        <doughnut-chart
          v-if="loadChart"
          :height="450"
          :chart-data="doughnutChart.chartData"
          :extra-options="doughnutChart.extraOptions"
        >
        </doughnut-chart>
      </fade-transition>
    </div>
    <div v-else key="doughnut-chart-nodata">
      <div class="alert alert-warning text-center mx-5 p-4">
        در بازه تاریخی مورد نظر موردی یافت نشد
      </div>
    </div>
  </fade-transition>
</template>
<script>
import DoughnutChart from "~/components/ud/Charts/DoughnutChart";
import * as chartConfigs from "~/components/ud/Charts/config";
import { Charts } from "~/components/ud/Charts/config";
import mainChartMixin from "~/components/pages/charts/mainChartMixin";
import { generateListOfRandomColors } from "@/util/common.js";

export default {
  mixins: [mainChartMixin],
  data() {
    return {
      doughnutChart: {
        chartData: {},
        extraOptions: {
          responsive: true,
          title: {
            display: true,
            text: this.title
          },
          pieceLabel: {
            mode: "percentage",
            position: "outside",
            textMargin: 10,
            fontColor: "black"
          },
          legend: {
            display: true,
            position: "bottom",
            align: "center"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          tooltips: {
            ...chartConfigs.toolTipOptions
          }
        }
      }
    };
  },
  components: {
    DoughnutChart
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    fillChartData() {
      if (this.hasData) {
        this.doughnutChart.chartData = {
          labels: this.data.map(d => d[this.label]),
          datasets: [
            {
              data: this.data.map(d => d[this.value]),
              backgroundColor: generateListOfRandomColors(this.data.length),
              label: ""
            }
          ]
        };
        var isAllZero = chartConfigs.isAllDataZero(
          this.doughnutChart.chartData.datasets[0].data
        );
        if (!isAllZero) this.loadChart = true;
        else this.loadChart = false;
      }
    }
  }
};
</script>
