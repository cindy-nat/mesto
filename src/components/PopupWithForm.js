import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFunction}, api) {
    super(popupSelector);
    this._api=api;
    this._submitFunction = submitFunction;
    this._submitFunction = this._submitFunction.bind(this);
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues () {
    this._inputList = this._popupSelector.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', event => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._submitFunction(inputValues);
  });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
