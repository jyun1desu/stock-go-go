<template>
  <div>
    <table class="table">
      <tr class="column_years">
        <td class="names__title">期別<br />種類</td>
        <td
          v-for="data in companyData.year_balance_sheets"
          :key="'column' + data.year"
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
          :key="item.key + item.value"
          :nowrap="item.key === 'name' ? 'nowrap' : 'wrap'"
          :class="{
            row_name: item.key === 'name',
            each_data: item.key !== 'name',
            negative: item.value < 0,
            ident: item.key === 'name' ? needIdent(item.value) : false,
          }"
        >
          {{
            item.key === "name"
              ? translateToMandarin(item.value)
              : numberFomat(item.value)
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
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
      const indeedNumber = number.toFixed(2)
      if (number < 0) {
        return `(${this.addComma(Math.abs(indeedNumber))})`;
      } else {
        return this.addComma(indeedNumber);
      }
    },
    needIdent(columnName) {
      const columnData = this.thisSheetColumns.find(
        (column) => column["column_name"] === columnName
      );
      return columnData.order === 2;
    },
  },
  computed: {
    thisSheetColumns() {
      if(this.typeOfSheet==='income_statements'){
        const keys = Object.keys(this.sheetData[0]);
        const yearIndex = keys.findIndex(name=>name==='year')
        keys.splice(yearIndex,1)
        return keys.map(name=>{
          return {
            column_name:name,
            order:1
          }
        })
      }else{
        return this.$store.getters.nowYearColumns;
      }
    },
    lookUpSheet() {
      return this.$store.state.lookUpSheet;
    },
    companyData() {
      return this.$store.state.companyData;
    },
    sheetData() {
      const sheetType = `year_${this.typeOfSheet}`;
      return this.companyData[sheetType];
    },
    columnsWithData() {
      if (this.sheetData) {
        const resultArray = this.thisSheetColumns.map((item) => {
          const obj = { name: item.column_name };
          this.getYearsData(this.sheetData, obj);
          return obj;
        });
        return resultArray;
      } else {
        return this.sheetData;
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
    typeOfSheet() {
      return this.$store.state.typeOfSheet;
    },
    dataReady() {
      return this.$store.state.dataReady;
    },
  },
  async beforeRouteUpdate(to, from, next) {
    this.$store.commit("switchDataType", to.params.type);
    await this.$store.commit("setDataStatus", false);
    await this.$store.dispatch("setCompanyData", {
      companyID: to.params.companyID,
    });
    next();
  },
};
</script>

<style lang="scss" scoped>
.table {
  @include table_style;
}
</style>
