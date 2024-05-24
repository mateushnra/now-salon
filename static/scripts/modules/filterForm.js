export default class FilterForm {
    constructor(listForm, inputSearch, searchButton, editButton, deleteButton) {
        this.listForm = document.querySelector(listForm);

        this.inputSearch = document.querySelector(inputSearch);

        this.searchButton = document.querySelector(searchButton);
        this.editButton = document.querySelector(editButton);
        this.deleteButton = document.querySelector(deleteButton);
    }

    addChangeEventToSearchInput() {
        this.inputSearch.addEventListener('input', () =>{
            if (this.inputSearch.value) this.searchButton.disabled = false
            else this.searchButton.disabled = true
        });
    }

    addChangeEventToRadioInput() {
        const radioGroup = this.listForm.querySelectorAll('input[type="radio"]');

        radioGroup.forEach(radio => {
            radio.addEventListener('click', () =>{
                if (radio.checked) {
                    this.editButton.disabled = false;
                    this.deleteButton.disabled = false;
                } 
            });
        });
    }

    init() {
    if (this.listForm && this.inputSearch && this.searchButton && this.editButton && this.deleteButton) {
        this.addChangeEventToRadioInput();
        this.addChangeEventToSearchInput();
    }
      return this;
    }
}