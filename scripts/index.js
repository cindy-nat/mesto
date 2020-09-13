import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const initialCards = [
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

//общие обработчики
// открытие окна для всех функций
const openModalWindow = (modalWindow) => {modalWindow.classList.add('popup_open');
};
// закрытие окна для всех функций
const closeModalWindow = (modalWindow) => {modalWindow.classList.remove('popup_open');
};
function closePopupEsc (popup, event) {
  if(event.key === "Escape" && popup.classList.contains('popup_open')) closeModalWindow (popup);
}

//очищение формы от ошибок
function hideInputError (formElement) {
  const formInputs = formElement.querySelectorAll('.popup__text');
  formInputs.forEach(inputElement => {
    inputElement.classList.remove('popup__text_type_error');
    const formError =  formElement.querySelector(`#${inputElement.id}-error`);
    formError.classList.remove('popup__error_visible');
    formError.textContent = '';
  })
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
  hideInputError (popupEdit);
});
  popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(popupEdit);
  }
  });
popupEdit.addEventListener('submit', formSubmitHandler);
document.addEventListener('keyup', (evt) =>{closePopupEsc(popupEdit,evt);});

//работа с формой добавления новых катинок
const cards = document.querySelector('.cards');
const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');
const popupImage = document.querySelector('.popup-image');


initialCards.forEach(item => {
  const card = new Card(item.link, item.name, '.new-item');
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
});

popupNewItem.addEventListener('submit', event => {
  event.preventDefault();
  const newName = popupNewItemName.value;
  const newItemLink = popupNewItemLink.value;
  if(newName !=='' && newItemLink !=='') {
    const card = new Card(newItemLink, newName, '.new-item');
    const cardElement = card.generateCard();
    cards.prepend(cardElement);
    closeModalWindow(popupNewItem);
  }
});

popupNewItemOpenButton.addEventListener('click', () => {
openModalWindow(popupNewItem);
popupNewItemName.value='';
popupNewItemLink.value='';
  hideInputError(popupNewItem)});
popupNewItem.addEventListener('click', (evt) => {
if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
  closeModalWindow(popupNewItem);
}
});
document.addEventListener('keyup', (evt) => {closePopupEsc(popupNewItem,evt);});


//Кнопка закрытия изображения
popupImage.addEventListener('click', (evt) => {
if (evt.target.classList.contains('popup-image') || evt.target.classList.contains('popup__close')) {
  closeModalWindow(popupImage);
}
});
document.addEventListener('keyup', (evt) => {closePopupEsc(popupImage,evt);});

//Запуск валидации для форм

  const formValidator = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
  }, '.popup__form');
  formValidator.enableValidation();
