import ValidationForm from "./validationForm.js";

export default class SignUpCustomer {
    constructor(signUpForm, nameInput, emailInput, phoneInput, passwordInput, errorForm, errorName, errorEmail, errorPhone, errorPassword) {
        this.signUpForm = document.querySelector(signUpForm);
        this.nameInput = document.querySelector(nameInput);
        this.emailInput = document.querySelector(emailInput);
        this.phoneInput = document.querySelector(phoneInput);
        this.passwordInput = document.querySelector(passwordInput);

        this.errorForm = document.querySelector(errorForm);
        this.errorName = document.querySelector(errorName);
        this.errorEmail = document.querySelector(errorEmail);
        this.errorPhone = document.querySelector(errorPhone);
        this.errorPassword = document.querySelector(errorPassword);

        this.errorMsg = null;

        this.eventSubmitForm = this.eventSubmitForm.bind(this);
        this.eventInputBlur = this.eventInputBlur.bind(this);
    }

    showErrorMessage(errorMessage){
        if(errorMessage){
            this.errorForm.innerHTML = errorMessage; 
        }
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    getDataToSend(){
        const email = this.emailInput.value;
        const csrftoken = this.getCookie("csrftoken");

        return {email, csrftoken}
    }

    async verifyEmail(data){
        if(data.csrftoken){
            try{
                const response = await fetch('/verifyEmail/', {
                    method: 'POST', 
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                        "X-CSRFToken": data.csrftoken
                    },
                    body: JSON.stringify({"email": data.email}), 
                });
        
                const feedback = await response.json()

                this.errorMsg = feedback.errorMsg 

                if(feedback.success){        
                    return true
                }else{
                    this.showErrorMessage(this.errorMsg);
                    return false
                }
                 
            }catch(e){
                return e
            }
        }
    }
  
    async eventSubmitForm(e) {
        e.preventDefault() 

        if(this.isAllFieldsValid()){
            const emailNotInUse = await this.verifyEmail(this.getDataToSend())

            if(emailNotInUse){
                e.target.submit()
            }
        }
    }

    checkField(input){
        const validation = new ValidationForm()

        switch(input){
            case this.nameInput: {
                let msgNameError = ""

                if(validation.isEmpty(input.value)){
                    msgNameError = "Nome vazio"
                }

                this.errorName.innerHTML = msgNameError

                break
            }
            case this.emailInput: {
                let msgEmailError = ""

                if(!validation.isEmailValid(input.value)){
                    msgEmailError = "Email inválido"
                }

                if(validation.isEmpty(input.value)){
                    msgEmailError = "Email vazio"
                }

                this.errorEmail.innerHTML = msgEmailError

                break
            }
            case this.phoneInput: {
                let msgPhoneError = ""

                if(validation.isBelowMinLength(input.value, 13)){
                    msgPhoneError = "Número de telefone incompleto"
                }

                if(validation.isEmpty(input.value)){
                    msgPhoneError = "Telefone vazio"
                }

                this.errorPhone.innerHTML = msgPhoneError

                break
            }
            case this.passwordInput:{
                let msgPasswordError = ""

                if(validation.isBelowMinLength(input.value, 6)){
                    msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
                }

                if(validation.isEmpty(input.value)){
                    msgPasswordError = "Senha vazia"
                }
 
                this.errorPassword.innerHTML = msgPasswordError
                break
            }
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

        if(validation.isBelowMinLength(this.passwordInput.value, 6)){
            isFormValid = false
            msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
        }

        if(validation.isEmpty(this.passwordInput.value)){
            isFormValid = false
            msgPasswordError = "Senha vazia"
        }
            
        this.errorName.innerHTML = msgNameError
        this.errorEmail.innerHTML = msgEmailError
        this.errorPhone.innerHTML = msgPhoneError
        this.errorPassword.innerHTML = msgPasswordError

        return isFormValid
    }

    eventInputBlur(e) {
       this.checkField(e.target)
    }
  
    addFormEvent() {
      this.signUpForm.addEventListener('submit', this.eventSubmitForm);
    }

    addOnBlurEvents() {
        this.nameInput.addEventListener('blur', this.eventInputBlur);
        this.emailInput.addEventListener('blur', this.eventInputBlur);
        this.phoneInput.addEventListener('blur', this.eventInputBlur);
        this.passwordInput.addEventListener('blur', this.eventInputBlur);
    }
  
    init() {
      if (this.signUpForm && this.emailInput && this.passwordInput) {
        this.addFormEvent();
        this.addOnBlurEvents();
      }
      return this;
    }
  }