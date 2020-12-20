<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  data() {
    return {
      chartdata: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
  mounted() {
    if (this.rawData) {
      this.renderLineChart();
    }
  },
  methods: {
    getChartDataset(data) {
      const keys = Object.keys(data[0]);
      const yearIndex = keys.findIndex((keyName) => keyName === "year");
      keys.splice(yearIndex, 1);
      let max = 255;
      let finalData = keys.map((item) => {
        return {
          label: this.translateToMandarin(item),
          data: this.getData(data, item),
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: this.setBgColor(max),
          lineTension: 0,
        };
      });
      return {
        labels: this.getData(this.rawData, "year"),
        datasets: finalData,
      };
    },
    getData(data, keyName) {
      let array = data.map((item) => {
        return item[keyName];
      });
      return array;
    },
    setBgColor(max) {
      let first = Math.floor(Math.random() * Math.floor(max));
      let second = Math.floor(Math.random() * Math.floor(max));
      let third = Math.floor(Math.random() * Math.floor(max));
      return `rgba(${first}, ${second}, ${third}, 1)`;
    },
    translateToMandarin(name) {
      return this.lookUpSheet.find((item) => item.english === name).mandarin;
    },
    renderLineChart() {
      this.chartdata = this.getChartDataset(this.rawData);
      this.renderChart(this.chartdata, this.options);
    },
  },
  computed: {
    rawData() {
      return this.$store.state.subData["year_operating_performances"];
    },
    lookUpSheet() {
      return this.$store.state.lookUpSheet;
    },
  },
  watch: {
    rawData() {
      this.renderLineChart();
    },
  },
};
</script>
<style lang="scss">
.small {
  width: 100%;
  height: 20px;
}
</style>