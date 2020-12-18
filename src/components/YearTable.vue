<template>
<div>
  <table v-if="dataReady" class="table">
    <!-- <caption class="title">{{ tableTitle }}</caption> -->
    <tr class="column_years">
      <td class="names__title">期別<br />種類</td>
      <td
        v-for="data in companyData.year_balance_sheets"
        :key="data.year"
        class="year"
      >
        {{ data.year }}<br />合併
      </td>
    </tr>
    <tr
      v-for="data in rowNameWithData"
      :key="data.column_name"
      class="data_row"
    >
      <td
      nowrap="nowrap"
        :class="{
          ident: data.order === 2,
        }"
        class="row_name"
      >
        {{ data.mandarin }}
      </td>
      <td
        v-for="eachYear in data.eachYearData"
        :key="eachYear.year"
        class="each_data"
        :class="{ negative: eachYear.value < 0 }"
      >
        {{ numberFomat(eachYear.value) }}
      </td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  name: "Table",
  props: ["lookUpSheet", "companyData", "typeOfSheet"],
  data() {
    return {
      columns: [],
      dataReady: false,
    };
  },
  mounted() {
    //columns_name
    fetch("https://5fbd1e2b3f8f90001638cc76.mockapi.io/layer")
      .then((res) => res.json())
      .then((rowTitles) => {
        this.columns = rowTitles.filter(
          (row) => row.table_name === "balance_sheets"
        );
        this.dataReady = true;
        this.$emit("isReady");
      });
  },
  methods: {
    translateToMandarin(lookUpSheet, data) {
      const translated = data.map((item) => {
        const mandarin = lookUpSheet.find(
          (title) => title.english === item.column_name
        ).mandarin;
        const newItem = {
          ...item,
          mandarin: mandarin,
        };
        return newItem;
      });
      return translated;
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
    addComma(number) {
      const reg = /(?=(?:\d{3})+(?:\.|$))/g;
      return number.toString().split(reg).join(",");
    },
    numberFomat(number) {
      if (number < 0) {
        return `(${this.addComma(Math.abs(number))})`;
      } else {
        return this.addComma(number);
      }
    },
  },
  computed: {
    valueNameInMandarin() {
      return this.translateToMandarin(this.lookUpSheet, this.columns);
    },
    rowNameWithData() {
      if (this.dataReady) {
        const withValue = this.valueNameInMandarin.map((data) => {
          const eachYearData = this.getEachYearData(
            this.companyData.year_balance_sheets,
            data.column_name
          );
          return { ...data, eachYearData };
        });
        return withValue;
      } else {
        return [];
      }
    },
    tableTitle() {
      if (this.dataReady) {
        const idNumber = this.companyData.id;
        const companyName = this.companyData["company_name"];
        const sheetNameInMandarin = this.lookUpSheet.find(
          (data) => data.english === this.typeOfSheet
        ).mandarin;
        return `${idNumber}${companyName}_${sheetNameInMandarin}_年 單位：百萬`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  @include table_style;
}
</style>
