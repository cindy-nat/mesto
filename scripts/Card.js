import {popupImage} from "./constants.js";
import PopupWithImage from "./PopupWithImage.js";

export class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._imageUrl = data.link;
    this._text = data.name;
    this._cardSelector = cardSelector;
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
    this._handleLikeIcon = this._handleLikeIcon.bind(this);
    this._handleCardClick = handleCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.button__delete').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.cards__like').addEventListener('click', this._handleLikeIcon);
    this._element.querySelector('.cards__photo').addEventListener('click', this._handleCardClick);
  }

  _handleLikeIcon() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_clicked');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element=null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(); //установка обработчиков
    const newItemPhoto = this._element.querySelector('.cards__photo');

    newItemPhoto.src = this._imageUrl;
    newItemPhoto.alt = this._text;
    this._element.querySelector('.cards__name').textContent = this._text;

    return this._element;
  }
}
