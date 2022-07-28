import Vue from 'vue';
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';

Vue.use(PrimeVue, { ripple: true });
Vue.use(ConfirmationService);
Vue.use(ToastService);
Vue.directive('tooltip', Tooltip);
Vue.directive('ripple', Ripple);