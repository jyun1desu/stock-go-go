<template>
  <table v-if="dataReady" class="table">
    <!-- <div class="title">1039台積電_每股比例表_年 單位：元、%</div> -->
    <tr class="column_years">
      <td class="names__title">期別<br />種類</td>
      <td v-for="data in thisTableData" :key="'year' + data.year" class="year">
        {{ data.year }}<br />合併
      </td>
    </tr>
    <!-- <div class="data_table"> -->
    <tr
      v-for="(data, index) in columnsWithData"
      :key="'subdata' + index"
      class="data_row"
    >
      <td
        v-for="item in setDataOrder(data)"
        :key="item.key"
        :class="{
          row_name: item.key === 'name',
          each_data: item.key !== 'name',
          negative: item.value<0
        }"
      >
        {{
          item.key === "name"
            ? `${translateToMandarin(item.value)}${translateToMandarin(item.value).includes("比例") ? '(%)' : '(元)'}`
            : trunIntoPercentage(item.value, data)
        }}
      </td>
    </tr>
    <!-- </div> -->
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
    translateToMandarin(englishName) {
      const mandarin = this.lookUpSheet.find(
        (item) => item.english === englishName
      ).mandarin;
      return mandarin;
    },
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
    getYearsData(dataArray, valueObject) {
      dataArray.forEach((data) => {
        valueObject[`${data.year}`] = data[`${valueObject.name}`];
      });
    },
  },
  computed: {
    thisTableData() {
      return this.companyData[this.typeOfSheet];
    },
    columnsWithData() {
      const resultArray = this.rowsName.map((name) => {
        const obj = { name: name };
        this.getYearsData(this.thisTableData, obj);
        return obj;
      });
      return resultArray;
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