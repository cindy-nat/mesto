export default class UserInfo {
  constructor({name,description}) {
    this._name = name;
    this._description = description;
    //элемент имени пользователя и элемента информации о себе
  }

  //возвращает объект с данными пользователя
 getUserInfo () {
return {name: this._name.textContent, description: this._description.textContent};
 }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._description.textContent = jobInput;
  }
}
