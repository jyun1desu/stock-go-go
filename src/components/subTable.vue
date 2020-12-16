<template>
  <div v-if="dataReady" class="table">
    <div class="title">1039台積電_每股比例表_年 單位：元、%</div>
    <div class="column_years">
      <span class="names__title">期別<br />種類</span>
      <span
        v-for="data in thisTableData"
        :key="'year' + data.year"
        class="year"
      >
        {{ data.year }}</span
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
  </div>
</template>

<script>
export default {
  props: ["lookUpSheet"],
  data() {
    return {
      typeOfSheet: "year_per_share_ratios",
      dataAPI:
        "https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportRatioYear2330",
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
$column_block_grey: #eeeeee;
$border_color: #dbdbdb;
$block_padding: 10px;
$rows_name_block_color: #e4edf1;
$ident_px: 30px;
.table {
  & > .title {
    background-color: #333333;
    color: #fff;
    padding: $block_padding;
    letter-spacing: 1px;
  }
  .column_years {
    display: flex;
    background-color: $rows_name_block_color;
    align-items: center;
    .names__title {
      flex: 0 0 20%;
      text-align: left;
      padding: $block_padding;
      box-sizing: border-box;
    }
    .year {
      flex: 0 1 10%;
      padding: $block_padding;
    }
  }

  .data_table {
    display: flex;
    flex-direction: column;
    .data_row {
      display: flex;
      align-items: center;
      border-top: 1px solid $border_color;
      &:nth-child(2n-1) {
        background-color: $column_block_grey;
      }

      .row_name {
        flex: 0 0 20%;
        text-align: left;
        padding: $block_padding;
        box-sizing: border-box;

        &.ident {
          padding-left: $ident_px;
        }
      }

      .each_data {
        flex: 0 1 10%;
        padding: $block_padding;
      }
    }
  }
}
</style>