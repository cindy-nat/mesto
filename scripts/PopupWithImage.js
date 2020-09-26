import Popup from "./Popup.js";
import {popupImage} from "./constants.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super();
  }
  open() {
    const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
    const image = this._element.querySelector('.cards__photo');
    popupImagePhoto.src = image.src;
    popupImagePhoto.alt = image.alt;
    popupImage.querySelector('.popup-image__title').textContent = image.alt;
    super.open();
  }
}
