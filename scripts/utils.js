//общие обработчики
// закрытие окна для всех функций
export const closeModalWindow = (modalWindow) => {modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupEsc);
}

function closePopupEsc (event) {
  if(event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closeModalWindow(openedPopup);
  }
}

// открытие окна для всех функций
export const openModalWindow = (modalWindow) => {modalWindow.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupEsc);
}
