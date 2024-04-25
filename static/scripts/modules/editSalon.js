import ValidationForm from "./validationForm.js";

export default class EditSalon {
    constructor(editSalonForm, nameInput, phoneInput, emailInput, statusSelect, addressInput, neighborhoodInput, cityStateInput, timeOpenInput, timeCloseInput, daysOpenInput, containerDaysCheckList, errorName, errorPhone, errorEmail, errorAddress, errorNeighborhood, errorCityState, errorTimeOpen, errorTimeClose) {
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
        this.daysOpenInput = document.querySelector(daysOpenInput);

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

    loadCheckedData(){
        let daysWeekOpen = this.daysOpenInput.value
        let daysArray = daysWeekOpen.split(', ');
        
        var checkboxes = this.containerDaysCheckList.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(function(checkbox) {
            if (daysArray.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }

    addChangeEventToCheckboxes() {
        const checkboxes = this.containerDaysCheckList.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () =>{
                const day = checkbox.value;
                let daysWeekOpen = this.daysOpenInput.value.split(', ');
                
                if (checkbox.checked) {
                    if (!daysWeekOpen.includes(day)) {
                        daysWeekOpen.push(day);
                    }
                } else {
                    const index = daysWeekOpen.indexOf(day);
                    if (index !== -1) {
                        daysWeekOpen.splice(index, 1);
                    }
                }

                this.daysOpenInput.value = this.daysOpenInput.value == '' ? day : daysWeekOpen.join(', ');
            });
        });
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

        if(validation.isEmpty(this.phoneInput.value)){
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
    if (this.editSalonForm && this.emailInput && this.phoneInput && this.emailInput && this.statusSelect && this.addressInput && this.neighborhoodInput && this.cityStateInput && this.timeOpenInput && this.timeCloseInput && this.daysOpenInput) {
        this.addFormEvent();
        this.loadCheckedData();
        this.addChangeEventToCheckboxes();
    }
      return this;
    }
  }