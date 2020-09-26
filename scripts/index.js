import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards, popupImage} from "./constants.js";
import {openModalWindow, closeModalWindow} from "./utils.js";
import Section from "./Section.js";

//работа с формой редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenButton = document.querySelector('.profile__button-edit');
const nameInput = popupEdit.querySelector('.popup__text_type_name');
const jobInput =  popupEdit.querySelector('.popup__text_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//создание класса валидации для формы редактирования профиля
const profileFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
}, popupEdit);
//нужно вынести объект в отдельную переменную, чтобы не было дубля!
profileFormValidator.enableValidation();

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
  profileFormValidator.resetForm();//сброс валидации формы
});
  popupEdit.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(popupEdit);
  }
  });
popupEdit.addEventListener('submit', formSubmitHandler);

//работа с формой добавления новых катинок
const cardsContainer = document.querySelector('.cards');
const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');

const addCardFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
}, popupNewItem);
  addCardFormValidator.enableValidation();

 //создание новых карточек
const createCard = (item, renderList) => {
  const card = new Card(item, '.new-item');
  const cardElement = card.generateCard();
  renderList.addItem(cardElement);
}

//добавление карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      createCard(item, cardsList);
    },
  },
  cardsContainer
);
cardsList.renderItems();

//создание новой при сабмите
popupNewItem.addEventListener('submit', event => {
  event.preventDefault();
  const name = popupNewItemName.value;
  const link = popupNewItemLink.value;
    if(name !=='' && link !=='') {
      const item ={name,link};
      const cardRenderer = new Section({
        items: []}, cardsContainer);
      createCard(item,cardRenderer)
      closeModalWindow(popupNewItem);
  }
});

popupNewItemOpenButton.addEventListener('click', () => {
  openModalWindow(popupNewItem);
  popupNewItemName.value='';
  popupNewItemLink.value='';
  addCardFormValidator.resetForm();//сброс валидации формы
});

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

