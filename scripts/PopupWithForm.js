import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFunction}) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._submitFunction = this._submitFunction.bind(this);
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
      this._submitFunction();
  });
  }
}
