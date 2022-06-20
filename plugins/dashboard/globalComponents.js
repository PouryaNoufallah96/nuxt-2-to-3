import Badge from "~/components/ud/Badge.vue";
import BaseAlert from "~/components/ud/BaseAlert";
import BaseButton from "~/components/ud/BaseButton.vue";
import BaseCheckbox from "~/components/ud/Inputs/BaseCheckbox.vue";
import BaseDropdown from "~/components/ud/BaseDropdown.vue";
import BaseHeader from "~/components/ud/BaseHeader";
import BaseInput from "~/components/ud/Inputs/BaseInput.vue";
import BaseNav from "~/components/ud/Navbar/BaseNav";
import BasePagination from "~/components/ud/BasePagination";
import BaseProgress from "~/components/ud/BaseProgress";
import BaseRadio from "~/components/ud/Inputs/BaseRadio";
import BaseSwitch from "~/components/ud/BaseSwitch.vue";
import Card from "~/components/ud/Cards/Card.vue";
import Modal from "~/components/ud/Modal.vue";
import RouteBreadcrumb from "~/components/ud/Breadcrumb/RouteBreadcrumb";
import StatsCard from "~/components/ud/Cards/StatsCard.vue";
import { Input, Tooltip, Popover } from "element-ui";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Vue from "vue";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(Badge.name, Badge);
Vue.component(BaseAlert.name, BaseAlert);
Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BaseHeader.name, BaseHeader);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseDropdown.name, BaseDropdown);
Vue.component(BaseNav.name, BaseNav);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseProgress.name, BaseProgress);
Vue.component(BaseRadio.name, BaseRadio);
Vue.component(BaseSwitch.name, BaseSwitch);
Vue.component(Card.name, Card);
Vue.component(Modal.name, Modal);
Vue.component(StatsCard.name, StatsCard);
Vue.component(RouteBreadcrumb.name, RouteBreadcrumb);
Vue.component(Input.name, Input);
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);
Vue.use(Tooltip);
Vue.use(Popover);