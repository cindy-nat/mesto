import Popup from "./Popup.js";
import {popupImage} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
    const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
    const image = document.querySelector('.cards__photo');
    popupImagePhoto.src = image.src;
    popupImagePhoto.alt = image.alt;
    popupImage.querySelector('.popup-image__title').textContent = image.alt;
  }
}
