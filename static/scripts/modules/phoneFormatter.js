export default class PhoneFormatter {
    constructor(inputPhone) {
        this.inputPhone = document.querySelector(inputPhone);

        this.eventPhoneFormat = this.eventPhoneFormat.bind(this);
    }
  
    phoneFormat(input) {
        const formattedOnlyDigits = input.value.replace(/\D/g, '')

        const formattedWithDDSpace =
            formattedOnlyDigits.length > 2
            ? `${formattedOnlyDigits.slice(0, 2)} ${formattedOnlyDigits.slice(2)}`
            : formattedOnlyDigits
    
        const formattedWithHyphen = formattedWithDDSpace.length > 8
            ? `${formattedWithDDSpace.slice(0, 8)}-${formattedWithDDSpace.slice(8)}`
            : formattedWithDDSpace
    
        input.value = formattedWithHyphen
    }
  
    eventPhoneFormat(e) {
        this.phoneFormat(e.target);
    }
  
    addPhoneInputEvent() {
        this.inputPhone.addEventListener('input', this.eventPhoneFormat);
    }
  
    init() {
      if (this.inputPhone) {
        this.addPhoneInputEvent();
      }
      return this;
    }
  }