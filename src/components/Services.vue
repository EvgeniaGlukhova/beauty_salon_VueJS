<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';
import Button from "primevue/button";

export default {
  name: "Services",
  components: {DataTable, Button, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
  }
},
  computed: {
  services() {
    return this.dataStore.services;
  },
    services_total() {
    return this.dataStore.services_total;
    }
  },
  mounted() {
    console.log("Services component MOUNTED!");
    this.dataStore.get_services();
    this.dataStore.get_services_total();
    console.log('Services=', this.services);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_services(this.offset / this.perpage, this.perpage);
    },

    // Получение URL изображения из S3
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-image.png';
      // Если это полный URL, возвращаем как есть
      if (imagePath.startsWith('http')) return imagePath;
      // Иначе формируем URL к S3 хранилищу
      return `https://storage.yandexcloud.net/${import.meta.env.VITE_S3_BUCKET || 'surgu'}/${imagePath}`;
    },

    // Обработка ошибки загрузки изображения
    handleImageError(event) {
      event.target.src = '/placeholder-image.png';
      event.target.alt = 'Изображение не найдено';
    }
  }
}

</script>

<template>
  <DataTable
    :value="services"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=services_total
    @page="onPageChange"
    responsive-layot="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="name" header="Наименование услуг"/>
    <Column field="price" header="Цена"/>
    <Column field="cosmetologist_id" header="косметологи"/>

    <!-- Колонка с изображением -->
    <Column header="Фото" style="width: 100px">
      <template #body="slotProps">
        <div class="image-container">
          <img
            v-if="slotProps.data.picture_url"
            :src="getImageUrl(slotProps.data.picture_url)"
            :alt="slotProps.data.name"
            class="service-image"
            @error="handleImageError"
          />
          <span v-else class="no-image">Нет фото</span>
        </div>
      </template>
    </Column>


    <template #footer>
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createService')" icon="pi pi-plus" label="Добавить услугу"/>
      </div>
    </template>
  </DataTable>
</template>

<style scoped>

</style>
