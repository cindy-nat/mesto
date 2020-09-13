export class FormValidator {
  constructor (object, formSelector) {
    this._formObj = object;
    this._formSelector = formSelector;
  }

// Функция, которая добавляет класс с ошибкой
  _showInputError (formElement, inputElement, errorMessage) {
    const formError =  formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._formObj.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._formObj.errorClass);
  };
// Функция, которая удаляет класс с ошибкой
  _hideInputError (formElement, inputElement) {
    const formError =  formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formObj.inputErrorClass);
    formError.classList.remove(this._formObj.errorClass);
    // Очистим ошибку
    formError.textContent = '';
  }


//Проверяем валидность данных в каждом элементе
  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

//Провекра валидности всех полей в форме
  _hasInvalidInput =  (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

//Работа переключения работы кнопки submit
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formObj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '')
    }
    else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._formObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', '')
    }
  };



//устаналвиваем валидацию на каждое поле ввода для каждой формы
  _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._formObj.inputSelector));
    const buttonElement = formElement.querySelector(this._formObj.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    //Делаем контроль ввода для каждой формы ввода
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);});
    });
  }


  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach(formElement => {
      formElement.addEventListener('submit', (evt) => evt.preventDefault());
      this._setEventListeners(formElement);
    });

  }
}
