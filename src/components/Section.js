export default class Section {
  constructor(containerSelector, api) {
    this._api=api;
    this._container = containerSelector;
  }

  addItem (element) {
    this._container.prepend(element);
  }

  renderItems (items, {render}) {
    items.forEach(item => {
      render(item);
    });
  }
}
