import ValidationForm from "./validationForm.js";

export default class ValidateService {
    constructor(customerForm, nameInput, emailInput, phoneInput, passwordInput, errorName, errorEmail, errorPhone, errorPassword) {
        this.customerForm = document.querySelector(customerForm);

        this.nameInput = document.querySelector(nameInput);
        this.emailInput = document.querySelector(emailInput);
        this.phoneInput = document.querySelector(phoneInput);
        this.passwordInput = document.querySelector(passwordInput);

        this.errorName = document.querySelector(errorName);
        this.errorEmail = document.querySelector(errorEmail);
        this.errorPhone = document.querySelector(errorPhone);
        this.errorPassword = document.querySelector(errorPassword);

        this.eventSubmitForm = this.eventSubmitForm.bind(this);
    }
  
    async eventSubmitForm(e) {
        e.preventDefault() 
        if(this.isAllFieldsValid()){
            e.target.submit()
        }
    }

    isAllFieldsValid(){
        const validation = new ValidationForm()

        let isFormValid = true
        let msgNameError = ""
        let msgEmailError = ""
        let msgPhoneError = ""
        let msgPasswordError = ""

        if(validation.isEmpty(this.nameInput.value)){
            isFormValid = false
            msgNameError = "Nome vazio"
        }

        if(!validation.isEmailValid(this.emailInput.value)){
            isFormValid = false
            msgEmailError = "Email inválido"
        }

        if(validation.isEmpty(this.emailInput.value)){
            isFormValid = false
            msgEmailError = "Email vazio"
        }

        if(validation.isBelowMinLength(this.phoneInput.value, 13)){
            isFormValid = false
            msgPhoneError = "Número de telefone incompleto"
        }

        if(validation.isEmpty(this.nameInput.value)){
            isFormValid = false
            msgPhoneError = "Telefone vazio"
        }

        if(validation.isBelowMinLength(this.passwordInput.value, 6) && !validation.isEmpty(this.passwordInput.value)){
            isFormValid = false
            msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
        }
            
        this.errorName.innerHTML = msgNameError
        this.errorEmail.innerHTML = msgEmailError
        this.errorPhone.innerHTML = msgPhoneError
        this.errorPassword.innerHTML = msgPasswordError

        return isFormValid
    }
  
    addFormEvent() {
      this.customerForm.addEventListener('submit', this.eventSubmitForm);
    }

    init() {
    if (this.customerForm && this.nameInput && this.emailInput && this.phoneInput && this.passwordInput) {
        this.addFormEvent();
    }
      return this;
    }
  }