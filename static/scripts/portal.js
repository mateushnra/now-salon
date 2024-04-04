import AuthEmployee from "./modules/authEmployee.js";

const authEmployee = new AuthEmployee('#form-employee-login', '#register-id', '#password', '#error-form-employee-login', '#error-register-id', '#error-password')

authEmployee.init();