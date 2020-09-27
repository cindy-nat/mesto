import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards, popupImage, profileValidationClasses} from "./constants.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

//работа с формой редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenButton = document.querySelector('.profile__button-edit');
const nameInput = popupEdit.querySelector('.popup__text_type_name');
const jobInput =  popupEdit.querySelector('.popup__text_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


//создание класса валидации для формы редактирования профиля
const profileFormValidator = new FormValidator(profileValidationClasses, popupEdit);
profileFormValidator.enableValidation();


popupOpenButton.addEventListener ('click', ()=> {
  const profileFormPopup = new PopupWithForm(popupEdit, {submitFunction: () =>{
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      profileFormPopup.close();}
  });
  profileFormPopup.open();
  profileFormPopup.setEventListeners();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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

//создание новой фото при сабмите
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


