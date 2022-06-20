import Vue from "vue";

import VuePersianDatetimePicker from "vue-persian-datetime-picker";
Vue.component("date-picker", VuePersianDatetimePicker);
Vue.use(VuePersianDatetimePicker, {
  name: "date-picker",
  props: {
    editable: false,
    inputClass: "form-control my-custom-class-name",
    color: "#172b4d",
    autoSubmit: false
  }
});
