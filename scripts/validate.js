
// Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage, formObj) => {
  const formError =  formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formObj.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(formObj.errorClass);
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, formObj) => {
  const formError =  formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  formError.classList.remove(formObj.errorClass);
  // Очистим ошибку
  formError.textContent = '';
}


//Проверяем валидность данных в каждом элементе
const checkInputValidity = (formElement, inputElement, formObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
}

//Провекра валидности всех полей в форме
const hasInvalidInput =  (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Работа переключения работы кнопки submit
const toggleButtonState = (inputList, buttonElement, formObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '')
  }
  else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formObj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '')
  }
};



//устаналвиваем валидацию на каждое поле ввода для каждой формы
const setEventListeners = (formElement,formObj) => {
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObj);
  //Делаем контроль ввода для каждой формы ввода
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', ()=> {
      checkInputValidity(formElement, inputElement, formObj);
      toggleButtonState(inputList, buttonElement, formObj);});
  });
}


//Устанавливаем валидацию на все формы
const enableValidation = (formObj) => {
  const formList = Array.from(document.querySelectorAll(formObj.formSelector));

  formList.forEach(formElement => {
  formElement.addEventListener('submit', (evt) => evt.preventDefault());
  setEventListeners(formElement,formObj);})
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
});
