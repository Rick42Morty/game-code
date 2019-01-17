import modalTemplate from './index.html';
import './index.css';

export default class Modal {
  constructor() {
    this.modalContainer = document.createElement('div');
    this.modalContainer.innerHTML = modalTemplate;
    document.body.appendChild(this.modalContainer);

    this.active = false;

    this.modal = document.getElementById('myModal');
    this.modal.style.display = 'none';
  }

  show() {
    this.modal.style.display = '';
    this.active = true;
  }

  hide() {
    this.modal.style.display = 'none';
    this.active = false;
  }
}
