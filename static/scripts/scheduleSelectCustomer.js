import SelectFilterForm from "./modules/selectFilterForm.js";

const filterCustomerList = new SelectFilterForm('#actionCustomerForm', '#search-input', '#search-button', '#select-button');

filterCustomerList.init();