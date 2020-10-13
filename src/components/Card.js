export default class Card {
  constructor(data, cardSelector, {handleCardClick, handleDeleteCard, handleLikeIcon}, api, userId) {
    this._imageUrl = data.link;
    this._text = data.name;
    this._likesNumberArray = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._likesArray = data.likes;
    this._cardSelector = cardSelector;
    this._handleDeleteCard = handleDeleteCard;
    this._api = api;
    this._handleLikeIcon = handleLikeIcon;
    this._handleCardClick = handleCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.button__delete').addEventListener('click', ()=>this._handleDeleteCard(this));
    this._element.querySelector('.cards__like').addEventListener('click', ()=>this._handleLikeIcon(this));
    this._element.querySelector('.cards__photo').addEventListener('click', this._handleCardClick);
  }

  removeCard() {
    this._element.remove();
    this._element=null;
  }

  isLiked() {
    if(this._cardLike.classList.contains('cards__like_clicked')){
      return true;
    }
    else {return false};
  }

  updateLikes(likesArray) {
    console.log(likesArray);
    this._likeButton =  this._element.querySelector('.cards__like');
    this._likeNumberElement = this._element.querySelector('.cards__like-number');
    //пробегаем по массиву переданных лайков и смотрим, есть ли там наш лайк, если есть, то закрашиваем сердце
    likesArray.forEach(likeItem => {
      if(likeItem._id===this._userId) {
        this._likeButton.classList.add('cards__like_clicked');
      }
      else
      {this._likeButton.classList.remove('cards__like_clicked');
      }
    });
    //смотрим длину массива лайков, если их нет, то цифры прячем, если есть, то показываем.
    if(likesArray.length>0){
      this._likeNumberElement.style.display='block';
      this._likeNumberElement.textContent = likesArray.length;
    }
    else {
      this._likeNumberElement.style.display='none';
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardLike = this._element.querySelector('.cards__like');
    this._setEventListeners(); //установка обработчиков
    const newItemPhoto = this._element.querySelector('.cards__photo');

    newItemPhoto.src = this._imageUrl;
    newItemPhoto.alt = this._text;
    this._element.querySelector('.cards__name').textContent = this._text;
    //делаем апдейт лайков при создании карточки
    this.updateLikes(this._likesNumberArray);
    //если мы создавали карточку, то виден знак удаления
    if(this._ownerId===this._userId) {
      this._element.querySelector('.button__delete').style.display = 'block';
    }
    return this._element;
  }
}
