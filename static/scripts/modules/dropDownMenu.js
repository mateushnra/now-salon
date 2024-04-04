export default class DropDownMenu {
    constructor(containerDropDown, buttonDropDown, dropDownOptions) {
        this.containerDropDown = document.querySelector(containerDropDown);
        this.buttonDropDown = document.querySelector(buttonDropDown);
        this.dropDownOptions = document.querySelector(dropDownOptions);

        this.eventToggleDropDown = this.eventToggleDropDown.bind(this);
        this.clickOutsideDropDown = this.clickOutsideDropDown.bind(this);
    }
  
    toggleDropDown() {
      this.dropDownOptions.classList.toggle('active');
    }
  
    eventToggleDropDown(event) {
      event.preventDefault();
      this.toggleDropDown();
    }
  
    clickOutsideDropDown(event) {
        if (!this.containerDropDown.contains(event.target) && this.dropDownOptions.classList.contains('active') && event.target != this.buttonDropDown) {
            this.toggleDropDown();
        }
    }
  
    addDropDownEvents() {
      this.buttonDropDown.addEventListener('click', this.eventToggleDropDown);
      document.addEventListener('click', this.clickOutsideDropDown);
    }
  
    init() {
      if (this.buttonDropDown && this.dropDownOptions && this.containerDropDown) {
        this.addDropDownEvents();
      }
      return this;
    }
  }