import PhoneFormatter from "./modules/phoneFormatter.js";
import SignUpCustomer from "./modules/signUpCustomer.js";

const signUpPhoneFormatter = new PhoneFormatter('#phone')
const signUpCustomer = new SignUpCustomer('#signup', '#name', '#email', '#phone', '#password', '#error-form-signup', '#error-name', '#error-email', '#error-phone', '#error-password')

signUpPhoneFormatter.init();
signUpCustomer.init();