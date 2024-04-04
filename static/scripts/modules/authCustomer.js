import ValidationForm from "./validationForm.js";

export default class AuthCustomer {
    constructor(loginForm, emailInput, passwordInput, errorForm, errorEmail, errorPassword) {
        this.loginForm = document.querySelector(loginForm);
        this.emailInput = document.querySelector(emailInput);
        this.passwordInput = document.querySelector(passwordInput);

        this.errorForm = document.querySelector(errorForm);
        this.errorEmail = document.querySelector(errorEmail);
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
        const password = this.passwordInput.value;
        const csrftoken = this.getCookie("csrftoken");

        return {email, password, csrftoken}
    }

    async submitForm(data){
        if(data.csrftoken){
            try{
                const response = await fetch('/authCustomer/', {
                    method: 'POST', 
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                        "X-CSRFToken": data.csrftoken
                    },
                    body: JSON.stringify({"email": data.email, "password": data.password}), 
                });
        
                const feedback = await response.json()

                this.errorMsg = feedback.errorMsg 
                if(feedback.success){
                    window.location.reload();
                }else{
                    this.showErrorMessage(this.errorMsg);
                }
                 
            }catch(e){
                return e
            }
        }
    }
  
    eventSubmitForm(e) {
        e.preventDefault()
        if(this.isAllFieldsValid()){
            this.submitForm(this.getDataToSend())
        }
    }

    checkField(input){
        const validation = new ValidationForm()

        switch(input){
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
        let msgEmailError = ""
        let msgPasswordError = ""

        if(!validation.isEmailValid(this.emailInput.value)){
            isFormValid = false
            msgEmailError = "Email inválido"
        }

        if(validation.isEmpty(this.emailInput.value)){
            isFormValid = false
            msgEmailError = "Email vazio"
        }

        if(validation.isBelowMinLength(this.passwordInput.value, 6)){
            isFormValid = false
            msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
        }

        if(validation.isEmpty(this.passwordInput.value)){
            isFormValid = false
            msgPasswordError = "Senha vazia"
        }
            
        this.errorEmail.innerHTML = msgEmailError
        this.errorPassword.innerHTML = msgPasswordError

        return isFormValid
    }

    eventInputBlur(e) {
       this.checkField(e.target)
    }
  
    addFormEvent() {
      this.loginForm.addEventListener('submit', this.eventSubmitForm);
    }

    addOnBlurEvents() {
        this.emailInput.addEventListener('blur', this.eventInputBlur);
        this.passwordInput.addEventListener('blur', this.eventInputBlur);
    }
  
    init() {
      if (this.loginForm && this.emailInput && this.passwordInput) {
        this.addFormEvent();
        this.addOnBlurEvents();
      }
      return this;
    }
  }