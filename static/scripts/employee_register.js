import ValidateEmployee from "./modules/validateEmployee.js";
import PhoneFormatter from "./modules/phoneFormatter.js";
import FeedbackForm from "./modules/feedbackForm.js";

const phoneFormatter = new PhoneFormatter('#phone')
const feedbackForm = new FeedbackForm('.successMessage')
const createFormEmployee = new ValidateEmployee('#createEmployeeForm', '#name', '#phone', '#role', '#password', '#selectEmployeeServices', '#checklistEmployeeServices', '#error-form', '#error-name', '#error-phone', '#error-role', '#error-password')

createFormEmployee.init();
phoneFormatter.init()
feedbackForm.init()