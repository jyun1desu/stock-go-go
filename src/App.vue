<template>
  <div id="app">
    <header ref="header">
      <div class="container">
        <a @click="backToHome" class="logo" href="#">
          <img src="@/assets/logo.jpg" alt="brand logo" />
        </a>
        <div class="searchbar">
          <form
            @submit.prevent="searchStockInfo(stockName)"
            action=""
            id="searchbar"
            class="search_area"
          >
            <input
              v-model="stockName"
              type="text"
              form="searchbar"
              placeholder="請在此輸入股名或股號"
              class="search_text"
            />
            <button type="submit" class="search_submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <div v-if="searchResultList" class="result_list">
            <span
              @click="searchStockInfo(item.stock_symbol)"
              class="each_result"
              v-for="(item, index) in searchResultList"
              :key="'result' + index"
              >{{
                item.company
                  ? `${item.stock_symbol} ${item.company}`
                  : item.warn
              }}</span
            >
          </div>
        </div>
        <nav class="navbar">
          <div class="menu">
            <div
              @mouseleave="showList = ''"
              @mouseenter="showList = 'financialStatements'"
              :class="{ now_picked: showList === 'financialStatements' }"
              class="menu_list"
            >
              <a href="##" class="dropdown_menu">
                <i
                  :class="{ open_list: showList === 'financialStatements' }"
                  class="toggle_icon fas fa-caret-down fa-fw"
                ></i>
                財務報表
              </a>
              <div
                v-show="showList === 'financialStatements'"
                class="dropdown_toggler"
              >
                <a @click="getYearReport" class="dropdown_item">資產負債表</a>
                <a @click="showNotYetDialog = true" class="dropdown_item"
                  >損益表</a
                >
                <a @click="showNotYetDialog = true" class="dropdown_item"
                  >現金流量表</a
                >
              </div>
            </div>
            <div
              @mouseleave="showList = ''"
              @mouseenter="showList = 'financialAnalysis'"
              :class="{ now_picked: showList === 'financialAnalysis' }"
              class="menu_list"
            >
              <a href="##" class="dropdown_menu"
                ><i
                  :class="{ open_list: showList === 'financialAnalysis' }"
                  class="toggle_icon fas fa-caret-down fa-fw"
                ></i
                >財務比例分析</a
              >
              <div
                v-show="showList === 'financialAnalysis'"
                class="dropdown_toggler"
              >
                <a @click="getPerShareRatio" class="dropdown_item"
                  >每股比例表</a
                >
              </div>
            </div>
            <div
              @mouseenter="showList = 'grapics'"
              @mouseleave="showList = ''"
              :class="{ now_picked: showList === 'grapics' }"
              class="menu_list"
            >
              <a href="##" class="dropdown_menu">
                <i
                  :class="{ open_list: showList === 'grapics' }"
                  class="toggle_icon fas fa-caret-down fa-fw"
                ></i
                >技術線圖</a
              >
              <div v-show="showList === 'grapics'" class="dropdown_toggler">
                <a @click="getOperateChart" class="dropdown_item">營運分析</a>
                <a @click="showNotYetDialog = true" class="dropdown_item"
                  >獲利分析</a
                >
              </div>
            </div>
            <div class="menu_list lock_function">
              <a @click="showNotYetDialog = true" class="dropdown_menu"
                ><i class="fas fa-lock fa-fw"></i>選股功能</a
              >
              <div
                v-show="showList === 'selectCertainStock'"
                class="dropdown_toggler"
              ></div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <main :class="{ scrollup_top: stickTheBar }" v-show="componentIsReady">
      <section :class="{ scrollup_top: stickTheBar }" class="title">
        <div class="title_content">
          <!--scrollup-->
          <p class="title_text">{{ stockIDandName }}</p>
          <!--scrollup_text-->
          <p class="title_text">{{ sheetNameInMandarin }}</p>
          <!--scrollup_text-->
        </div>
      </section>
      <Loading v-if="!dataReady" />
      <section v-show="dataReady" class="data">
        <div class="report_data">
          <div class="report_unit">
            <span>單位：{{ unit }}</span>
          </div>
          <div class="report_type">
            <span
              @click="reportType = 'quarter'"
              :class="{ focus: reportType === 'quarter' }"
              class="active"
            >
              季報
            </span>
            <!-- <span> | </span> -->
            <span
              @click="reportType = 'year'"
              :class="{ focus: reportType === 'year' }"
              class="active"
            >
              年報</span
            >
          </div>
        </div>
        <YearTable
          v-show="dataReady && typeOfSheet === 'balance_sheets'"
          class="data_list"
          @isReady="componentIsReady = true"
          :companyData="companyData"
          :lookUpSheet="lookUpSheet"
          :typeOfSheet="typeOfSheet"
        />
        <SubTable
          @isReady="componentIsReady = true"
          v-show="typeOfSheet === 'per_share_ratios'"
          :lookUpSheet="lookUpSheet"
          :dataAPI="subDataAPI"
        />
        <LineChart v-show="typeOfSheet === 'workingCapital'" />
      </section>
    </main>
    <footer>
      <a href="#" class="back">BACK TO TOP</a>
    </footer>
  </div>
