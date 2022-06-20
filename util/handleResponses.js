import Vue from "vue";
export const handleErrorNotification = err => {
  Vue.prototype.$notify({
    verticalAlign: "top",
    horizontalAlign: "center",
    type: "danger",
    message: err
  });
};
