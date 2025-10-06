import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    services: [],
    services_total: null,
    //items: [],

    cosmetologists: [],
    cosmetologists_total: null,

    appointments: [],
    appointments_total: null,

    errorMessage: "",
  }),
  actions: {
    async get_services(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/services', {
          params: {
            page: page,
            perpage: perpage
          }
        });
        this.services = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_services_total() {
      this.errorMessage = "";
      try{
        const response = await axios.get(backendUrl + '/services_total');
        this.services_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }

    },
    async get_cosmetologists(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/cosmetologists', {
          params: { page, perpage }
        });
        this.cosmetologists = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async get_cosmetologists_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/cosmetologists_total');
        this.cosmetologists_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    // --- ЗАПИСИ ---
    async get_appointments(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(backendUrl + '/appointments', {
          params: { page, perpage },
          headers: { Authorization: 'Bearer ' + token }
        });
        this.appointments = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async get_appointments_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/appointments_total');
        this.appointments_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

  }
})
