
export const popupImage = document.querySelector('.popup-image');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupOpenButton = document.querySelector('.profile__button-edit');
export const nameInput = popupEdit.querySelector('.popup__text_type_name');
export const jobInput =  popupEdit.querySelector('.popup__text_type_description');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const cardsContainer = document.querySelector('.cards');
export const popupNewItemOpenButton = document.querySelector('.profile__button-add');
export const popupNewItem = document.querySelector('.popup_type_new-item');
export const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
export const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');

//карточки
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profileValidationClasses = {formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'};
