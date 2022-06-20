export default {
  bind: function(el, binding, vnode) {
    if (!el) return;
    el.clickOutsideEvent = function(event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function(el) {
    if (!el) return;
    document.body.removeEventListener("click", el.clickOutsideEvent);
  }
};
