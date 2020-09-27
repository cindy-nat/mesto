import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards, popupImage, profileValidationClasses, popupEdit, jobInput, nameInput, popupOpenButton, profileDescription, profileName} from "./constants.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

//работа с формой редактирования
//создание класса валидации для формы редактирования профиля
const profileFormValidator = new FormValidator(profileValidationClasses, popupEdit);
profileFormValidator.enableValidation();

//создание класса UserInfo
const userInfo = new UserInfo({name:profileName, description: profileDescription});

//при открытии создание класса попапа
popupOpenButton.addEventListener ('click', ()=> {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  const profileFormPopup = new PopupWithForm(popupEdit, {submitFunction: () =>{
      userInfo.setUserInfo(nameInput.value, jobInput.value);
      profileFormPopup.close();}
  });
  profileFormPopup.open();
  profileFormPopup.setEventListeners();
  profileFormValidator.resetForm();//сброс валидации формы
});

//работа с формой добавления новых катинок
const cardsContainer = document.querySelector('.cards');
const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');

const addCardFormValidator = new FormValidator(profileValidationClasses, popupNewItem);
  addCardFormValidator.enableValidation();

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

//создание новой фото при открытии попапа
popupNewItemOpenButton.addEventListener('click', () => {
  const popupNewItemForm = new PopupWithForm(popupNewItem, {submitFunction: () => {const name = popupNewItemName.value;
    const link = popupNewItemLink.value;
    if(name !=='' && link !=='') {
      const item ={name,link};
      const cardRenderer = new Section({
        items: []}, cardsContainer);
      createCard(item,cardRenderer);
      popupNewItemForm.close();}}});
  popupNewItemForm.open();
  popupNewItemForm.setEventListeners();
  popupNewItemName.value='';
  popupNewItemLink.value='';
  addCardFormValidator.resetForm();//сброс валидации формы
});


