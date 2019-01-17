import './index.css';
import ruEngTemplate from './index.html';
import ruEngArray from './ruEngDict';
import resultAlert from '../../../screens/result/index';

export default class RuEng {
  constructor(gameState) {
    this.game = gameState;

    this.ruEngTask = ruEngArray[Math.round(Math.random() * (ruEngArray.length - 1))];
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = ruEngTemplate;
    this.game.modal.show();
    this.task = document.getElementById('ru-eng-task');
    this.task.innerText = this.ruEngTask.engWord;
    this.answer = document.getElementById('ru-eng-answer');
    this.answer.focus();
    this.submitBtn = document.getElementById('ru-eng-submit');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(
        this.game,
        this.ruEngTask.answers.indexOf(this.answer.value.trim().toLowerCase()) !== -1,
      );
    });
  }
}
