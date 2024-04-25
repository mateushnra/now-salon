import ValidateCustomer from "./modules/validateFormCustomer.js";

const validateEditFormCustomer = new ValidateCustomer('#createCustomerForm', '#name', '#email', '#phone', '#password', '#error-name', '#error-email', '#error-phone', '#error-password')

validateEditFormCustomer.init();