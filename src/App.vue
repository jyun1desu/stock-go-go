<template>
  <div id="app">
    <header :class="{ scrollup_top: stickTheBar }">
      <div class="container" ref="header">
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
                <a
                  @click="getYearReport('balance_sheets')"
                  class="dropdown_item"
                  >資產負債表</a
                >
                <a class="dropdown_item">損益表</a>

                <a
                  @click="getYearReport('cash_flow_statements')"
                  class="dropdown_item"
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
      <section class="title">
        <div :class="{ not_ready: !dataReady }" class="title_content">
          <p class="title_text">{{ stockIDandName }}</p>
          <p class="title_text">{{ sheetNameInMandarin }}</p>
        </div>
      </section>
    </header>
    <main :class="{ scrollup_top: stickTheBar }">
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
        <router-view :height="250" class="table_block" />
      </section>
    </main>
    <footer v-show="dataReady">
      <a href="#" class="back">BACK TO TOP</a>
    </footer>
  </div>
</template>

<script>
// import YearTable from "./components/YearTable.vue";
// import SubTable from "./components/subTable.vue";
// import LineChart from "./components/lineChart.vue";
import Loading from "./components/loadingAnimation.vue";
export default {
  name: "App",
  async created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      showList: "",
      stockName: "",
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
      this.$router.push({
        name: "Default",
      });
    },
    getYearReport(type, companyNumber = this.companyID) {
      this.$store.commit("switchDataType", type);
      this.$router.replace({
        name: "yearTable",
        params: { type, companyID: companyNumber },
      });
      this.reportType = "year";
    },
    getPerShareRatio() {
      this.$store.commit("switchDataType", "per_share_ratios");
      this.$router.push({
        name: "subTable",
        params: { type: "per_share_ratios", companyID: this.companyID },
      });
      this.reportType = "year";
    },
    getOperateChart() {
      this.$store.commit("switchDataType", "workingCapital");
      this.$router.push({
        name: "chart",
        params: { type: "workingCapital", companyID: this.companyID },
      });
      this.reportType = "year";
    },
    searchStockInfo(name) {
      const hasThis = this.nowCanSearch.some(
        (item) => name === (item.stock_symbol || item.company)
      );
      if (!hasThis) return;
      switch (name) {
        case "2330":
        case "台積電":
          this.getYearReport("balance_sheets", "2330");
          break;
        case "3043":
        case "科風":
          this.getYearReport("balance_sheets", "3043");
          break;
        default:
          break;
      }
      this.stockName = "";
    },
  },
  components: {
    // YearTable,
    // SubTable,
    // LineChart,
    Loading,
  },
  computed: {
    companyID() {
      return this.companyData.stock_symbol;
    },
    subDataAPI() {
      return this.$store.state.subDataAPI;
    },
    typeOfSheet() {
      return this.$store.state.typeOfSheet;
    },
    companyData() {
      return this.$store.state.companyData;
    },
    companyAPI() {
      return this.$store.state.companyAPI;
    },
    lookUpSheet() {
      return this.$store.state.lookUpSheet;
    },
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
      if (this.dataReady) {
        const id = this.companyData["stock_symbol"];
        const companyName = this.companyData["company_name"];
        return `${id} ${companyName}`;
      } else {
        return "";
      }
    },
    sheetNameInMandarin() {
      return this.lookUpSheet.find((name) => name.english === this.typeOfSheet)
        .mandarin;
    },
    unit() {
      if (this.yearSheets) return "百萬元";
      if (this.typeOfSheet === "per_share_ratios") return "元、%";
      if (this.typeOfSheet === "workingCapital") return "X軸：年/Y軸：天";
      else return "";
    },
    yearSheets() {
      if (
        this.typeOfSheet === "balance_sheets" ||
        this.typeOfSheet === "cash_flow_statements"
      ) {
        return true;
      } else {
        return false;
      }
    },
    dataReady() {
      return this.$store.state.dataReady;
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
  background-color: #fff;
  &.scrollup_top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .container {
      padding: 5px 0;
      .logo {
        img {
          width: 70px;
        }
      }
      .menu {
        .dropdown_menu,
        .dropdown_item {
          font-size: 16px;
        }
      }
      .searchbar {
        .search_text {
          padding: 5px;
          font-size: 14px;
          &::placeholder {
            font-size: 14px;
          }
        }
        .search_submit {
          i {
            font-size: 15px;
          }
        }
      }
    }
    .title_content {
      padding: 10px;
    }
    .title_text {
      font-size: 20px;
    }
  }
  .container {
    width: 1080px;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    transition: all 0.5s;
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
  }
}

main {
  overflow: auto;
  &.scrollup_top {
    padding-top: 150px;
  }
}

.scrollup_top {
  z-index: 3;
}

.title {
  background-color: $main_theme_color;
}
.title_content {
  margin: 0 auto;
  padding: 50px 10px;
  transition: all 0.5s;
  width: 1080px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  .title_text {
    margin: 0;
    font-size: 30px;
    font-weight: 200;
    letter-spacing: 1px;
  }
  &.not_ready {
    .title_text {
      color: $main_theme_color;
    }
  }
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

  .table_block {
    width: 90%;
    margin: 30px auto 0;
    overflow: scroll;
  }
}

// 表格首欄凍結
%first_column_sticky {
  position: sticky;
  left: 0;
  z-index: 2;
}
table {
  .column_years .names__title {
    @extend %first_column_sticky;
    background-color: $rows_name_block_color;
  }
  tr:nth-child(odd) .row_name {
    @extend %first_column_sticky;
    background-color: $column_block_grey;
  }
  tr:nth-child(even) .row_name {
    @extend %first_column_sticky;
    background-color: white;
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
