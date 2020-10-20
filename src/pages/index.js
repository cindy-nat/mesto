import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  popupImage, profileValidationClasses, popupEdit, jobInput, nameInput, popupOpenButton,
  profileDescription, profileName, popupNewItem, cardsContainer, popupAvatar,
  popupNewItemOpenButton, popupAvatarOpenButton, popupSubmit, avatarLinkInput, popupSubmitButtonEdit,
  popupSubmitButtonNewCard, popupSubmitButtonAvatar
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

//функция вызываемая для указания, что что-то загружается с сервера
function renderLoading (isLoading, submitButton) {
  if(isLoading) {
    submitButton.textContent = 'Сохранение...';
  }
  else {
    submitButton.textContent= 'Сохранить';
  }
}

//создание класса UserInfo
const userInfo = new UserInfo({name:profileName, description: profileDescription});

//создание класса попапа для редактирования информации
const profileFormPopup = new PopupWithForm(popupEdit, {submitFunction: (inputValues) =>{
    renderLoading(true, popupSubmitButtonEdit); //показать, что данные загружаются на сервер
    api.setInfo({inputValues})
      .then(data=> {
        userInfo.setUserInfo(data.name, data.about);
        profileFormPopup.close();
      })
      .catch(err => console.log(err))
      .finally(()=>renderLoading(false, popupSubmitButtonEdit)); //убрать знак загрузки на сервер
  }
},api);

//создание класса попапа для удаления карточки
const popupDeleteCard = new PopupWithSubmit(popupSubmit, api);

//Создание класса секции, куда добавлять карточки
const cardRenderer = new Section(cardsContainer, api);

//создание новых карточек
const createCard = (item, userID) => {
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
        //если есть лайк, то при клике лайк удаляется, количество уменьшается
        if(item.isLiked()) {
          api.removeLike(item._cardId)
            .then((res) => {
              item.updateLikes(res.likes);
            })
            .catch(err => console.log(err));
        }
        else {
          api.addLike(item._cardId)
            .then((res) => {
              item.updateLikes(res.likes);
            })
            .catch(err => console.log(err));
        }
      }},
    api, userID);
  const cardElement = card.generateCard();
  return cardElement;
}


//создание попапа для открытия картинки
const popupWithImage = new PopupWithImage(popupImage);
//Создание попапа для аватара
const popupAvatarForm = new PopupWithForm(popupAvatar, {submitFunction: ()=>{
    renderLoading(true, popupSubmitButtonAvatar);
    api.setAvatar(avatarLinkInput.value)
      .then(data=> {
        popupAvatarOpenButton.style.backgroundImage = `url('${data.avatar}')`;
        popupAvatarForm.close();
      })
      .catch(err => console.log(err))
      .finally(()=>{renderLoading(false, popupSubmitButtonAvatar);
      });
  }},api);

// навешивание слушателей для форм
profileFormPopup.setEventListeners(); //форма редактирования информации
popupDeleteCard.setEventListeners(); //форма подтверждения удаления карточки
popupWithImage.setEventListeners(); //форма открытия картинки
popupAvatarForm.setEventListeners(); //форма редактирования аватара

//создание класса формы валидации для редактирования информации
const profileFormValidator = new FormValidator(profileValidationClasses, popupEdit);
//Создание класса валидации для новых картинок
const addCardFormValidator = new FormValidator(profileValidationClasses, popupNewItem);
//создание класса валидации для аватара
const popupAvatarValidation = new FormValidator(profileValidationClasses, popupAvatar);

//запуск валидации форм
addCardFormValidator.enableValidation(); //форма создания новых картинок
popupAvatarValidation.enableValidation(); //форма редактирования аватара


//сбор всех данных для запуска страницы
api.getAllData()
  .then((info)=>{
    const [profileInfo, cards] = info;
    userInfo.setUserInfo(profileInfo.name, profileInfo.about);
    popupAvatarOpenButton.style.backgroundImage = `url('${profileInfo.avatar}')`;
    cardRenderer.renderItems(cards.reverse(), {
      render: (item)=>{
        cardRenderer.addItem(createCard(item, profileInfo._id));}}); //добавление карточки на страницу
    //создание класса попапа для карточек
    const popupNewItemForm = new PopupWithForm(popupNewItem, {submitFunction: (inputValues) => {
        renderLoading(true, popupSubmitButtonNewCard);
        api.addCard({data:inputValues})
          .then(card=>{
            cardRenderer.addItem(createCard(card, profileInfo._id));
            popupNewItemForm.close();
          })
          .catch(err => console.log(err))
          .finally(()=>{renderLoading(false, popupSubmitButtonNewCard);
          });
      }},api);
    return popupNewItemForm;
  })
  .then((popupNewItemForm)=>{
    //открытие попапа с фото
    popupNewItemOpenButton.addEventListener('click', () => {
      popupNewItemForm.open();
      addCardFormValidator.resetForm();//сброс валидации формы
    });
    popupNewItemForm.setEventListeners(); //установка слушателей форма создания карточки
    profileFormValidator.enableValidation(); // установка валидации для формы редактирования информации
  })
  .catch(err => console.log(err));

//открытие попапа редактирования информации
popupOpenButton.addEventListener ('click', ()=> {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  profileFormPopup.open();
  profileFormValidator.resetForm();//сброс валидации формы
});

//открытие попапа аватара при нажатии на аватар
popupAvatarOpenButton.addEventListener('click', ()=>{
  popupAvatarForm.open();
  popupAvatarValidation.resetForm();
})
