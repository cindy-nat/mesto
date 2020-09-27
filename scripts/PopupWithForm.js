import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFunction}) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._submitFunction = this._submitFunction.bind(this);
  }
  _getInputValues () {

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', event => {
      event.preventDefault();
      this._submitFunction();
  });
  }

  close() {
    super.close();
  }
}
