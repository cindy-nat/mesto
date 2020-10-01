import Popup from "./Popup.js";
import {popupImage} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = popupImage.querySelector('.popup-image__photo');
    this._popupImageTitle = popupImage.querySelector('.popup-image__title');

  }

  open(image) {
    super.open();
    this._popupImagePhoto.src = image.link;
    this._popupImagePhoto.alt = image.picture_name;
    this._popupImageTitle.textContent = image.picture_name;
  }
}