</template>

<script>
import YearTable from "./components/YearTable.vue";
import SubTable from "./components/subTable.vue";
import LineChart from "./components/lineChart.vue";
import Loading from "./components/loadingAnimation.vue";
export default {
  name: "App",
  async created() {
    window.addEventListener("scroll", this.handleScroll);
    const lastTime = localStorage.getItem("lastTimeStock");
    if (lastTime) {
      this.searchStockInfo(lastTime);
    } else {
      //預設資料：資產負債表，預設公司：台積
      await this.getYearReport();
    }
  },
  data() {
    return {
      componentIsReady: false,
      lookUpSheet: [
        { english: "workingCapital", mandarin: "營運資金週期" },
        { english: "per_share_ratios", mandarin: "每股比例表" },
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
      dataReady: false,
      companyData: [],
      companyAPI: "https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportYear2330",
      subDataAPI:
        "https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportRatioYear2330",
      showList: "",
      nowStock: "2330",
      stockName: "",
      typeOfSheet: "balance_sheets",
      reportType: "year",
      showNotYetDialog: false,
      stickTheBar: false,
      nowCanSearch: [
        { company: "台積電", stock_symbol: "2330" },
        { company: "科風", stock_symbol: "3043" },
      ],
    };
  },
  methods: {
    handleScroll() {
      const offsetTop = this.$refs.header.clientHeight;
      if (window.scrollY > offsetTop) {
        this.stickTheBar = true;
      } else {
        this.stickTheBar = false;
      }
    },
    backToHome() {
      this.searchStockInfo("2330");
    },
    getYearReport() {
      const same =
        this.nowStock === this.companyData.company_name ||
        this.nowStock === this.companyData.stock_symbol;
      if (!same) {
        this.dataReady = false;
        fetch(this.companyAPI)
          .then((res) => res.json())
          .then((datas) => {
            this.companyData = datas;
            this.dataReady = true;
          });
      }
      this.typeOfSheet = "balance_sheets";
      this.reportType = "year";
    },
    getPerShareRatio() {
      this.typeOfSheet = "per_share_ratios";
      this.reportType = "year";
    },
    getOperateChart() {
      this.typeOfSheet = "workingCapital";
    },
    searchStockInfo(name) {
      const hasThis = this.nowCanSearch.some(
        (item) => name === (item.stock_symbol || item.company)
      );
      if (!hasThis) return;
      this.nowStock = name;
      switch (name) {
        case "2330":
        case "台積電":
          this.companyAPI =
            "https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportYear2330";
          this.subDataAPI =
            "https://5fbd1e2b3f8f90001638cc76.mockapi.io/reportRatioYear2330";
          this.getYearReport();
          break;
        case "3043":
        case "科風":
          this.companyAPI =
            "https://5fbf2d965923c90016e6ba2d.mockapi.io/reportYear3043";
          this.subDataAPI =
            "https://5fbf2d965923c90016e6ba2d.mockapi.io/reportRatioYear3043";
          this.getYearReport();
          break;
        default:
          console.log("nono");
          break;
      }
      this.stockName = "";
    },
  },
  components: {
    YearTable,
    SubTable,
    LineChart,
    Loading,
  },
  computed: {
    searchResultList() {
      const input = this.stockName;
      if (input) {
        const list = this.nowCanSearch.filter((data) => {
          return (
            data.company.includes(input) || data.stock_symbol.includes(input)
          );
        });
        return list.length ? list : [{ warn: `查無 ${input} 的相關資訊` }];
      } else {
        return false;
      }
    },
    stockIDandName() {
      const id = this.companyData["stock_symbol"];
      const companyName = this.companyData["company_name"];
      return `${id} ${companyName}`;
    },
    sheetNameInMandarin() {
      return this.lookUpSheet.find((name) => name.english === this.typeOfSheet)
        .mandarin;
    },
    unit() {
      if (this.typeOfSheet === "balance_sheets") return "百萬元";
      if (this.typeOfSheet === "per_share_ratios") return "元、%";
      if (this.typeOfSheet === "workingCapital") return "X軸：年/Y軸：天";
      else return "";
    },
  },
  watch: {
    nowStock(value) {
      window.localStorage.setItem("lastTimeStock", value);
    },
  },
};
</script>

<style lang="scss">
$highlight_font: #c97b22;
* {
  color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  min-width: 1080px;
}
body {
  margin: 0;
  font-family: "Noto Serif JP", serif;
}
a {
  text-decoration: none;
  color: #000;
}
header {
  padding: 20px 0;
}
.container {
  width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.logo img {
  cursor: pointer;
  width: 100px;
}

.searchbar {
  margin-left: 20px;
  flex: 0 0 30%; // jyunyi
  position: relative;

  .search_area {
    position: relative;
  }
  .search_text {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid #333;
    font-size: 18px;
    letter-spacing: 2px;

    &:focus {
      outline: none;
      border: 2px solid $main_theme_color;
    }
    &::placeholder {
      letter-spacing: 1px;
      font-size: 16px;
    }
  }
  .search_submit {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
    i {
      font-size: 18px;
      &:hover {
        color: $main_theme_color;
      }
    }
  }
  .result_list {
    position: absolute;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    margin-top: 5px;
    padding: 2px;
    box-sizing: border-box;
    .each_result {
      cursor: pointer;
      display: block;
      padding: 10px;
      box-sizing: border-box;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
}

.navbar {
  display: flex;
  margin-left: auto;
}
.menu {
  flex-grow: 1;
  display: flex;

  .menu_list {
    position: relative;
    &.now_picked {
      .dropdown_menu {
        color: $highlight_font;
      }
    }
    a {
      cursor: pointer;
    }
  }
  .dropdown_menu {
    padding: 10px;
    display: block;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 400;
    position: relative;

    .toggle_icon {
      margin-right: 5px;
      font-size: 20px;
      transform: rotate(-90deg);
      transition: 0.5s all;

      &.open_list {
        transform: rotate(0);
        color: $highlight_font;
      }
    }
  }
  .dropdown_toggler {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: absolute;
    width: 120%;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px 0px rgb(223, 223, 223);
  }

  .dropdown_item {
    line-height: 2;
    margin-left: 10px;
    font-size: 16px;
    letter-spacing: 2px;
    & + .dropdown_item {
      margin-top: 10px;
    }
    &:hover {
      color: $highlight_font;
    }
  }
}

main {
  overflow: auto;
  &.scrollup_top {
    padding-top: 80px;
  }
}

.title {
  background-color: $main_theme_color;
  &.scrollup_top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .title_content {
      padding: 10px;
    }
    .title_text {
      font-size: 20px;
    }
  }
}
.title_content {
  margin: 0 auto;
  padding: 50px 10px;
  transition: all 0.5s;
  width: 1080px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.title_text {
  margin: 0;
  font-size: 30px;
  font-weight: 200;
  letter-spacing: 1px;
}

.data {
  margin: 0 auto;
  width: 1080px;
  padding: 10px 10px 30px;
  box-sizing: border-box;
  background-color: #fff;

  .report_type {
    margin: 10px auto 20px;
    width: 150px;
    text-align: center;

    span {
      cursor: pointer;
      padding: 5px 15px;
      font-weight: 500px;
      line-height: 2;
      padding: 5px;

      &:last-child {
        margin-left: 10px;
      }
      &.focus {
        border-radius: 5px;
        background-color: #ccc;
      }
    }
  }
  .report_unit {
    float: right;
  }
  .report_unit span {
    line-height: 2;
  }
}
footer {
  padding: 20px 0;
}
.back {
  margin: 0 auto;
  padding: 10px;
  display: block;
  width: 150px;
  border-radius: 5px;
  background-color: $main_theme_color;
  text-align: center;
}
</style>
