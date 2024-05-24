import ValidationForm from "./validationForm.js";

export default class ValidateEmployee {
    constructor(employeeForm, nameInput, phoneInput, roleInput, passwordInput,selectEmployeeServices, checklistEmployeeServices, errorForm, errorName, errorPhone, errorRole, errorPassword) {
        this.employeeForm = document.querySelector(employeeForm);

        this.nameInput = document.querySelector(nameInput);
        this.phoneInput = document.querySelector(phoneInput);
        this.roleInput = document.querySelector(roleInput);
        this.passwordInput = document.querySelector(passwordInput);

        this.selectEmployeeServices = document.querySelector(selectEmployeeServices);
        this.checklistEmployeeServices = document.querySelector(checklistEmployeeServices);

        this.errorForm = document.querySelector(errorForm);

        this.errorName = document.querySelector(errorName);
        this.errorPhone = document.querySelector(errorPhone);
        this.errorRole = document.querySelector(errorRole);
        this.errorPassword = document.querySelector(errorPassword);

        this.eventSubmitForm = this.eventSubmitForm.bind(this);
    }

    addChangeEventToCheckboxes() {
        const checkboxes = this.checklistEmployeeServices.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () =>{
                const servicesOptions = this.selectEmployeeServices.querySelectorAll('option');

                const idService = checkbox.value;
                
                if (checkbox.checked) {
                    servicesOptions.forEach(service => {
                        if(service.value == idService) service.selected = true
                    })
                } else {
                    servicesOptions.forEach(service => {
                        if(service.value == idService) service.selected = false
                    })
                }
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
        let msgRoleError = ""
        let msgPasswordError = ""

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

        if(validation.isEmpty(this.roleInput.value)){
            isFormValid = false
            msgRoleError = "Cargo vazio"
        }

        if(this.passwordInput.hasAttribute("data-editing")){
            if(validation.isBelowMinLength(this.passwordInput.value, 6) && !validation.isEmpty(this.passwordInput.value)){
                isFormValid = false
                msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
            }
        }else{
            if(validation.isBelowMinLength(this.passwordInput.value, 6)){
                isFormValid = false
                msgPasswordError = "Senhas possuem no mínimo 6 caracteres"
            }
    
            if(validation.isEmpty(this.passwordInput.value)){
                isFormValid = false
                msgPasswordError = "Senha vazia"
            }
        }

        this.errorName.innerHTML = msgNameError
        this.errorPhone.innerHTML = msgPhoneError
        this.errorRole.innerHTML = msgRoleError
        this.errorPassword.innerHTML = msgPasswordError

        return isFormValid
    }
  
    addFormEvent() {
      this.employeeForm.addEventListener('submit', this.eventSubmitForm);
    }

    init() {
    if (this.employeeForm && this.nameInput && this.phoneInput && this.roleInput && this.passwordInput && this.selectEmployeeServices && this.checklistEmployeeServices) {
        this.addFormEvent();
        this.addChangeEventToCheckboxes();
    }
      return this;
    }
  }