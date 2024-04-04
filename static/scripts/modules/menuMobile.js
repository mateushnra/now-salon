export default class MenuMobile {
    constructor(containerMenuMobile, buttonHamburger, dropDownNavPrimary, dropDownNavSecondary) {
        this.containerMenuMobile = document.querySelector(containerMenuMobile);
        this.buttonHamburger = document.querySelector(buttonHamburger);
        this.dropDownNavPrimary = document.querySelector(dropDownNavPrimary);
        this.dropDownNavSecondary = document.querySelector(dropDownNavSecondary);

        this.eventToggleMenuMobile = this.eventToggleMenuMobile.bind(this);
        this.clickOutsideMenuMobile = this.clickOutsideMenuMobile.bind(this);
    }
  
    toggleMenuMobile() {
      this.dropDownNavPrimary.classList.toggle('activeFlex');
      this.dropDownNavSecondary.classList.toggle('activeFlex');
    }
  
    eventToggleMenuMobile(event) {
      event.preventDefault();
      this.toggleMenuMobile();
    }
  
    clickOutsideMenuMobile(event) {
        if (!this.containerMenuMobile.contains(event.target) && this.dropDownNavPrimary.classList.contains('activeFlex') && event.target != this.buttonHamburger) {
            this.toggleMenuMobile();
        }
    }
  
    addDropDownMenuMobileEvents() {
      this.buttonHamburger.addEventListener('click', this.eventToggleMenuMobile);
      document.addEventListener('click', this.clickOutsideMenuMobile);
    }
  
    init() {
      if (this.buttonHamburger && this.dropDownNavPrimary && this.dropDownNavSecondary && this.containerMenuMobile) {
        this.addDropDownMenuMobileEvents();
      }
      return this;
    }
  }