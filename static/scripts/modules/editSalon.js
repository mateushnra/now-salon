import ValidationForm from "./validationForm.js";

export default class EditSalon {
    constructor(editSalonForm, nameInput, phoneInput, emailInput, statusSelect, addressInput, neighborhoodInput, cityStateInput, timeOpenInput, timeCloseInput, containerDaysCheckList, errorName, errorPhone, errorEmail, errorAddress, errorNeighborhood, errorCityState, errorTimeOpen, errorTimeClose) {
        this.editSalonForm = document.querySelector(editSalonForm);

        this.nameInput = document.querySelector(nameInput);
        this.phoneInput = document.querySelector(phoneInput);
        this.emailInput = document.querySelector(emailInput);
        this.statusSelect = document.querySelector(statusSelect);
        this.addressInput = document.querySelector(addressInput);
        this.neighborhoodInput = document.querySelector(neighborhoodInput);
        this.cityStateInput = document.querySelector(cityStateInput);
        this.timeOpenInput = document.querySelector(timeOpenInput);
        this.timeCloseInput = document.querySelector(timeCloseInput);

        this.containerDaysCheckList = document.querySelector(containerDaysCheckList);

        this.errorName = document.querySelector(errorName);
        this.errorPhone = document.querySelector(errorPhone);
        this.errorEmail = document.querySelector(errorEmail);
        this.errorAddress = document.querySelector(errorAddress);
        this.errorNeighborhood = document.querySelector(errorNeighborhood);
        this.errorCityState = document.querySelector(errorCityState);
        this.errorTimeOpen = document.querySelector(errorTimeOpen);
        this.errorTimeClose = document.querySelector(errorTimeClose);

        this.eventSubmitForm = this.eventSubmitForm.bind(this);
    }

    // showErrorMessage(errorMessage){
    //     if(errorMessage){
    //         this.errorForm.innerHTML = errorMessage; 
    //     }
    // }

    // getCookie(name) {
    //     var cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         var cookies = document.cookie.split(';');
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = cookies[i].trim();
                
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }

    // getDataToSend(){
    //     const email = this.emailInput.value;
    //     const csrftoken = this.getCookie("csrftoken");

    //     return {email, csrftoken}
    // }

    async recoverSalonData(data){
        const currentURL = window.location.href;
        console.log(currentURL);

        const currentPagePath = window.location.pathname;
        console.log(currentPagePath);
        // if(data.csrftoken){
        //     try{
        //         const response = await fetch('/verifyEmail/', {
        //             method: 'POST', 
        //             headers: {
        //                 "X-Requested-With": "XMLHttpRequest",
        //                 "Content-Type": "application/json",
        //                 "X-CSRFToken": data.csrftoken
        //             },
        //             body: JSON.stringify({"email": data.email}), 
        //         });
        
        //         const feedback = await response.json()

        //         this.errorMsg = feedback.errorMsg 

        //         if(feedback.success){        
        //             return true
        //         }else{
        //             this.showErrorMessage(this.errorMsg);
        //             return false
        //         }
                 
        //     }catch(e){
        //         return e
        //     }
        //}
    }
  
    async eventSubmitForm(e) {
        e.preventDefault() 
        this.recoverSalonData()
        if(this.isAllFieldsValid()){
            e.target.submit()
        }
    }

    isAllFieldsValid(){
        const validation = new ValidationForm()

        let isFormValid = true
        let msgNameError = ""
        let msgPhoneError = ""
        let msgEmailError = ""
        let msgAddressError = ""
        let msgNeighborhoodError = ""
        let msgCityStateError = ""
        let msgTimeOpenError = ""
        let msgTimeCloseError = ""

        if(validation.isEmpty(this.nameInput.value)){
            isFormValid = false
            msgNameError = "Nome vazio"
        }

        if(validation.isBelowMinLength(this.phoneInput.value, 13)){
            isFormValid = false
            msgPhoneError = "Número de telefone incompleto"
        }

        if(validation.isEmpty(this.nameInput.value)){
            isFormValid = false
            msgPhoneError = "Telefone vazio"
        }

        if(!validation.isEmailValid(this.emailInput.value)){
            isFormValid = false
            msgEmailError = "Email inválido"
        }

        if(validation.isEmpty(this.emailInput.value)){
            isFormValid = false
            msgEmailError = "Email vazio"
        }

        if(validation.isEmpty(this.addressInput.value)){
            isFormValid = false
            msgAddressError = "Endereço vazio"
        }

        if(validation.isEmpty(this.neighborhoodInput.value)){
            isFormValid = false
            msgNeighborhoodError = "Bairro vazio"
        }

        if(validation.isEmpty(this.cityStateInput.value)){
            isFormValid = false
            msgCityStateError = "Cidade/Estado vazio"
        }

        if(validation.isEmpty(this.timeOpenInput.value)){
            isFormValid = false
            msgTimeOpenError = "Horário de abertura vazio"
        }

        if(validation.isEmpty(this.timeCloseInput.value)){
            isFormValid = false
            msgTimeCloseError = "Horário de fechamento vazio"
        }
            
        this.errorName.innerHTML = msgNameError
        this.errorPhone.innerHTML = msgPhoneError
        this.errorEmail.innerHTML = msgEmailError
        this.errorAddress.innerHTML = msgAddressError
        this.errorNeighborhood.innerHTML = msgNeighborhoodError
        this.errorCityState.innerHTML = msgCityStateError
        this.errorTimeOpen.innerHTML = msgTimeOpenError
        this.errorTimeClose.innerHTML = msgTimeCloseError

        return isFormValid
    }
  
    addFormEvent() {
      this.editSalonForm.addEventListener('submit', this.eventSubmitForm);
    }

    init() {
    if (this.editSalonForm && this.emailInput && this.phoneInput && this.emailInput && this.statusSelect && this.addressInput && this.neighborhoodInput && this.cityStateInput && this.timeOpenInput && this.timeCloseInput && this.containerDaysCheckList) {
        this.addFormEvent();
    }
      return this;
    }
  }