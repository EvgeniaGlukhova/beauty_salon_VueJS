
import {createRouter, createWebHistory } from 'vue-router';
import Appointments from '@/components/Appointments.vue';
import Services from '@/components/Services.vue';
import Cosmetologists from '@/components/Cosmetologists.vue';
import CreateService from '@/components/CreateService.vue'

const routes = [
  {
    path: '/',
    component: Services,
  },
  {
    path: '/cosmetologists',
    component: Cosmetologists,
  },
  {
    path: '/appointments',
    component: Appointments,
  },
  {
    path: '/createService',
    component: CreateService,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

