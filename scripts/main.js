let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.button__edit');
let popupCloseButton = popup.querySelector('.popup__close');

function popupToogle () {
  popup.classList.toggle('popup_open');
}

popupOpenButton.addEventListener ('click', popupToogle);
popupCloseButton.addEventListener ('click', popupToogle);


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault();

    // Находим поля формы в DOM
    let nameInput = popup.querySelector('.popup__text_name');
    let jobInput =  popup.querySelector('.popup__text_description');
    let name = document.querySelector('.profile__name');
    let description = document.querySelector('.profile__description');

    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
    popupToogle();
}

popup.addEventListener('submit', formSubmitHandler);
