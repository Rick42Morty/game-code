/* eslint-disable no-new */
import choiceTemplate from './index.html';
import './index.css';
import TaskChoice from '../task-choice/index';

export default class SpellChoice {
  constructor(gameState) {
    this.game = gameState;
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = choiceTemplate;
    this.game.modal.show();

    document.getElementById('fire').focus();
    this.form = document.getElementById('choice-form');
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      this.game.spell = e.target.id;
      new TaskChoice(this.game);
    });
  }
}
