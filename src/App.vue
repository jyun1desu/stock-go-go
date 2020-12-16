<template>
<div id="app">
  <header>
    <div class="container">
      <a class="logo">
        <img src="@/assets/logo.jpg" alt="brand logo">
      </a>
      <div class="searchbar">
        <form action="" id="searchbar">
          <input type="text" form="searchbar" placeholder="請在此輸入股名或股號" class="search_text">
          <button class="search_submit"><i class="fas fa-search"></i></button>
        </form>
      </div>
      <nav class="navbar">
        <div class="menu">
          <div class="menu_list">
            <a href="##" class="dropdown_menu"><i class="fas fa-caret-down fa-fw"></i>財務報表</a>
            <div class="dropdown_toggler">
              <a href="##" class="dropdown_item">資產負債表</a>
              <a href="##" class="dropdown_item">損益表</a>
              <a href="##" class="dropdown_item">現金流量表</a>
            </div>
          </div>
          <div class="menu_list">
            <a href="##" class="dropdown_menu"><i class="fas fa-caret-down fa-fw"></i>財務比例分析</a>
            <div class="dropdown_toggler">
              <a href="##" class="dropdown_item">每股比例表</a>
            </div>
          </div>
          <div class="menu_list">
            <a href="##" class="dropdown_menu"><i class="fas fa-caret-down fa-fw"></i>技術線圖</a>
            <div class="dropdown_toggler">
              <a href="##" class="dropdown_item">營運分析</a>
              <a href="##" class="dropdown_item">獲利分析</a>
            </div>
          </div>
          <div class="menu_list lock_function">
            <a href="##" class="dropdown_menu"><i class="fas fa-lock fa-fw"></i>選股功能</a>
            <div class="dropdown_toggler">
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <section class="title">
      <div class="title_content">
        <p>2330 台積電</p>
        <p>資產負債表</p>
      </div>
    </section>
    <section class="data">
      <div class="report_data">
        <div class="report_unit">
          <span>單位：百萬元</span>
        </div>
        <div class="report_type">
          <span>季報</span>
          <!-- <span> | </span> -->
          <span>年報</span>
        </div>
      </div>
      <div class="table_data">

      </div>
    </section>
  </main>
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
  justify-content: space-between;
}
.logo img {
  cursor: pointer;
  width: 100px;
}

.searchbar {
  margin-left: 20px;
  flex-grow: 1;
  position: relative;
}
.search_text {
  padding: 10px;
  width: 65%;
  box-sizing: border-box;
  font-size: 18px;
}
.search_submit {
  padding: 10px;
  position: absolute;
  top: 3px;
  right: 155px;
  z-index: 2;
  border: none;
  background-color: transparent;
}
.search_submit i {
  font-size: 18px;
}

.navbar {
  display: flex;
}
.menu {
  flex-grow: 1;
  display: flex;
}
.menu_list {
  position: relative;
}
.dropdown_menu {
  padding: 10px;
  display: block;
  font-size: 18px;
  font-weight: 400;
}
.dropdown_menu i {
  margin-right: 5px;
  font-size: 20px;
}
.dropdown_toggler {
  display: none;
}
.dropdown_menu:hover ~ .dropdown_toggler {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 40px;
}
.dropdown_item {
  line-height: 2;
}

.title {
  background-color: rgba(248, 165, 39, 0.8);
}
.title_content {
  margin: 0 auto;
  width: 1080px;
  display: flex;
  justify-content: space-between;
}
.title_content p {
  font-size: 25px;
  font-weight: 200;
}

.data {
  margin: 0 auto;
  width: 1080px;
  padding: 10px 10px 30px;
  box-sizing: border-box;
  background-color: #fff;
}
.report_type {
  margin: 0 auto;
  width: 150px;
  text-align: center;
  position: relative;
}
.report_type span {
  padding: 0 5px;
  font-weight: 500px;
  line-height: 2;
}
.report_type span:last-child {
  border-radius: 5px;
  background-color: #ccc;
}
.report_unit {
  float: right;
}
.report_unit span {
  line-height: 2;
}
</style>
