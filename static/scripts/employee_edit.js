import ValidateEmployee from "./modules/validateEmployee.js";
import PhoneFormatter from "./modules/phoneFormatter.js";

const phoneFormatter = new PhoneFormatter('#phone')
const editFormEmployee = new ValidateEmployee('#editEmployeeForm', '#name', '#phone', '#role', '#password', '#selectEmployeeServices', '#checklistEmployeeServices', '#error-form', '#error-name', '#error-phone', '#error-role', '#error-password')

editFormEmployee.init();
phoneFormatter.init()