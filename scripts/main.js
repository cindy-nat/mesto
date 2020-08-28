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

const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCloseButton = popupEdit.querySelector('.popup__close');
const nameInput = popupEdit.querySelector('.popup__text_type_name');
const jobInput =  popupEdit.querySelector('.popup__text_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//открытие окна для всех функций
const toggleModalWindow = (modalWindow) => {modalWindow.classList.toggle('popup_open');
};

//закрытие попапа при нажатии вне экрана
function closePopup (popup, event) {
  if(event.target !== event.currentTarget) return;
  toggleModalWindow (popup);
}

//работа с формой редактирования профайла
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    toggleModalWindow(popupEdit);
}

popupOpenButton.addEventListener ('click', ()=> {
  toggleModalWindow(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;});
popupCloseButton.addEventListener ('click', ()=> {toggleModalWindow(popupEdit);});
popupEdit.addEventListener('submit', formSubmitHandler);
popupEdit.addEventListener('click', (evt) =>{
  closePopup(popupEdit,evt);
});

//работа с формой добавления новых катинок

const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const templateNewItem = document.querySelector('.new-item');
const cards = document.querySelector('.cards');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');
const popupNewItemClose = popupNewItem.querySelector('.popup__close');
const popupImage = document.querySelector('.popup-image');
const popupImageClose = popupImage.querySelector('.popup__close');

  function handleLikeIcon(event) {
    event.target.classList.toggle('cards__like_clicked');
  }

  function handleDeleteCard(event) {
    const card = event.target.closest('.cards__item');
    card.remove();}

  function handlePreviewPicture(event) {
    const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
    popupImagePhoto.src = event.target.closest('.cards__photo').src;
    popupImagePhoto.alt = event.target.closest('.cards__photo').alt;
    popupImage.querySelector('.popup-image__title').textContent = event.target.closest('.cards__photo').alt;
    toggleModalWindow(popupImage);
  }

  function addItemtoContainer (name, link) {
    const newItem =  templateNewItem.content.cloneNode(true);
    const newItemPhoto = newItem.querySelector('.cards__photo');
    newItemPhoto.src = link;
    newItemPhoto.alt = name;
    newItem.querySelector('.cards__name').textContent = name;

    newItem.querySelector('.button__delete').addEventListener('click', handleDeleteCard);

    newItem.querySelector('.cards__like').addEventListener('click',handleLikeIcon);

    newItem.querySelector('.cards__photo').addEventListener('click', handlePreviewPicture);

    cards.prepend(newItem);
  }

initialCards.forEach(card => {
  addItemtoContainer(card.name, card.link);
});

  popupNewItem.addEventListener('submit', event => {
    event.preventDefault();
    const newName = popupNewItemName.value;
    const newItemLink = popupNewItemLink.value;
    if(newName!=='' && newItemLink!=='') {
      addItemtoContainer(newName, newItemLink);
      toggleModalWindow(popupNewItem);
    }
  })

popupNewItemOpenButton.addEventListener('click', () => {
  toggleModalWindow(popupNewItem);
  popupNewItemName.value='';
  popupNewItemLink.value='';});
popupNewItemClose.addEventListener ('click', () => {toggleModalWindow(popupNewItem);});
popupNewItem.addEventListener('click', (evt) =>{closePopup(popupNewItem,evt);});

//Кнопка закрытия изображения
popupImageClose.addEventListener('click', () => popupImage.classList.toggle('popup_open'));
popupImage.addEventListener('click', (evt) =>{closePopup(popupImage,evt);});




