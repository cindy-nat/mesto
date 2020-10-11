
export const popupImage = document.querySelector('.popup-image');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupOpenButton = document.querySelector('.profile__button-edit');
export const nameInput = popupEdit.querySelector('.popup__text_type_name');
export const jobInput =  popupEdit.querySelector('.popup__text_type_description');
export const popupSubmitButtonEdit = popupEdit.querySelector('.popup__submit');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const cardsContainer = document.querySelector('.cards');
export const popupNewItemOpenButton = document.querySelector('.profile__button-add');
export const popupNewItem = document.querySelector('.popup_type_new-item');
export const popupSubmitButtonNewCard = popupNewItem.querySelector('.popup__submit');
export const popupAvatarOpenButton = document.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupSubmitButtonAvatar = popupAvatar.querySelector('.popup__submit');
export const avatarLinkInput = popupAvatar.querySelector('.popup__text_type_avatar');
export const popupSubmit = document.querySelector('.popup_type_submit');



export const profileValidationClasses = {formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'};
