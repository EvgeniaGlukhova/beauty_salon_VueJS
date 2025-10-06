<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Appointments",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    appointments() {
      return this.dataStore.appointments;
    },
    appointments_total() {
      return this.dataStore.appointments_total;
    }
  },
  mounted() {
    console.log("Appointments component MOUNTED!");
    this.dataStore.get_appointments();
    this.dataStore.get_appointments_total();
    console.log('Appointments=', this.appointments);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_appointments(this.offset / this.perpage, this.perpage);
    }
  }
}

</script>

<template>
  <DataTable
    :value="appointments"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=appointments_total
    @page="onPageChange"
    responsive-layot="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="client_id" header="Клиент"/>
    <Column field="cosmetologist_id" header="Косметолог"/>
    <Column field="start_time" header="Начало записи"/>
    <Column field="end_time" header="Конец записи"/>
  </DataTable>
</template>

<style scoped>

</style>
