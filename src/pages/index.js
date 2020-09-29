import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import {initialCards, popupImage, profileValidationClasses, popupEdit, jobInput, nameInput, popupOpenButton,
  profileDescription, profileName, popupNewItem, popupNewItemLink, cardsContainer, popupNewItemName,
  popupNewItemOpenButton} from "../utils/constants.js";
import Section from "../scripts/Section.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import UserInfo from "../scripts/UserInfo.js";
import './index.css';

//создание класса UserInfo
const userInfo = new UserInfo({name:profileName, description: profileDescription});

//работа с формой редактирования
//создание класса валидации для формы редактирования профиля
const profileFormValidator = new FormValidator(profileValidationClasses, popupEdit);
profileFormValidator.enableValidation();
//создание класса для попапа
const profileFormPopup = new PopupWithForm(popupEdit, {submitFunction: () =>{
    const inputValuesProfile = profileFormPopup._getInputValues();
    userInfo.setUserInfo(inputValuesProfile.name, inputValuesProfile.description);
    profileFormPopup.close();}
});
profileFormPopup.setEventListeners(); // навешивание слушателей для формы

//при открытии создание класса попапа
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

  //создание класса попапа для карточек
const popupNewItemForm = new PopupWithForm(popupNewItem, {submitFunction: () => {
    const inputValuesNewItem = popupNewItemForm._getInputValues();
    console.log(inputValuesNewItem);
      const cardRenderer = new Section({
        items: []}, cardsContainer);
      createCard(inputValuesNewItem,cardRenderer);
      popupNewItemForm.close();}});
popupNewItemForm.setEventListeners(); //установка слушателей для попапа карточек


 //создание новых карточек
const createCard = (item, renderList) => {
  const popupWithImage = new PopupWithImage(popupImage);
  //создание класса для открытия картинки
  const card = new Card(item, '.new-item', {handleCardClick: ()=>{popupWithImage.open();
  popupWithImage.setEventListeners();}});
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

//открытие попапа
popupNewItemOpenButton.addEventListener('click', () => {
  popupNewItemForm.open();
  popupNewItemName.value='';
  popupNewItemLink.value='';
  addCardFormValidator.resetForm();//сброс валидации формы
});


