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
        {{ data.year }}<br>合併</span
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
          {{ data.mandarin }}
        </div>
        <div
          v-for="eachYear in data.value"
          :key="eachYear.year"
          class="each_data"
        >
          {{ trunIntoPercentage(eachYear.value) }}
        </div>
      </div>
    </div>
  </table>
</template>

<script>
export default {
  props: ["lookUpSheet",'dataAPI'],
  data() {
    return {
      typeOfSheet: "year_per_share_ratios",
      companyData: [],
      dataReady: false,
    };
  },
  mounted() {
    fetch(this.dataAPI)
      .then((res) => res.json())
      .then((datas) => {
        this.companyData = datas;
        this.dataReady = true;
      });
  },
  methods: {
    getEachYearData(valueArray, columnName) {
      const dataValue = valueArray.map((object) => {
        return {
          year: object.year,
          value: object[`${columnName}`],
        };
      });
      return dataValue;
    },
    trunIntoPercentage(number){
      if(number<1){
        const percent = `${(number*100).toFixed(1)}%`
        return percent
      }else{
        return number
      }
    }
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
          mandarin:this.lookUpSheet.find(d=>d.english===data).mandarin,
          value: this.getEachYearData(this.thisTableData, data),
        };
      });
      return withValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.table{
  @include table_style; 
}
</style>