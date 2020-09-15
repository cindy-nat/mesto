import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {openModalWindow, initialCards, popupImage, closeModalWindow} from "./constants.js";

//создание класса для валидации
const formValidator = (formElement) => {
  const formValidatorElement = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
  }, formElement);
  formValidatorElement.resetForm();
  formValidatorElement.enableValidation();
}


//работа с формой редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenButton = document.querySelector('.profile__button-edit');
const nameInput = popupEdit.querySelector('.popup__text_type_name');
const jobInput =  popupEdit.querySelector('.popup__text_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModalWindow(popupEdit);
}

popupOpenButton.addEventListener ('click', ()=> {
  openModalWindow(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formValidator(popupEdit);
});
  popupEdit.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(popupEdit);
  }
  });
popupEdit.addEventListener('submit', formSubmitHandler);

//работа с формой добавления новых катинок
const cards = document.querySelector('.cards');
const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');

//создание новых карточек
const cardCreation = (cardLink, cardName) => {
  const card = new Card(cardLink, cardName, '.new-item');
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
}

//добавление существующих карточек
initialCards.forEach(item => {
  cardCreation(item.link, item.name);
});

//создание новой при сабмите
popupNewItem.addEventListener('submit', event => {
  event.preventDefault();
  const newName = popupNewItemName.value;
  const newItemLink = popupNewItemLink.value;
  if(newName !=='' && newItemLink !=='') {
    cardCreation(newItemLink, newName);
    closeModalWindow(popupNewItem);
  }
});

popupNewItemOpenButton.addEventListener('click', () => {
openModalWindow(popupNewItem);
popupNewItemName.value='';
popupNewItemLink.value='';
  formValidator(popupNewItem);});

popupNewItem.addEventListener('mousedown', (evt) => {
if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
  closeModalWindow(popupNewItem);
}
});

//Кнопка закрытия изображения
popupImage.addEventListener('mousedown', (evt) => {
if (evt.target.classList.contains('popup-image') || evt.target.classList.contains('popup__close')) {
  closeModalWindow(popupImage);
}
});

