export default class SelectFilterForm {
    constructor(listForm, inputSearch, searchButton, selectButton) {
        this.listForm = document.querySelector(listForm);

        this.inputSearch = document.querySelector(inputSearch);

        this.searchButton = document.querySelector(searchButton);
        this.selectButton = document.querySelector(selectButton);
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
                    this.selectButton.disabled = false;
                } 
            });
        });
    }

    init() {
    if (this.listForm && this.inputSearch && this.searchButton && this.selectButton) {
        this.addChangeEventToRadioInput();
        this.addChangeEventToSearchInput();
    }
      return this;
    }
}