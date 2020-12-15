<template>
  <!-- <div class="table">
    <div class="title">3043科風_資產負債表_年 單位：百萬</div>
    <div class="data_table">
      <div class="columns">
        <p class="title">期別<br />種類</p>
        <div class="columns__names">
          <span
            v-for="row in this.columnsInMandarin"
            :key="row.column_name"
            :class="{
              ident: row.order === 2,
            }"
            class="block"
            >{{ row.mandarin }}</span
          >
        </div>
      </div>
      <div class="rows">
        <div
          v-for="data in company_balance_sheet"
          :key="'data' + data.year"
          class="each_year"
        >
          <div class="year">{{ data.year }}<br>合併</div>
          <div class="datas">
            <span
              v-for="(eachData, index) in data.data"
              :key="'data' + index"
              >{{ eachData.value }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div v-if="dataReady" class="table">
    <div class="title">{{ tableTitle }}</div>
    <div class="column_years">
      <span class="names__title">期別<br />種類</span>
      <span
        v-for="data in companyData.year_balance_sheets"
        :key="data.year"
        class="year"
        >{{ data.year }}</span
      >
    </div>
    <div class="data_table">
      <div
        v-for="data in rowNameWithData"
        :key="data.column_name"
        class="data_row"
      >
        <div
          :class="{
            ident: data.order === 2,
          }"
          class="row_name"
        >
          {{ data.mandarin }}
        </div>
        <div
          v-for="eachYear in data.eachYearData"
          :key="eachYear.year"
          class="each_data"
        >
          {{ addCommaToNumber(eachYear.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props:['lookUpSheet'],
  data() {
    return {
      typeOfSheet: "balance_sheets", //應該要從父層prop過來
      companyAPI: "https://5fbf2d965923c90016e6ba2d.mockapi.io/reportYear3043", //應該要從父層prop過來
      companyData: [],
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
      });

    //company_data
    fetch(this.companyAPI)
      .then((res) => res.json())
      .then((datas) => {
        this.companyData = datas;
        this.dataReady = true;
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
    addCommaToNumber(number) {
      const reg = /(?=(?:\d{3})+(?:\.|$))/g;
      return number.toString().split(reg).join(",");
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
