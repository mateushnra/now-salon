export default class Modal {
    constructor(containerModal, buttonOpen, buttonClose, modalWrapper) {
        this.containerModal = document.querySelector(containerModal);
        this.buttonOpen = document.querySelector(buttonOpen);
        this.buttonClose = document.querySelector(buttonClose);
        this.modalWrapper = document.querySelector(modalWrapper);

        this.eventToggleModal = this.eventToggleModal.bind(this);
        this.clickOutsideModal = this.clickOutsideModal.bind(this);
    }
  
    toggleModal() {
      this.containerModal.classList.toggle('active');
      this.modalWrapper.classList.toggle('active');
    }
  
    eventToggleModal(event) {
      event.preventDefault();
      this.toggleModal();
    }
  
    clickOutsideModal(event) {
        if (!this.containerModal.contains(event.target) && this.containerModal.classList.contains('active') && event.target != this.buttonOpen) {
            this.toggleModal();
        }
    }
  
    addModalEvents() {
      this.buttonOpen.addEventListener('click', this.eventToggleModal);
      this.buttonClose.addEventListener('click', this.eventToggleModal);
      document.addEventListener('click', this.clickOutsideModal);
    }
  
    init() {
      if (this.buttonOpen && this.buttonClose && this.containerModal && this.modalWrapper) {
        this.addModalEvents();
      }
      return this;
    }
  }