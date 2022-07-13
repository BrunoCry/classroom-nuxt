import Vue from 'vue';
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

Vue.use(PrimeVue, { ripple: true });
Vue.use(ConfirmationService);
Vue.use(ToastService);
Vue.directive('tooltip', Tooltip);