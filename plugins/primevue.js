import Vue from 'vue';
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';

Vue.use(PrimeVue, { ripple: true });
Vue.use(ConfirmationService);
Vue.use(ToastService);
Vue.directive('tooltip', Tooltip);
Vue.directive('badge', BadgeDirective);