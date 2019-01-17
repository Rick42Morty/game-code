import loginTemplate from './index.html';
import './index.css';

export default class Login {
  constructor(gameState) {
    this.game = gameState;
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = loginTemplate;
    this.submit = document.getElementById('submitBtn');
    this.ans = document.getElementById('hero-name');
    this.game.modal.show();
    this.ans.focus();
    this.submit.addEventListener('click', (e) => {
      e.preventDefault();
      this.game.heroName = this.ans.value || 'Mr. Nobody';
      this.game.modal.hide();
    });
  }
}
