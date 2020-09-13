export class Card {
  constructor(imageUrl, text, cardSelector) {
    this._imageUrl = imageUrl;
    this._text = text;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.button__delete').addEventListener('click', ()=>{this._handleDeleteCard()});
    this._element.querySelector('.cards__like').addEventListener('click', ()=>{this._handleLikeIcon()});
    this._element.querySelector('.cards__photo').addEventListener('click', ()=>{this._handlePreviewPicture()});
  }

  _handleLikeIcon() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_clicked');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handlePreviewPicture() {
    const popupImage = document.querySelector('.popup-image');
    const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
    const image = this._element.querySelector('.cards__photo');
    popupImagePhoto.src = image.src;
    popupImagePhoto.alt = image.alt;
    popupImage.querySelector('.popup-image__title').textContent = image.alt;
    popupImage.classList.add('popup_open');
  }


  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(); //установка обработчиков
    const newItemPhoto = this._element.querySelector('.cards__photo');

    newItemPhoto.src = this._imageUrl;
    newItemPhoto.textContent = this._text;
    this._element.querySelector('.cards__name').textContent = this._text;

    return this._element;
  }
}
