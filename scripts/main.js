const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCloseButton = popup.querySelector('.popup__close');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput =  popup.querySelector('.popup__text_type_description');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

function popupToogle () {
  popup.classList.toggle('popup_open');
  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
}

popupOpenButton.addEventListener ('click', popupToogle);
popupCloseButton.addEventListener ('click', popupToogle);


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
    popupToogle();
}

popup.addEventListener('submit', formSubmitHandler);
