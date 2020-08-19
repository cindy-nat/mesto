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
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

//работа с формой редактирования профайла
function popupToogle () {
  popupEdit.classList.toggle('popup_open');
  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
    popupToogle();
}

popupOpenButton.addEventListener ('click', popupToogle);
popupCloseButton.addEventListener ('click', popupToogle);
popupEdit.addEventListener('submit', formSubmitHandler);

//работа с формой добавления новых катинок

const popupNewItemOpenButton = document.querySelector('.profile__button-add');
const templateNewItem = document.querySelector('.new-item');
const cards = document.querySelector('.cards');
const popupNewItem = document.querySelector('.popup_type_new-item');
const popupNewItemName = popupNewItem.querySelector('.popup__text_type_picture-name');
const popupNewItemLink = popupNewItem.querySelector('.popup__text_type_link');
const popupNewItemClose = popupNewItem.querySelector('.popup__close');


  function popupToggleNewItem() {
    popupNewItem.classList.toggle('popup_open');
    popupNewItemName.value='';
    popupNewItemLink.value='';
  }

  function addItemtoContainer (name, link) {
    const newItem =  templateNewItem.content.cloneNode(true);
    const newItemPhoto = newItem.querySelector('.cards__photo');
    newItemPhoto.src = link;
    newItemPhoto.alt = name;
    newItem.querySelector('.cards__name').textContent = name;

    cards.prepend(newItem);
  }

  initialCards.forEach(function(item){
    const newItem =  templateNewItem.content.cloneNode(true);
    const newItemPhoto = newItem.querySelector('.cards__photo');
    newItemPhoto.src = item.link;
    newItemPhoto.alt = item.name;
    newItem.querySelector('.cards__name').textContent = item.name;

    cards.append(newItem);
  });

  popupNewItem.addEventListener('submit', event => {
    event.preventDefault();
    const newName = popupNewItemName.value;
    const newItemLink = popupNewItemLink.value;
    if(newName!=='' && newItemLink!=='') {
      addItemtoContainer(newName, newItemLink);
      popupToggleNewItem();
      popupNewItem.reset();
    }
  })

popupNewItemOpenButton.addEventListener('click', popupToggleNewItem);
popupNewItemClose.addEventListener ('click', popupToggleNewItem);


