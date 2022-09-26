<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";
import emiter from "../main";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  name: "MyChart",
  data() {
    return {
      moneyLost: [],
    }
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  setup() {
    let option = ref({
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 23, 19],
          type: 'line',
          areaStyle: {
            color: 'red',
          }
        },
      ]
    });
    return { option };
  },methods: {
  },
   mounted() {
    this.option.xAxis.data.push('E')
    this.option.series[0].data.push(70)
    emiter.on('send-data-chart', value => {
      for (let i = 0; i < value.lenght; i++) {
        this.option.xAxis.data.push(...value[i]);
      }
    });

  }
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>