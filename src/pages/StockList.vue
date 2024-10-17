<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Stock Biodata</h4>
            <p class="category">Company Profile!</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Stock List</h4>
            <p class="category">Invest on Renewable Energies Stock for your own future!</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="green"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable, OrderedTable } from "@/components";

export default {
  components: {
    OrderedTable,
    SimpleTable,
  },
};
</script>

<style scoped>
.content {
  padding: 20px;
}
.md-card-header {
  background-color: green !important;
  color: white;
}
.md-card-plain .md-card-header {
  background-color: green !important;
  color: white;
}
</style>
