import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lookUpSheet: [{
        english: "earnings_before_interest_and_tax",
        mandarin: "稅前息前淨利",
      },
      {
        english: "EBIDTA",
        mandarin: "稅前息前折舊前淨利－EBIDTA",
      },
      {
        english: "EPS",
        mandarin: "每股盈餘－完全稀釋－EPS",
      },
      {
        english: "income_tax_expense",
        mandarin: "所得稅費用",
      },
      {
        english: "gains_and_losses_from_continuing_operations",
        mandarin: "繼續營業單位損益",
      },
      {
        english: "consolidated_net_income",
        mandarin: "合併總損益",
      },
      {
        english: "other_comprehensive_income_OCI",
        mandarin: "其他綜合損益－OCI	",
      },
      {
        english: "total_comprehensive_income",
        mandarin: "本期綜合損益總額",
      },
      {
        english: "net_operating_revenue",
        mandarin: "營業收入淨額",
      },
      {
        english: "cost_of_goods_sold",
        mandarin: "營業成本",
      },
      {
        english: "realized_gross_profit",
        mandarin: "已實現銷貨毛利",
      },
      {
        english: "operating_expenses",
        mandarin: "營業費用",
      },
      {
        english: "other_gains_and_losses",
        mandarin: "其他收益及費損淨額",
      },
      {
        english: "operating_income",
        mandarin: "營業利益",
      },
      {
        english: "total_non_operating_revenue_and_expense",
        mandarin: "營業外收入及支出",
      },
      {
        english: "income_before_tax",
        mandarin: "稅前淨利",
      },
      {
        english: "cash_dividends_paids_CFF",
        mandarin: "支付現金股利-CFF",
      },
      {
        english: "cash_flow_from_fundraising",
        mandarin: "籌資活動之現金流量	(增加)減少-CFO",
      },
      {
        english: "cash_flow_during_this_period",
        mandarin: "本期產生現金流量	(增加)減少-CFO",
      },
      {
        english: "decrease_increase_in_accounts_receivable_CFO",
        mandarin: "應收帳款(增加)減少-CFO",
      },
      {
        english: "decrease_increase_in_inventories_CFO",
        mandarin: "存貨(增加)減少-CFO",
      },
      {
        english: "increase_decrease_in_account_payable_CTO",
        mandarin: "應付帳款增加(減少)-CTO",
      },
      {
        english: "cash_flows_from_operations",
        mandarin: "來自營運之現金流量",
      },
      {
        english: "purchases_of_property_plant_equipment_include_prepaid_CFI",
        mandarin: "購置不動產廠房設備(含預付)-CFI",
      },
      {
        english: "disposals_of_property_plant_equipment_include_prepaid_CFI",
        mandarin: "處分不動產廠房設備(含預付)-CFI",
      },
      {
        english: "cash_flow_from_investment_activities",
        mandarin: "投資活動之現金流量",
      },
      {
        english: "income_statements",
        mandarin: "綜合損益表"
      },
      {
        english: "profit_before_tax_CFO",
        mandarin: "稅前淨利－CFO"
      },
      {
        english: "depreciation_CFO",
        mandarin: "折舊－CFO"
      },
      {
        english: "amortization_CFO",
        mandarin: "攤提－CFO	"
      },
      {
        english: "cash_flow_statements",
        mandarin: "現金流量表"
      },
      {
        english: "workingCapital",
        mandarin: "營運資金週期"
      },
      {
        english: "per_share_ratios",
        mandarin: "每股比例表"
      },
      {
        english: "EBIDTA_per_share",
        mandarin: "每股EBIDTA"
      },
      {
        english: "cash_reinvestment_ratio",
        mandarin: "現金再投資比例"
      },
      {
        english: "dividend_redistribution_ratio",
        mandarin: "現金股利分配比例",
      },
      {
        english: "balance_sheets",
        mandarin: "資產負債表"
      },
      {
        english: "cash_and_cash_equivalents",
        mandarin: "現金及約當現金"
      },
      {
        english: "short_term_investment_financial_assets_current",
        mandarin: "短期投資金融資產－流動",
      },
      {
        english: "accounts_and_bills_receivable",
        mandarin: "應收帳款及票據",
      },
      {
        english: "other_receivables",
        mandarin: "其他應收款"
      },
      {
        english: "loan_to_other_S_T",
        mandarin: "短期借支"
      },
      {
        english: "inventories",
        mandarin: "存貨"
      },
      {
        english: "prepaid_expenses_and_repayments",
        mandarin: "預付費用及預付款",
      },
      {
        english: "other_current_assets",
        mandarin: "其他流動資產"
      },
      {
        english: "current_assets",
        mandarin: "流動資產"
      },
      {
        english: "long_term_investments",
        mandarin: "長期投資"
      },
      {
        english: "property_plant_and_equipment",
        mandarin: "不動產廠房及設備",
      },
      {
        english: "total_goodwill_and_intangible_assets",
        mandarin: "商譽及無形資產合計",
      },
      {
        english: "total_intangible_assets",
        mandarin: "遞延資產合計"
      },
      {
        english: "other_non_current_assets",
        mandarin: "其他非流動資產"
      },
      {
        english: "non_current_assets",
        mandarin: "非流動資產"
      },
      {
        english: "total_assets",
        mandarin: "資產總額"
      },
      {
        english: "short_term_debt",
        mandarin: "短期借款"
      },
      {
        english: "commercial_paper_payable_acceptance_bill",
        mandarin: "應付商業本票∕承兌匯票",
      },
      {
        english: "short_term_financial_liability_current",
        mandarin: "短期金融負債－流動",
      },
      {
        english: "accounts_and_bills_payable",
        mandarin: "應付帳款及票據"
      },
      {
        english: "other_payables",
        mandarin: "其他應付款"
      },
      {
        english: "current_tax_liabilities",
        mandarin: "當期所得稅負債"
      },
      {
        english: "other_financial_liabilities_current",
        mandarin: "其他金融負債－流動",
      },
      {
        english: "long_term_liabilities_due_within_one_year",
        mandarin: "一年內到期長期負債	",
      },
      {
        english: "other_current_liabilities",
        mandarin: "其他流動負債"
      },
      {
        english: "current_liabilities",
        mandarin: "流動負債"
      },
      {
        english: "financial_liabilities_non_current",
        mandarin: "金融負債－非流動",
      },
      {
        english: "corporate_bond",
        mandarin: "公司債"
      },
      {
        english: "bank_loan_non_current",
        mandarin: "銀行借款－非流動"
      },
      {
        english: "other_long_term_debt_payable_non_current",
        mandarin: "其他長期借款－非流動",
      },
      {
        english: "total_other_L_T_liab",
        mandarin: "其他負債及準備"
      },
      {
        english: "non_current_liabilities",
        mandarin: "非流動負債"
      },
      {
        english: "total_liabilities",
        mandarin: "負債總額"
      },
      {
        english: "share_capital",
        mandarin: "股本"
      },
      {
        english: "total_capital_reserve",
        mandarin: "資本公積合計"
      },
      {
        english: "retained_earnings",
        mandarin: "保留盈餘"
      },
      {
        english: "other_equity",
        mandarin: "其他權益"
      },
      {
        english: "treasury_stock",
        mandarin: "庫藏股票帳面值"
      },
      {
        english: "total_equity",
        mandarin: "股東權益總額"
      },
      {
        english: "total_liabilities_and_stockholders_equity",
        mandarin: "負債及股東權益總額",
      },
      {
        english: "total_capital_investment_IC",
        mandarin: "投資資本總額－IC",
      },
    ],
    companyData: [],
    companyAPI: 'https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportYear2330',
    subDataAPI: "https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportRatioYear2330",
    typeOfSheet: 'balance_sheets',
    dataReady: false,

  },
  mutations: {
    setCompanyAPI(state, API) {
      state.companyAPI = API
    },
    setSubAPI(state, API) {
      state.subDataAPI = API
    },
    setCompanyData(state, data) {
      state.companyData = data
    },
    setDataStatus(state, status) {
      state.dataReady = status
    },
    switchDataType(state, type) {
      state.typeOfSheet = type
    }
  },
  actions: {
    setCompanyData({
      commit,
      state
    }, {
      companyID
    }) {
      if (companyID === '2330') {

        commit('setCompanyAPI', 'https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportYear2330');
        commit('setSubAPI', 'https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportRatioYear2330');
      }
      if (companyID === '3043') {
        commit('setCompanyAPI', 'https://5fbf2d965923c90016e6ba2d.mockapi.io/reportYear3043');
        commit('setSubAPI', 'https://5fbf2d965923c90016e6ba2d.mockapi.io/reportRatioYear3043');
      }

      fetch(state.companyAPI)
        .then((res) => res.json())
        .then((datas) => {
          commit('setCompanyData', datas)
          commit('setDataStatus', true);
        });

    }

  },
  modules: {}
})