<template>
  <div>
    <md-table v-model="stocks" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Stock">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Symbol">{{ item.symbol }}</md-table-cell>
        <md-table-cell md-label="Price">{{ item.price }} USD</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      stocks: [
        {
          name: "Tesla",
          symbol: "TSLA",
          price: 700,
        },
        {
          name: "NextEra Energy",
          symbol: "NEE",
          price: 75,
        },
        {
          name: "Enphase Energy",
          symbol: "ENPH",
          price: 150,
        },
        {
          name: "Brookfield Renewable Partners",
          symbol: "BEP",
          price: 45,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
