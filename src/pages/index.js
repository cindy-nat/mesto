import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards, popupImage, profileValidationClasses, popupEdit, jobInput, nameInput, popupOpenButton,
  profileDescription, profileName, popupNewItem, popupNewItemLink, cardsContainer, popupNewItemName, popupAvatar,
  popupNewItemOpenButton, popupAvatarOpenButton, popupSubmit
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';
import PopupWithSubmit from "../components/PopupWithSubmit";

//создание класса UserInfo
const userInfo = new UserInfo({name:profileName, description: profileDescription});

//работа с формой редактирования
//создание класса валидации для формы редактирования профиля
const profileFormValidator = new FormValidator(profileValidationClasses, popupEdit);
profileFormValidator.enableValidation();
//создание класса для попапа редактирования информации
const profileFormPopup = new PopupWithForm(popupEdit, {submitFunction: (inputValues) =>{
    userInfo.setUserInfo(inputValues.name, inputValues.description);
    profileFormPopup.close();}
});
profileFormPopup.setEventListeners(); // навешивание слушателей для формы

//при открытии поля редактирования создание класса попапа
popupOpenButton.addEventListener ('click', ()=> {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  profileFormPopup.open();
  profileFormValidator.resetForm();//сброс валидации формы
});

//работа с формой добавления новых катинок
//Создание класса валидации для новых картинок
const addCardFormValidator = new FormValidator(profileValidationClasses, popupNewItem);
  addCardFormValidator.enableValidation();

//создание новых карточек
const createCard = (item, renderList) => {
  //создание класса для открытия картинки
  const card = new Card(item, '.new-item', {handleCardClick: ()=>{
      popupWithImage.open(item);
    }});
  const cardElement = card.generateCard();
  renderList.addItem(cardElement);
}

//создание класса Section для отрисовки картинок
const cardRenderer = new Section({
    items: initialCards,
    renderer: (item) => {
      createCard(item, cardRenderer);
    },
  },
  cardsContainer
);
cardRenderer.renderItems(); //добавление карточек из массива

  //создание класса попапа для карточек
const popupNewItemForm = new PopupWithForm(popupNewItem, {submitFunction: (inputValues) => {
      createCard(inputValues,cardRenderer);
      popupNewItemForm.close();}});
popupNewItemForm.setEventListeners(); //установка слушателей для попапа карточек

//создание попапа для открытия картинки и установка слушателей
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

//открытие попапа
popupNewItemOpenButton.addEventListener('click', () => {
  popupNewItemForm.open();
  addCardFormValidator.resetForm();//сброс валидации формы
});

//Работа с ававатаром
//Создание попапа для аватара
const popupAvatarForm = new PopupWithForm(popupAvatar, {submitFunction: ()=>{
  //вставить фунцию работы с API для сабмита
  }});
popupAvatarForm.setEventListeners();
//создание класса валидации для аватара
const popupAvatarValidation = new FormValidator(profileValidationClasses, popupAvatar);
popupAvatarValidation.enableValidation();

//открытие попапа аватара при нажатии на аватар
popupAvatarOpenButton.addEventListener('click', ()=>{
  popupAvatarForm.open();
  popupAvatarValidation.resetForm();
})

//Работа с удалением карточки
//создание попапа для удаления карточки
const popupSubmitForm = new PopupWithSubmit(popupSubmit);
popupSubmitForm.setEventListeners();
