export default class Section {
  constructor({items, renderer}, containerSelector, api) {
    this._initialArray = items;
    this._renderer = renderer;
    this._api=api;
    this._container = containerSelector;
  }

  addItem (element) {
    this._container.prepend(element);
  }

  renderItems () {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
}
