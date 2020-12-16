<template>
  <div class="home">
    <SubTable 
    v-if="true"
    :lookUpSheet="lookUpSheet" />
    <YearTable 
    v-if="true"
    :lookUpSheet="lookUpSheet" />
  </div>
</template>

<script>
// @ is an alias to /src
import YearTable from "@/components/YearTable.vue";
import SubTable from "@/components/subTable.vue";

export default {
  name: "Home",
  data() {
    return {
      lookUpSheet: [
        { english: "EBIDTA_per_share", mandarin: "每股EBIDTA" },
        { english: "cash_reinvestment_ratio", mandarin: "現金再投資比例" },
        {
          english: "dividend_redistribution_ratio",
          mandarin: "現金股利分配比例",
        },
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
      ],
    };
  },
  components: {
    SubTable,
    YearTable,
  },
};
</script>
<style lang="scss" scoped>
</style>
