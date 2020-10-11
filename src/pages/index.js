import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  popupImage, profileValidationClasses, popupEdit, jobInput, nameInput, popupOpenButton,
  profileDescription, profileName, popupNewItem, cardsContainer, popupAvatar,
  popupNewItemOpenButton, popupAvatarOpenButton, popupSubmit, avatarLinkInput
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';
import PopupWithSubmit from "../components/PopupWithSubmit";
import Api from "../components/Api";

//Работа с Api
//создание класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '842f9f83-d4fc-40ad-8c5d-37f5b812d684',
    'Content-Type': 'application/json'
  }
});

//создание класса UserInfo
const userInfo = new UserInfo({name:profileName, description: profileDescription});

//работа с формой редактирования
//создание класса валидации для формы редактирования профиля
const profileFormValidator = new FormValidator(profileValidationClasses, popupEdit);
profileFormValidator.enableValidation();
//создание класса для попапа редактирования информации
const profileFormPopup = new PopupWithForm(popupEdit, {submitFunction: (inputValues) =>{
    api.setInfo({inputValues})
      .then(data=> {
        userInfo.setUserInfo(data.name, data.about);
    })
      .catch(err => console.log(err));
    profileFormPopup.close();}
},api);
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

//Работа с удалением карточки
//создание попапа для удаления карточки
const popupDeleteCard = new PopupWithSubmit(popupSubmit, api);
popupDeleteCard.setEventListeners();


//создание новых карточек
const createCard = (item) => {
  //создание класса для открытия картинки
  const card = new Card(item,
    '.new-item',
    {
      //открытие окна с картиной при клике на карточку
      handleCardClick: ()=>{
        popupWithImage.open(item);
    },
      //удаление карточки при клике
      handleDeleteCard: (item)=>{
        popupDeleteCard.open();
            //изменение функции удаления карточки при подтверждении: удаляю с сервера, удаляю у себя.
        popupDeleteCard.handleSubmit({submitFunction: ()=> {
              api.deleteCard(item._cardId)
                .then(()=> {
                popupDeleteCard.close();
                item.removeCard();
              })
                .catch(err=>console.log(err));
          }
      });
      },
      //работа с лайком
      handleLikeIcon: (item) => {
        const likeButton =  item._element.querySelector('.cards__like');
        //если есть лайк, то при клике лайк удаляется, количество уменьшается
        if(likeButton.classList.contains('cards__like_clicked')) {
          api.removeLike(item._cardId)
            .then((res) => {
              likeButton.classList.remove('cards__like_clicked');
              item._likeNumberElement = item._element.querySelector('.cards__like-number');
              if(res.likes.length===0){
                item._likeNumberElement.style.display='none';
              }
              item._likeNumberElement.textContent = res.likes.length;
              })
            .catch(err => console.log(err));
        }
        else {
          api.addLike(item._cardId)
            .then((res) => {
              likeButton.classList.add('cards__like_clicked');
              if(res.likes.length===1){
                item._likeNumberElement = item._element.querySelector('.cards__like-number');
                item._likeNumberElement.style.display='block';
                item._likeNumberElement.textContent = res.likes.length;}
              })
            .catch(err => console.log(err));
        }
      }},
    api);
  const cardElement = card.generateCard();
  return cardElement;
}


//получение карточек с сервера и добавление их на страницу
api.getCards()
  .then(cards => {
    //создание класса Section для отрисовки картинок
    const cardRenderer = new Section({
        items: cards,
        renderer: (item) => {
          cardRenderer.addItem(createCard(item));
          createCard(item);
        },
      },
      cardsContainer,
      api
    );
    cardRenderer.renderItems(); //добавление карточки на страницу
  })
  .catch(err => console.log(err));

    //создание класса попапа для карточек
    const popupNewItemForm = new PopupWithForm(popupNewItem, {submitFunction: (inputValues) => {
        api.addCard({data:inputValues})
          .then(card=>{
            cardsContainer.prepend(createCard(card));
            popupNewItemForm.close();
          })
          .catch(err => console.log(err));
        }},api);
//установка слушателей для попапа карточек
popupNewItemForm.setEventListeners();

//создание попапа для открытия картинки и установка слушателей
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

//открытие попапа с фото
popupNewItemOpenButton.addEventListener('click', () => {
  popupNewItemForm.open();
  addCardFormValidator.resetForm();//сброс валидации формы
});

//Работа с ававатаром
//Создание попапа для аватара
const popupAvatarForm = new PopupWithForm(popupAvatar, {submitFunction: ()=>{
  api.setAvatar(avatarLinkInput.value)
    .then(data=> {
    popupAvatarOpenButton.style.backgroundImage = `url('${data.avatar}')`;
    popupAvatarForm.close();
  })
    .catch(err => console.log(err));
  }},api);
popupAvatarForm.setEventListeners();
//создание класса валидации для аватара
const popupAvatarValidation = new FormValidator(profileValidationClasses, popupAvatar);
popupAvatarValidation.enableValidation();

//открытие попапа аватара при нажатии на аватар
popupAvatarOpenButton.addEventListener('click', ()=>{
  popupAvatarForm.open();
  popupAvatarValidation.resetForm();
})

//Получение данных с сервера о пользовтеле и добавление их на страницу
api.getInfo()
  .then(info => {
    profileName.textContent = info.name;
    profileDescription.textContent = info.about;
    popupAvatarOpenButton.style.backgroundImage = `url('${info.avatar}')`;
  })
  .catch(err => console.log(err));
