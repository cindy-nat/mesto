export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose)
  }

  _handleEscClose (event) {
    if(event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners () {
  this._popupSelector.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_type_image') ||evt.target.classList.contains('popup')|| evt.target.classList.contains('popup__close')) {
      this.close();
    }
  });
  }
}
