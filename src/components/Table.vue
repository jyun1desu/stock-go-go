<template>
  <div class="table">
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
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      columns: [],
      companyData: [],
    };
  },
  created() {
    //columns_name
    fetch("https://5fbd1e2b3f8f90001638cc76.mockapi.io/layer")
      .then((res) => res.json())
      .then((rowTitles) => {
        this.columns = rowTitles.filter(
          (row) => row.table_name === "balance_sheets"
        );
      });

    //company_data
    fetch("https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportYear2330")
      .then((res) => res.json())
      .then((datas) => {
        this.companyData = datas;
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
    getDataValue(valueObject, columnArray) {
      const data_value = columnArray.map((data) => {
        const dataName = data.column_name;
        const value = valueObject[dataName];
        return {
          name: dataName,
          value: value,
        };
      });
      return data_value;
    },
  },
  computed: {
    columnsInMandarin() {
      const lookUpSheet = [
        { english: "balance_sheets", mandarin: "資產負債表" },
        { english: "cash_and_cash_equivalents", mandarin: "現金及約當現金" },
        {
          english: "short_term_investment_financial_assets_current",
          mandarin: "短期投資金融資產－流動",
        },
        {
          english: "accounts_and_bills_receivable",
          mandarin: "應收帳款及票據",
        },
        { english: "other_receivables", mandarin: "其他應收款" },
        { english: "loan_to_other_S_T", mandarin: "短期借支" },
        { english: "inventories", mandarin: "存貨" },
        {
          english: "prepaid_expenses_and_repayments",
          mandarin: "預付費用及預付款",
        },
        { english: "other_current_assets", mandarin: "其他流動資產" },
        { english: "current_assets", mandarin: "流動資產" },
        { english: "long_term_investments", mandarin: "長期投資" },
        {
          english: "property_plant_and_equipment",
          mandarin: "不動產廠房及設備",
        },
        {
          english: "total_goodwill_and_intangible_assets",
          mandarin: "商譽及無形資產合計",
        },
        { english: "total_intangible_assets", mandarin: "遞延資產合計" },
        { english: "other_non_current_assets", mandarin: "其他非流動資產" },
        { english: "non_current_assets", mandarin: "非流動資產" },
        { english: "total_assets", mandarin: "資產總額" },
        { english: "short_term_debt", mandarin: "短期借款" },
        {
          english: "commercial_paper_payable_acceptance_bill",
          mandarin: "應付商業本票∕承兌匯票",
        },
        {
          english: "short_term_financial_liability_current",
          mandarin: "短期金融負債－流動",
        },
        { english: "accounts_and_bills_payable", mandarin: "應付帳款及票據" },
        { english: "other_payables", mandarin: "其他應付款" },
        { english: "current_tax_liabilities", mandarin: "當期所得稅負債" },
        {
          english: "other_financial_liabilities_current",
          mandarin: "其他金融負債－流動",
        },
        {
          english: "long_term_liabilities_due_within_one_year",
          mandarin: "一年內到期長期負債	",
        },
        { english: "other_current_liabilities", mandarin: "其他流動負債" },
        { english: "current_liabilities", mandarin: "流動負債" },
        {
          english: "financial_liabilities_non_current",
          mandarin: "金融負債－非流動",
        },
        { english: "corporate_bond", mandarin: "公司債" },
        { english: "bank_loan_non_current", mandarin: "銀行借款－非流動" },
        {
          english: "other_long_term_debt_payable_non_current",
          mandarin: "其他長期借款－非流動",
        },
        { english: "total_other_L_T_liab", mandarin: "其他負債及準備" },
        { english: "non_current_liabilities", mandarin: "非流動負債" },
        { english: "total_liabilities", mandarin: "負債總額" },
        { english: "share_capital", mandarin: "股本" },
        { english: "total_capital_reserve", mandarin: "資本公積合計" },
        { english: "retained_earnings", mandarin: "保留盈餘" },
        { english: "other_equity", mandarin: "其他權益" },
        { english: "treasury_stock", mandarin: "庫藏股票帳面值" },
        { english: "total_equity", mandarin: "股東權益總額" },
        {
          english: "total_liabilities_and_stockholders_equity",
          mandarin: "負債及股東權益總額",
        },
        {
          english: "total_capital_investment_IC",
          mandarin: "投資資本總額－IC",
        },
      ];

      return this.translateToMandarin(lookUpSheet, this.columns);
    },
    company_balance_sheet() {
      if (this.companyData.year_balance_sheets) {
        const sheet = this.companyData.year_balance_sheets.map((yearData) => {
          const newData = {
            data: this.getDataValue(yearData, this.columns),
            year: yearData.year,
          };
          return newData;
        });
        return sheet;
      } else {
        return [];
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
}

.data_table {
  display: flex;
  .columns {
    flex: 0 0 25%;

    .title {
      margin: 0;
      text-align: left;
      padding: $block_padding;
      background-color: $rows_name_block_color;
      line-height: 25px;
    }
    &__names {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .block.ident {
        padding-left: $ident_px;
      }
    }

    .block {
      line-height: 30px;
      box-sizing: border-box;
      width: 100%;
      text-align: left;
      border-top: 1px solid $border_color;
      padding: $block_padding;
      &:nth-child(2n-1) {
        background-color: $column_block_grey;
      }
    }
  }

  .rows {
    flex: 1 1 auto;
    display: flex;
    .each_year {
      flex: 1 1 auto;
      background-color: $rows_name_block_color;

      .year {
        line-height: 25px;
        padding: $block_padding;
      }

      .datas {
        display: flex;
        flex-direction: column;
        & > span {
          line-height: 30px;
          border-top: 1px solid $border_color;
          padding: $block_padding;
          &:nth-child(2n-1) {
            background-color: $column_block_grey;
          }
          &:nth-child(2n) {
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
