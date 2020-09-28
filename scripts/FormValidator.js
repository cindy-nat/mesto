export default class FormValidator {
  constructor (object, formSelector) {
    this._formObj = object;
    this._formSelector = formSelector;
    this._buttonElement = formSelector.querySelector(object.submitButtonSelector);
  }

  resetForm () {
    const formInputs = this._formSelector.querySelectorAll('.popup__text');
    formInputs.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._buttonElement.classList.add(this._formObj.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

// Функция, которая добавляет класс с ошибкой
  _showInputError (inputElement, errorMessage) {
    const formError =  this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._formObj.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._formObj.errorClass);
  };
// Функция, которая удаляет класс с ошибкой
  _hideInputError (inputElement) {
    const formError =  this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formObj.inputErrorClass);
    formError.classList.remove(this._formObj.errorClass);
    // Очистим ошибку
    formError.textContent = '';
  }


//Проверяем валидность данных в каждом элементе
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

//Провекра валидности всех полей в форме
  _hasInvalidInput =  (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

//Работа переключения работы кнопки submit
  _toggleButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.classList.add(this._formObj.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '')
    }
    else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._formObj.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', '')
    }
  };



//устаналвиваем валидацию на каждое поле ввода для каждой формы
  _setEventListeners () {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._formObj.inputSelector));
    this._toggleButtonState(inputList);
    //Делаем контроль ввода для каждой формы ввода
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);});
    });
  }


  enableValidation () {
      this._setEventListeners();

  }
}
