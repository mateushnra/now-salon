import ValidationForm from "./validationForm.js";

export default class AuthEmployee {
    constructor(loginForm, registerIdInput , passwordInput, errorForm, errorRegisterId, errorPassword) {
        this.loginForm = document.querySelector(loginForm);
        this.registerIdInput = document.querySelector(registerIdInput );
        this.passwordInput = document.querySelector(passwordInput);

        this.errorForm = document.querySelector(errorForm);
        this.errorRegisterId = document.querySelector(errorRegisterId);
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
        const registerId = this.registerIdInput.value;
        const password = this.passwordInput.value;
        const csrftoken = this.getCookie("csrftoken");

        return {registerId, password, csrftoken}
    }

    async submitForm(data){
        if(data.csrftoken){
            try{
                const response = await fetch('/authEmployee/', {
                    method: 'POST', 
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                        "X-CSRFToken": data.csrftoken
                    },
                    body: JSON.stringify({"registerId": data.registerId, "password": data.password}), 
                });
        
                const feedback = await response.json()

                this.errorMsg = feedback.errorMsg 
                if(feedback.success){
                    window.location.href = "/employee";
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
            case this.registerIdInput : {
                let msgRegisterIdError = ""

                if(validation.isEmpty(input.value)){
                    msgRegisterIdError = "Matricula vazia"
                }

                this.errorRegisterId.innerHTML = msgRegisterIdError

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
        let msgRegisterIdError = ""
        let msgPasswordError = ""

        if(validation.isEmpty(this.registerIdInput .value)){
            isFormValid = false
            msgRegisterIdError = "Matrícula vazia"
        }

        if(validation.isBelowMinLength(this.passwordInput.value, 6)){
            isFormValid = false
            msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
        }

        if(validation.isEmpty(this.passwordInput.value)){
            isFormValid = false
            msgPasswordError = "Senha vazia"
        }
            
        this.errorRegisterId.innerHTML = msgRegisterIdError
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
        this.registerIdInput .addEventListener('blur', this.eventInputBlur);
        this.passwordInput.addEventListener('blur', this.eventInputBlur);
    }
  
    init() {
      if (this.loginForm && this.registerIdInput && this.passwordInput) {
        this.addFormEvent();
        this.addOnBlurEvents();
      }
      return this;
    }
  }