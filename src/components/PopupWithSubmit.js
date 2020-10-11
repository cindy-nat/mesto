import Popup from "./Popup";

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector,api) {
    super(popupSelector);
    this._api = api;
  }

  handleSubmit({submitFunction}) {
  this._submitFunction = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFunction();
    });
  }
}
