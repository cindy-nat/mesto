import {jobInput, nameInput} from "../utils/constants";

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers=headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Произошла ошибка ${res.status}`);
    }
    return res.json();
  }

  //запрос информации с сервера о данных пользователя
  getInfo() {
return fetch(`${this._baseUrl}/users/me`, {
  headers:this._headers})
  .then(this._getResponseData);
  }

  //отправка новых данных о пользователе на сервер
  setInfo({inputValues}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.description
      })
    })
  .then(this._getResponseData);
  }

  //Изменение аватарки на сервере
  setAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(this._getResponseData);
  }

  //запрос данных с сервера для получения карточек
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers:this._headers})
      .then(this._getResponseData);
  }

  //сбор всех данных для загрузки страницы
  getAllData() {
    return Promise.all([this.getInfo(), this.getCards()]);
  }

  //добавление карточки на сервер
  addCard({data}) {
    return fetch(`${this._baseUrl}/cards `, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.picture_name,
        link: data.link
      })
    })
      .then(this._getResponseData);
  }

  //удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData);
  }

  //Установка лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getResponseData);
  }
//удаление лайка с сервера
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData);
  }
}
