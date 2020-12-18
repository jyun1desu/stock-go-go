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
        v-for="(data, index) in columnsWithData"
        :key="'data' + index"
        class="data_row"
      >
        <td
          nowrap="nowrap"
          :class="{
            ident: needIdent(data.name),
          }"
          class="row_name"
        >
          {{ translateToMandarin(data.name) }}
        </td>
        <td :class="{ negative: data['2019'] < 0 }" class="each_data">
          {{ numberFomat(data["2019"]) }}
        </td>
        <td :class="{ negative: data['2018'] < 0 }" class="each_data">
          {{ numberFomat(data["2018"]) }}
        </td>
        <td :class="{ negative: data['2017'] < 0 }" class="each_data">
          {{ numberFomat(data["2017"]) }}
        </td>
        <td :class="{ negative: data['2016'] < 0 }" class="each_data">
          {{ numberFomat(data["2016"]) }}
        </td>
        <td :class="{ negative: data['2015'] < 0 }" class="each_data">
          {{ numberFomat(data["2015"]) }}
        </td>
        <td :class="{ negative: data['2014'] < 0 }" class="each_data">
          {{ numberFomat(data["2014"]) }}
        </td>
        <td :class="{ negative: data['2013'] < 0 }" class="each_data">
          {{ numberFomat(data["2013"]) }}
        </td>
        <td :class="{ negative: data['2012'] < 0 }" class="each_data">
          {{ numberFomat(data["2012"]) }}
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
  async mounted() {
    //columns_name
    await fetch("https://5fbd1e2b3f8f90001638cc76.mockapi.io/layer")
      .then((res) => res.json())
      .then((rowTitles) => {
        this.columns = rowTitles.filter(
          (row) => row.table_name === "balance_sheets"
        );
      });
    this.dataReady = true;
    this.$emit("isReady");
  },
  methods: {
    // translateToMandarin(lookUpSheet, data) {
    //   const translated = data.map((item) => {
    //     const mandarin = lookUpSheet.find(
    //       (title) => title.english === item.column_name
    //     ).mandarin;
    //     const newItem = {
    //       ...item,
    //       mandarin: mandarin,
    //     };
    //     return newItem;
    //   });
    //   return translated;
    // },
    // getEachYearData(valueArray, columnName) {
    //   const dataValue = valueArray.map((object) => {
    //     return {
    //       year: object.year,
    //       value: object[`${columnName}`],
    //     };
    //   });
    //   return dataValue;
    // },
    translateToMandarin(englishName) {
      const mandarin = this.lookUpSheet.find(
        (item) => item.english === englishName
      ).mandarin;
      return mandarin;
    },
    getYearsData(dataArray, valueObject) {
      dataArray
        .slice()
        .reverse()
        .forEach((data) => {
          valueObject[`${data.year}`] = data[`${valueObject.name}`];
        });
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
    needIdent(columnName) {
      const columnData = this.columns.find(
        (column) => column["column_name"] === columnName
      );
      return columnData.order === 2;
    },
  },
  computed: {
    sheetData() {
      const sheetType = `year_${this.typeOfSheet}`;
      return this.companyData[sheetType];
    },
    // valueNameInMandarin() {
    //   return this.translateToMandarin(this.lookUpSheet, this.columns);
    // },
    // rowNameWithData() {
    //   if (this.dataReady) {
    //     const withValue = this.valueNameInMandarin.map((data) => {
    //       const eachYearData = this.getEachYearData(
    //         this.companyData.year_balance_sheets,
    //         data.column_name
    //       );
    //       return { ...data, eachYearData };
    //     });
    //     return withValue;
    //   } else {
    //     return [];
    //   }
    // },
    columnsWithData() {
      const resultArray = this.columns.map((item) => {
        const obj = { name: item.column_name };
        this.getYearsData(this.sheetData, obj);
        return obj;
      });
      return resultArray;
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
