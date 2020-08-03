let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__text_name');
let jobInput =  popup.querySelector('.popup__text_description');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

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
