export default class ValidationForm {
  constructor() {
    this.EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  }

  isEmailValid(value) {
    return this.EMAIL_REGEX.test(value);
  }

  isEmpty(value) {
    return value.trim() === '';
  }

  isBelowMinLength(value, minLength) {
    return value.length < minLength;
  }
}