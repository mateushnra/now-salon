import ValidationForm from "./validationForm.js";

export default class ValidateSchedule {
    constructor(scheduleForm, idEmployeeSelect, idServiceSelect, scheduleDateInput, scheduleHourInput, statusSelect, cancellationReasonContainer, whoCanceledContainer, errorEmployee, errorService, errorScheduleDate, errorScheduleHour, errorObservation) {
        this.scheduleForm = document.querySelector(scheduleForm);

        this.idEmployeeSelect = document.querySelector(idEmployeeSelect);
        this.idServiceSelect = document.querySelector(idServiceSelect);
        this.scheduleDateInput = document.querySelector(scheduleDateInput);
        this.scheduleHourInput = document.querySelector(scheduleHourInput);
        this.statusSelect = document.querySelector(statusSelect);

        this.cancellationReasonContainer = document.querySelector(cancellationReasonContainer);
        this.whoCanceledContainer = document.querySelector(whoCanceledContainer);

        this.errorEmployee = document.querySelector(errorEmployee);
        this.errorService = document.querySelector(errorService);
        this.errorScheduleDate = document.querySelector(errorScheduleDate);
        this.errorScheduleHour = document.querySelector(errorScheduleHour);
        this.errorObservation = document.querySelector(errorObservation);

        this.eventSubmitForm = this.eventSubmitForm.bind(this);
        this.eventChangeStatus = this.eventChangeStatus.bind(this);
    }
  
    async eventSubmitForm(e) {
        e.preventDefault() 
        if(this.isAllFieldsValid()){
            e.target.submit()
        }
    }

    async eventChangeStatus(e){
        if(e.target.value == 3){
            this.cancellationReasonContainer.classList.remove('hide')
            this.whoCanceledContainer.classList.remove('hide')
        }

        if(e.target.value != 3 && !this.cancellationReasonContainer.classList.contains('hide') && !this.whoCanceledContainer.classList.contains('hide')){
            this.cancellationReasonContainer.classList.add('hide')
            this.whoCanceledContainer.classList.add('hide')
        }
    }

    isAllFieldsValid(){
        const validation = new ValidationForm()

        let isFormValid = true

        let msgEmployeeError = ""
        let msgServiceError = ""
        let msgScheduleDateError = ""
        let msgScheduleHourError = ""


        if(validation.isEmpty(this.idEmployeeSelect.value)){
            isFormValid = false
            msgEmployeeError = "Selecione um funcionário"
        }

        if(validation.isEmpty(this.idServiceSelect.value)){
            isFormValid = false
            msgServiceError = "Selecione um serviço"
        }

        if(validation.isEmpty(this.scheduleDateInput.value)){
            isFormValid = false
            msgScheduleDateError = "Data vazia"
        }

        if(validation.isEmpty(this.scheduleHourInput.value)){
            isFormValid = false
            msgScheduleHourError = "Horário vazio"
        }
            
        this.errorEmployee.innerHTML = msgEmployeeError
        this.errorService.innerHTML = msgServiceError
        this.errorScheduleDate.innerHTML = msgScheduleDateError
        this.errorScheduleHour.innerHTML = msgScheduleHourError

        return isFormValid
    }

    handleStartedStatusValue() {
        if (this.statusSelect.value == "3"){
            this.cancellationReasonContainer.classList.remove('hide')
            this.whoCanceledContainer.classList.remove('hide')
        }
    }
  
    addFormEvent() {
        this.scheduleForm.addEventListener('submit', this.eventSubmitForm);
    }

    addSelectEvent() {
        this.statusSelect.addEventListener('change', this.eventChangeStatus);
    }

    init() {
        if (this.scheduleForm && this.idEmployeeSelect && this.idServiceSelect && this.scheduleDateInput && this.scheduleHourInput && this.statusSelect && this.cancellationReasonContainer && this.whoCanceledContainer) {
            this.addFormEvent();
            this.addSelectEvent();
            this.handleStartedStatusValue();
    }
      return this;
    }
  }