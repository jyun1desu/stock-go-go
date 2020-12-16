<template>
  <table v-if="dataReady" class="table">
    <!-- <div class="title">1039台積電_每股比例表_年 單位：元、%</div> -->
    <div class="column_years">
      <span class="names__title">期別<br />種類</span>
      <span
        v-for="data in thisTableData"
        :key="'year' + data.year"
        class="year"
      >
        {{ data.year }}<br />合併</span
      >
    </div>
    <div class="data_table">
      <div v-for="data in rowsNameWithValue" :key="data.name" class="data_row">
        <div
          :class="{
            ident: data.order === 2,
          }"
          class="row_name"
        >
          {{ data.mandarin
          }}{{ data.mandarin.includes("比例") ? "(%)" : "(元)" }}
        </div>
        <div
          v-for="eachYear in data.value"
          :key="eachYear.year"
          class="each_data"
          :class="{ negative: eachYear.value < 0 }"
        >
          {{ trunIntoPercentage(eachYear.value, data) }}
        </div>
      </div>
    </div>
  </table>
</template>

<script>
export default {
  props: ["lookUpSheet", "dataAPI"],
  data() {
    return {
      typeOfSheet: "year_per_share_ratios",
      companyData: [],
      dataReady: false,
    };
  },
  mounted() {
    this.getAPIdata(this.dataAPI);
  },
  watch: {
    dataAPI(value) {
      this.getAPIdata(value);
    },
  },
  methods: {
    getAPIdata(api) {
      this.dataReady = false;
      fetch(api)
        .then((res) => res.json())
        .then((datas) => {
          this.companyData = datas;
          this.dataReady = true;
        });
    },
    getEachYearData(valueArray, columnName) {
      const dataValue = valueArray.map((object) => {
        return {
          year: object.year,
          value: object[`${columnName}`],
        };
      });
      return dataValue;
    },
    trunIntoPercentage(number, dataType) {
      if (dataType.name != "EBIDTA_per_share") {
        const percent = parseFloat((Math.abs(number) * 100).toFixed(1));
        return number < 0 ? `(${percent})` : percent;
      } else {
        return number < 0
          ? `(${parseFloat(Math.abs(number).toFixed(1))})`
          : parseFloat(number.toFixed(1));
      }
    },
  },
  computed: {
    thisTableData() {
      return this.companyData[this.typeOfSheet];
    },
    rowsName() {
      const rows = Object.keys(this.thisTableData[0]);
      const deleteIndex = rows.indexOf("year");
      rows.splice(deleteIndex, 1);
      return rows;
    },
    rowsNameWithValue() {
      const withValue = this.rowsName.map((data) => {
        return {
          name: data,
          mandarin: this.lookUpSheet.find((d) => d.english === data).mandarin,
          value: this.getEachYearData(this.thisTableData, data),
        };
      });
      return withValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  @include table_style;
}
</style>