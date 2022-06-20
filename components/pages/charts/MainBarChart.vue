<template>
  <fade-transition group name="bar-chart-transition" v-if="data">
    <div v-if="hasData" key="bar-chart-data">
      <fade-transition>
        <div v-if="loadChart">
          <p class="h5 mx-2 mb-4">
            برای نمایش بهتر نمودار صفحه نمایش خود را بچرخانید
          </p>
          <bar-chart
            :height="450"
            :chart-data="barChart.chartData"
            :extra-options="barChart.extraOptions"
          >
          </bar-chart>
        </div>
      </fade-transition>
    </div>
    <div v-else key="bar-chart-nodata">
      <div class="alert alert-warning text-center mx-5 p-4">
        در بازه تاریخی مورد نظر موردی یافت نشد
      </div>
    </div>
  </fade-transition>
</template>
<script>
import BarChart from "~/components/ud/Charts/BarChart";
import * as chartConfigs from "~/components/ud/Charts/config";
import { Charts } from "~/components/ud/Charts/config";
import mainChartMixin from "~/components/pages/charts/mainChartMixin";
import { abbrNum } from "@/util/common.js";

export default {
  mixins: [mainChartMixin],
  data() {
    return {
      barChart: {
        chartData: {},
        extraOptions: {
          legend: {
            display: true,
            position: "bottom",
            align: "center"
          },
          tooltips: {
            ...chartConfigs.toolTipOptions,
            mode: "index",
            intersect: false
          },
          responsive: true
        }
      }
    };
  },
  components: {
    BarChart
  },
  props: {
    values: {
      type: Array,
      default: []
    },
    stacked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fillChartData() {
      if (this.hasData) {
        this.barChart.chartData = {
          labels: this.data.map(d => d[this.label]),
          datasets: this.values.map(v => {
            return {
              data: this.data.map(d => d[v.value]),
              backgroundColor: Charts.colors.theme[v.color],
              label: v.label,
              yAxisID: v.y
            };
          })
        };
        let globalYAxes = {
          maxBarThickness: 15,
          ticks: {
            callback: function(value, index, values) {
              return abbrNum(value, 0);
            }
          }
        };
        this.barChart.extraOptions.scales = {
          xAxes: [{ stacked: this.stacked }],
          yAxes: this.stacked
            ? [{ ...globalYAxes, stacked: true }]
            : this.values.map(v => {
                return {
                  ...globalYAxes,
                  id: v.y,
                  type: "linear",
                  position: v.yPosition,
                  scaleLabel: {
                    display: true,
                    labelString: v.label,

                    fontColor: Charts.colors.theme[v.color]
                  }
                };
              })
        };
        this.loadChart = true;
      }
    }
  }
};
</script>
