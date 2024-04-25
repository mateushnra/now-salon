export default class FeedbackForm {
    constructor(messageForm) {
        this.messageForm = document.querySelector(messageForm);
    }

    init() {
    if (this.messageForm) {
        setTimeout(()=>{
          this.messageForm.innerText = "";
        }, 1500)
    }
      return this;
    }
  }