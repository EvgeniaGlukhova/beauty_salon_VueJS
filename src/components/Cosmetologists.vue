<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Cosmetologists",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    cosmetologists() {
      return this.dataStore.cosmetologists;
    },
    cosmetologists_total() {
      return this.dataStore.cosmetologists_total;
    }
  },
  mounted() {
    console.log("Cosmetologists component MOUNTED!");
    this.dataStore.get_cosmetologists();
    this.dataStore.get_cosmetologists_total();
    console.log('Cosmetologists=', this.cosmetologists);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_cosmetologists(this.offset / this.perpage, this.perpage);
    }
  }
}

</script>

<template>
  <DataTable
    :value="cosmetologists"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=cosmetologists_total
    @page="onPageChange"
    responsive-layot="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="name" header="ФИО косметолога"/>


  </DataTable>
</template>

<style scoped>

</style>
