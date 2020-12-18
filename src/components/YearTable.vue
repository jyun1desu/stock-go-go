<template>
  <div>
    <table v-if="dataReady" class="table">
      <!-- <caption class="title">{{ tableTitle }}</caption> -->
      <tr class="column_years">
        <td class="names__title">期別<br />種類</td>
        <td
          v-for="data in companyData.year_balance_sheets"
          :key="'column'+data.year"
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
          v-for="item in setDataOrder(data)"
          :key="item.key+item.value"
          :nowrap="item.key === 'name' ? 'nowrap' : 'wrap'"
          :class="{
            row_name: item.key === 'name',
            each_data: item.key !== 'name',
            ident: item.key === 'name' ? needIdent(item.value) : false,
          }"
        >
          {{
            item.key === "name" ? translateToMandarin(item.value) : item.value
          }}
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
    setDataOrder(data) {
      const orderedKey = Object.keys(data).reverse();
      const orderedArray = orderedKey.map((keyName) => {
        return {
          key: keyName,
          value: data[keyName],
        };
      });
      return orderedArray;
    },
    translateToMandarin(englishName) {
      const mandarin = this.lookUpSheet.find(
        (item) => item.english === englishName
      ).mandarin;
      return mandarin;
    },
    getYearsData(dataArray, valueObject) {
      dataArray.forEach((data) => {
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
    columnsWithData() {
      if (this.sheetData) {
        const resultArray = this.columns.map((item) => {
          const obj = { name: item.column_name };
          this.getYearsData(this.sheetData, obj);
          return obj;
        });
        return resultArray;
      } else {
        return {};
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
