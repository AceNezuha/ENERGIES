<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Company">{{ item.company }}</md-table-cell>
        <md-table-cell md-label="Type Of Ownership">{{ item.ownership }}</md-table-cell>
        <md-table-cell md-label="Location">{{ item.location }}</md-table-cell>
        <md-table-cell md-label="Stocks">{{ item.stocks }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      users: [
        {
          company: "Tesla",
          stocks: "$566.02B",
          ownership: "Publicly traded Company",
          location: "Gigafactory Texas, Tesla's headquarters, in Austin, Texas",
        },
        {
          company: "NextEra Energy",
          stocks: "$154.89B",
          ownership: "Limited Partnership",
          location: "Juno Beach, Florida",
        },
        {
          company: "Enphase Energy",
          stocks: " $16.70B",
          ownership: "Institutional Ownership and Shareholders",
          location: "Fremont, California, United States",
        },
        {
          company: "Brookfield Renewable Partners",
          stocks: "$7.96B",
          ownership: "Limited Partnership",
          location: "Toronto, Ontario, Canada",
        },       
      ],
    };
  },
};
</script>
