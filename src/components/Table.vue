<template>
  <div class="table">
    <h1>of</h1>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      rows:[],
    };
  },
  mounted() {
    fetch("https://5fbd1e2b3f8f90001638cc76.mockapi.io/layer")
      .then((res) => res.json())
      .then((rowTitles) => {
        this.rows = rowTitles;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
