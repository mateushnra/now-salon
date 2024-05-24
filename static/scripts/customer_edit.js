import ValidateCustomer from "./modules/validateFormCustomer.js";
import PhoneFormatter from "./modules/phoneFormatter.js";

const validateEditFormCustomer = new ValidateCustomer('#editCustomerForm', '#name', '#email', '#phone', '#password', '#error-name', '#error-email', '#error-phone', '#error-password')
const phoneFormatter = new PhoneFormatter('#phone')

validateEditFormCustomer.init();
phoneFormatter.init()