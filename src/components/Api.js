import {jobInput, nameInput} from "../utils/constants";

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers=headers;
  }

  //запрос информации с сервера о данных пользователя
  getInfo() {
return fetch(`${this._baseUrl}/users/me`, {
  headers:this._headers})
  .then(res => {
    if(res.ok){
      return res.json()}
    return Promise.reject(`Произошла ошибка ${res.status}`)});
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
  .then(res => {
        if(res.ok){
          return res.json()}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
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
      .then(res => {
        if(res.ok){
          return res.json()}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
  }

  //запрос данных с сервера для получения карточек
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers:this._headers})
      .then(res => {
        if(res.ok){
          return res.json(); console.log(res)}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
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
      .then(res => {
        if(res.ok){
          return res.json()}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
  }

  //удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json()}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
  }

  //Установка лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json()}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
  }
//удаление лайка с сервера
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json()}
        return Promise.reject(`Произошла ошибка ${res.status}`)});
  }
}
