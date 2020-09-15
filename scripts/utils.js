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
