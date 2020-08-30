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
const nameInput = popupEdit.querySelector('.popup__text_type_name');
const jobInput =  popupEdit.querySelector('.popup__text_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// открытие окна для всех функций
const openModalWindow = (modalWindow) => {modalWindow.classList.add('popup_open');
};
// закрытие окна для всех функций
const closeModalWindow = (modalWindow) => {modalWindow.classList.remove('popup_open');
};

function closePopupEsc (popup, event) {
  if(event.key === "Escape" && popup.classList.contains('popup_open')) closeModalWindow (popup);
}

//работа с формой редактирования профайла
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModalWindow(popupEdit);
}

popupOpenButton.addEventListener ('click', ()=> {
  openModalWindow(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;});
popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(popupEdit);
  }
});
  popupEdit.addEventListener('submit', formSubmitHandler);
  document.addEventListener('keyup', (evt) =>{closePopupEsc(popupEdit,evt);});


//работа с формой добавления новых катинок

const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const templateNewItem = document.querySelector('.new-item');
const cards = document.querySelector('.cards');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');
const popupImage = document.querySelector('.popup-image');

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
    openModalWindow(popupImage);
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
    if(newName !=='' && newItemLink !=='') {
      addItemtoContainer(newName, newItemLink);
      closeModalWindow(popupNewItem);
    }
  });

popupNewItemOpenButton.addEventListener('click', () => {
  openModalWindow(popupNewItem);
  popupNewItemName.value='';
  popupNewItemLink.value='';});
popupNewItem.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(popupNewItem);
  }
});
document.addEventListener('keyup', (evt) => {closePopupEsc(popupNewItem,evt);});


//Кнопка закрытия изображения
popupImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-imagegit ') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(popupImage);
  }
});
document.addEventListener('keyup', (evt) => {closePopupEsc(popupImage,evt);});
