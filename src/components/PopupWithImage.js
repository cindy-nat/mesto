import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = popupSelector.querySelector('.popup__photo');
    this._popupImageTitle = popupSelector.querySelector('.popup__image-title');
  }

  open(image) {
    super.open();
    this._popupImagePhoto.src = image.link;
    this._popupImagePhoto.alt = image.name;
    this._popupImageTitle.textContent = image.name;
  }
}
