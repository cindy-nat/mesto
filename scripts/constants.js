export const popupImage = document.querySelector('.popup-image');

//общие обработчики
// закрытие окна для всех функций
export const closeModalWindow = (modalWindow) => {modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keyup', (evt) =>{closePopupEsc(modalWindow,evt);});

};
function closePopupEsc (popup, event) {
  if(event.key === "Escape" && popup.classList.contains('popup_opened')) closeModalWindow (popup);
}

 // открытие окна для всех функций
export const openModalWindow = (modalWindow) => {modalWindow.classList.add('popup_opened');
  document.addEventListener('keyup', (evt) =>{closePopupEsc(modalWindow,evt);});
 };

//карточки
export const initialCards = [
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
