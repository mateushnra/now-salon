import ValidationForm from "./validationForm.js";

export default class ValidateService {
    constructor(serviceForm, nameInput, descriptionInput, statusSelect, estimatedTimeInput, priceInput, errorName, errorDescription, errorEstimatedTime, errorPrice) {
        this.serviceForm = document.querySelector(serviceForm);

        this.nameInput = document.querySelector(nameInput);
        this.descriptionInput = document.querySelector(descriptionInput);
        this.statusSelect = document.querySelector(statusSelect);
        this.estimatedTimeInput = document.querySelector(estimatedTimeInput);
        this.priceInput = document.querySelector(priceInput);

        this.errorName = document.querySelector(errorName);
        this.errorDescription = document.querySelector(errorDescription);
        this.errorEstimatedTime = document.querySelector(errorEstimatedTime);
        this.errorPrice = document.querySelector(errorPrice);

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
        let msgDescriptionError = ""
        let msgEstimatedTimeError = ""
        let msgPriceError = ""

        if(validation.isEmpty(this.nameInput.value)){
            isFormValid = false
            msgNameError = "Nome do serviço vazio"
        }

        if(validation.isEmpty(this.descriptionInput.value)){
            isFormValid = false
            msgDescriptionError = "Descrição vazio"
        }

        if(validation.isEmpty(this.estimatedTimeInput.value)){
            isFormValid = false
            msgEstimatedTimeError = "Tempo estimado vazio"
        }

        if(validation.isEmpty(this.priceInput.value)){
            isFormValid = false
            msgPriceError = "Preço vazio"
        }
            
        this.errorName.innerHTML = msgNameError
        this.errorDescription.innerHTML = msgDescriptionError
        this.errorEstimatedTime.innerHTML = msgEstimatedTimeError
        this.errorPrice.innerHTML = msgPriceError

        return isFormValid
    }
  
    addFormEvent() {
      this.serviceForm.addEventListener('submit', this.eventSubmitForm);
    }

    init() {
    if (this.serviceForm && this.nameInput && this.descriptionInput && this.estimatedTimeInput && this.statusSelect && this.priceInput) {
        this.addFormEvent();
    }
      return this;
    }
  }