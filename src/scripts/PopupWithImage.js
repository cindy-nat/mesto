import Popup from "./Popup.js";
import {popupImage} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image) {
    super.open();
    const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
    popupImagePhoto.src = image.link;
    popupImagePhoto.alt = image.picture_name;
    popupImage.querySelector('.popup-image__title').textContent = image.picture_name;
  }
}
