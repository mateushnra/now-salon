import SignUpCustomer from "./modules/signUpCustomer.js";
import PhoneFormatter from "./modules/phoneFormatter.js";
import FeedbackForm from "./modules/feedbackForm.js";

const phoneFormatter = new PhoneFormatter('#phone')
const feedbackForm = new FeedbackForm('.successMessage')
const createFormCustomer = new SignUpCustomer('#createCustomerForm', '#name', '#email', '#phone', '#password', '#error-form', '#error-name', '#error-email', '#error-phone', '#error-password')

createFormCustomer.init();
phoneFormatter.init()
feedbackForm.init()